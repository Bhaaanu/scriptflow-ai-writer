import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, Target, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ScriptFlow AI</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/auth")}>Get Started</Button>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Script Generation</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Create Viral Scripts in Seconds
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate complete video scripts with hooks, storylines, and CTAs using AI. 
              Perfect for TikTok, YouTube Shorts, and Reels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/auth")} className="text-lg">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Creating Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                View Examples
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              5 free scripts • No credit card required
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Generate complete scripts in seconds, not hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your idea and creates engaging hooks, compelling stories, 
                  and powerful CTAs instantly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-secondary mb-2" />
                <CardTitle>Conversion Focused</CardTitle>
                <CardDescription>
                  Scripts designed to drive engagement and action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every script is optimized for viewer retention and conversions, 
                  following proven content frameworks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-accent mb-2" />
                <CardTitle>Built for Growth</CardTitle>
                <CardDescription>
                  Scale your content creation effortlessly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create unlimited variations, test different angles, and find what 
                  resonates with your audience.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of creators using AI to write better scripts faster
            </p>
            <Button size="lg" onClick={() => navigate("/auth")}>
              <Sparkles className="h-5 w-5 mr-2" />
              Get Started Free
            </Button>
          </div>
        </section>
      </div>

      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 ScriptFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
