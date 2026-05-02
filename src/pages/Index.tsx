import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, MessageSquare, TrendingUp, ArrowRight, Check, Coffee, Dumbbell, ShoppingBag, Target, Users, Rocket } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      number: "01",
      title: "Amplify Your Reach",
      description: "AI-Powered Engagement",
      color: "from-orange-500 to-orange-600",
      icon: Zap,
      delay: "0ms"
    },
    {
      number: "02",
      title: "Connect, Manage, and Analyze",
      description: "Content Scheduling",
      color: "from-pink-500 to-pink-600",
      icon: MessageSquare,
      delay: "100ms"
    },
    {
      number: "03",
      title: "Centralize Communication",
      description: "Analytics Dashboard",
      color: "from-purple-600 to-purple-700",
      icon: TrendingUp,
      delay: "200ms"
    }
  ];

  const benefits = [
    "Generate viral scripts in seconds",
    "Professional hooks that grab attention",
    "Conversion-focused CTAs",
    "Save hours of writing time",
    "Unlimited creativity with AI",
    "Perfect for all platforms"
  ];

  const examples = [
    {
      icon: Coffee,
      niche: "Coffee Brand",
      platform: "TikTok",
      color: "from-amber-500 to-orange-600",
      hook: "POV: You just had the best cold brew of your life ☕",
      body: "Most coffee brands cut corners. We don't. Single-origin beans, slow-steeped for 18 hours, zero bitterness — just smooth, bold flavor that hits different.",
      cta: "Tap the link and grab your first bag for 20% off. Your mornings will thank you.",
    },
    {
      icon: Dumbbell,
      niche: "Fitness Coach",
      platform: "Reels",
      color: "from-rose-500 to-red-600",
      hook: "Stop doing crunches. They're wrecking your back.",
      body: "Here are 3 core moves that actually build a strong midsection — no equipment, 5 minutes a day, and you'll feel the difference in two weeks.",
      cta: "Save this and follow for the full 30-day plan dropping Monday.",
    },
    {
      icon: ShoppingBag,
      niche: "E-commerce Drop",
      platform: "YouTube Shorts",
      color: "from-violet-500 to-purple-600",
      hook: "I spent $400 testing every viral skincare product so you don't have to.",
      body: "Out of 12 brands, only 3 actually delivered. One cleared my skin in a week, one was a total scam, and one is now in my permanent rotation.",
      cta: "Full breakdown with discount codes is linked below — don't sleep on #2.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ScriptFlow</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About us
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/auth")} className="hidden sm:flex">
                Sign In
              </Button>
              <Button onClick={() => navigate("/auth")} className="font-medium">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
              <span className="font-medium">10 Free Scripts • Resets Every 30 Min • No Credit Card</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight lg:text-7xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              Create Viral Scripts
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                in Seconds
              </span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground lg:text-xl animate-fade-in" style={{ animationDelay: "200ms" }}>
              AI-powered script generation for TikTok, YouTube Shorts, and Reels.
              <br />
              From hook to CTA, we've got you covered.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Button size="lg" onClick={() => navigate("/auth")} className="group text-base">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                View Demo
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>10 free scripts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-5xl">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Create Amazing Scripts
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful AI features designed for content creators
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 p-8 transition-all hover:shadow-lg hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${feature.color} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`} />
                  <div className="relative">
                    <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className={`mb-2 text-6xl font-bold bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                      {feature.number}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold lg:text-5xl">
                Why Choose
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ScriptFlow AI?
                </span>
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Stop wasting time staring at a blank page. Let AI do the heavy lifting while you focus on creating amazing content.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" onClick={() => navigate("/auth")} className="mt-8">
                Start Creating Now
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
              <Card className="relative p-8 shadow-2xl animate-float">
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 text-sm font-medium text-muted-foreground">Hook</div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="font-medium">"Tired of spending hours writing scripts?"</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium text-muted-foreground">Body</div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-sm">ScriptFlow AI generates complete video scripts in seconds. Just enter your idea and get professional hooks, compelling stories, and powerful CTAs.</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium text-muted-foreground">CTA</div>
                    <div className="rounded-lg bg-gradient-to-r from-primary to-secondary p-4">
                      <p className="font-medium text-primary-foreground">"Try it free today and create your first viral script!"</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-5xl">
              Real Scripts,
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Real Results
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              See what ScriptFlow generates across different niches and platforms
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {examples.map((example, index) => {
              const Icon = example.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 p-6 transition-all hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${example.color} text-white shadow-md`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{example.niche}</div>
                      <div className="text-xs text-muted-foreground">{example.platform}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">🎬 Hook</div>
                      <div className="rounded-lg bg-muted p-3 text-sm font-medium">{example.hook}</div>
                    </div>
                    <div>
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">📝 Body</div>
                      <div className="rounded-lg bg-muted p-3 text-sm">{example.body}</div>
                    </div>
                    <div>
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">✨ CTA</div>
                      <div className={`rounded-lg bg-gradient-to-r ${example.color} p-3 text-sm font-medium text-white`}>
                        {example.cta}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" onClick={() => navigate("/auth")} className="group">
              Generate Your Own Script
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">About ScriptFlow</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold lg:text-5xl">
              Built for Creators,
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              ScriptFlow was born from a simple frustration: great content shouldn't take hours to write. We built an AI tool that helps creators, marketers, and brands turn raw ideas into scroll-stopping scripts — in seconds, not days.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 p-8 text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Our Mission</h3>
              <p className="text-sm text-muted-foreground">
                Make professional script writing accessible to every creator, regardless of budget or experience level.
              </p>
            </Card>

            <Card className="border-2 p-8 text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-white shadow-lg">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Who We Serve</h3>
              <p className="text-sm text-muted-foreground">
                TikTokers, YouTubers, Reels creators, marketers, and brands who want to publish more without burning out.
              </p>
            </Card>

            <Card className="border-2 p-8 text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-primary text-white shadow-lg">
                <Rocket className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">What's Next</h3>
              <p className="text-sm text-muted-foreground">
                Voice-cloning, multi-language scripts, and a creator marketplace — all coming to ScriptFlow soon.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent p-12 lg:p-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-4xl font-bold text-white lg:text-6xl">
                Ready to Create Viral Content?
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Join thousands of creators using AI to write better scripts faster.
                <br />
                Start with 10 free scripts that reset every 30 minutes.
              </p>
              <Button size="lg" variant="secondary" onClick={() => navigate("/auth")} className="text-base shadow-xl">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Your Free Trial
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">ScriptFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered script generation for content creators.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Examples</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 ScriptFlow AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
