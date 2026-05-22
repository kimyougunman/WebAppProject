import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MobilePortfolio from './components/MobilePortfolio';
import DesktopPortfolio from './components/DesktopPortfolio';
import { Screen, TransitionDirection } from './types';
import { RefreshCw, Monitor, Smartphone, HelpCircle } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<Screen>('mobile');
  const [direction, setDirection] = useState<TransitionDirection>('push');
  const [showHelperInfo, setShowHelperInfo] = useState(true);

  const handleNavigate = (nextScreen: Screen, transitionDir: TransitionDirection) => {
    setDirection(transitionDir);
    setScreen(nextScreen);
  };

  // Switcher variants
  const slideVariants = {
    enter: (dir: TransitionDirection) => ({
      x: dir === 'push' ? '120%' : '-120%',
      opacity: 0,
    }),
    center: {
      x: '0%',
      opacity: 1,
    },
    exit: (dir: TransitionDirection) => ({
      x: dir === 'push' ? '-120%' : '120%',
      opacity: 0,
    }),
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#070b13] overflow-x-hidden flex flex-col justify-start">
      
      {/* Top Prototype Metadata Controller Interface */}
      <div className="w-full bg-[#0a0f1d] border-b border-brand-accent/15 px-4 py-2 flex flex-wrap items-center justify-between text-xs font-mono text-text-secondary select-none relative z-50 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></span>
          <span className="text-brand-accent tracking-wider font-bold">PROTOTYPE ENGINE v2.6 //</span>
          <span className="text-text-secondary/70">ACTIVE SCREEN: </span>
          <span className="px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/25 text-brand-accent uppercase text-[10px] font-bold">
            {screen}
          </span>
        </div>

        {/* Floating Controls */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-text-secondary/60">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Initial</span>
            <span className="text-[#3a494b] mx-0.5">→</span>
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop Active</span>
          </div>

          <button 
            onClick={() => handleNavigate(screen === 'mobile' ? 'desktop' : 'mobile', screen === 'mobile' ? 'push' : 'push_back')}
            className="px-3 py-1 rounded-md bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/20 text-brand-accent text-[11px] flex items-center gap-1.5 cursor-pointer select-none active:scale-95 transition-all font-semibold"
            title="Force switch screen layout for testing"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Toggle View</span>
          </button>
        </div>
      </div>

      {/* Screen Navigation Guide Overlay */}
      {showHelperInfo && (
        <div className="mx-auto max-w-[1280px] w-full px-5 pt-3 select-none">
          <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-xl px-4 py-3 text-xs text-text-secondary/90 flex justify-between items-start gap-3">
            <div className="flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <span className="font-bold text-text-primary">Interactive Navigation Guide:</span>
                <p className="leading-relaxed">
                  • <strong className="text-brand-accent">In Mobile view:</strong> Click the <strong className="text-brand-accent">"View Systems"</strong> button or open the menu/footer and click <strong className="text-brand-accent">"Portfolio"</strong> to slide into Desktop.<br />
                  • <strong className="text-brand-accent">In Desktop view:</strong> Click the <strong className="text-text-primary font-bold">"My Robot Portfolio"</strong> title logo in the header or the "Mobile View" link to slide sliding back to Mobile.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowHelperInfo(false)} 
              className="text-[#849495] hover:text-brand-accent transition-colors text-xs font-mono font-bold cursor-pointer select-none px-1"
            >
              [Dismiss]
            </button>
          </div>
        </div>
      )}

      {/* Frame Sliding Presentation Core with AnimatePresence */}
      <div className="relative flex-1 w-full overflow-hidden flex flex-col justify-start">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={screen}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 380, damping: 32 },
              opacity: { duration: 0.22 },
            }}
            className="w-full flex-1 flex flex-col"
          >
            {screen === 'mobile' ? (
              <MobilePortfolio onNavigate={handleNavigate} />
            ) : (
              <DesktopPortfolio onNavigate={handleNavigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
