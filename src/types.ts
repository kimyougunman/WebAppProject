export type Screen = 'mobile' | 'desktop';
export type TransitionDirection = 'push' | 'push_back';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
}

export interface ExperienceLog {
  id: string;
  year: string;
  period?: string;
  role: string;
  organization: string;
  details?: string[];
  iconName?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
}

export interface AwardItem {
  id: string;
  title: string;
  award: string;
  iconName: string;
}
