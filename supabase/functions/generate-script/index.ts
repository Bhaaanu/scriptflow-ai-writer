import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    // Validate prompt input
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Prompt is required');
    }
    
    const trimmedPrompt = prompt.trim();
    
    if (trimmedPrompt.length < 10) {
      throw new Error('Prompt must be at least 10 characters');
    }
    
    if (trimmedPrompt.length > 500) {
      throw new Error('Prompt must be less than 500 characters');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Check credits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits_remaining')
      .eq('id', user.id)
      .single();

    if (profileError) {
      throw new Error('Failed to fetch profile');
    }

    if (profile.credits_remaining <= 0) {
      throw new Error('No credits remaining. Please upgrade your plan.');
    }

    // Deduct credit BEFORE generating script (prevent bypass)
    const { data: updateResult, error: updateError } = await supabase
      .from('profiles')
      .update({ credits_remaining: profile.credits_remaining - 1 })
      .eq('id', user.id)
      .eq('credits_remaining', profile.credits_remaining) // Optimistic locking
      .select('credits_remaining')
      .single();

    if (updateError || !updateResult) {
      throw new Error('Failed to deduct credit. Please try again.');
    }

    // Call Lovable AI to generate script
    const lovableResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a professional script writer for social media content. Generate a complete video script based on the user's prompt.
Return the result using a function call with three fields only: hook, body, cta.`
          },
          {
            role: 'user',
            content: trimmedPrompt
          }
        ],
        // Prefer structured outputs via tool calling
        tools: [
          {
            type: 'function',
            function: {
              name: 'return_script',
              description: 'Return the generated script in three parts',
              parameters: {
                type: 'object',
                properties: {
                  hook: { type: 'string', description: '1-2 sentence attention-grabbing hook' },
                  body: { type: 'string', description: '2-4 sentence story/body explaining the value' },
                  cta: { type: 'string', description: '1-2 sentence call to action' }
                },
                required: ['hook', 'body', 'cta'],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'return_script' } },
        temperature: 0.8,
      }),
    });

    if (!lovableResponse.ok) {
      throw new Error('Failed to generate script');
    }

    const aiData = await lovableResponse.json();
    const choice = aiData.choices?.[0];

    // 1) Prefer structured tool call output
    const toolArgs = choice?.message?.tool_calls?.[0]?.function?.arguments as string | undefined;
    let script: { hook: string; body: string; cta: string };

    if (toolArgs) {
      script = JSON.parse(toolArgs);
    } else {
      // 2) Fallback to parsing text content
      const scriptContent = choice?.message?.content as string | undefined;
      if (!scriptContent) throw new Error('AI did not return any content');

      // Robustly extract JSON from the AI response (handles code fences and extra text)
      const extractJson = (text: string): string | null => {
        const t = text.trim();
        // 1) Prefer fenced code block ```json ... ```
        const fenceMatch = t.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
        if (fenceMatch?.[1]) return fenceMatch[1];
        // 2) Fallback: grab first JSON object delimited by braces
        const first = t.indexOf('{');
        const last = t.lastIndexOf('}');
        if (first !== -1 && last !== -1 && last > first) return t.slice(first, last + 1);
        return null;
      };

      const jsonStr = extractJson(scriptContent);
      if (!jsonStr) throw new Error('AI did not return valid JSON');
      script = JSON.parse(jsonStr);
    }

    return new Response(
      JSON.stringify(script),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
