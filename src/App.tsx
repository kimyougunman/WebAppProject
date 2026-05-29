import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MobilePortfolio from './components/MobilePortfolio';
import DesktopPortfolio from './components/DesktopPortfolio';
import { Screen, TransitionDirection, PortfolioData, Project, ExperienceLog, AwardItem } from './types';
import { DEFAULT_PORTFOLIO_DATA } from './data';
import { isFirebaseConfigured, db, auth, storage } from './firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User 
} from 'firebase/auth';
import { 
  doc, 
  onSnapshot, 
  setDoc 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { 
  RefreshCw, 
  Monitor, 
  Smartphone, 
  HelpCircle, 
  Edit2, 
  Save, 
  X, 
  Download, 
  Upload, 
  Lock, 
  Unlock, 
  Sun, 
  Moon,
  AlertCircle,
  Copy,
  Check,
  LogOut
} from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
    },
    operationType,
    path
  };
  console.error('Firestore Error details: ', JSON.stringify(errInfo));
}

export default function App() {
  // Navigation Screens
  const [screen, setScreen] = useState<Screen>('mobile');
  const [direction, setDirection] = useState<TransitionDirection>('push');
  const [showHelperInfo, setShowHelperInfo] = useState(true);

  // Core Data State (synchronized with Firestore or localStorage fallback)
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [dbLoading, setDbLoading] = useState(isFirebaseConfigured);

  // Edit Mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempPortfolioData, setTempPortfolioData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);

  // Theme state (Dark vs Light)
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    return localStorage.getItem('portfolio_light_mode') === 'true';
  });

  // Track Firebase authenticated user
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(isFirebaseConfigured);

  // Legacy Password Lock state (only used if Firebase is not active)
  const [storedPassword, setStoredPassword] = useState<string>(() => {
    return localStorage.getItem('portfolio_admin_password') || '';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [newPasswordValue, setNewPasswordValue] = useState('');

  // Firebase email authentication state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  // JSON Import / Export modal state
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [jsonInputText, setJsonInputText] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Sync theme with localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_light_mode', String(isLightMode));
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

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

  // Synchronize Firestore/Local Storage data
  useEffect(() => {
    if (isFirebaseConfigured && db) {
      setDbLoading(true);
      const docRef = doc(db, 'portfolios', 'main');
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          setPortfolioData(snapshot.data() as PortfolioData);
        } else {
          // Document empty in firestore, initialize with default content
          setDoc(docRef, DEFAULT_PORTFOLIO_DATA)
            .catch(err => handleFirestoreError(err, OperationType.WRITE, 'portfolios/main'));
          setPortfolioData(DEFAULT_PORTFOLIO_DATA);
        }
        setDbLoading(false);
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, 'portfolios/main');
        setDbLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local fallback
      const saved = localStorage.getItem('robot_portfolio_data');
      if (saved) {
        try {
          setPortfolioData(JSON.parse(saved));
        } catch (e) {
          console.error('Failed parsing local data fallback', e);
        }
      } else {
        setPortfolioData(DEFAULT_PORTFOLIO_DATA);
      }
      setDbLoading(false);
    }
  }, []);

  // Track Firebase authenticated user
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      // Exit Edit mode automatically if user logs out
      if (!user) {
        setIsEditMode(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Edit Mode Toggle
  const handleStartEditing = () => {
    if (isFirebaseConfigured) {
      if (currentUser) {
        setTempPortfolioData(JSON.parse(JSON.stringify(portfolioData)));
        setIsEditMode(true);
      } else {
        setLoginEmail('');
        setLoginPassword('');
        setLoginError('');
        setIsSignUpMode(false);
        setIsLoginModalOpen(true);
      }
    } else {
      // Offline simulation password flow
      if (storedPassword) {
        setPasswordInput('');
        setPasswordError('');
        setIsPasswordModalOpen(true);
      } else {
        setTempPortfolioData(JSON.parse(JSON.stringify(portfolioData)));
        setIsEditMode(true);
      }
    }
  };

  const handleVerifyPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === storedPassword) {
      setIsPasswordModalOpen(false);
      setPasswordError('');
      setTempPortfolioData(JSON.parse(JSON.stringify(portfolioData)));
      setIsEditMode(true);
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다. (Invalid Password)');
    }
  };

  const handleFirebaseLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoginError('');
    try {
      if (isSignUpMode) {
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
        setCurrentUser(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        setCurrentUser(userCredential.user);
      }
      setIsLoginModalOpen(false);
      setTempPortfolioData(JSON.parse(JSON.stringify(portfolioData)));
      setIsEditMode(true);
    } catch (err) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError('인증 실패. (Authentication Failed)');
      }
    }
  };

  const handleSignOut = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error('Sign-out failed', err);
      }
    }
  };

  // Edit Mode Save / Cancel
  const handleSaveEdits = async () => {
    try {
      if (isFirebaseConfigured && db) {
        const docRef = doc(db, 'portfolios', 'main');
        await setDoc(docRef, tempPortfolioData);
      } else {
        setPortfolioData(tempPortfolioData);
        localStorage.setItem('robot_portfolio_data', JSON.stringify(tempPortfolioData));
      }
      setIsEditMode(false);
    } catch (err) {
      alert('저장 실패 (Save Failed): ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleCancelEdits = () => {
    setIsEditMode(false);
  };

  // Field Updates in Draft Mode
  const updateDraftField = (field: keyof PortfolioData, value: any) => {
    setTempPortfolioData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Skills handlers
  const handleAddSkill = (skillText: string) => {
    if (!skillText.trim()) return;
    setTempPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, skillText.trim()]
    }));
  };

  const handleDeleteSkill = (index: number) => {
    setTempPortfolioData(prev => {
      const skillsCopy = [...prev.skills];
      skillsCopy.splice(index, 1);
      return { ...prev, skills: skillsCopy };
    });
  };

  const handleUpdateSkill = (index: number, value: string) => {
    setTempPortfolioData(prev => {
      const skillsCopy = [...prev.skills];
      skillsCopy[index] = value;
      return { ...prev, skills: skillsCopy };
    });
  };

  // Projects list handlers
  const handleAddProject = () => {
    const newProject: Project = {
      id: 'p_' + Date.now(),
      title: '새 프로젝트 (New Project)',
      description: '프로젝트에 대한 설명을 여기에 적어주세요.',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      tags: ['ROS2', 'Python', 'C++']
    };
    setTempPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const handleDeleteProject = (id: string) => {
    setTempPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const handleUpdateProject = (id: string, updated: Partial<Project>) => {
    setTempPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updated } : p)
    }));
  };

  const handleSortProject = (index: number, moveDirection: 'up' | 'down') => {
    setTempPortfolioData(prev => {
      const list = [...prev.projects];
      if (moveDirection === 'up' && index > 0) {
        const temp = list[index];
        list[index] = list[index - 1];
        list[index - 1] = temp;
      } else if (moveDirection === 'down' && index < list.length - 1) {
        const temp = list[index];
        list[index] = list[index + 1];
        list[index + 1] = temp;
      }
      return { ...prev, projects: list };
    });
  };

  // Experiences handlers
  const handleAddExperience = () => {
    const newExp: ExperienceLog = {
      id: 'e_' + Date.now(),
      year: '2026',
      period: '2026.XX',
      role: '새 역할 (New Role)',
      organization: '소속 기관 (Organization)',
      details: ['여기에 프로젝트 미션과 세부 수행 활동들을 서술해주세요.'],
      iconName: 'wrench'
    };
    setTempPortfolioData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const handleDeleteExperience = (id: string) => {
    setTempPortfolioData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }));
  };

  const handleUpdateExperience = (id: string, updated: Partial<ExperienceLog>) => {
    setTempPortfolioData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => e.id === id ? { ...e, ...updated } : e)
    }));
  };

  const handleSortExperience = (index: number, moveDirection: 'up' | 'down') => {
    setTempPortfolioData(prev => {
      const list = [...prev.experiences];
      if (moveDirection === 'up' && index > 0) {
        const temp = list[index];
        list[index] = list[index - 1];
        list[index - 1] = temp;
      } else if (moveDirection === 'down' && index < list.length - 1) {
        const temp = list[index];
        list[index] = list[index + 1];
        list[index + 1] = temp;
      }
      return { ...prev, experiences: list };
    });
  };

  // Awards handlers
  const handleAddAward = () => {
    const newAward: AwardItem = {
      id: 'a_' + Date.now(),
      title: '새로운 수상 내역 및 인증',
      award: '대상 / 1등 수상',
      iconName: 'trophy'
    };
    setTempPortfolioData(prev => ({
      ...prev,
      awards: [...prev.awards, newAward]
    }));
  };

  const handleDeleteAward = (id: string) => {
    setTempPortfolioData(prev => ({
      ...prev,
      awards: prev.awards.filter(a => a.id !== id)
    }));
  };

  const handleUpdateAward = (id: string, updated: Partial<AwardItem>) => {
    setTempPortfolioData(prev => ({
      ...prev,
      awards: prev.awards.map(a => a.id === id ? { ...a, ...updated } : a)
    }));
  };

  // Real Storage Upload function passed to view components
  const handleUploadImage = async (projectId: string, file: File): Promise<string> => {
    if (isFirebaseConfigured && storage) {
      const imgRef = ref(storage, `projects/${projectId}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } else {
      // Local fallback - read file as base64 string
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('FileReader returned non-string result'));
          }
        };
        reader.onerror = () => reject(new Error('FileReader failed'));
        reader.readAsDataURL(file);
      });
    }
  };

  // Password Setup handlers (offline mode)
  const handleSaveNewPassword = () => {
    setStoredPassword(newPasswordValue);
    localStorage.setItem('portfolio_admin_password', newPasswordValue);
    setIsSettingPassword(false);
  };

  // JSON Import & Export handlers
  const handleOpenJsonModal = () => {
    setJsonInputText(JSON.stringify(isEditMode ? tempPortfolioData : portfolioData, null, 2));
    setJsonError('');
    setIsJsonModalOpen(true);
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInputText);
      if (parsed && typeof parsed === 'object') {
        if (isEditMode) {
          setTempPortfolioData(parsed);
        } else {
          setPortfolioData(parsed);
          localStorage.setItem('robot_portfolio_data', JSON.stringify(parsed));
        }
        setIsJsonModalOpen(false);
        setJsonError('');
      } else {
        setJsonError('올바른 객체 형식의 JSON이 아닙니다.');
      }
    } catch (e) {
      setJsonError('JSON 파싱 에러: 형식이 맞지 않습니다. (Invalid JSON Format)');
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(jsonInputText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Reset to original default text
  const handleResetToDefaults = () => {
    if (window.confirm('모든 로컬 수정 기록을 삭제하고 초기 고정 텍스트 기획으로 초기화하시겠습니까?')) {
      if (isEditMode) {
        setTempPortfolioData(JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA)));
      } else {
        setPortfolioData(DEFAULT_PORTFOLIO_DATA);
        localStorage.setItem('robot_portfolio_data', JSON.stringify(DEFAULT_PORTFOLIO_DATA));
      }
    }
  };

  return (
    <div className={`relative min-h-[100dvh] w-full transition-colors duration-300 ${isLightMode ? 'light-theme bg-[#edf2f7]' : 'bg-[#070b13]'}`}>
      
      {/* Top Prototype Metadata Controller Interface */}
      <div className="w-full bg-[#0a0f1d] border-b border-brand-accent/15 px-4 py-2 flex flex-wrap items-center justify-between text-xs font-mono text-text-secondary select-none relative z-50 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></span>
          <span className="text-brand-accent tracking-wider font-bold">PROTOTYPE ENGINE v3.0 //</span>
          <span className="text-text-secondary/70">VIEW LAYOUT:</span>
          <span className="px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/25 text-brand-accent uppercase text-[10px] font-bold">
            {screen}
          </span>
          {isEditMode && (
            <span className="ml-2 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold uppercase text-[9px] animate-pulse">
              ● EDITING MODE ACTIVE
            </span>
          )}
          {isFirebaseConfigured && (
            <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase text-[9px] font-bold">
              CLOUD (FIREBASE) ACTIVE
            </span>
          )}
        </div>

        {/* Global Controls: Toggle, Dark/Light, Reset, Admin LogOut, Export */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 px-2.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-brand-accent text-[11px] flex items-center gap-1.5 cursor-pointer"
            title="다크 / 라이트 테마 전환"
          >
            {isLightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isLightMode ? 'Dark Theme' : 'Light Theme'}</span>
          </button>

          {/* Authentication State LogOut Indicator */}
          {isFirebaseConfigured ? (
            currentUser ? (
              <button
                onClick={handleSignOut}
                className="p-1 px-2.5 rounded bg-red-950/40 hover:bg-red-900 border border-red-500/30 text-red-400 text-[11px] flex items-center gap-1.5 cursor-pointer"
                title="관리자 세션 로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Admin Logout ({currentUser.email?.split('@')[0]})</span>
              </button>
            ) : (
              <span className="hidden sm:inline px-2 py-1 text-[10px] text-text-secondary/50 font-mono border border-white/5 bg-white/5 rounded">
                Admin Locked 🔒
              </span>
            )
          ) : (
            /* Legacy Lock Toggle if Firebase is offline */
            <button
              onClick={() => {
                setNewPasswordValue(storedPassword);
                setIsSettingPassword(true);
              }}
              className={`p-1 px-2.5 rounded border text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors ${storedPassword ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' : 'bg-white/5 border-white/10 text-text-secondary/70'}`}
              title="관리자 비밀번호 기반 편집 방지 잠금 설정"
            >
              {storedPassword ? <Lock className="w-3.5 h-3.5 text-emerald-400" /> : <Unlock className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{storedPassword ? 'Admin Lock: On' : 'Set Admin Lock'}</span>
            </button>
          )}

          {/* Backup / Export Import */}
          <button
            onClick={handleOpenJsonModal}
            className="p-1 px-2.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-brand-accent text-[11px] flex items-center gap-1.5 cursor-pointer"
            title="JSON 백업 및 복원 기능"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">JSON Export/Import</span>
          </button>

          <button 
            onClick={() => handleNavigate(screen === 'mobile' ? 'desktop' : 'mobile', screen === 'mobile' ? 'push' : 'push_back')}
            className="px-2.5 py-1 rounded bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/20 text-brand-accent text-[11px] flex items-center gap-1.5 cursor-pointer select-none active:scale-95 transition-all font-semibold"
            title="Force switch screen layout for testing"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Toggle View</span>
          </button>
        </div>
      </div>

      {/* Screen Navigation Guide Overlay */}
      {showHelperInfo && (
        <div className="mx-auto max-w-[1280px] w-full px-5 pt-3 select-none relative z-10 w-full">
          <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-xl px-4 py-3 text-xs text-text-secondary/90 flex justify-between items-start gap-3">
            <div className="flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <span className="font-bold text-text-primary">Interactive Editing Guide:</span>
                <p className="leading-relaxed text-[#b9cacb] dark:text-text-secondary">
                  • 우측 하단의 <strong className="text-brand-accent uppercase">"Edit Mode"</strong> 플로팅 단추를 누르면 포트폴리오를 대시보드처럼 자율 편집하고 관리할 수 있습니다.<br />
                  • {isFirebaseConfigured ? <span className="font-semibold text-emerald-400">Firebase 실시간 동기화가 설정되었습니다! 클라우드에 즉시 저장되고 새로고침에도 보존됩니다.</span> : '현재는 로컬 브라우저 세션 모드입니다. 우수작용을 원할히 테스트할 수 있으며, 이 데이터는 localStorage에 반영 보존됩니다.'}<br />
                  • 프로젝트 카드 이미지 영역은 드래그 드롭 또는 파일 업로드를 지원하며 {isFirebaseConfigured ? 'Firebase Storage 클라우드에 안전하게 보관됩니다.' : 'Base64 인코딩 주소로 로컬 저장됩니다.'}<br />
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
      <div className="relative flex-1 w-full overflow-hidden flex flex-col justify-start min-h-[calc(100vh-80px)]">
        {dbLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-dashed border-brand-accent rounded-full animate-spin"></div>
            <p className="font-mono text-xs text-brand-accent animate-pulse">로보틱스 포트폴리오 데이터를 동기화하는 중...</p>
          </div>
        ) : (
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
                <MobilePortfolio 
                  onNavigate={handleNavigate}
                  data={portfolioData}
                  isEditMode={isEditMode}
                  tempData={tempPortfolioData}
                  onChangeField={updateDraftField}
                  onAddProject={handleAddProject}
                  onDeleteProject={handleDeleteProject}
                  onUpdateProject={handleUpdateProject}
                  onSortProject={handleSortProject}
                  onAddExperience={handleAddExperience}
                  onDeleteExperience={handleDeleteExperience}
                  onUpdateExperience={handleUpdateExperience}
                  onSortExperience={handleSortExperience}
                  onAddAward={handleAddAward}
                  onDeleteAward={handleDeleteAward}
                  onUpdateAward={handleUpdateAward}
                  onAddSkill={handleAddSkill}
                  onDeleteSkill={handleDeleteSkill}
                  onUpdateSkill={handleUpdateSkill}
                  onUploadImage={handleUploadImage}
                />
              ) : (
                <DesktopPortfolio 
                  onNavigate={handleNavigate}
                  data={portfolioData}
                  isEditMode={isEditMode}
                  tempData={tempPortfolioData}
                  onChangeField={updateDraftField}
                  onAddProject={handleAddProject}
                  onDeleteProject={handleDeleteProject}
                  onUpdateProject={handleUpdateProject}
                  onSortProject={handleSortProject}
                  onAddExperience={handleAddExperience}
                  onDeleteExperience={handleDeleteExperience}
                  onUpdateExperience={handleUpdateExperience}
                  onSortExperience={handleSortExperience}
                  onAddAward={handleAddAward}
                  onDeleteAward={handleDeleteAward}
                  onUpdateAward={handleUpdateAward}
                  onAddSkill={handleAddSkill}
                  onDeleteSkill={handleDeleteSkill}
                  onUpdateSkill={handleUpdateSkill}
                  onUploadImage={handleUploadImage}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Neon Flowing Edit Floating Button Panel (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-mono">
        {isEditMode ? (
          <div className="flex flex-col gap-2.5 bg-[#0a0e1c]/95 border-2 border-brand-accent p-3.5 rounded-xl shadow-[0_0_30px_rgba(0,219,231,0.3)] animate-bounce-short">
            <span className="text-[10px] text-brand-accent tracking-tighter text-center font-bold font-sans flex items-center justify-center gap-1.5 border-b border-brand-accent/20 pb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>편집 상태 // DRAFT VERSION</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCancelEdits}
                className="px-3 py-2 bg-red-950/70 hover:bg-red-900 border border-red-500/40 text-red-300 font-semibold rounded text-xs cursor-pointer flex items-center gap-1 active:scale-95 transition-all w-[110px] justify-center"
              >
                <X className="w-3.5 h-3.5" />
                <span>취소 Cancel</span>
              </button>
              <button
                onClick={handleSaveEdits}
                className="px-3 py-2 bg-brand-accent text-[#002022] font-extrabold rounded text-xs cursor-pointer flex items-center gap-1 active:scale-95 transition-all w-[110px] justify-center shadow-[0_0_15px_rgba(0,219,231,0.6)]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>저장 Save</span>
              </button>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleResetToDefaults}
                className="w-full text-center py-1 bg-white/5 hover:bg-white/10 active:scale-95 text-[10px] text-text-secondary/60 border border-white/5 rounded cursor-pointer"
                title="초기 텍스트 설정으로 전면 리셋"
              >
                초기 고정값으로 전면 리셋 (Set Defaults)
              </button>
            </div>
          </div>
        ) : (
          <button
            id="edit-mode-trigger"
            onClick={handleStartEditing}
            className="flex items-center gap-2 px-5 py-4 bg-[#0a0f1d] hover:bg-brand-accent/15 border-2 border-brand-accent text-brand-accent font-bold rounded-full cursor-pointer shadow-[0_0_20px_rgba(0,219,231,0.25)] hover:shadow-[0_0_35px_rgba(0,219,231,0.55)] transition-all duration-300 select-none group"
          >
            <Edit2 className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
            <span className="tracking-wider uppercase text-xs">Edit Mode</span>
          </button>
        )}
      </div>

      {/* Firebase Auth Admin Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-brand-accent/40 shadow-[0_0_40px_rgba(0,219,231,0.3)] space-y-4">
            <div className="flex items-center gap-3 border-b border-brand-accent/20 pb-3">
              <Lock className="w-5 h-5 text-brand-accent" />
              <div>
                <h4 className="font-heading font-extrabold text-sm text-text-primary">
                  {isSignUpMode ? '관리자 신규 가입 (Admin Sign Up)' : '관리자 이메일 로그인 (Admin Log In)'}
                </h4>
                <p className="text-[10px] text-text-secondary/60 font-mono mt-0.5">
                  {isSignUpMode ? 'Create a secure email credential for editing.' : 'Sign in to access secure online editing mode.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleFirebaseLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-brand-accent">이메일 주소 (Email Address)</label>
                <input 
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@robotops.com"
                  className="w-full bg-[#0d1222]/90 border border-brand-accent/45 px-3.5 py-2 rounded-lg text-sm text-text-primary outline-none focus:border-brand-accent focus:shadow-[0_0_10px_rgba(0,219,231,0.15)] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-brand-accent">비밀번호 입력 (Password)</label>
                <input 
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0d1222]/90 border border-brand-accent/45 px-3.5 py-2 rounded-lg text-sm text-text-primary outline-none focus:border-brand-accent focus:shadow-[0_0_10px_rgba(0,219,231,0.15)] font-mono"
                />
              </div>

              {loginError && (
                <div className="flex items-start gap-1.5 text-xs text-red-400 bg-red-950/20 p-2 rounded border border-red-500/20">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="break-all">{loginError}</span>
                </div>
              )}

              <div className="flex flex-col gap-2 pt-1.5 text-xs font-mono">
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsLoginModalOpen(false)}
                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-lg text-text-secondary cursor-pointer text-center"
                  >
                    취소 Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-brand-accent text-[#002022] hover:opacity-90 active:scale-95 font-bold rounded-lg cursor-pointer text-center"
                  >
                    {isSignUpMode ? '가입 Register' : '로그인 Sign In'}
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsSignUpMode(!isSignUpMode)}
                  className="mt-1 w-full text-center hover:text-brand-accent text-[#5a7c85] hover:underline cursor-pointer py-1"
                >
                  {isSignUpMode ? '이미 계정이 있나요? 로그인하기' : '가입된 관리자가 없나요? 신규 가입하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Validation Modal Overlay (Offline Lock fallback) */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-brand-accent/40 shadow-[0_0_40px_rgba(0,219,231,0.3)] space-y-4">
            <div className="flex items-center gap-3 border-b border-brand-accent/20 pb-3">
              <Lock className="w-5 h-5 text-brand-accent" />
              <div>
                <h4 className="font-heading font-extrabold text-sm text-text-primary">관리자 잠금 해제 (Enter Admin Password)</h4>
                <p className="text-[10px] text-text-secondary/60 font-mono mt-0.5">Password is required to unlock Edit Mode.</p>
              </div>
            </div>

            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-brand-accent">비밀번호 입력</label>
                <input 
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Password..."
                  autoFocus
                  className="w-full bg-[#0d1222]/90 border border-brand-accent/40 px-3.5 py-2 rounded-lg text-sm text-text-primary outline-none focus:border-brand-accent focus:shadow-[0_0_10px_rgba(0,219,231,0.15)] font-mono"
                />
              </div>

              {passwordError && (
                <div className="flex items-start gap-1.5 text-xs text-red-400 bg-red-950/20 p-2 rounded border border-red-500/20">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{passwordError}</span>
                </div>
              )}

              <div className="flex gap-2.5 pt-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-lg text-text-secondary cursor-pointer text-center"
                >
                  취소 Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-brand-accent text-[#002022] hover:opacity-90 active:scale-95 font-bold rounded-lg cursor-pointer text-center"
                >
                  잠금해제 Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Setting Modal Overlay (Offline fallback) */}
      {isSettingPassword && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card p-6 rounded-2xl border border-brand-accent/40 shadow-[0_0_30px_rgba(0,219,231,0.25)] space-y-4">
            <div className="flex items-center gap-3 border-b border-brand-accent/20 pb-3">
              <Lock className="w-5 h-5 text-brand-accent" />
              <div>
                <h4 className="font-heading font-extrabold text-sm text-text-primary">관리자 비밀번호 설정</h4>
                <p className="text-[10px] text-text-secondary/60 font-mono mt-0.5">Edit Mode에 진입을 방지할 비밀번호를 지정하세요.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-brand-accent">새 비밀번호 (비우면 잠금 사용 해제)</label>
                <input 
                  type="text"
                  value={newPasswordValue}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                  placeholder="비밀번호 미설정시 바로 진입 가능"
                  className="w-full bg-[#0d1222]/90 border border-brand-accent/40 px-3.5 py-2 rounded-lg text-sm text-text-primary outline-none focus:border-brand-accent focus:shadow-[0_0_10px_rgba(0,219,231,0.15)] font-mono"
                />
                <p className="text-[10px] text-text-secondary/50 font-sans leading-relaxed">
                  * 주의: 비밀번호를 지정하면 저장 후 Edit Mode에 진입 시 이 암호를 입력해야 열립니다. 지우고 빈칸으로 보관하면 자율 직접편집 상태가 활성화됩니다.
                </p>
              </div>

              <div className="flex gap-2.5 pt-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setIsSettingPassword(false)}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-text-secondary cursor-pointer"
                >
                  닫기
                </button>
                <button
                  type="button"
                  onClick={handleSaveNewPassword}
                  className="flex-1 py-2 bg-brand-accent text-[#002022] hover:opacity-90 font-bold rounded-lg cursor-pointer"
                >
                  비밀번호 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JSON Import / Export Modal */}
      {isJsonModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="w-full max-w-2xl glass-card p-6 rounded-2xl border border-brand-accent/40 shadow-[0_0_50px_rgba(0,219,231,0.3)] flex flex-col max-h-[85vh] space-y-4">
            <div className="flex items-center justify-between border-b border-brand-accent/20 pb-3">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-brand-accent" />
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-text-primary">JSON 데이터 내보내기 및 가져오기</h4>
                  <p className="text-[10px] text-text-secondary/60 font-mono mt-0.5">Export current state as JSON or paste custom schema to import.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsJsonModalOpen(false)}
                className="text-text-secondary hover:text-brand-accent p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col space-y-2.5">
              <div className="flex justify-between items-center text-[11px] font-mono text-brand-accent">
                <span>포트폴리오 스키마 (Portfolio JSON Data)</span>
                <button
                  onClick={handleCopyToClipboard}
                  className="px-2.5 py-1 bg-white/5 hover:bg-brand-accent/15 border border-brand-accent/25 rounded flex items-center gap-1 active:scale-95 cursor-pointer text-text-primary text-[10px]"
                >
                  {copySuccess ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copySuccess ? '복사 완료!' : '복사 Copy to Clipboard'}</span>
                </button>
              </div>
              
              <textarea
                value={jsonInputText}
                onChange={(e) => setJsonInputText(e.target.value)}
                className="w-full flex-1 min-h-[200px] bg-[#0d1222] border border-brand-accent/30 rounded-xl p-4 font-mono text-xs text-text-primary outline-none focus:border-brand-accent focus:shadow-[0_0_15px_rgba(0,219,231,0.1)] resize-none"
              />
            </div>

            {jsonError && (
              <div className="flex items-start gap-1.5 text-xs text-red-400 bg-red-950/20 p-2.5 rounded border border-red-500/20 font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{jsonError}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 gap-3 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  try {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonInputText);
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", "robot-portfolio-backup.json");
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  } catch (err) {
                    alert('파일 내보내기 실패');
                  }
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/11 text-text-secondary font-bold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>백업 파일로 다운로드</span>
              </button>
              
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsJsonModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-text-secondary cursor-pointer"
                >
                  취소 Cancel
                </button>
                <button
                  type="button"
                  onClick={handleImportJson}
                  className="px-5 py-2 bg-brand-accent text-[#002022] hover:opacity-90 font-extrabold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,219,231,0.25)]"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>데이터 덮어쓰기 Import</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
