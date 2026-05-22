import React from 'react';
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
  ChevronRight
} from 'lucide-react';
import { Screen, TransitionDirection } from '../types';

interface DesktopPortfolioProps {
  onNavigate: (screen: Screen, direction: TransitionDirection) => void;
}

export default function DesktopPortfolio({ onNavigate }: DesktopPortfolioProps) {
  
  // Custom navigation link smooth-scroll support
  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="desktop-portfolio-container" className="relative min-h-[100dvh] bg-[#0f131f] text-[#dfe2f3] font-sans selection:bg-brand-accent/30 selection:text-white">
      {/* Decorative Full Background Grid */}
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
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3.5 py-1 glass-card border-brand-accent/20 rounded-full bg-brand-accent/5">
                <span className="font-mono text-[11px] font-semibold text-brand-accent uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping"></span>
                  Robotics Specialist
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-[44px] md:text-[54px] text-text-primary leading-[1.1] tracking-tight">
                Building Robots,<br />
                <span className="text-brand-accent hover:opacity-95 transition-opacity duration-300">Solving Problems</span>
              </h1>

              <p className="font-sans text-lg font-medium text-brand-accent">
                로봇을 만들고 코딩하며 문제를 해결한 과정을 소개합니다.
              </p>

              <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-xl">
                저는 로봇을 만들고 코딩하며 문제를 해결하는 것을 좋아합니다. 센서와 모터를 활용해 로봇이 스스로 움직이도록 만드는 과정에 관심이 있습니다. 실패한 로봇을 다시 수정하고 테스트하면서 더 나은 해결 방법을 찾는 과정을 배우고 있습니다.
              </p>

              <div className="p-4.5 bg-brand-accent/5 rounded-xl border-l-[3.5px] border-l-brand-accent glass-card max-w-xl">
                <p className="font-sans text-xs md:text-sm text-text-primary italic leading-relaxed">
                  "앞으로 다양한 로봇 프로젝트에 도전하며 창의적인 문제 해결 능력을 키우고 싶습니다."
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#portfolio"
                  onClick={(e) => handleScrollTo('portfolio', e)}
                  className="px-8 py-3.5 bg-brand-accent text-[#002022] font-semibold rounded-lg shadow-[0_0_15px_rgba(0,219,231,0.25)] hover:scale-[1.03] transition-transform duration-300 text-sm"
                >
                  View Portfolio
                </a>
                <a 
                  href="#experience"
                  onClick={(e) => handleScrollTo('experience', e)}
                  className="px-8 py-3.5 border border-brand-accent/30 text-brand-accent font-semibold rounded-lg hover:bg-brand-accent/5 transition-colors text-sm"
                >
                  Experience
                </a>
              </div>
            </div>

            {/* Right Column Cybernetic Photo Container */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-brand-accent/10 blur-3xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative rounded-2xl overflow-hidden glass-card aspect-square border border-brand-accent/20">
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
            <h2 className="font-heading font-bold text-2xl text-text-primary tracking-tight">Experience</h2>
            <p className="font-sans text-sm text-text-secondary">로봇 수업과 프로젝트를 통해 경험한 활동들을 정리했습니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-between h-[230px] shadow-sm glass-card-hover group">
              <div className="space-y-4">
                <div className="w-[42px] h-[42px] flex items-center justify-center bg-[#1b1f2c] rounded-lg border border-brand-accent/20 group-hover:bg-brand-accent group-hover:text-[#002022] transition-colors">
                  <Wrench className="w-5 h-5 text-brand-accent group-hover:text-inherit" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest font-semibold">2025</span>
                  <h3 className="font-heading font-semibold text-sm text-text-primary mt-1">Robot Challenge: SUMO</h3>
                </div>
              </div>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                SUMO 종목에 참가했다
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-between h-[230px] shadow-sm glass-card-hover group">
              <div className="space-y-4">
                <div className="w-[42px] h-[42px] flex items-center justify-center bg-[#1b1f2c] rounded-lg border border-brand-accent/20 group-hover:bg-brand-accent group-hover:text-[#002022] transition-colors">
                  <Trophy className="w-5 h-5 text-brand-accent group-hover:text-inherit" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest font-semibold">2025</span>
                  <h3 className="font-heading font-semibold text-sm text-text-primary mt-1">RoboCup Korea Open</h3>
                </div>
              </div>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                CoSpace Rescue U12 종목 참가, 리더로 활약, 팀명: K.F.C.Playwell
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-between h-[230px] shadow-sm glass-card-hover group">
              <div className="space-y-4">
                <div className="w-[42px] h-[42px] flex items-center justify-center bg-[#1b1f2c] rounded-lg border border-brand-accent/20 group-hover:bg-brand-accent group-hover:text-[#002022] transition-colors">
                  <Globe className="w-5 h-5 text-brand-accent group-hover:text-inherit" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest font-semibold">2025</span>
                  <h3 className="font-heading font-semibold text-sm text-text-primary mt-1">RoboCup Singapore Open</h3>
                </div>
              </div>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                CoSpace Rescue U12 종목 참가, 리더로 활약, 팀명: K.F.C.Playwell
              </p>
            </div>

            {/* Card 4 */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-between h-[230px] shadow-sm glass-card-hover group">
              <div className="space-y-4">
                <div className="w-[42px] h-[42px] flex items-center justify-center bg-[#1b1f2c] rounded-lg border border-brand-accent/20 group-hover:bg-brand-accent group-hover:text-[#002022] transition-colors">
                  <Sparkles className="w-5 h-5 text-brand-accent group-hover:text-inherit" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest font-semibold">2026</span>
                  <h3 className="font-heading font-semibold text-sm text-text-primary mt-1">RoboCup Korea Open</h3>
                </div>
              </div>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                CoSpace Rescue U12 종목 참가, 리더로 활약, 팀명: K.F.C.Playwell
              </p>
            </div>

          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Skills Competency Badges Section */}
        <section id="skills" className="space-y-8 py-4">
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-2xl text-text-primary">Skills</h2>
            <p className="font-sans text-sm text-text-secondary">로봇 프로젝트를 진행하며 배운 기술과 역량입니다.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {[
              { text: 'C Coding', icon: Code },
              { text: 'Micro Python Coding', icon: Terminal },
              { text: 'Block Coding', icon: Puzzle },
              { text: 'Robot Building', icon: Bot },
              { text: 'Problem Solving', icon: Brain },
              { text: 'Teamwork', icon: Users },
              { text: 'PPT Presentation', icon: LineChart },
              { text: 'Instruction Making', icon: BookOpen }
            ].map((skill, index) => {
              const IconComp = skill.icon;
              return (
                <div 
                  key={index} 
                  className="px-5 py-4.5 glass-card rounded-xl flex items-center gap-3.5 border-l-[3.5px] border-l-brand-accent hover:bg-brand-accent/5 hover:border-r border-r-brand-accent/10 transition-colors"
                >
                  <IconComp className="w-5 h-5 text-brand-accent" />
                  <span className="font-mono text-xs text-text-primary tracking-wide">{skill.text}</span>
                </div>
              );
            })}

          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Awards Section */}
        <section id="awards" className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left side info block */}
            <div className="lg:w-1/3 space-y-3">
              <h2 className="font-heading font-bold text-2xl text-text-primary">Certifications &amp; Awards</h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                로봇 대회 참가 및 수상 내용을 정리했습니다.
              </p>
            </div>

            {/* Right side list */}
            <div className="lg:w-2/3 space-y-4">
              
              <div className="p-5.5 glass-card border-l-[4px] border-l-brand-accent rounded-xl flex justify-between items-center group relative overflow-hidden">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-[#1b1f2c] rounded-lg border border-brand-accent/10">
                    <Trophy className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm md:text-base text-text-primary">
                      2026 RoboCup Korea Open (CoSpace U12)
                    </h3>
                    <p className="text-brand-accent font-bold text-xs mt-0.5">1st Place</p>
                  </div>
                </div>
                <Sparkle className="w-5 h-5 text-brand-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-5.5 glass-card border-l-[4px] border-l-brand-accent rounded-xl flex justify-between items-center group relative overflow-hidden">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-[#1b1f2c] rounded-lg border border-brand-accent/10">
                    <Sparkles className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm md:text-base text-text-primary">
                      2026 RoboCup Singapore Open (CoSpace U12)
                    </h3>
                    <p className="text-brand-accent font-bold text-xs mt-0.5">Influencer Awards</p>
                  </div>
                </div>
                <Sparkle className="w-5 h-5 text-brand-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

            </div>

          </div>
        </section>

        <div className="tech-divider"></div>

        {/* Dynamic Portfolio Grid Section */}
        <section id="portfolio" className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-heading font-bold text-2xl text-text-primary tracking-tight">Portfolio</h2>
            <p className="font-sans text-sm text-text-secondary">완성한 로봇 프로젝트와 웹앱 결과물을 소개합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Project 1 */}
            <div className="glass-card flex flex-col overflow-hidden rounded-xl border border-brand-accent/10 shadow-md group glass-card-hover">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  alt="Line Tracing Robot" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATNa91nFws4uRNOrXMTe6odQhTs6PzxJOBvdiQqfdSpuy035L2aVxP5dKih7lh7DHbJGpvWqznZkxPpWlGoXJs-9VMiSTobIMg6YBA9A6jDq_TJew2rMrSS1bLxOLhddcoPLCu9AWeB9xUivNiUj7xwM1oIY_iNL21kdWXwe6g7uWJKxvULdnyG8pdScLnaAgxeVMLYkziELaq_oKg6qA4afoH2dOd6SgD6KsZX3BJUN2jIyrDrnRcxj6nfV8kFU9neMPx0v-VSAk"
                />
                <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-1.5 bg-brand-accent text-[#002022] font-semibold text-xs rounded shadow-lg">
                    자세히 보기
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold text-base text-text-primary">Line Tracing Robot</h3>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">
                    컬러 센서를 사용해 검은 선을 따라가는 로봇 프로젝트입니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/20">
                  {['Color Sensor', 'Motor Control', 'Block Coding'].map((term) => (
                    <span key={term} className="font-mono text-[9px] px-2 py-0.5 border border-brand-accent/20 text-brand-accent rounded bg-[#0f131f]/60">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="glass-card flex flex-col overflow-hidden rounded-xl border border-brand-accent/10 shadow-md group glass-card-hover">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  alt="Sumo Robot" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPJBJUJ4rlYqJLW8m7pr-RevqVOerirbC04pp9k-yYfuihphRVN7oHgEJvTdgKZSY9jRcdM8GXgwGrEg6EH0s5UvAdLwllPlMZ5m6LqTvMy0g5ld86FXeDmKHs_WSXCXonfgKlLzncz4icqHbTh8BBgaoWO5Ud47A_VOwMzcb3nRRsVQK7S8jqO_UkcWQkacUdYRag0hO4typpzR60kaihtI4MABj4P_vo5CdYLvTL4BG24DJx70Nr8pSl5qu_95SRKzchkvalwnc"
                />
                <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-1.5 bg-brand-accent text-[#002022] font-semibold text-xs rounded shadow-lg">
                    자세히 보기
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold text-base text-text-primary">Sumo Robot</h3>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">
                    상대 로봇을 감지하고 밀어내는 로봇 프로젝트입니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/20">
                  {['Ultrasonic Sensor', 'Motor Power', 'Robot Design'].map((term) => (
                    <span key={term} className="font-mono text-[9px] px-2 py-0.5 border border-brand-accent/20 text-brand-accent rounded bg-[#0f131f]/60">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="glass-card flex flex-col overflow-hidden rounded-xl border border-brand-accent/10 shadow-md group glass-card-hover">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  alt="Mission Robot" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeK8vIjYVmvtrxxxLcaEyfQ0YpwlRyRS7_JaZH6axdWcUw4d3QAAbDdzHcpTm3l7iPfI1nJh8P6CkToIcyEr-2EVDzZ_zjJ6XD20cVCA3vWwMV_8cI2ikCPv3jSW3j6p0wQ21nwcmt_QT-00WVfX3ieXQqeqLlRgtfhPEp49wC7iG1TwKvRqhKSTGeOqMpD2dNxagfj9-w1AJk1aHAGcdpC5n3IUNf2tnq7kHaS5KP_-slikMZ2-enLCMh7GOOnExpFf8Een0TK6U"
                />
                <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-1.5 bg-brand-accent text-[#002022] font-semibold text-xs rounded shadow-lg">
                    자세히 보기
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-[14px] flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold text-base text-text-primary">Mission Robot</h3>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">
                    정해진 미션을 수행하기 위해 구조와 코드를 설계한 프로젝트입니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/20">
                  {['Mission Strategy', 'Sensor Control', 'Debugging'].map((term) => (
                    <span key={term} className="font-mono text-[9px] px-2 py-0.5 border border-brand-accent/20 text-brand-accent rounded bg-[#0f131f]/60">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="glass-card flex flex-col overflow-hidden rounded-xl border border-brand-accent/10 shadow-md group glass-card-hover">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  alt="Robot Portfolio Web App" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbS0qzXlMtNRPTS9brLvH2V4coGccyZ3ihVxiT_JJw9nufnaLme0cKjc2r2DOKquCS63cyw7jaAU4wL3s05MSMsSTjdKimAosNNuo1Wo7XMFrWXSthfA4XHz4T-K2KPns_9yhc2onv4U-YIDcxUqU_6vX7RSD76onzLsd-8Y3aKkAlep_HNtQ0jWjVL8al5OImTxgj5TLJzPT--Ww-p_mcqVPHu9XI7ub9NWgyHWTNKcCWyARKseb2Ee7ojB7CT1sKqsXqpjpoCck"
                />
                <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-1.5 bg-brand-accent text-[#002022] font-semibold text-xs rounded shadow-lg">
                    자세히 보기
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold text-base text-text-primary">Robot Portfolio Web App</h3>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">
                    나의 로봇 프로젝트를 소개하기 위해 만든 웹앱입니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/20">
                  {['Web Design', 'AI Tool', 'Portfolio Design'].map((term) => (
                    <span key={term} className="font-mono text-[9px] px-2 py-0.5 border border-brand-accent/20 text-brand-accent rounded bg-[#0f131f]/60">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>

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
                href="mailto:contact@robot specialist.com" 
                className="text-text-secondary/90 hover:text-brand-accent transition-colors flex items-center gap-2 text-xs md:text-sm"
              >
                <Mail className="w-4 h-4 text-brand-accent/60" />
                <span>contact@robot specialist.com</span>
              </a>
            </div>

            <div className="flex gap-6 text-[11px] font-mono text-text-secondary">
              <a href="#" className="hover:text-brand-accent transition-colors">GitHub</a>
              <a 
                href="#portfolio" 
                onClick={(e) => handleScrollTo('portfolio', e)} 
                className="hover:text-brand-accent transition-colors"
              >
                Portfolio
              </a>
              <a href="#" className="hover:text-brand-accent transition-colors">Contact</a>
            </div>
          </div>

        </div>

        <div className="text-center pt-10 pb-2 opacity-25 pointer-events-none w-full">
          <p className="font-mono text-[9px] tracking-[0.55em] text-brand-accent uppercase select-none">
            System.Operational // 0x2026_Core
          </p>
        </div>
      </footer>
    </div>
  );
}
