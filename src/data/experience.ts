import type { WorkExperience as Experience } from '@/types/experience.types';

const experiences: Experience[] = [
  {
    id: 'exp1',
    role: 'Digital Transformation Specialist',
    company: 'Deewakar Finance Pvt. Ltd.',
    companyUrl: 'https://www.deewakargroup.com',
    logo: '/Sahil-Ali-Portfolio/Company/Deewakar_logo.png',
    period: 'Dec 2017 – Nov 2020',
    description: [
      'Pioneered digital transformation by integrating AI-powered automation into core business processes, reducing operational costs by 30%',
      'Developed and maintained dynamic Excel dashboards for real-time business intelligence and performance tracking',
      'Led cross-functional teams in adopting new technologies and automation workflows',
    ],
    achievements: [
      'Spearheaded AI chatbot implementation that automated 50% of customer inquiries, reducing response time from 24h to 2 minutes',
      'Engineered automated reporting systems that saved 15+ hours weekly on manual reporting tasks',
    ],
    technologies: [
      'AI/ML Implementation',
      'Process Automation',
      'Advanced Excel & VBA',
      'CRM Systems',
      'Marketing Automation',
    ],
    startDate: '2017-12-01',
    endDate: '2020-11-30',
    isCurrent: false,
  },
  {
    id: 'exp2',
    role: 'Operations Manager',
    company: 'Ekam Indian Groceries',
    companyUrl: '#',
    logo: '/Sahil-Ali-Portfolio/Company/Ekam_logo.png',
    period: 'Dec 2023 – Jun 2025',
    description: [
      'Spearheaded digital transformation of operations, implementing AI-driven inventory optimization that reduced carrying costs by 28%',
      'Developed and deployed machine learning models for demand forecasting, achieving 92% forecast accuracy',
      'Automated critical business processes including inventory reconciliation and supplier ordering',
      'Established KPI dashboards for real-time business intelligence',
    ],
    achievements: [
      'Pioneered AI-powered inventory optimization system that reduced stockouts by 45% and overstock by 30%',
      'Engineered automated reporting solutions that saved 20+ hours weekly on manual reporting tasks',
    ],
    technologies: [
      'AI/ML Implementation',
      'Inventory Optimization',
      'Process Automation',
      'Advanced Excel & SQL',
    ],
    startDate: '2023-12-01',
    endDate: '2025-06-30',
    isCurrent: false,
  },
  {
    id: 'exp3',
    role: 'Operations Lead',
    company: 'Bansal Supermarket',
    companyUrl: '#',
    logo: '/Sahil-Ali-Portfolio/Company/Bansal_logo.png',
    period: 'Dec 2022 – Nov 2023',
    description: [
      'Championed digital transformation of retail operations, implementing AI/ML solutions that automated 70% of inventory management tasks',
      'Developed and deployed predictive analytics models for demand forecasting with 90%+ accuracy',
      'Established data governance and reporting frameworks that improved decision-making speed by 40%',
      'Mentored cross-functional teams in adopting data-driven approaches to business challenges',
    ],
    achievements: [
      'Architected and implemented an AI-driven inventory optimization system that reduced stockouts by 45%',
      'Pioneered a data science initiative that identified $250K+ in annual cost savings opportunities',
    ],
    technologies: [
      'AI/ML Implementation',
      'Process Automation',
      'Advanced Excel & VBA',
      'SQL & Data Warehousing'
    ],
    startDate: '2022-12-01',
    endDate: '2023-11-30',
    isCurrent: false,
  },
  {
    id: 'exp4',
    role: 'Operations & Digital Transformation Lead',
    company: 'Arzt Health & Private Limited',
    companyUrl: '#',
    logo: '/Sahil-Ali-Portfolio/Company/Arzt_logo.png',
    period: 'June 2022 – Nov 2022',
    description: [
      'Spearheaded the digital transformation of warehouse operations, implementing barcode scanning and mobile inventory management',
      'Created automated reporting dashboards that provided real-time visibility into inventory levels and order fulfillment',
      'Trained staff on new digital tools and processes to improve operational efficiency',
    ],
    achievements: [
      'Reduced order processing time by 60% through digital transformation initiatives',
      'Improved inventory accuracy to 99.5% through automated tracking systems',
    ],
    technologies: [
      'Inventory Management',
      'Process Automation',
      'MS Excel (Advanced)',
    ],
    startDate: '2022-06-01',
    endDate: '2022-11-30',
    isCurrent: false,
  },
  {
    id: 'exp5',
    role: 'AI Solutions Architect',
    company: 'Self-Employed',
    companyUrl: '#',
    logo: '/Sahil-Ali-Portfolio/Company/AIGernalist_logo.png',
    period: '2024 – Present',
    description: [
      'Developed and implemented AI-powered solutions that improved business processes',
      'Created automated data pipelines that processed and analyzed operational data in real-time',
      'Built custom AI models for various business applications',
    ],
    achievements: [
      'Engineered automated reporting solutions that saved 20+ hours per week',
    ],
    technologies: [
      'AI & Machine Learning',
      'Process Automation',
      'Python',
      'SQL',
    ],
    startDate: '2024-01-01',
    endDate: null,
    isCurrent: true,
  },
];

export default experiences;
export { experiences };
