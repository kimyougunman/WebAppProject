import { Project, ExperienceLog, AwardItem, PortfolioData } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Neural-Link Arm v4',
    description: 'A high-precision prosthetic with 22 degrees of freedom and sub-millisecond latency neural response.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmuypp65hBEq8IRER746O_6rN_aOshJVGugLu-hwTD3zbM2d6Kk7IUUecx9hQMwdiDbTgx_WuEYyMBr9zXaWxxtSmaorYz0n4Crj0myprWyiov9OC08ZIKVTCMK7hbFsJc-XMeGujcC_AIRCB5mcJQSekqvbjRfgGlV0bsISn6yuYmpigSKKWXhhPWWEkG0IqEnSNVksuDXXnoFIoupwCHbocW7xGJCMv_4fiZOZSEY9UTCRvF4oAGvBOVuNzLTUCdeMb61UJe6zs',
    tags: ['ROS2', 'TENSORFLOW', 'C++', 'Kinematics']
  },
  {
    id: 'p2',
    title: 'Apex Scout Drone',
    description: 'Autonomous mapping unit utilizing solid-state LIDAR for real-time 3D reconstruction of complex environments.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2UviDewN7nRa8F4Sc2mVDIZmuyvYUNwEvUd8SgST23ZV_CqaSqbtFFT_Z78CvK9OSYnB3PESOkC2tRebTJGphTp2Wn9GFBT9T6tW48bizVcQiENE1mhxJ3TFMvtpx6ECde9QHFSWXHciy0kHFTrrOIw6BipUqOiEAASuZ8Dnm4rFtJhV0-LWfsvZ54BApeZn6Y3rgn5YgDuMY_vqSD7GGCAi4FjIeqTuEONtKWKyCWVZFRYO_sMQF8vv75_BJ-e_tQs8DRUY-Bo8',
    tags: ['LIDAR', 'PYTHON', 'SLAM', 'ROS2']
  },
  {
    id: 'p3',
    title: 'Line Tracing Robot',
    description: '컬러 센서를 사용해 검은 선을 따라가는 고속 라인트레이서 로봇 제어 프로젝트입니다.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATNa91nFws4uRNOrXMTe6odQhTs6PzxJOBvdiQqfdSpuy035L2aVxP5dKih7lh7DHbJGpvWqznZkxPpWlGoXJs-9VMiSTobIMg6YBA9A6jDq_TJew2rMrSS1bLxOLhddcoPLCu9AWeB9xUivNiUj7xwM1oIY_iNL21kdWXwe6g7uWJKxvULdnyG8pdScLnaAgxeVMLYkziELaq_oKg6qA4afoH2dOd6SgD6KsZX3BJUN2jIyrDrnRcxj6nfV8kFU9neMPx0v-VSAk',
    tags: ['Color Sensor', 'Motor Control', 'Block Coding']
  },
  {
    id: 'p4',
    title: 'Sumo Robot',
    description: '상대 로봇을 신속하게 감지해 경기장 밖으로 밀어내는 고출력 휴머노이드/차륜형 전투 로봇입니다.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPJBJUJ4rlYqJLW8m7pr-RevqVOerirbC04pp9k-yYfuihphRVN7oHgEJvTdgKZSY9jRcdM8GXgwGrEg6EH0s5UvAdLwllPlMZ5m6LqTvMy0g5ld86FXeDmKHs_WSXCXonfgKlLzncz4icqHbTh8BBgaoWO5Ud47A_VOwMzcb3nRRsVQK7S8jqO_UkcWQkacUdYRag0hO4typpzR60kaihtI4MABj4P_vo5CdYLvTL4BG24DJx70Nr8pSl5qu_95SRKzchkvalwnc',
    tags: ['Ultrasonic Sensor', 'Motor Power', 'Robot Design']
  },
  {
    id: 'p5',
    title: 'Mission Robot',
    description: '복잡한 장애물 코스 미션을 자율적으로 극복하기 위해 물리 구조 설계와 임베디드 코드를 최적화한 로봇입니다.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeK8vIjYVmvtrxxxLcaEyfQ0YpwlRyRS7_JaZH6axdWcUw4d3QAAbDdzHcpTm3l7iPfI1nJh8P6CkToIcyEr-2EVDzZ_zjJ6XD20cVCA3vWwMV_8cI2ikCPv3jSW3j6p0wQ21nwcmt_QT-00WVfX3ieXQqeqLlRgtfhPEp49wC7iG1TwKvRqhKSTGeOqMpD2dNxagfj9-w1AJk1aHAGcdpC5n3IUNf2tnq7kHaS5KP_-slikMZ2-enLCMh7GOOnExpFf8Een0TK6U',
    tags: ['Mission Strategy', 'Sensor Control', 'Debugging']
  },
  {
    id: 'p6',
    title: 'Robot Portfolio Web App',
    description: '나의 하드웨어/소프트웨어 로봇 개발 프로젝트 이력과 성과를 효과적으로 보여주고자 제작한 포트폴리오 웹앱입니다.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbS0qzXlMtNRPTS9brLvH2V4coGccyZ3ihVxiT_JJw9nufnaLme0cKjc2r2DOKquCS63cyw7jaAU4wL3s05MSMsSTjdKimAosNNuo1Wo7XMFrWXSthfA4XHz4T-K2KPns_9yhc2onv4U-YIDcxUqU_6vX7RSD76onzLsd-8Y3aKkAlep_HNtQ0jWjVL8al5OImTxgj5TLJzPT--Ww-p_mcqVPHu9XI7ub9NWgyHWTNKcCWyARKseb2Ee7ojB7CT1sKqsXqpjpoCck',
    tags: ['Web Design', 'AI Tool', 'React & Tailwind']
  }
];

