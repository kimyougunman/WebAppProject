import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Cpu, 
  Brain, 
  Wrench, 
  Terminal, 
  ExternalLink, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Screen, TransitionDirection } from '../types';

interface MobilePortfolioProps {
  onNavigate: (screen: Screen, direction: TransitionDirection) => void;
}

export default function MobilePortfolio({ onNavigate }: MobilePortfolioProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigateToDesktop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    onNavigate('desktop', 'push');
  };

  return (
    <div id="mobile-portfolio-container" className="relative min-h-[100dvh] w-full max-w-[480px] mx-auto bg-surface-bg border-x border-outline/10 shadow-[0_0_60px_rgba(0,219,231,0.05)] text-text-primary flex flex-col font-sans mb-12">
      {/* Phone Header Indicator Design (Aesthetic top bar for modern look) */}
      <div className="h-6 w-full px-5 pt-2 flex justify-between items-center text-[10px] font-mono text-text-secondary/50 bg-[#060a12]/80 backdrop-blur-md select-none">
        <span>0x2026_MOBILE</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
          <span>NET_LIVE</span>
        </div>
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 bg-[#0f131f]/80 backdrop-blur-lg border-b border-outline-variant/30 shadow-[0_0_20px_rgba(0,219,231,0.1)] px-5 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-heading font-extrabold text-lg text-text-primary tracking-tighter">
            My Robot Portfolio
          </span>
        </div>
        
        {/* Hamburger Menu Trigger */}
        <button 
          id="menu-toggle"
          onClick={() => setMenuOpen(true)}
          className="p-1.5 text-brand-accent hover:bg-white/5 transition-all duration-300 rounded-lg"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Fullscreen Overlay Menu */}
      {menuOpen && (
        <div 
          id="mobile-overlay" 
          className="fixed inset-0 bg-[#0a0e1a] z-50 flex flex-col items-center justify-center space-y-8 p-6"
        >
          <button 
            id="menu-close"
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-brand-accent hover:bg-white/5 rounded-full transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-8 h-8" />
          </button>

          <a 
            className="text-text-primary font-heading text-xl hover:text-brand-accent transition-colors" 
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>
          <a 
            className="text-text-primary font-heading text-xl hover:text-brand-accent transition-colors" 
            href="#experience"
            onClick={() => setMenuOpen(false)}
          >
            Experience
          </a>
          <a 
            className="text-text-primary font-heading text-xl hover:text-brand-accent transition-colors" 
            href="#skills"
            onClick={() => setMenuOpen(false)}
          >
            Skills
          </a>
          <a 
            className="text-text-primary font-heading text-xl hover:text-brand-accent transition-colors" 
            href="#awards"
            onClick={() => setMenuOpen(false)}
          >
            Awards
          </a>
          <a 
            className="text-text-primary font-heading text-xl hover:text-brand-accent transition-colors" 
            href="#portfolio"
            onClick={(e) => handleNavigateToDesktop(e)}
          >
            Portfolio
          </a>

          <div className="pt-10 flex flex-col items-center space-y-2">
            <Sparkles className="w-10 h-10 text-brand-accent animate-pulse" />
            <span className="text-[10px] font-mono text-brand-accent/50">SYSTEM VERSION: 2026.1</span>
          </div>
        </div>
      )}

      {/* Main Content Scrollable Area */}
      <main className="flex-1 px-5 py-8 space-y-16">
        
        {/* Dynamic Grid Overlay (Vibe enhancement as requested) */}
        <div className="absolute inset-x-0 h-[600px] grid-bg pointer-events-none -z-10 opacity-30"></div>

        {/* Hero / About Section */}
        <section id="about" className="space-y-6 pt-2">
          <div className="inline-block px-3 py-1 rounded-full border border-brand-accent/20 bg-brand-accent/10">
            <span className="font-mono text-[10px] font-semibold text-brand-accent uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
              Autonomous Systems Architect
            </span>
          </div>

          <h1 className="font-heading font-bold text-[28px] leading-[1.2] text-text-primary">
            Engineering the <span className="text-brand-accent">Future of Robotics</span> Through Neural Interfaces.
          </h1>

          <p className="font-sans text-sm text-text-secondary leading-relaxed">
            Specializing in multi-agent swarm intelligence and humanoid kinematic optimization for next-generation industrial applications.
          </p>

          <div className="pt-2">
            <button 
              onClick={() => handleNavigateToDesktop()}
              className="bg-brand-accent text-[#002022] w-full px-6 py-3 font-semibold rounded-lg glow-blue hover:opacity-90 active:scale-95 transition-all text-sm cursor-pointer"
            >
              View Systems
            </button>
          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Portfolio Cards Section */}
        <section id="portfolio" className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-xl text-text-primary">Active Deployments</h2>
            <p className="font-mono text-[10px] text-brand-accent/70 uppercase tracking-widest">
              Selected Robotics Projects
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Project 1 */}
            <div className="glass-card rounded-xl overflow-hidden group">
              <div className="h-44 w-full relative overflow-hidden">
                <img 
                  alt="Neural-Link Arm v4" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmuypp65hBEq8IRER746O_6rN_aOshJVGugLu-hwTD3zbM2d6Kk7IUUecx9hQMwdiDbTgx_WuEYyMBr9zXaWxxtSmaorYz0n4Crj0myprWyiov9OC08ZIKVTCMK7hbFsJc-XMeGujcC_AIRCB5mcJQSekqvbjRfgGlV0bsISn6yuYmpigSKKWXhhPWWEkG0IqEnSNVksuDXXnoFIoupwCHbocW7xGJCMv_4fiZOZSEY9UTCRvF4oAGvBOVuNzLTUCdeMb61UJe6zs"
                />
                <div className="absolute inset-0 bg-brand-accent/5 mix-blend-overlay"></div>
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center" onClick={() => handleNavigateToDesktop()}>
                  <h3 className="font-heading font-semibold text-base text-text-primary hover:text-brand-accent cursor-pointer transition-colors">
                    Neural-Link Arm v4
                  </h3>
                  <button className="text-brand-accent hover:text-brand-accent/80 cursor-pointer">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  A high-precision prosthetic with 22 degrees of freedom and sub-millisecond latency neural response.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['ROS2', 'TENSORFLOW', 'C++'].map((tag) => (
                    <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-outline-variant/50 rounded text-brand-accent bg-[#0f131f]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="glass-card rounded-xl overflow-hidden group">
              <div className="h-44 w-full relative overflow-hidden">
                <img 
                  alt="Apex Scout Drone" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2UviDewN7nRa8F4Sc2mVDIZmuyvYUNwEvUd8SgST23ZV_CqaSqbtFFT_Z78CvK9OSYnB3PESOkC2tRebTJGphTp2Wn9GFBT9T6tW48bizVcQiENE1mhxJ3TFMvtpx6ECde9QHFSWXHciy0kHFTrrOIw6BipUqOiEAASuZ8Dnm4rFtJhV0-LWfsvZ54BApeZn6Y3rgn5YgDuMY_vqSD7GGCAi4FjIeqTuEONtKWKyCWVZFRYO_sMQF8vv75_BJ-e_tQs8DRUY-Bo8"
                />
                <div className="absolute inset-0 bg-brand-accent/5 mix-blend-overlay"></div>
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center" onClick={() => handleNavigateToDesktop()}>
                  <h3 className="font-heading font-semibold text-base text-text-primary hover:text-brand-accent cursor-pointer transition-colors">
                    Apex Scout Drone
                  </h3>
                  <button className="text-brand-accent hover:text-brand-accent/80 cursor-pointer">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  Autonomous mapping unit utilizing solid-state LIDAR for real-time 3D reconstruction of complex environments.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['LIDAR', 'PYTHON', 'SLAM'].map((tag) => (
                    <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-outline-variant/50 rounded text-brand-accent bg-[#0f131f]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Experience Section */}
        <section id="experience" className="space-y-6">
          <h2 className="font-heading font-bold text-xl text-text-primary">Mission History</h2>
          
          <div className="space-y-8 border-l border-brand-accent/20 ml-1.5 pl-4 relative">
            
            {/* Log 1 */}
            <div className="relative">
              <div className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_10px_#00dbe7]"></div>
              <span className="font-mono text-[10px] text-brand-accent font-medium">2022 — PRESENT</span>
              <h3 className="font-heading font-semibold text-sm text-text-primary mt-0.5">Lead Robotics Engineer</h3>
              <p className="font-sans text-xs text-text-secondary">Cyberdyne Systems</p>
              
              <ul className="mt-2.5 space-y-1.5 text-text-secondary/90 font-sans text-xs">
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-accent mt-0.5 flex-shrink-0" />
                  <span>Architecture of multi-robot coordination frameworks.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-accent mt-0.5 flex-shrink-0" />
                  <span>Optimized kinematic solvers for 15% faster motion planning.</span>
                </li>
              </ul>
            </div>

            {/* Log 2 */}
            <div className="relative">
              <div className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1b1f2c] border border-brand-accent/40"></div>
              <span className="font-mono text-[10px] text-brand-accent font-medium">2019 — 2022</span>
              <h3 className="font-heading font-semibold text-sm text-text-primary mt-0.5">AI Research Associate</h3>
              <p className="font-sans text-xs text-text-secondary">Neural Tech Corp</p>
            </div>

          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Skills Section */}
        <section id="skills" className="space-y-6">
          <h2 className="font-heading font-bold text-xl text-text-primary">Core Competencies</h2>
          
          <div className="grid grid-cols-2 gap-3.5">
            <div className="glass-card p-4 rounded-xl space-y-2 flex flex-col justify-between aspect-square">
              <Cpu className="w-6 h-6 text-brand-accent" />
              <h4 className="font-mono text-xs text-text-primary tracking-wide leading-tight">
                Embedded Systems
              </h4>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2 flex flex-col justify-between aspect-square">
              <Brain className="w-6 h-6 text-brand-accent" />
              <h4 className="font-mono text-xs text-text-primary tracking-wide leading-tight">
                Neural Networks
              </h4>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2 flex flex-col justify-between aspect-square">
              <Wrench className="w-6 h-6 text-brand-accent" />
              <h4 className="font-mono text-xs text-text-primary tracking-wide leading-tight">
                CAD / Kinematics
              </h4>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2 flex flex-col justify-between aspect-square">
              <Terminal className="w-6 h-6 text-brand-accent" />
              <h4 className="font-mono text-xs text-text-primary tracking-wide leading-tight">
                C++ / Python
              </h4>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#060a12] border-t border-outline-variant/20 py-10 px-5 text-center mt-auto">
        <div className="flex flex-col items-center gap-5">
          <span className="font-heading text-base font-bold text-text-primary tracking-tighter">My Robot Portfolio</span>
          
          <div className="flex gap-5 text-[11px] font-mono text-text-secondary">
            <a href="#" className="hover:text-brand-accent transition-colors">GitHub</a>
            <a 
              href="#" 
              onClick={(e) => handleNavigateToDesktop(e)} 
              className="hover:text-brand-accent transition-colors"
            >
              Portfolio
            </a>
            <a href="#" className="hover:text-brand-accent transition-colors">Contact</a>
          </div>
          
          <p className="text-[9px] font-mono text-text-secondary/40 uppercase tracking-widest mt-2">
            © 2024 Robot Specialist. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
