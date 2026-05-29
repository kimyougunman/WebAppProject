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
  Sparkles,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Mail,
  Github,
  Award,
  BookOpen
} from 'lucide-react';
import { Screen, TransitionDirection, PortfolioData, Project, ExperienceLog, AwardItem } from '../types';

interface MobilePortfolioProps {
  onNavigate: (screen: Screen, direction: TransitionDirection) => void;
  data: PortfolioData;
  isEditMode: boolean;
  tempData: PortfolioData;
  onChangeField: (field: keyof PortfolioData, value: any) => void;
  onAddProject: () => void;
  onDeleteProject: (id: string) => void;
  onUpdateProject: (id: string, updated: Partial<Project>) => void;
  onSortProject: (index: number, moveDirection: 'up' | 'down') => void;
  onAddExperience: () => void;
  onDeleteExperience: (id: string) => void;
  onUpdateExperience: (id: string, updated: Partial<ExperienceLog>) => void;
  onSortExperience: (index: number, moveDirection: 'up' | 'down') => void;
  onAddAward: () => void;
  onDeleteAward: (id: string) => void;
  onUpdateAward: (id: string, updated: Partial<AwardItem>) => void;
  onAddSkill: (skillText: string) => void;
  onDeleteSkill: (index: number) => void;
  onUpdateSkill: (index: number, value: string) => void;
}

