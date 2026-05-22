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
import { PROJECTS, EXPERIENCES } from '../data';

interface MobilePortfolioProps {
  onNavigate: (screen: Screen, direction: TransitionDirection) => void;
}

export default function MobilePortfolio({ onNavigate }: MobilePortfolioProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpOpen, setMobileExpOpen] = useState(false);
  const [mobilePortOpen, setMobilePortOpen] = useState(false);

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
            {PROJECTS.slice(0, 3).map((project) => (
              <div key={project.id} className="glass-card rounded-xl overflow-hidden group">
                <div className="h-44 w-full relative overflow-hidden">
                  <img 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                    src={project.imageUrl || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"}
                  />
                  <div className="absolute inset-0 bg-brand-accent/5 mix-blend-overlay"></div>
                </div>
                
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center" onClick={() => setMobilePortOpen(true)}>
                    <h3 className="font-heading font-semibold text-base text-text-primary hover:text-brand-accent cursor-pointer transition-colors">
                      {project.title}
                    </h3>
                    <button className="text-brand-accent hover:text-brand-accent/80 cursor-pointer" onClick={() => setMobilePortOpen(true)}>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-outline-variant/50 rounded text-brand-accent bg-[#0f131f]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setMobilePortOpen(true)}
              className="w-full px-5 py-3 border border-brand-accent/20 bg-brand-accent/5 font-semibold hover:bg-brand-accent/10 active:scale-95 transition-all text-xs font-mono text-brand-accent rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,219,231,0.05)]"
            >
              <span>전체 프로젝트 보기 (View All Projects)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Experience Section */}
        <section id="experience" className="space-y-6">
          <h2 className="font-heading font-bold text-xl text-text-primary">Mission History</h2>
          
          <div className="space-y-8 border-l border-brand-accent/20 ml-1.5 pl-4 relative">
            {EXPERIENCES.slice(0, 3).map((exp) => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_10px_#00dbe7]"></div>
                <span className="font-mono text-[10px] text-brand-accent font-medium uppercase">{exp.period || exp.year}</span>
                <h3 className="font-heading font-semibold text-sm text-text-primary mt-0.5">{exp.role}</h3>
                <p className="font-sans text-xs text-text-secondary">{exp.organization}</p>
                
                {exp.details && exp.details.length > 0 && (
                  <ul className="mt-2.5 space-y-1.5 text-[#b9cacb] font-sans text-[11px] list-none">
                    {exp.details.slice(0, 1).map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-brand-accent mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setMobileExpOpen(true)}
              className="w-full px-5 py-3 border border-brand-accent/20 bg-brand-accent/5 font-semibold hover:bg-brand-accent/10 active:scale-95 transition-all text-xs font-mono text-brand-accent rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,219,231,0.05)]"
            >
              <span>전체 경험 보기 (View All Experiences)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
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

      {/* Experience Modal */}
      {mobileExpOpen && (
        <div id="experience-modal-overlay" className="fixed inset-x-0 bottom-0 top-0 z-50 flex items-end justify-center bg-[#0a0e1a]/95 backdrop-blur-md animate-fade-in pr-0">
          <div className="relative w-full max-w-[480px] h-[85vh] bg-[#0c101b] border-t border-brand-accent/30 rounded-t-2xl flex flex-col shadow-[0_-10px_35px_rgba(0,219,231,0.2)] text-[#dfe2f3]">
            {/* Header */}
            <div className="p-5 border-b border-brand-accent/20 flex justify-between items-center bg-[#0f131f]/95">
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#dfe2f3] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></span>
                  <span>전체 경험 이력</span>
                </h3>
                <p className="text-[10px] text-text-secondary/60 font-mono mt-0.5">Full Experience Logs</p>
              </div>
              <button 
                id="close-experience-modal"
                onClick={() => setMobileExpOpen(false)}
                className="p-1 px-2.5 text-xs font-mono text-brand-accent border border-brand-accent/20 hover:bg-brand-accent/10 rounded cursor-pointer transition-colors"
              >
                닫기
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div className="space-y-6 border-l border-brand-accent/10 ml-1.5 pl-4 relative">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_#00dbe7]"></div>
                    <span className="font-mono text-[9px] text-brand-accent font-medium uppercase">{exp.period || exp.year}</span>
                    <h3 className="font-heading font-semibold text-sm text-[#dfe2f3] mt-0.5">{exp.role}</h3>
                    <p className="font-sans text-[11px] text-brand-accent font-medium pl-0.5">{exp.organization}</p>
                    
                    {exp.details && exp.details.length > 0 && (
                      <ul className="mt-2 space-y-1.5 pl-2 border-l border-white/5 ml-0.5 list-none">
                        {exp.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5 text-[11px] text-[#b9cacb] font-sans">
                            <ChevronRight className="w-3 h-3 text-brand-accent/40 mt-1 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer shadow button */}
            <div className="p-4 bg-[#0a0e1a]/80 border-t border-outline-variant/10 flex">
              <button 
                onClick={() => setMobileExpOpen(false)}
                className="w-full py-2.5 rounded bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-mono text-xs cursor-pointer text-center"
              >
                닫기 (Close Log)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Modal */}
      {mobilePortOpen && (
        <div id="portfolio-modal-overlay" className="fixed inset-x-0 bottom-0 top-0 z-50 flex items-end justify-center bg-[#0a0e1a]/95 backdrop-blur-md animate-fade-in pr-0">
          <div className="relative w-full max-w-[480px] h-[85vh] bg-[#0c101b] border-t border-brand-accent/30 rounded-t-2xl flex flex-col shadow-[0_-10px_35px_rgba(0,219,231,0.25)] text-[#dfe2f3]">
            {/* Header */}
            <div className="p-5 border-b border-brand-accent/20 flex justify-between items-center bg-[#0f131f]/95">
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#dfe2f3] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></span>
                  <span>전체 프로젝트</span>
                </h3>
                <p className="text-[10px] text-text-secondary/60 font-mono mt-0.5">Explore All Projects</p>
              </div>
              <button 
                id="close-portfolio-modal"
                onClick={() => setMobilePortOpen(false)}
                className="p-1 px-2.5 text-xs font-mono text-brand-accent border border-brand-accent/20 hover:bg-brand-accent/10 rounded cursor-pointer transition-colors"
              >
                닫기
              </button>
            </div>

            {/* Content card grid */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {PROJECTS.map((project) => (
                <div key={project.id} className="glass-card rounded-xl overflow-hidden bg-[#0d111d]/40 border border-brand-accent/10">
                  <div className="h-36 w-full relative overflow-hidden bg-black/40">
                    <img 
                      alt={project.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      src={project.imageUrl || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"}
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-heading font-bold text-sm text-[#dfe2f3]">{project.title}</h4>
                    <p className="font-sans text-xs text-text-secondary leading-normal">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-brand-accent/5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[8px] px-1.5 py-0.5 border border-brand-accent/10 bg-[#0f131f] rounded text-brand-accent/90">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer control */}
            <div className="p-4 bg-[#0a0e1a]/80 border-t border-outline-variant/10 flex">
              <button 
                onClick={() => setMobilePortOpen(false)}
                className="w-full py-2.5 rounded bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-mono text-xs cursor-pointer text-center"
              >
                닫기 (Close Gallery)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
