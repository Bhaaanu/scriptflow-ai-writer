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

    if (!prompt) {
      throw new Error('Prompt is required');
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
            content: `You are a professional script writer for social media content. Generate a complete video script based on the user's prompt. Return ONLY a JSON object with three fields:
- "hook": A compelling 1-2 sentence hook that grabs attention in the first 3 seconds
- "body": A 2-4 sentence story/body that explains the value proposition
- "cta": A clear 1-2 sentence call-to-action that drives engagement

Example output:
{
  "hook": "Tired of bitter coffee ruining your mornings?",
  "body": "Meet JavaJoy — crafted for flavor, roasted for smiles. Every sip is smooth, rich, and energizing.",
  "cta": "Order today and start smiling with your first sip!"
}`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
      }),
    });

    if (!lovableResponse.ok) {
      throw new Error('Failed to generate script');
    }

    const aiData = await lovableResponse.json();
    const scriptContent = aiData.choices[0].message.content;
    
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
    if (!jsonStr) {
      throw new Error('AI did not return valid JSON');
    }

    // Parse the JSON response
    const script = JSON.parse(jsonStr);

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