export default function MobilePortfolio({
  onNavigate,
  data,
  isEditMode,
  tempData,
  onChangeField,
  onAddProject,
  onDeleteProject,
  onUpdateProject,
  onSortProject,
  onAddExperience,
  onDeleteExperience,
  onUpdateExperience,
  onSortExperience,
  onAddAward,
  onDeleteAward,
  onUpdateAward,
  onAddSkill,
  onDeleteSkill,
  onUpdateSkill
}: MobilePortfolioProps) {
  const current = isEditMode ? tempData : data;

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpOpen, setMobileExpOpen] = useState(false);
  const [mobilePortOpen, setMobilePortOpen] = useState(false);
  const [newSkillText, setNewSkillText] = useState('');

  const handleNavigateToDesktop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    onNavigate('desktop', 'push');
  };

  const handleImageFileChange = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProject(projectId, { imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillText.trim()) {
      onAddSkill(newSkillText.trim());
      setNewSkillText('');
    }
  };

  return (
    <div id="mobile-portfolio-container" className="relative min-h-[100dvh] w-full max-w-[480px] mx-auto bg-surface-bg border-x border-[#313b48]/15 shadow-[0_0_60px_rgba(0,147,160,0.06)] text-text-primary flex flex-col font-sans mb-12">
      {/* Phone Header Indicator Design (Aesthetic top bar for modern look) */}
      <div className="h-6 w-full px-5 pt-2 flex justify-between items-center text-[10px] font-mono text-text-secondary/50 bg-[#060a12]/80 backdrop-blur-md select-none">
        <span>0x2026_MOBILE_STABLE</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
          <span>ONLINE_ENGINE</span>
        </div>
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 bg-[#0f131f]/80 backdrop-blur-lg border-b border-outline-variant/30 shadow-[0_0_20px_rgba(0,219,231,0.1)] px-5 py-3.5 flex justify-between items-center">
        {/* LOGO PARENT WRAPPER (Xpath target to trigger Portfolio navigation to Desktop) */}
        <div 
          onClick={() => onNavigate('desktop', 'push')}
          className="flex items-center gap-2 cursor-pointer active:scale-95 transition-all select-none"
          title="Go to Desktop View"
        >
          <span className="font-heading font-extrabold text-sm text-text-primary tracking-tighter hover:text-brand-accent">
            My Robot Portfolio
          </span>
        </div>
        
        {/* Hamburger Menu Trigger */}
        <button 
          id="menu-toggle"
          onClick={() => setMenuOpen(true)}
          className="p-1.5 text-brand-accent hover:bg-white/5 transition-all duration-300 rounded-lg cursor-pointer"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Fullscreen Overlay Menu */}
      {menuOpen && (
        <div 
          id="mobile-overlay" 
          className="fixed inset-0 bg-[#0a0e1a]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-7 p-6"
        >
          <button 
            id="menu-close"
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-brand-accent hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            aria-label="Close Menu"
          >
            <X className="w-7 h-7" />
          </button>

          <a 
            className="text-text-primary font-heading text-lg hover:text-brand-accent transition-colors" 
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>
          <a 
            className="text-text-primary font-heading text-lg hover:text-brand-accent transition-colors" 
            href="#experience"
            onClick={() => setMenuOpen(false)}
          >
            Experience
          </a>
          <a 
            className="text-text-primary font-heading text-lg hover:text-brand-accent transition-colors" 
            href="#skills"
            onClick={() => setMenuOpen(false)}
          >
            Skills
          </a>
          <a 
            className="text-text-primary font-heading text-lg hover:text-brand-accent transition-colors" 
            href="#awards"
            onClick={() => setMenuOpen(false)}
          >
            Awards
          </a>
          
          {/* Portfolio navigation link xpath target to desktop */}
          <a 
            className="text-brand-accent font-heading text-lg font-bold transition-all hover:scale-105" 
            href="#portfolio"
            onClick={(e) => handleNavigateToDesktop(e)}
          >
            Portfolio (Desktop System)
          </a>

          <div className="pt-8 flex flex-col items-center space-y-2 select-none">
            <Sparkles className="w-8 h-8 text-brand-accent animate-pulse" />
            <span className="text-[9px] font-mono text-brand-accent/50">SYSTEM VERSION: 2026.2</span>
          </div>
        </div>
      )}

      {/* Main Content Scrollable Area */}
      <main className="flex-1 px-5 py-6 space-y-12">
        
        {/* Dynamic Grid Overlay */}
        <div className="absolute inset-x-0 h-[450px] grid-bg pointer-events-none -z-10 opacity-30"></div>

        {/* Hero / About Section */}
        <section id="about" className="space-y-4 pt-1">
          <div className="inline-block px-3 py-0.5 rounded-full border border-brand-accent/20 bg-brand-accent/10">
            <span className="font-mono text-[9px] font-semibold text-brand-accent uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
              Robotics Specialist
            </span>
          </div>

          {isEditMode ? (
            <div className="space-y-3.5 p-3.5 bg-amber-500/5 border border-dashed border-amber-500/25 rounded-xl edit-glow-outline">
              <span className="text-[9px] font-mono text-amber-400 font-bold block">⚡ TITLE EDIT (MOBILE)</span>
              <input 
                type="text"
                value={current.heroTitle}
                onChange={(e) => onChangeField('heroTitle', e.target.value)}
                className="w-full bg-[#111624] border border-brand-accent/20 text-text-primary px-2.5 py-1 text-xs rounded outline-none"
                placeholder="Title first line..."
              />
              <input 
                type="text"
                value={current.heroHighlight}
                onChange={(e) => onChangeField('heroHighlight', e.target.value)}
                className="w-full bg-[#111624] border border-brand-accent/20 text-brand-accent px-2.5 py-1 text-xs rounded outline-none font-bold"
                placeholder="Title highlights..."
              />
            </div>
          ) : (
            <h1 className="font-heading font-medium text-2xl leading-[1.25] text-text-primary tracking-tight">
              {current.heroTitle}{' '}-{' '}
              <span className="text-brand-accent font-bold">
                {current.heroHighlight}
              </span>
            </h1>
          )}

          <div className="space-y-3">
            {isEditMode ? (
              <div className="p-3.5 bg-[#111626] border border-dashed border-amber-500/25 rounded-lg space-y-2.5 edit-glow-outline">
                <span className="text-[9px] font-mono text-amber-500 font-semibold block">⚡ SUBTITLE &amp; STATEMENT EDIT</span>
                <input 
                  type="text" 
                  value={current.heroSubtitle}
                  onChange={(e) => onChangeField('heroSubtitle', e.target.value)}
                  className="w-full bg-[#080b13] border border-[#2b354e] rounded px-2 py-1 text-xs text-brand-accent outline-none"
                />
                <textarea 
                  rows={4}
                  value={current.heroParagraph}
                  onChange={(e) => onChangeField('heroParagraph', e.target.value)}
                  className="w-full bg-[#080b13] border border-[#2b354e] rounded px-2 py-1 text-xs text-text-secondary outline-none text-[11px]"
                />
              </div>
            ) : (
              <>
                <p className="font-sans text-xs font-semibold text-brand-accent">
                  {current.heroSubtitle}
                </p>
                <p className="font-sans text-xs text-[#a0afb0] dark:text-text-secondary leading-relaxed font-normal">
                  {current.heroParagraph}
                </p>
              </>
            )}
          </div>

          {isEditMode ? (
            <div className="p-3 bg-[#111626] border border-dashed border-amber-500/25 rounded-lg edit-glow-outline">
              <span className="text-[9px] font-mono text-amber-500 block mb-1">⚡ FOCUS QUOTE EDIT</span>
              <textarea 
                rows={2}
                value={current.heroQuote}
                onChange={(e) => onChangeField('heroQuote', e.target.value)}
                className="w-full bg-[#080b13] border border-[#2b354e] rounded p-1.5 text-xs text-text-primary outline-none italic"
              />
            </div>
          ) : (
            <div className="p-3.5 bg-brand-accent/5 rounded-xl border-l-2 border-l-brand-accent glass-card">
              <p className="font-sans text-[11px] text-text-primary italic leading-relaxed">
                "{current.heroQuote}"
              </p>
            </div>
          )}

          <div className="pt-2">
            {/* View Systems button xpath target is DesktopPortfolio */}
            <button 
              onClick={() => handleNavigateToDesktop()}
              className="bg-brand-accent text-[#002022] w-full px-5 py-3 font-semibold rounded-lg glow-blue hover:opacity-90 active:scale-95 transition-all text-xs cursor-pointer select-none"
            >
              View Desktop Systems
            </button>
          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Portfolio Cards Section */}
        <section id="portfolio" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <h2 className="font-heading font-medium text-lg text-text-primary">Deployments</h2>
              <p className="font-mono text-[9px] text-[#00a2b1] tracking-widest">
                ROBOT PROJECTS
              </p>
            </div>
            {isEditMode && (
              <button
                type="button"
                onClick={onAddProject}
                className="px-2 py-1 bg-brand-accent text-[#002022] hover:opacity-90 font-mono text-[10px] font-bold rounded flex items-center gap-0.5 select-none"
              >
                <Plus className="w-3 h-3" />
                <span>추가</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5">
            {current.projects.slice(0, 3).map((project, pIdx) => (
              <div 
                key={project.id} 
                className={`glass-card rounded-xl overflow-hidden group relative ${isEditMode ? 'edit-glow-outline bg-[#0c101d]' : ''}`}
              >
                {/* Mobile Sort/Deletes panel */}
                {isEditMode && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/90 p-1 rounded border border-brand-accent/20 z-20">
                    <button
                      type="button"
                      onClick={() => onSortProject(pIdx, 'up')}
                      disabled={pIdx === 0}
                      className="p-1 hover:text-brand-accent disabled:opacity-40"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onSortProject(pIdx, 'down')}
                      disabled={pIdx === current.projects.length - 1}
                      className="p-1 hover:text-brand-accent disabled:opacity-40"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteProject(project.id)}
                      className="p-1 text-red-400 hover:text-red-500 ML-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="h-40 w-full relative overflow-hidden bg-black/40">
                  <img 
                    alt={project.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    src={project.imageUrl || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"}
                  />
                  {isEditMode && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-2 text-center gap-1">
                      <label className="px-2 py-1.5 bg-brand-accent text-[#002022] font-mono font-bold text-[9px] rounded cursor-pointer">
                        사진 변경
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(project.id, e)}
                          className="hidden"
                        />
                      </label>
                      <input 
                        type="text"
                        value={project.imageUrl}
                        onChange={(e) => onUpdateProject(project.id, { imageUrl: e.target.value })}
                        className="w-full bg-black/80 text-[7px] font-mono px-1 py-0.5 border border-white/10 rounded outline-none"
                        placeholder="Image URL..."
                      />
                    </div>
                  )}
                </div>
                
                <div className="p-4 space-y-2.5">
                  <div className="flex justify-between items-center">
                    {isEditMode ? (
                      <input 
                        value={project.title}
                        onChange={(e) => onUpdateProject(project.id, { title: e.target.value })}
                        className="bg-black/20 border border-brand-accent/25 px-2 py-0.5 text-xs text-[#dfe2f3] rounded w-full font-bold outline-none"
                      />
                    ) : (
                      <h3 
                        className="font-heading font-semibold text-xs py-0.5 text-[#dfe2f3] hover:text-brand-accent cursor-pointer flex items-center gap-1 w-full"
                        onClick={() => setMobilePortOpen(true)}
                      >
                        <span>{project.title}</span>
                        <ExternalLink className="w-3 h-3 text-[#526365]" />
                      </h3>
                    )}
                  </div>
                  
                  {isEditMode ? (
                    <textarea
                      rows={2}
                      value={project.description}
                      onChange={(e) => onUpdateProject(project.id, { description: e.target.value })}
                      className="w-full bg-black/25 border border-[#2d3a58] rounded px-2 py-1 text-[11px] text-[#b9cacb] outline-none"
                    />
                  ) : (
                    <p className="font-sans text-[11px] text-text-secondary leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {isEditMode ? (
                      <input 
                        value={project.tags.join(', ')}
                        onChange={(e) => onUpdateProject(project.id, { tags: e.target.value.split(',').map(s => s.trim()) })}
                        className="w-full bg-black/30 border border-[#2b354e] text-[9px] font-mono rounded px-1.5 py-0.5"
                        placeholder="Tag CSV (ROS2, SLAM)"
                      />
                    ) : (
                      project.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[8.5px] px-2 py-0.5 border border-outline-variant/50 rounded text-brand-accent bg-[#0f131f]">
                          {tag}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-1">
            <button
              onClick={() => setMobilePortOpen(true)}
              className="w-full px-4 py-3 border border-brand-accent/20 bg-brand-accent/5 font-semibold hover:bg-brand-accent/10 active:scale-95 transition-all text-xs font-mono text-brand-accent rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,147,160,0.05)]"
            >
              <span>전체 프로젝트 보기 ({current.projects.length}개)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Experience Section */}
        <section id="experience" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-heading font-medium text-lg text-text-primary">History</h2>
            {isEditMode && (
              <button
                type="button"
                onClick={onAddExperience}
                className="px-2 py-1 bg-brand-accent text-[#002022] hover:opacity-90 font-mono text-[10px] font-bold rounded flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" />
                <span>추가</span>
              </button>
            )}
          </div>
          
          <div className="space-y-6 border-l border-brand-accent/20 ml-1.5 pl-4 relative">
            {current.experiences.slice(0, 3).map((exp, expIdx) => (
              <div key={exp.id} className={`relative p-1.5 rounded-lg ${isEditMode ? 'edit-glow-outline bg-[#101423]/60' : ''}`}>
                <div className="absolute -left-[23px] top-3 w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_10px_#00dbe7]"></div>
                
                {isEditMode && (
                  <div className="absolute top-1.5 right-1.5 flex items-center gap-1 scale-90 bg-black rounded p-0.5 z-20">
                    <button
                      type="button"
                      onClick={() => onSortExperience(expIdx, 'up')}
                      disabled={expIdx === 0}
                      className="p-1 hover:text-brand-accent disabled:opacity-30"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onSortExperience(expIdx, 'down')}
                      disabled={expIdx === current.experiences.length - 1}
                      className="p-1 hover:text-brand-accent disabled:opacity-30"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteExperience(exp.id)}
                      className="p-1 text-[#ef4444] ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <div className="space-y-1">
                  {isEditMode ? (
                    <div className="space-y-1">
                      <input 
                        value={exp.period || exp.year}
                        onChange={(e) => onUpdateExperience(exp.id, { period: e.target.value })}
                        className="bg-black/30 border border-brand-accent/25 py-0.5 px-1.5 text-[9px] font-mono text-brand-accent rounded outline-none"
                      />
                      <input 
                        value={exp.role}
                        onChange={(e) => onUpdateExperience(exp.id, { role: e.target.value })}
                        className="bg-[#0e111a] border border-white/10 py-1 px-1.5 text-xs font-heading font-semibold text-[#dfe2f3] rounded w-full outline-none"
                      />
                    </div>
                  ) : (
                    <>
                      <span className="font-mono text-[9px] text-brand-accent font-medium uppercase">{exp.period || exp.year}</span>
                      <h3 className="font-heading font-semibold text-xs text-text-primary mt-0.5">{exp.role}</h3>
                    </>
                  )}

                  {isEditMode ? (
                    <input 
                      value={exp.organization}
                      onChange={(e) => onUpdateExperience(exp.id, { organization: e.target.value })}
                      className="bg-black/30 border border-[#2b354e] py-0.5 px-2 text-[10px] rounded text-text-secondary w-full"
                    />
                  ) : (
                    <p className="font-sans text-[11px] text-text-secondary">{exp.organization}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-1">
            <button
              onClick={() => setMobileExpOpen(true)}
              className="w-full px-4 py-3 border border-brand-accent/20 bg-brand-accent/5 font-semibold hover:bg-brand-accent/10 active:scale-95 transition-all text-xs font-mono text-brand-accent rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,147,160,0.05)]"
            >
              <span>전체 경험 보기 ({current.experiences.length}개)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Skills Section */}
        <section id="skills" className="space-y-6">
          <h2 className="font-heading font-medium text-lg text-text-primary">Skills Card List</h2>

          {isEditMode && (
            <form onSubmit={handleAddNewSkill} className="p-3 bg-[#111626] border border-[#232f4a] rounded-xl flex items-center gap-2">
              <input 
                type="text"
                placeholder="새 기술 입력 (예: Block Coding)..."
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                className="flex-1 bg-black/40 text-xs border border-brand-accent/30 rounded py-1 px-2.5 outline-none focus:border-brand-accent"
              />
              <button 
                type="submit"
                className="px-3.5 py-1 bg-brand-accent text-black font-semibold text-xs rounded"
              >
                추가
              </button>
            </form>
          )}

          <div className="grid grid-cols-2 gap-3.5">
            {current.skills.map((skill, index) => (
              <div key={index} className="glass-card p-4 rounded-xl flex flex-col justify-between h-[120px] relative group hover:bg-brand-accent/5">
                <div className="flex justify-between items-start">
                  <Cpu className="w-5 h-5 text-brand-accent animate-pulse" />
                  {isEditMode && (
                    <button 
                      type="button"
                      onClick={() => onDeleteSkill(index)}
                      className="p-1 px-1.5 text-red-400 hover:text-red-500 rounded bg-black/20"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {isEditMode ? (
                  <input 
                    value={skill}
                    onChange={(e) => onUpdateSkill(index, e.target.value)}
                    className="bg-black/30 text-[10px] font-mono border border-brand-accent/25 rounded px-1 w-full"
                  />
                ) : (
                  <h4 className="font-mono text-xs text-text-primary tracking-wide leading-tight mt-3">
                    {skill}
                  </h4>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#060a12] border-t border-[#313a48]/20 py-8 px-5 text-center mt-auto">
        <div className="flex flex-col items-center gap-4">
          <span className="font-heading text-sm font-bold text-text-primary tracking-tighter">My Robot Portfolio</span>
          
          <div className="flex gap-4 text-[10px] font-mono text-text-secondary">
            <a href={current.githubUrl} target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors flex items-center gap-1">
              <Github className="w-3 h-3" />
              <span>GitHub</span>
            </a>
            <a 
              href="#" 
              onClick={(e) => handleNavigateToDesktop(e)} 
              className="hover:text-brand-accent transition-colors"
            >
              Full Desktop
            </a>
            <a href={`mailto:${current.email}`} className="hover:text-brand-accent transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>Mail</span>
            </a>
          </div>
          
          <p className="text-[8px] font-mono text-text-secondary/40 uppercase tracking-widest mt-2 select-none">
            © 2026 Robot Specialist. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* Experience Modal */}
      {mobileExpOpen && (
        <div id="experience-modal-overlay" className="fixed inset-x-0 bottom-0 top-0 z-[100] flex items-end justify-center bg-[#0a0e1a]/95 backdrop-blur-md animate-fade-in pr-0">
          <div className="relative w-full max-w-[480px] h-[85vh] bg-[#0c101b] border-t border-brand-accent/30 rounded-t-2xl flex flex-col shadow-[0_-10px_35px_rgba(0,147,160,0.2)] text-[#dfe2f3]">
            {/* Header */}
            <div className="p-5 border-b border-brand-accent/20 flex justify-between items-center bg-[#0f131f]/95">
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#dfe2f3] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></span>
                  <span>전체 경험 이력</span>
                </h3>
                <p className="text-[10px] text-text-secondary/60 font-mono mt-0.5 font-bold">Total History Logs</p>
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
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-black/10">
              <div className="space-y-6 border-l border-brand-accent/10 ml-1.5 pl-4 relative">
                {current.experiences.map((exp) => (
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
                className="w-full py-2.5 rounded bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-mono text-xs cursor-pointer text-center font-bold"
              >
                닫기 (Close Log)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Modal */}
      {mobilePortOpen && (
        <div id="portfolio-modal-overlay" className="fixed inset-x-0 bottom-0 top-0 z-[100] flex items-end justify-center bg-[#0a0e1a]/95 backdrop-blur-md animate-fade-in pr-0">
          <div className="relative w-full max-w-[480px] h-[85vh] bg-[#0c101b] border-t border-brand-accent/30 rounded-t-2xl flex flex-col shadow-[0_-10px_35px_rgba(0,147,160,0.25)] text-[#dfe2f3]">
            {/* Header */}
            <div className="p-5 border-b border-brand-accent/20 flex justify-between items-center bg-[#0f131f]/95">
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#dfe2f3] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></span>
                  <span>전체 프로젝트</span>
                </h3>
                <p className="text-[10px] text-text-secondary/60 font-mono mt-0.5 font-bold">Total Portfolios</p>
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
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-black/10">
              {current.projects.map((project) => (
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
                className="w-full py-2.5 rounded bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-mono text-xs cursor-pointer text-center font-bold"
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
