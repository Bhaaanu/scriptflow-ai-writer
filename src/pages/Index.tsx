import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import backgroundAsset from "@/assets/marketeam/background.webp.asset.json";
import avatar1 from "@/assets/marketeam/avatar-1.png.asset.json";
import avatar2 from "@/assets/marketeam/avatar-2.png.asset.json";
import avatar3 from "@/assets/marketeam/avatar-3.png.asset.json";
import avatar4 from "@/assets/marketeam/avatar-4.png.asset.json";
import avatar5 from "@/assets/marketeam/avatar-5.png.asset.json";
import avatar6 from "@/assets/marketeam/avatar-6.png.asset.json";
import avatar7 from "@/assets/marketeam/avatar-7.png.asset.json";
import avatar8 from "@/assets/marketeam/avatar-8.png.asset.json";
import avatar9 from "@/assets/marketeam/avatar-9.png.asset.json";
import partner1 from "@/assets/marketeam/partner-1.svg.asset.json";
import partner2 from "@/assets/marketeam/partner-2.svg.asset.json";
import partner3 from "@/assets/marketeam/partner-3.svg.asset.json";
import partner4 from "@/assets/marketeam/partner-4.svg.asset.json";
import partner5 from "@/assets/marketeam/partner-5.svg.asset.json";

const headline = "Turn one idea into a script people can't scroll past.";

function useTypewriter(text: string, delay = 400, speed = 35) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const start = window.setTimeout(() => {
      const interval = window.setInterval(() => {
        setVisible((current) => {
          if (current >= text.length) {
            window.clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, speed);
    }, delay);

    return () => window.clearTimeout(start);
  }, [delay, speed, text]);

  return { typed: text.slice(0, visible), done: visible >= text.length };
}

function useCountUp(target: number, delay = 1200, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    let startTime = 0;
    const timer = window.setTimeout(() => {
      const tick = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(target * eased));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
    };
  }, [delay, duration, target]);

  return count;
}

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];
const partners = [partner1, partner2, partner3, partner4, partner5];

const Index = () => {
  const navigate = useNavigate();
  const { typed, done } = useTypewriter(headline);
  const count = useCountUp(10);

  return (
    <main className="sf-landing" style={{ backgroundImage: `url(${backgroundAsset.url})` }}>
      <header className="sf-header">
        <a href="#top" className="sf-brand" aria-label="ScriptFlow home">
          <span className="sf-brand-mark"><Sparkles aria-hidden="true" /></span>
          <span>ScriptFlow</span>
        </a>

        <nav className="sf-nav" aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#examples">Examples</a>
          <a href="#credits">Credits</a>
          <a href="#about">About</a>
        </nav>

        <div className="sf-header-actions">
          <Button variant="ghost" className="sf-login" onClick={() => navigate("/auth")}>Log in</Button>
          <span className="sf-border-wrap sf-join-wrap">
            <Button className="sf-pill sf-join" onClick={() => navigate("/auth")}>Start free</Button>
          </span>
          <Button variant="ghost" size="icon" className="sf-menu" aria-label="Open navigation">
            <Menu />
          </Button>
        </div>
      </header>

      <section id="top" className="sf-hero" aria-labelledby="hero-title">
        <div className="sf-copy">
          <p className="sf-kicker"><span /> AI script generator for short-form video</p>
          <h1 id="hero-title" aria-label={headline}>
            <span className="sf-heading-dark">{typed.slice(0, 29)}</span>
            <span className="sf-heading-light">{typed.slice(29)}</span>
            {!done && <span className="sf-caret" aria-hidden="true" />}
          </h1>
          <p className="sf-subcopy">
            Shape a scroll-stopping Hook, Story, and CTA for TikTok, Reels, or Shorts—without staring at a blank page.
          </p>
          <div className={`sf-cta-row ${done ? "sf-is-visible" : ""}`}>
            <span className="sf-border-wrap sf-start-wrap">
              <Button className="sf-pill sf-start" onClick={() => navigate("/auth")}>
                Create a script <ArrowRight />
              </Button>
            </span>
            <span className="sf-credit-note"><strong>10 free scripts</strong> Reset every 30 minutes</span>
          </div>
          <div className="sf-cursor-note" aria-hidden="true">
            <svg viewBox="0 0 30 36"><path d="M2 2 27 19l-12 2-6 12L2 2Z" /></svg>
            <span>Your next viral idea</span>
          </div>
        </div>

        <div className="sf-visual" aria-label="Creators using ScriptFlow">
          <div className="sf-orbit-stage">
            <div className="sf-orbit sf-orbit-4" />
            <div className="sf-orbit sf-orbit-3" />
            <div className="sf-orbit sf-orbit-2" />
            <div className="sf-orbit sf-orbit-1">
              <div className="sf-center-stat">
                <strong>{count}</strong>
                <span>Free scripts</span>
                <small>every 30 min</small>
              </div>
            </div>
            {avatars.map((avatar, index) => (
              <div className={`sf-avatar sf-avatar-${index + 1}`} key={avatar.asset_id}>
                <img src={avatar.url} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sf-ticker" aria-label="Built for creators on leading platforms">
        <p>Write for</p>
        <div className="sf-ticker-window">
          <div className="sf-ticker-track">
            {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
              <img src={partner.url} alt="" key={`${partner.asset_id}-${index}`} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;