import React, { useState } from 'react';
import { 
  Bot, 
  Wrench, 
  Trophy, 
  Globe, 
  Sparkles, 
  Code, 
  Terminal, 
  Cpu, 
  Brain, 
  Users, 
  LineChart, 
  BookOpen, 
  Sparkle, 
  Mail, 
  ArrowUpRight,
  Puzzle,
  ChevronRight,
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Layers,
  Award,
  Github
} from 'lucide-react';
import { Screen, TransitionDirection, PortfolioData, Project, ExperienceLog, AwardItem } from '../types';

interface DesktopPortfolioProps {
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
  onUploadImage?: (projectId: string, file: File) => Promise<string>;
}

export default function DesktopPortfolio({
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
  onUpdateSkill,
  onUploadImage,
}: DesktopPortfolioProps) {
  // Use tempData inside editing sessions, otherwise use canonical read-only data
  const current = isEditMode ? tempData : data;

  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [isPortModalOpen, setIsPortModalOpen] = useState(false);
  const [newSkillValue, setNewSkillValue] = useState('');

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'wrench': return <Wrench className="w-5 h-5 text-brand-accent" />;
      case 'trophy': return <Trophy className="w-5 h-5 text-brand-accent" />;
      case 'globe': return <Globe className="w-5 h-5 text-brand-accent" />;
      case 'sparkles': return <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />;
      case 'cpu': return <Cpu className="w-5 h-5 text-brand-accent" />;
      case 'brain': return <Brain className="w-5 h-5 text-brand-accent" />;
      default: return <Wrench className="w-5 h-5 text-brand-accent" />;
    }
  };
  
  // Custom navigation link smooth-scroll support
  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageFileChange = async (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onUploadImage) {
        try {
          const url = await onUploadImage(projectId, file);
          onUpdateProject(projectId, { imageUrl: url });
        } catch (err) {
          console.error("Failed to upload image to Firebase Storage:", err);
        }
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          onUpdateProject(projectId, { imageUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleAddNewSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillValue.trim()) {
      onAddSkill(newSkillValue.trim());
      setNewSkillValue('');
    }
  };

  return (
    <div id="desktop-portfolio-container" className="relative min-h-[100dvh] text-text-primary font-sans selection:bg-brand-accent/30 selection:text-white pb-16">
      {/* Decorative Background grid elements */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0 opacity-40"></div>
      <div className="absolute top-[300px] left-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-[300px] right-1/4 w-[600px] h-[600px] bg-brand-accent/3 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-[#0f131f]/95 backdrop-blur-lg border-b border-outline-variant/30 shadow-[0_0_25px_rgba(0,219,231,0.08)] relative">
        <div className="flex justify-between items-center px-8 md:px-16 py-4.5 max-w-[1280px] mx-auto w-full">
          
          {/* LOGO PARENT WRAPPER (Xpath target for push_back navigation to Mobile) */}
          <div 
            onClick={() => onNavigate('mobile', 'push_back')}
            className="flex items-center gap-2.5 cursor-pointer group hover:opacity-90 select-none transition-all active:scale-98"
            title="Go to Mobile View"
          >
            <Bot className="w-8 h-8 text-brand-accent animate-pulse" />
            <span className="font-heading font-extrabold text-xl text-text-primary tracking-tighter hover:text-brand-accent transition-colors">
              My Robot Portfolio
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider text-text-secondary/80">
            <a 
              href="#about" 
              onClick={(e) => handleScrollTo('about', e)} 
              className="hover:text-brand-accent hover:underline decoration-brand-accent underline-offset-8 transition-colors"
            >
              About
            </a>
            <a 
              href="#experience" 
              onClick={(e) => handleScrollTo('experience', e)} 
              className="hover:text-brand-accent hover:underline decoration-brand-accent underline-offset-8 transition-colors"
            >
              Experience
            </a>
            <a 
              href="#skills" 
              onClick={(e) => handleScrollTo('skills', e)} 
              className="hover:text-brand-accent hover:underline decoration-brand-accent underline-offset-8 transition-colors"
            >
              Skills
            </a>
            <a 
              href="#awards" 
              onClick={(e) => handleScrollTo('awards', e)} 
              className="hover:text-brand-accent hover:underline decoration-brand-accent underline-offset-8 transition-colors"
            >
              Awards
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => handleScrollTo('portfolio', e)} 
              className="text-brand-accent font-semibold hover:opacity-85 transition-opacity"
            >
              Portfolio
            </a>
          </div>

          {/* Mobile Back-Trigger Floating Info Badge */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => onNavigate('mobile', 'push_back')} 
              className="px-3.5 py-1.5 rounded bg-brand-accent/10 border border-brand-accent/30 text-xs text-brand-accent flex items-center gap-1.5"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              <span>Mobile View</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 py-10 space-y-28">
        
        {/* About / Hero Section */}
        <section id="about" className="min-h-[80vh] flex items-center pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Left Column Texts */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-6">
              <div className="inline-block px-3.5 py-1 glass-card border-brand-accent/20 rounded-full bg-brand-accent/5">
                <span className="font-mono text-[11px] font-semibold text-brand-accent uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping"></span>
                  Robotics Specialist
                </span>
              </div>

              {isEditMode ? (
                <div className="space-y-4 p-4.5 bg-amber-500/5 border border-dashed border-amber-500/30 rounded-xl edit-glow-outline">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">⚡ TITLE EDIT (ABOUT)</span>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-[#7a8e90]/80">Title First Row</label>
                      <input 
                        type="text"
                        value={current.heroTitle}
                        onChange={(e) => onChangeField('heroTitle', e.target.value)}
                        className="w-full bg-[#141824] border border-brand-accent/30 text-text-primary px-3 py-1.5 rounded font-bold text-sm outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#7a8e90]/80">Title Second Row (Highlight)</label>
                      <input 
                        type="text"
                        value={current.heroHighlight}
                        onChange={(e) => onChangeField('heroHighlight', e.target.value)}
                        className="w-full bg-[#141824] border border-brand-accent/30 text-brand-accent px-3 py-1.5 rounded font-bold text-sm outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <h1 className="font-heading font-extrabold text-[40px] md:text-[52px] text-text-primary leading-[1.1] tracking-tight">
                  {current.heroTitle}<br />
                  <span className="text-brand-accent hover:opacity-95 transition-opacity duration-300">
                    {current.heroHighlight}
                  </span>
                </h1>
              )}

              <div className="space-y-4">
                {isEditMode ? (
                  <div className="p-4 bg-[#141824] border border-dashed border-amber-500/30 rounded-lg space-y-3 edit-glow-outline">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">⚡ SUBTITLE &amp; DESCRIPTION EDIT</span>
                    <div>
                      <label className="block text-[10px] text-[#7a8e90]/70">Subtitle</label>
                      <input 
                        type="text" 
                        value={current.heroSubtitle}
                        onChange={(e) => onChangeField('heroSubtitle', e.target.value)}
                        className="w-full bg-[#0a0d14] border border-[#2b354e] rounded px-2.5 py-1.5 text-xs text-brand-accent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#7a8e90]/70">Introduction paragraph</label>
                      <textarea 
                        rows={4}
                        value={current.heroParagraph}
                        onChange={(e) => onChangeField('heroParagraph', e.target.value)}
                        className="w-full bg-[#0a0d14] border border-[#2b354e] rounded px-2.5 py-1.5 text-xs text-text-secondary outline-none resize-y"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-sans text-lg font-medium text-brand-accent">
                      {current.heroSubtitle}
                    </p>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-xl">
                      {current.heroParagraph}
                    </p>
                  </>
                )}
              </div>

              {isEditMode ? (
                <div className="p-4 bg-[#141824] border border-dashed border-amber-500/30 rounded-lg space-y-2 edit-glow-outline">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">⚡ FOCUS STATEMENT EDIT</span>
                  <textarea 
                    rows={2}
                    value={current.heroQuote}
                    onChange={(e) => onChangeField('heroQuote', e.target.value)}
                    className="w-full bg-[#0a0d14] border border-[#2b354e] rounded p-2 text-xs italic text-text-primary outline-none"
                  />
                </div>
              ) : (
                <div className="p-4.5 bg-brand-accent/5 rounded-xl border-l-[3.5px] border-l-brand-accent glass-card max-w-xl">
                  <p className="font-sans text-xs md:text-sm text-text-primary italic leading-relaxed">
                    "{current.heroQuote}"
                  </p>
                </div>
              )}

              {/* Dynamic Action Buttons & Editable URLs */}
              <div className="flex flex-col gap-4 pt-4 shrink-0">
                {isEditMode && (
                  <div className="p-4.5 bg-[#0f1322] border border-[#2d3a58] rounded-xl text-xs space-y-3">
                    <span className="text-[10px] font-mono text-brand-accent uppercase tracking-wider font-bold">ADMIN LINKS SETUP</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] text-text-secondary/70 font-mono">Email Address</label>
                        <input 
                          type="text" 
                          value={current.email}
                          onChange={(e) => onChangeField('email', e.target.value)}
                          className="w-full bg-[#181f33] border border-white/10 rounded px-2 py-1 text-text-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-text-secondary/70 font-mono">GitHub Profile Link</label>
                        <input 
                          type="text" 
                          value={current.githubUrl}
                          onChange={(e) => onChangeField('githubUrl', e.target.value)}
                          className="w-full bg-[#181f33] border border-white/10 rounded px-2 py-1 text-text-primary outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#portfolio"
                    onClick={(e) => handleScrollTo('portfolio', e)}
                    className="px-8 py-3.5 bg-brand-accent text-[#002022] font-semibold rounded-lg shadow-[0_0_15px_rgba(0,219,231,0.25)] hover:scale-[1.03] transition-transform duration-300 text-sm cursor-pointer"
                  >
                    View Portfolio
                  </a>
                  <a 
                    href="#experience"
                    onClick={(e) => handleScrollTo('experience', e)}
                    className="px-8 py-3.5 border border-brand-accent/30 text-brand-accent font-semibold rounded-lg hover:bg-brand-accent/5 transition-colors text-sm cursor-pointer"
                  >
                    Experience
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column Cybernetic Photo Container */}
            <div className="lg:col-span-12 xl:col-span-5 relative group flex justify-center lg:mt-6 xl:mt-0">
              <div className="absolute -inset-4 bg-brand-accent/10 blur-3xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden glass-card aspect-square border border-brand-accent/20 w-full max-w-[420px]">
                <div className="scanline"></div>
                <img 
                  alt="High-tech Humanoid Programming" 
                  className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBozlz4U1vpDWdTe66Y6TiA05j0iTlDJDxyl93upAWKuPcqNO3FV-oscL7L7c6hiFoZJmMEvWTmiAb5oE5LHRmDkXKOxesHMzPnLFejIffzd05Im4ZUTRVTYv82yYblx-VVig6cpNjMnRS4OE09AnQnoXjNvRk0ink9Jtc5FS9wY2agdiTQca79TY6EwfHMxSiWqFmPH1qFOfvVcutQ0riLeMXjRV_IFHI62tqcUXl7NQZhG0fLyZspWoRFAMFxMgn4vWHd0r_fj7s"
                />
              </div>
            </div>

          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Experience Log Section */}
        <section id="experience" className="space-y-12">
          <div className="text-center space-y-2">
            <div className="flex justify-between items-end max-w-4xl mx-auto">
              <div className="text-left">
                <h2 className="font-heading font-bold text-2xl text-text-primary tracking-tight">Experience</h2>
                <p className="font-sans text-sm text-text-secondary">로봇 수업과 프로젝트를 통해 경험한 활동들을 정리했습니다.</p>
              </div>
              {isEditMode && (
                <button
                  type="button"
                  onClick={onAddExperience}
                  className="px-3.5 py-1.5 bg-brand-accent text-[#002022] hover:opacity-90 rounded font-mono text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-transform"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>경험 추가 (Add Exp)</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.experiences.slice(0, 3).map((exp, expIdx) => (
              <div 
                key={exp.id} 
                className={`glass-card p-6 rounded-xl flex flex-col justify-between h-[255px] shadow-sm glass-card-hover group relative ${isEditMode ? 'edit-glow-outline bg-[#0e1322]' : ''}`}
              >
                {/* Drag sorting and delete options inside draft sessions */}
                {isEditMode && (
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/80 rounded px-1.5 py-1 z-20 border border-brand-accent/20">
                    <button
                      type="button"
                      onClick={() => onSortExperience(expIdx, 'up')}
                      disabled={expIdx === 0}
                      className="p-1 hover:text-brand-accent disabled:opacity-30 disabled:hover:text-text-secondary cursor-pointer"
                      title="위로 이동"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onSortExperience(expIdx, 'down')}
                      disabled={expIdx === current.experiences.length - 1}
                      className="p-1 hover:text-brand-accent disabled:opacity-30 disabled:hover:text-text-secondary cursor-pointer"
                      title="아래로 이동"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteExperience(exp.id)}
                      className="p-1 text-red-400 hover:text-red-500 cursor-pointer"
                      title="삭제"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="w-[42px] h-[42px] flex items-center justify-center bg-[#1b1f2c] rounded-lg border border-brand-accent/15 group-hover:bg-brand-accent group-hover:text-[#002022] transition-all duration-300">
                    {getIcon(exp.iconName)}
                  </div>
                  <div>
                    {isEditMode ? (
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={exp.period || exp.year}
                          onChange={(e) => onUpdateExperience(exp.id, { period: e.target.value })}
                          className="w-full bg-[#161d2f] border border-brand-accent/20 rounded px-1.5 py-0.5 text-[10px] text-brand-accent font-mono"
                          placeholder="기간 (2026.02)"
                        />
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => onUpdateExperience(exp.id, { role: e.target.value })}
                          className="w-full bg-[#161d2f] border border-[#232d47] rounded px-1.5 py-0.5 text-xs text-text-primary font-bold"
                          placeholder="역할"
                        />
                      </div>
                    ) : (
                      <>
                        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest font-semibold">
                          {exp.period || exp.year}
                        </span>
                        <h3 className="font-heading font-semibold text-sm text-[#dfe2f3] mt-1 line-clamp-1">
                          {exp.role}
                        </h3>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={exp.organization}
                      onChange={(e) => onUpdateExperience(exp.id, { organization: e.target.value })}
                      className="w-full bg-[#161d2f] border border-[#2d3a58] rounded px-2 py-1 text-[11px] text-[#b9cacb]"
                      placeholder="소속 단체"
                    />
                  ) : (
                    <p className="font-sans text-xs text-[#b9cacb] leading-relaxed line-clamp-2">
                      {exp.organization}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsExpModalOpen(true)}
              className="px-6 py-2.5 border border-brand-accent/30 text-brand-accent hover:bg-brand-accent/10 active:scale-95 transition-all text-xs font-mono rounded-lg tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(0,219,231,0.05)]"
            >
              <span>전체 경험 보기 ({current.experiences.length}개 이력)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Skills Competency Badges Section */}
        <section id="skills" className="space-y-8 py-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="font-heading font-bold text-2xl text-text-primary">Skills</h2>
              <p className="font-sans text-sm text-text-secondary">로봇 프로젝트를 진행하며 배운 기술과 역량입니다.</p>
            </div>
          </div>

          {/* Quick Skill Adding bar during Edit Mode */}
          {isEditMode && (
            <form onSubmit={handleAddNewSkillSubmit} className="max-w-md p-4 bg-[#111626] border border-[#2d3d5f] rounded-xl flex items-center gap-2.5 edit-glow-outline">
              <input 
                type="text" 
                placeholder="전공 역량 입력 (예: Python, SLAM)..."
                value={newSkillValue}
                onChange={(e) => setNewSkillValue(e.target.value)}
                className="flex-1 bg-black/30 border border-brand-accent/30 px-3 py-1.5 rounded text-xs text-text-primary outline-none focus:border-brand-accent"
              />
              <button 
                type="submit"
                className="px-4 py-1.5 bg-brand-accent text-[#002022] font-mono text-xs font-bold rounded hover:opacity-90 active:scale-95 cursor-pointer"
              >
                기술 추가
              </button>
            </form>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {current.skills.map((skill, index) => (
              <div 
                key={index} 
                className="px-5 py-4.5 glass-card rounded-xl flex items-center justify-between border-l-[3.5px] border-l-brand-accent hover:bg-brand-accent/5 group"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                  {isEditMode ? (
                    <input 
                      type="text" 
                      value={skill}
                      onChange={(e) => onUpdateSkill(index, e.target.value)}
                      className="bg-black/20 border-b border-brand-accent/20 px-1 py-0.5 text-xs text-text-primary outline-none focus:border-brand-accent font-mono w-28"
                    />
                  ) : (
                    <span className="font-mono text-xs text-text-primary tracking-wide">{skill}</span>
                  )}
                </div>
                {isEditMode && (
                  <button 
                    type="button" 
                    onClick={() => onDeleteSkill(index)}
                    className="p-1 text-[#ff5f6d] hover:text-red-500 cursor-pointer rounded hover:bg-white/5 opacity-80 group-hover:opacity-100 transition-opacity"
                    title="기술 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Awards Section */}
        <section id="awards" className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left side info block */}
            <div className="lg:w-1/3 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-heading font-bold text-2xl text-text-primary">Certifications &amp; Awards</h2>
              </div>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                로봇 대회 참가 및 수상 내용을 정리했습니다.
              </p>
              {isEditMode && (
                <button
                  type="button"
                  onClick={onAddAward}
                  className="px-4 py-2 bg-brand-accent/15 border border-brand-accent/40 text-brand-accent rounded font-mono text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform mt-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>수상 정보 추가</span>
                </button>
              )}
            </div>

            {/* Right side list */}
            <div className="lg:w-2/3 space-y-4">
              {current.awards.map((awardItem, aIdx) => (
                <div 
                  key={awardItem.id} 
                  className={`p-5.5 glass-card border-l-[4px] border-l-brand-accent rounded-xl flex justify-between items-center group relative overflow-visible ${isEditMode ? 'edit-glow-outline bg-[#101323]' : ''}`}
                >
                  <div className="flex items-center gap-4 w-full mr-12">
                    <div className="p-2.5 bg-[#1b1f2c] rounded-lg border border-brand-accent/10">
                      {getIcon(awardItem.iconName)}
                    </div>
                    
                    <div className="flex-1">
                      {isEditMode ? (
                        <div className="space-y-2 w-full">
                          <input 
                            value={awardItem.title}
                            onChange={(e) => onUpdateAward(awardItem.id, { title: e.target.value })}
                            className="bg-black/30 border border-brand-accent/20 px-2.5 py-1 text-xs text-[#dfe2f3] rounded w-full outline-none focus:border-brand-accent"
                            placeholder="수상명 및 부서"
                          />
                          <input 
                            value={awardItem.award}
                            onChange={(e) => onUpdateAward(awardItem.id, { award: e.target.value })}
                            className="bg-black/30 border border-brand-accent/20 px-2.5 py-0.5 text-[11px] text-brand-accent rounded w-full font-bold outline-none focus:border-brand-accent"
                            placeholder="수상 등급 (예: 1st Place)"
                          />
                          <select
                            value={awardItem.iconName}
                            onChange={(e) => onUpdateAward(awardItem.id, { iconName: e.target.value })}
                            className="bg-black/40 border border-brand-accent/25 py-0.5 px-2 text-[10px] rounded text-text-secondary outline-none font-mono"
                          >
                            <option value="trophy">Trophy</option>
                            <option value="sparkles">Sparkles</option>
                            <option value="wrench">Wrench</option>
                            <option value="globe">Globe</option>
                            <option value="cpu">CPU</option>
                            <option value="brain">Brain</option>
                          </select>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-heading font-semibold text-sm md:text-base text-text-primary">
                            {awardItem.title}
                          </h3>
                          <p className="text-brand-accent font-bold text-xs mt-0.5">{awardItem.award}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {isEditMode ? (
                    <button
                      type="button"
                      onClick={() => onDeleteAward(awardItem.id)}
                      className="absolute right-4 self-center p-1.5 text-red-400 hover:text-red-500 hover:bg-white/5 rounded transition-all cursor-pointer"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <Sparkle className="w-5 h-5 text-brand-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Dynamic Portfolio Grid Section */}
        <section id="portfolio" className="space-y-12">
          <div className="text-center space-y-2">
            <div className="flex flex-col sm:flex-row justify-between items-center max-w-5xl mx-auto gap-4">
              <div className="text-center sm:text-left">
                <h2 className="font-heading font-bold text-2xl text-[#dfe2f3] tracking-tight">Portfolio</h2>
                <p className="font-sans text-sm text-text-secondary">완성한 로봇 프로젝트와 웹앱 결과물을 소개합니다.</p>
              </div>
              {isEditMode && (
                <button
                  type="button"
                  onClick={onAddProject}
                  className="px-4 py-2.5 bg-brand-accent text-[#002022] hover:opacity-90 font-mono text-xs font-extrabold rounded-lg flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                  <span>프로젝트 추가 (Add Project)</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {current.projects.slice(0, 6).map((project, pIdx) => (
              <div 
                key={project.id} 
                className={`glass-card flex flex-col overflow-hidden rounded-xl border border-brand-accent/10 shadow-md group glass-card-hover relative ${isEditMode ? 'edit-glow-outline bg-[#0c101d]' : ''}`}
              >
                {/* Sorting and deletes options */}
                {isEditMode && (
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/90 p-1.5 rounded-lg border border-brand-accent/25 z-30">
                    <button
                      type="button"
                      onClick={() => onSortProject(pIdx, 'up')}
                      disabled={pIdx === 0}
                      className="p-1 hover:text-brand-accent disabled:opacity-35 disabled:hover:text-[#888] cursor-pointer"
                      title="앞으로 순서 변경"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onSortProject(pIdx, 'down')}
                      disabled={pIdx === current.projects.length - 1}
                      className="p-1 hover:text-brand-accent disabled:opacity-35 disabled:hover:text-[#888] cursor-pointer"
                      title="뒤로 순서 변경"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteProject(project.id)}
                      className="p-1 text-red-400 hover:text-red-500 cursor-pointer ml-1.5"
                      title="프로젝트 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="aspect-video relative overflow-hidden bg-black/40">
                  <img 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    referrerPolicy="no-referrer"
                    src={project.imageUrl || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"}
                  />
                  
                  {isEditMode ? (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-3 text-center gap-1.5">
                      <Upload className="w-6 h-6 text-brand-accent animate-bounce" />
                      <label className="px-2.5 py-1.5 bg-brand-accent text-[#002022] font-mono font-bold text-[10px] rounded cursor-pointer transition-all hover:scale-105">
                        이미지 파일 업로드
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
                        className="w-full bg-black/80 text-[8px] font-mono px-1 py-0.5 border border-white/10 rounded outline-none text-text-secondary"
                        placeholder="Or Paste Image URL..."
                      />
                    </div>
                  ) : (
                    <div 
                      className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" 
                      onClick={() => setIsPortModalOpen(true)}
                    >
                      <span className="px-4 py-1.5 bg-brand-accent text-[#002022] font-semibold text-xs rounded shadow-lg">
                        자세히 보기
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {isEditMode ? (
                      <div className="space-y-2">
                        <input 
                          type="text"
                          value={project.title}
                          onChange={(e) => onUpdateProject(project.id, { title: e.target.value })}
                          className="w-full bg-[#161d2f] border border-brand-accent/25 rounded px-2.5 py-1 text-sm text-[#dfe2f3] font-bold outline-none"
                          placeholder="프로젝트 제목"
                        />
                        <textarea
                          rows={3}
                          value={project.description}
                          onChange={(e) => onUpdateProject(project.id, { description: e.target.value })}
                          className="w-full bg-[#161d2f] border border-brand-accent/20 rounded px-2.5 py-1 text-xs text-text-secondary outline-none resize-none"
                          placeholder="프로젝트 상세 설명"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="font-heading font-semibold text-base text-text-primary">{project.title}</h3>
                        <p className="font-sans text-xs text-text-secondary leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/10">
                    {isEditMode ? (
                      <input 
                        type="text"
                        value={project.tags.join(', ')}
                        onChange={(e) => onUpdateProject(project.id, { tags: e.target.value.split(',').map(s => s.trim()) })}
                        className="w-full bg-[#161d2f] border border-white/5 rounded px-2 py-0.5 text-[10px] text-brand-accent font-mono"
                        placeholder="쉼표로 태그 구분 (ROS2, SLAM)"
                      />
                    ) : (
                      project.tags.map((term) => (
                        <span key={term} className="font-mono text-[9px] px-2 py-0.5 border border-brand-accent/15 text-brand-accent rounded bg-[#0f131f]/60">
                          {term}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsPortModalOpen(true)}
              className="px-6 py-2.5 bg-brand-accent text-[#002022] font-semibold hover:opacity-90 active:scale-95 transition-all text-xs rounded-lg flex items-center gap-2 cursor-pointer shadow-[0_4_12px_rgba(0,219,231,0.2)]"
            >
              <span>전체 프로젝트 보기 ({current.projects.length}개 갤러리)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#060a12] border-t border-[#3a494b]/20 py-16 relative z-10 w-full mt-24">
        <div className="max-w-[1280px] mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-10">
          
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-brand-accent" />
              <span className="font-heading font-bold text-lg text-text-primary tracking-tighter">My Robot Portfolio</span>
            </div>
            <p className="font-mono text-[10px] text-text-secondary/50">
              © 2026 My Robot Portfolio. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-[10px] uppercase text-brand-accent tracking-widest">Connect</p>
              <a 
                href={`mailto:${current.email}`}
                className="text-text-secondary/90 hover:text-brand-accent transition-colors flex items-center gap-2 text-xs md:text-sm"
              >
                <Mail className="w-4 h-4 text-brand-accent/60" />
                <span>{current.email}</span>
              </a>
            </div>

            <div className="flex gap-6 text-[11px] font-mono text-text-secondary">
              <a 
                href={current.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-brand-accent transition-colors flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a 
                href="#portfolio" 
                onClick={(e) => handleScrollTo('portfolio', e)} 
                className="hover:text-brand-accent transition-colors"
              >
                Portfolio
              </a>
            </div>
          </div>

        </div>

        <div className="text-center pt-10 pb-2 opacity-25 pointer-events-none w-full">
          <p className="font-mono text-[9px] tracking-[0.55em] text-brand-accent uppercase select-none">
            System.Operational // 0x2026_Core
          </p>
        </div>
      </footer>

      {/* Experience Modal */}
      {isExpModalOpen && (
        <div id="experience-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e1a]/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden glass-card rounded-2xl flex flex-col shadow-[0_0_50px_rgba(0,219,231,0.25)] border border-brand-accent/30 text-text-primary">
            {/* Modal Header */}
            <div className="p-6 border-b border-brand-accent/20 flex justify-between items-center bg-[#0f131f]/90">
              <div className="space-y-1">
                <h3 className="font-heading font-extrabold text-xl md:text-2xl text-text-primary flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-brand-accent animate-pulse" />
                  <span>전체 경험 이력 (Full Experience Log)</span>
                </h3>
                <p className="text-xs text-text-secondary/70 font-mono">참가 대외활동 및 프로젝트 경험들을 시간 순으로 확인실 수 있습니다.</p>
              </div>
              <button 
                id="close-experience-modal"
                onClick={() => setIsExpModalOpen(false)}
                className="p-1.5 text-text-secondary hover:text-brand-accent hover:bg-white/5 rounded-full transition-all duration-300 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-[#0b0f1a]">
              <div className="space-y-8 relative pl-6 border-l border-brand-accent/20 ml-2">
                {current.experiences.map((exp, modalExpIdx) => (
                  <div key={exp.id} className="relative group">
                    {/* Pulsing state marker */}
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-brand-accent shadow-[0_0_10px_#00dbe7] group-hover:scale-110 transition-transform"></div>
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-[10px] text-brand-accent font-bold px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20">
                          {exp.period || exp.year}
                        </span>
                        
                        {isEditMode ? (
                          <div className="flex-1 flex gap-2">
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => onUpdateExperience(exp.id, { role: e.target.value })}
                              className="bg-black/30 text-xs text-text-primary px-2 py-0.5 border border-brand-accent/30 rounded"
                            />
                            <input
                              type="text"
                              value={exp.organization}
                              onChange={(e) => onUpdateExperience(exp.id, { organization: e.target.value })}
                              className="bg-black/30 text-xs text-brand-accent px-2 py-0.5 border border-brand-accent/30 rounded"
                            />
                          </div>
                        ) : (
                          <h4 className="font-heading font-bold text-base md:text-lg text-text-primary">
                            {exp.role} — <span className="text-brand-accent/90 text-sm font-medium">{exp.organization}</span>
                          </h4>
                        )}
                      </div>
                    </div>

                    {exp.details && exp.details.length > 0 && (
                      <ul className="mt-3.5 space-y-2 pl-4 border-l border-white/5 ml-1">
                        {exp.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs md:text-sm text-text-secondary/90 font-sans">
                            <ChevronRight className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                            {isEditMode ? (
                              <input 
                                value={detail}
                                onChange={(e) => {
                                  const updatedDetails = [...(exp.details || [])];
                                  updatedDetails[dIdx] = e.target.value;
                                  onUpdateExperience(exp.id, { details: updatedDetails });
                                }}
                                className="bg-black/30 text-xs border border-white/10 rounded px-2 py-0.5 text-text-secondary w-full"
                              />
                            ) : (
                              <span>{detail}</span>
                            )}
                          </li>
                        ))}
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() => {
                              const updatedDetails = [...(exp.details || []), '새 상세 프로젝트 활동 내역'];
                              onUpdateExperience(exp.id, { details: updatedDetails });
                            }}
                            className="text-[10px] text-brand-accent hover:underline mt-1 font-mono cursor-pointer"
                          >
                            + 상세 한 줄 추가
                          </button>
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0a0e1a] border-t border-brand-accent/10 flex justify-end">
              <button 
                onClick={() => setIsExpModalOpen(false)}
                className="px-5 py-2 rounded bg-brand-accent/10 border border-brand-accent/25 hover:bg-brand-accent/20 text-brand-accent font-mono text-xs cursor-pointer active:scale-95 transition-all"
              >
                닫기 (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Modal */}
      {isPortModalOpen && (
        <div id="portfolio-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0e1a]/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-5xl max-h-[85vh] overflow-hidden glass-card rounded-2xl flex flex-col shadow-[0_0_50px_rgba(0,219,231,0.25)] border border-brand-accent/30 text-text-primary">
            {/* Modal Header */}
            <div className="p-6 border-b border-brand-accent/20 flex justify-between items-center bg-[#0f131f]/90">
              <div className="space-y-1">
                <h3 className="font-heading font-extrabold text-xl md:text-2xl text-text-primary flex items-center gap-2">
                  <Bot className="w-6 h-6 text-brand-accent animate-pulse" />
                  <span>전체 프로젝트 갤러리 (All Robotics Projects)</span>
                </h3>
                <p className="text-xs text-text-secondary/70 font-mono">기획 및 완성한 로봇 프로젝트 가치와 핵심 소스 정보를 한 눈에 확인하세요.</p>
              </div>
              <button 
                id="close-portfolio-modal"
                onClick={() => setIsPortModalOpen(false)}
                className="p-1.5 text-text-secondary hover:text-brand-accent hover:bg-white/5 rounded-full transition-all duration-300 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0b0f1a]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                {current.projects.map((project) => (
                  <div key={project.id} className="glass-card flex flex-col rounded-xl overflow-hidden border border-brand-accent/15 group hover:border-brand-accent/40 hover:shadow-[0_0_15px_rgba(0,219,231,0.15)] transition-all">
                    <div className="w-full aspect-video relative overflow-hidden flex-shrink-0 bg-[#0f131f]/90">
                      <img 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        referrerPolicy="no-referrer"
                        src={project.imageUrl || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"}
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between gap-4 bg-[#0e1220]/50">
                      <div className="space-y-2">
                        <h4 className="font-heading font-bold text-base md:text-lg text-text-primary group-hover:text-brand-accent transition-colors">
                          {project.title}
                        </h4>
                        <p className="font-sans text-xs text-text-secondary leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-brand-accent/10">
                        {project.tags.map((tag) => (
                          <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-brand-accent/15 rounded text-brand-accent bg-[#0f131f]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0a0e1a] border-t border-brand-accent/10 flex justify-end">
              <button 
                onClick={() => setIsPortModalOpen(false)}
                className="px-5 py-2 rounded bg-brand-accent/10 border border-brand-accent/25 hover:bg-brand-accent/20 text-brand-accent font-mono text-xs cursor-pointer active:scale-95 transition-all"
              >
                닫기 (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
