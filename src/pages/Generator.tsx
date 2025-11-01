import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, ArrowLeft, Copy, Save } from "lucide-react";
import type { User, Session } from "@supabase/supabase-js";

const Generator = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [script, setScript] = useState<{
    hook: string;
    body: string;
    cta: string;
  } | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const generateScript = async () => {
    const trimmedPrompt = prompt.trim();
    
    // Client-side validation
    if (!trimmedPrompt) {
      toast.error("Please enter a prompt");
      return;
    }
    
    if (trimmedPrompt.length < 10) {
      toast.error("Prompt must be at least 10 characters");
      return;
    }
    
    if (trimmedPrompt.length > 500) {
      toast.error("Prompt must be less than 500 characters");
      return;
    }

    setGenerating(true);
    
    try {
      const response = await supabase.functions.invoke("generate-script", {
        body: { prompt: trimmedPrompt }
      });

      if (response.error) throw response.error;

      setScript(response.data);
      toast.success("Script generated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to generate script");
    } finally {
      setGenerating(false);
    }
  };

  const saveScript = async () => {
    if (!script || !user) return;

    setSaving(true);
    const { error } = await supabase.from("scripts").insert({
      user_id: user.id,
      prompt,
      hook: script.hook,
      body: script.body,
      cta: script.cta,
    });

    if (error) {
      toast.error("Failed to save script");
    } else {
      toast.success("Script saved!");
      navigate("/dashboard");
    }
    setSaving(false);
  };

  const copyToClipboard = () => {
    if (!script) return;
    const text = `🎬 Hook: ${script.hook}\n\n📝 Body: ${script.body}\n\n✨ CTA: ${script.cta}`;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Script Generator</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What do you want to create?</CardTitle>
            <CardDescription>
              Describe your video idea and we'll generate a complete script with hook, body, and CTA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="E.g., I want to promote my new coffee brand with a fun TikTok script..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {prompt.length}/500 characters
            </p>
            <Button
              onClick={generateScript}
              disabled={generating || !prompt.trim()}
              className="w-full"
            >
              {generating ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Script
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {script && (
          <Card>
            <CardHeader>
              <CardTitle>Your Script</CardTitle>
              <CardDescription>Generated script ready to use</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  🎬 Hook
                </h3>
                <p className="bg-muted p-4 rounded-lg">{script.hook}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  📝 Body
                </h3>
                <p className="bg-muted p-4 rounded-lg">{script.body}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  ✨ Call to Action
                </h3>
                <p className="bg-muted p-4 rounded-lg">{script.cta}</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={saveScript} disabled={saving} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Generator;
