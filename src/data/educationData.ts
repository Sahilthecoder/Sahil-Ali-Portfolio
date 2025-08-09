import type { Education } from '@/types/experience.types';
import { getPath } from '@/utils/paths';

const educationData: Education[] = [
  {
    id: 'bsc-physics',
    degree: 'Bachelor of Science (B.Sc.) – Physics, Chemistry, Mathematics',
    institution: 'MDSU University',
    institutionUrl: 'https://www.mdsuajmer.ac.in/',
    period: 'January 2018 – January 2021',
    fieldOfStudy: 'Physics, Chemistry, Mathematics',
    location: 'Rajasthan, India',
    imageUrl: `${getPath('/images/education/mdsu-university.jpg')}`,
    description: [
      'Built a strong academic foundation in analytical thinking, problem-solving, and data interpretation through core science subjects.',
      'Developed logical reasoning and quantitative analysis skills, which later supported my transition into data analytics and AI automation.',
    ],
  },
  {
    id: 'self-learning',
    degree: 'Self-Learning & Professional Skill Development',
    institution: 'Online Learning Platforms',
    period: '2023 – Present',
    fieldOfStudy: 'AI, Automation & Data Analysis',
    imageUrl: `${getPath('/images/education/online-learning.jpg')}`,
    description: [
      'Passionately transitioned into tech by self-learning AI tools, automation platforms, and data analysis techniques.',
      'Gained hands-on experience in ChatGPT, Notion AI, Make.com (Integromat), Google Sheets automation, and other AI-powered workflows.',
      'Actively upskilled through curated online programs by @Outskills, learning practical applications of AI in real-world business environments.',
      'Continuously explore new tools to automate tasks, optimize workflows, and enhance productivity using AI.',
    ],
  },
];

export default educationData;
