import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Sparkles, LogOut, Plus, Trash2 } from "lucide-react";
import type { User, Session } from "@supabase/supabase-js";

interface Profile {
  credits_remaining: number;
  total_credits: number;
  name: string;
  plan: string;
}

interface Script {
  id: string;
  prompt: string;
  hook: string;
  body: string;
  cta: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

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
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchScripts();
    } else if (!loading) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      toast.error("Failed to load profile");
    } else {
      setProfile(data);
    }
    setLoading(false);
  };

  const fetchScripts = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("scripts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load scripts");
    } else {
      setScripts(data || []);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleDeleteScript = async (scriptId: string) => {
    const { error } = await supabase
      .from("scripts")
      .delete()
      .eq("id", scriptId);

    if (error) {
      toast.error("Failed to delete script");
    } else {
      toast.success("Script deleted");
      fetchScripts();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-8 w-8 animate-pulse text-primary mx-auto mb-2" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const creditsPercentage = profile ? (profile.credits_remaining / profile.total_credits) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">ScriptFlow AI</h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>{profile?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate("/generator")}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Script
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credits Remaining</CardTitle>
              <CardDescription>
                {profile?.credits_remaining} of {profile?.total_credits} credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={creditsPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Plan: <span className="font-medium capitalize">{profile?.plan}</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Scripts</CardTitle>
              <CardDescription>Scripts you've created</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{scripts.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Scripts</CardTitle>
            <CardDescription>Your generated scripts</CardDescription>
          </CardHeader>
          <CardContent>
            {scripts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No scripts yet</p>
                <Button onClick={() => navigate("/generator")}>
                  Create Your First Script
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {scripts.map((script) => (
                  <div key={script.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium line-clamp-1">{script.prompt}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteScript(script.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Hook:</span> {script.hook}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Body:</span> {script.body}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">CTA:</span> {script.cta}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(script.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