export const EXPERIENCES: ExperienceLog[] = [
  {
    id: 'e1',
    year: '2026',
    period: '2026.02',
    role: 'CoSpace Rescue U12 리더',
    organization: 'RoboCup Korea Open',
    details: [
      '대표 팀명: K.F.C.Playwell',
      'CoSpace 가상 환경 및 실물 맵 구조 시뮬레이션 제어 알고리즘 총괄',
      '전국 1위 (1st Place) 수상 성과 달성'
    ],
    iconName: 'trophy'
  },
  {
    id: 'e2',
    year: '2026',
    period: '2026.04',
    role: 'CoSpace Rescue U12 참가 (대표)',
    organization: 'RoboCup Singapore Open',
    details: [
      '팀 리더 및 핵심 전략 프레젠테이션 주도',
      '전체 참가팀 중 뛰어난 영향력을 입증하여 Influencer Awards 수상'
    ],
    iconName: 'sparkles'
  },
  {
    id: 'e3',
    year: '2025',
    period: '2025.02',
    role: 'CoSpace Rescue U12 리더',
    organization: 'RoboCup Korea Open',
    details: [
      '팀명: K.F.C.Playwell',
      '미션 수행용 자율 주행 프로그래밍 및 색상 인식 모듈 설계'
    ],
    iconName: 'globe'
  },
  {
    id: 'e4',
    year: '2025',
    period: '2025.07',
    role: 'SUMO Robot Challenger',
    organization: 'Robot Challenge Seoul',
    details: [
      '상대방 탱크 로봇 감지 및 근접 회피 메커니즘 프로그래밍',
      '고출력 기어드 모터 캘리브레이션 및 경기 하드웨어 튜닝'
    ],
    iconName: 'wrench'
  },
  {
    id: 'e5',
    year: '2022',
    period: '2022 - PRESENT',
    role: 'Lead Robotics Engineer',
    organization: 'Cyberdyne Systems',
    details: [
      'Architecture of multi-robot coordination frameworks.',
      'Optimized kinematic solvers for 15% faster motion planning.'
    ],
    iconName: 'cpu'
  },
  {
    id: 'e6',
    year: '2019',
    period: '2019 - 2022',
    role: 'AI Research Associate',
    organization: 'Neural Tech Corp',
    details: [
      'Collaborated on visual-inertial odometry research.',
      'Designed neural decision engines for robotic navigation.'
    ],
    iconName: 'brain'
  }
];

export const DEFAULT_AWARDS: AwardItem[] = [
  {
    id: 'a1',
    title: '2026 RoboCup Korea Open (CoSpace U12)',
    award: '1st Place',
    iconName: 'trophy'
  },
  {
    id: 'a2',
    title: '2026 RoboCup Singapore Open (CoSpace U12)',
    award: 'Influencer Awards',
    iconName: 'sparkles'
  }
];

export const DEFAULT_SKILLS = [
  'C Coding',
  'Micro Python Coding',
  'Block Coding',
  'Robot Building',
  'Problem Solving',
  'Teamwork',
  'PPT Presentation',
  'Instruction Making'
];

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  heroTitle: 'Building Robots,',
  heroHighlight: 'Solving Problems',
  heroSubtitle: '로봇을 만들고 코딩하며 문제를 해결한 과정을 소개합니다.',
  heroParagraph: '저는 로봇을 만들고 코딩하며 문제를 해결하는 것을 좋아합니다. 센서와 모터를 활용해 로봇이 스스로 움직이도록 만드는 과정에 관심이 있습니다. 실패한 로봇을 다시 수정하고 테스트하면서 더 나은 해결 방법을 찾는 과정을 배우고 있습니다.',
  heroQuote: '앞으로 다양한 로봇 프로젝트에 도전하며 창의적인 문제 해결 능력을 키우고 싶습니다.',
  githubUrl: 'https://github.com/robot-specialist',
  email: 'contact@robot-specialist.com',
  skills: DEFAULT_SKILLS,
  awards: DEFAULT_AWARDS,
  experiences: EXPERIENCES,
  projects: PROJECTS
};
