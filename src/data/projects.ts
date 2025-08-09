import type { ReactNode } from 'react';

interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  srcSet?: string;
  sizes?: string;
}

interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  role: ReactNode;
  solution: string;
  challenge: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: ProjectImage;
  links: ProjectLink[];
  technologies: string[];
  date: string;
  featured?: boolean;
  gallery?: ProjectImage[];
  metrics?: Array<{ label: string; value: string }>;
}

export const projects: Project[] = [
  {
    id: 'zomato-dashboard',
    title: 'Zomato Restaurant Expansion Dashboard',
    subtitle: 'Market Strategy Analysis',
    description:
      "Built an interactive Excel dashboard to analyze Zomato's city-wise expansion strategy across India, uncovering performance trends and market insights.",
    highlights: [
      'Identified top 5 high-potential cities for expansion with estimated 30% growth potential',
      'Reduced manual analysis time by 65% through automated reporting',
      'Uncovered key market trends leading to optimized marketing spend allocation'
    ],
    image: {
      src: '/Sahil-Ali-Portfolio/images/projects/Zomto_Project1/Project1_Cover-600w.webp',
      alt: 'Zomato Expansion Dashboard showing city-wise performance metrics',
      srcSet: '/Sahil-Ali-Portfolio/images/projects/Zomto_Project1/Project1_Cover-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/Zomto_Project1/Project1_Cover-600w.webp 600w, /Sahil-Ali-Portfolio/images/projects/Zomto_Project1/Project1_Cover-1200w.webp 1200w',
      sizes: '(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px'
    },
    links: [
      { label: 'View Dashboard', url: '/projects/zomato-dashboard' },
      { label: 'Case Study', url: '/projects/zomato-dashboard/case-study' }
    ],
    technologies: [
      'Excel',
      'Pivot Tables',
      'Data Visualization',
      'Market Analysis',
      'Business Intelligence'
    ],
    date: '2024-03-01',
    featured: true,
    challenge: 'Zomato needed to identify the most promising cities for expansion in India but lacked a centralized view of market potential, competitor presence, and customer behavior across different regions.',
    solution: 'Developed a comprehensive Excel dashboard that analyzed multiple data points including order volumes, average order values, customer demographics, and competitor presence across 50+ cities. Implemented dynamic filtering and interactive visualizations to enable data-driven decision making.',
    role: 'Data Analyst | Led the data collection, analysis, and visualization efforts. Collaborated with business stakeholders to define key metrics and translate business questions into analytical solutions.',
    gallery: [
      {
        src: '/images/projects/Zomto_Project1/Project1_Cover-600w.webp',
        alt: 'Dashboard overview showing city performance metrics',
        caption: 'City Performance Overview',
        srcSet: '/images/projects/Zomto_Project1/Project1_Cover-300w.webp 300w, /images/projects/Zomto_Project1/Project1_Cover-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/Zomto_Project1/zometo-ds-600w.webp',
        alt: 'Data Analysis',
        caption: 'Data Analysis',
        srcSet: '/images/projects/Zomto_Project1/zometo-ds-300w.webp 300w, /images/projects/Zomto_Project1/zometo-ds-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/Zomto_Project1/zt1-600w.webp',
        alt: 'Performance Metrics',
        caption: 'Performance Metrics',
        srcSet: '/images/projects/Zomto_Project1/zt1-300w.webp 300w, /images/projects/Zomto_Project1/zt1-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/Zomto_Project1/zt2-600w.webp',
        alt: 'City-wise Analysis',
        caption: 'City-wise Analysis',
        srcSet: '/images/projects/Zomto_Project1/zt2-300w.webp 300w, /images/projects/Zomto_Project1/zt2-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      }
      // Additional screenshots can be added here
    ],
    metrics: [
      { label: 'Cities Analyzed', value: '50+' },
      { label: 'Time Savings', value: '65%' },
      { label: 'Identified Growth', value: '30%' }
    ]
  },
  {
    id: 'bansal-dashboard',
    title: 'Bansal Supermarket Analytics Dashboard',
    subtitle: 'Retail Performance Optimization',
    description:
      'Developed a comprehensive Tableau analytics dashboard providing real-time insights into sales performance, inventory management, and customer behavior for Bansal Supermarket.',
    highlights: [
      'Increased revenue by 12% through data-driven inventory optimization and targeted promotions',
      'Reduced stockouts by 35% with predictive inventory management',
      'Improved decision-making with real-time sales and performance metrics'
    ],
    image: {
      src: '/Sahil-Ali-Portfolio/images/projects/Bansal_Project2/Project2_Cover-600w.webp',
      alt: 'Bansal Supermarket Inventory Management Dashboard',
      srcSet: '/Sahil-Ali-Portfolio/images/projects/Bansal_Project2/Project2_Cover-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/Bansal_Project2/Project2_Cover-600w.webp 600w, /Sahil-Ali-Portfolio/images/projects/Bansal_Project2/Project2_Cover-1200w.webp 1200w',
      sizes: '(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px'
    },
    links: [
      { label: 'View Dashboard', url: '/projects/bansal-dashboard' },
      { label: 'Case Study', url: '/projects/bansal-dashboard/case-study' }
    ],
    technologies: [
      'Tableau',
      'Data Visualization',
      'Retail Analytics',
      'Business Intelligence',
      'Inventory Management'
    ],
    date: '2024-02-15',
    featured: true,
    challenge: 'Bansal Supermarket needed better visibility into their sales performance and inventory management across multiple locations. They were facing challenges with stockouts, inefficient promotions, and lacked real-time insights into customer buying patterns.',
    solution: 'Developed an interactive Tableau dashboard that integrated data from POS systems and inventory management. The solution included sales trend analysis, inventory turnover metrics, and customer segmentation to optimize stock levels and promotional strategies.',
    role: 'Data Analyst | Led the end-to-end development of the analytics solution, from data collection and cleaning to visualization and stakeholder training.',
    gallery: [
      {
        src: '/images/projects/Bansal_Project2/bs-saleVSpft-600w.webp',
        alt: 'Sales vs Profit Analysis',
        caption: 'Sales vs. Profit Analysis',
        srcSet: '/images/projects/Bansal_Project2/bs-saleVSpft-300w.webp 300w, /images/projects/Bansal_Project2/bs-saleVSpft-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/Bansal_Project2/bs-stockTO-600w.webp',
        alt: 'Stock Turnover Dashboard',
        caption: 'Inventory Turnover Analysis',
        srcSet: '/images/projects/Bansal_Project2/bs-stockTO-300w.webp 300w, /images/projects/Bansal_Project2/bs-stockTO-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/Bansal_Project2/bs-top10-600w.webp',
        alt: 'Top Performing Products',
        caption: 'Top 10 Products by Revenue',
        srcSet: '/images/projects/Bansal_Project2/bs-top10-300w.webp 300w, /images/projects/Bansal_Project2/bs-top10-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/Bansal_Project2/bs2-600w.webp',
        alt: 'Sales Dashboard',
        caption: 'Sales Performance Dashboard',
        srcSet: '/images/projects/Bansal_Project2/bs2-300w.webp 300w, /images/projects/Bansal_Project2/bs2-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/Bansal_Project2/bs3-600w.webp',
        alt: 'Inventory Dashboard',
        caption: 'Inventory Management Dashboard',
        srcSet: '/images/projects/Bansal_Project2/bs3-300w.webp 300w, /images/projects/Bansal_Project2/bs3-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      }
    ],
    metrics: [
      { label: 'Revenue Increase', value: '12%' },
      { label: 'Stockout Reduction', value: '35%' },
      { label: 'Reporting Time Saved', value: '20 hours/week' }
    ]
  },
  {
    id: 'ekam-attendance',
    title: 'Ekam Attendance & Payroll Automation',
    subtitle: 'HR & Finance Process Optimization',
    description:
      'Designed and implemented an automated attendance tracking and payroll reporting system using SQL and Google Apps Script, streamlining HR and finance operations for Ekam Indian Groceries.',
    highlights: [
      'Reduced manual data entry and reporting time by 80% (20+ hours monthly)',
      'Eliminated calculation errors in payroll processing',
      'Enabled real-time attendance tracking and reporting'
    ],
    image: {
      src: '/Sahil-Ali-Portfolio/images/projects/Attendance_Project3/Project3_Cover-600w.webp',
      alt: 'Ekam Attendance Management System',
      srcSet: '/Sahil-Ali-Portfolio/images/projects/Attendance_Project3/Project3_Cover-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/Attendance_Project3/Project3_Cover-600w.webp 600w, /Sahil-Ali-Portfolio/images/projects/Attendance_Project3/Project3_Cover-1200w.webp 1200w',
      sizes: '(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px'
    },
    links: [
      { label: 'View Project', url: '/projects/ekam-attendance' },
      { label: 'Case Study', url: '/projects/ekam-attendance/case-study' }
    ],
    technologies: [
      'SQL',
      'Google Apps Script',
      'Google Sheets',
      'Process Automation',
      'HR Analytics'
    ],
    date: '2024-01-20',
    challenge: 'Ekam Indian Groceries was spending excessive time on manual attendance tracking and payroll calculations, leading to errors and inefficiencies in their HR and finance operations. The existing process was time-consuming and prone to human error.',
    solution: 'Developed a custom solution using SQL for data processing and Google Apps Script for automation. The system automatically imports attendance data, calculates work hours, processes leave balances, and generates payroll reports, significantly reducing manual effort and improving accuracy.',
    role: 'Automation Specialist | Designed and implemented the end-to-end solution, including database design, automation scripts, and user training.',
    gallery: [
      {
        src: '/images/projects/Attendance_Project3/Attendance_before-600w.webp',
        alt: 'Before Automation - Manual Process',
        caption: 'Manual Process - Before Automation',
        srcSet: '/images/projects/Attendance_Project3/Attendance_before-300w.webp 300w, /images/projects/Attendance_Project3/Attendance_before-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/Attendance_Project3/Attendance_after-600w.webp',
        alt: 'After Automation - Digital Dashboard',
        caption: 'Automated Dashboard - After Implementation',
        srcSet: '/images/projects/Attendance_Project3/Attendance_after-300w.webp 300w, /images/projects/Attendance_Project3/Attendance_after-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/Attendance_Project3/Project3_Cover-600w.webp',
        alt: 'Attendance System Dashboard',
        caption: 'Attendance System Dashboard',
        srcSet: '/images/projects/Attendance_Project3/Project3_Cover-300w.webp 300w, /images/projects/Attendance_Project3/Project3_Cover-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      }
    ],
    metrics: [
      { label: 'Time Savings', value: '20+ hours/month' },
      { label: 'Error Reduction', value: '100%' },
      { label: 'Processing Time', value: 'From 2 days to 2 hours' }
    ]
  },
  {
    id: 'powerbi-cashflow',
    title: 'Multi-Store Financial Analytics Dashboard',
    subtitle: 'Real-time Cash Flow & Financial Monitoring',
    description:
      'Developed a comprehensive Power BI solution for monitoring financial performance across multiple retail locations, providing real-time visibility into cash flow, sales, and expense metrics.',
    highlights: [
      'Reduced financial discrepancies by 90% through real-time monitoring',
      'Enabled data-driven decision making with daily financial insights',
      'Streamlined financial reporting across 5+ store locations'
    ],
    image: {
      src: '/Sahil-Ali-Portfolio/images/projects/RetailCashFlow_Project4/Project4_Cover-600w.webp',
      alt: 'Retail Cash Flow Analysis Dashboard',
      srcSet: '/Sahil-Ali-Portfolio/images/projects/RetailCashFlow_Project4/Project4_Cover-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/RetailCashFlow_Project4/Project4_Cover-600w.webp 600w, /Sahil-Ali-Portfolio/images/projects/RetailCashFlow_Project4/Project4_Cover-1200w.webp 1200w',
      sizes: '(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px'
    },
    links: [
      { label: 'View Dashboard', url: '/projects/powerbi-cashflow' },
      { label: 'Case Study', url: '/projects/powerbi-cashflow/case-study' }
    ],
    technologies: [
      'Power BI',
      'DAX',
      'Financial Analysis',
      'Data Visualization',
      'Business Intelligence'
    ],
    date: '2023-12-10',
    featured: true,
    challenge: 'The retail chain lacked a centralized view of financial performance across locations, leading to delayed insights, difficulty in identifying discrepancies, and challenges in making timely financial decisions.',
    solution: 'Created an interactive Power BI dashboard that aggregates financial data from multiple store locations. The solution includes automated data refreshes, anomaly detection for cash discrepancies, and drill-down capabilities for detailed analysis of sales, expenses, and cash flow metrics.',
    role: 'Business Intelligence Developer | Led the design and implementation of the financial analytics platform, including data modeling, visualization, and user training.',
    gallery: [
      {
        src: '/images/projects/RetailCashFlow_Project4/Project4_Cover-600w.webp',
        alt: 'Financial Overview Dashboard',
        caption: 'Financial Performance Overview',
        srcSet: '/images/projects/RetailCashFlow_Project4/Project4_Cover-300w.webp 300w, /images/projects/RetailCashFlow_Project4/Project4_Cover-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/RetailCashFlow_Project4/CashFlow1-600w.webp',
        alt: 'Cash Flow Analysis',
        caption: 'Cash Flow Analysis Dashboard',
        srcSet: '/images/projects/RetailCashFlow_Project4/CashFlow1-300w.webp 300w, /images/projects/RetailCashFlow_Project4/CashFlow1-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/RetailCashFlow_Project4/CashFlow2-600w.webp',
        alt: 'Financial Metrics',
        caption: 'Financial Metrics Overview',
        srcSet: '/images/projects/RetailCashFlow_Project4/CashFlow2-300w.webp 300w, /images/projects/RetailCashFlow_Project4/CashFlow2-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      }
    ],
    metrics: [
      { label: 'Discrepancy Reduction', value: '90%' },
      { label: 'Reporting Time Saved', value: '15 hours/week' },
      { label: 'Stores Connected', value: '5+' }
    ]
  },
  {
    id: 'ai-decision-system',
    title: 'AI-Powered Personal Productivity System',
    subtitle: 'Intelligent Task & Time Management',
    description:
      'Developed an AI-driven personal productivity system that automates task prioritization, scheduling, and decision-making using GPT, Notion, and Google Apps Script.',
    highlights: [
      'Saved 2+ hours daily through intelligent task automation and scheduling',
      'Improved task completion rate by 65% with AI-powered prioritization',
      'Created a seamless integration between Notion, Google Calendar, and task management'
    ],
    image: {
      src: '/Sahil-Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Cover-600w.webp',
      alt: 'AI-Powered Productivity System Dashboard',
      srcSet: '/Sahil-Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Cover-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Cover-600w.webp 600w, /Sahil-Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Cover-1200w.webp 1200w',
      sizes: '(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px'
    },
    links: [
      { label: 'Explore the System', url: '/projects/ai-decision-system' },
      { label: 'Case Study', url: '/projects/ai-decision-system/case-study' }
    ],
    technologies: [
      'AI/ML',
      'GPT Integration',
      'Google Apps Script',
      'Notion API',
      'Productivity Automation'
    ],
    date: '2023-11-05',
    challenge: 'Managing multiple projects, tasks, and priorities was becoming increasingly complex and time-consuming, leading to decision fatigue and reduced productivity. The existing tools didn\'t provide intelligent prioritization or automation capabilities.',
    solution: 'Built a custom AI system that integrates with Notion and Google services to automate task management. The solution uses GPT to analyze tasks, suggest priorities, and create optimized daily schedules based on deadlines, energy levels, and personal productivity patterns.',
    role: 'Product Developer & AI Specialist | Designed and implemented the entire system, including AI model integration, API connections, and user interface.',
    gallery: [
      {
        src: '/images/projects/AIautomation_Project5/Project5_Cover-600w.webp',
        alt: 'AI Task Management Dashboard',
        caption: 'AI-Powered Task Management Interface',
        srcSet: '/images/projects/AIautomation_Project5/Project5_Cover-300w.webp 300w, /images/projects/AIautomation_Project5/Project5_Cover-600w.webp 600w, /images/projects/AIautomation_Project5/Project5_Cover-1200w.webp 1200w',
        sizes: '(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px'
      },
      {
        src: '/images/projects/AIautomation_Project5/Project5_Cover-600w.webp',
        alt: 'AI Integration',
        caption: 'AI Integration with Productivity Tools',
        srcSet: '/images/projects/AIautomation_Project5/Project5_Cover-300w.webp 300w, /images/projects/AIautomation_Project5/Project5_Cover-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      }
    ],
    metrics: [
      { label: 'Daily Time Saved', value: '2+ hours' },
      { label: 'Task Completion Rate', value: '65% improvement' },
      { label: 'Automation Coverage', value: '80% of routine decisions' }
    ]
  },
  {
    id: 'gpt-automation',
    title: 'GPT Automation Suite',
    subtitle: 'Business Workflow Automation',
    description:
      'Designed AI + Zapier automations for Excel and emails—auto-generating reports, syncing data, and streamlining ops for daily business use.',
    highlights: ['Saved 15+ hours/month by eliminating repetitive manual work.'],
    image: {
      src: '/images/projects/CommingSoon_Project6/Project6_Cover-600w.webp',
      alt: 'GPT Automation Suite',
      srcSet: '/images/projects/CommingSoon_Project6/Project6_Cover-300w.webp 300w, /images/projects/CommingSoon_Project6/Project6_Cover-600w.webp 600w',
      sizes: '(max-width: 640px) 300px, 600px'
    },
    links: [{ label: 'See the Project', url: '/projects/gpt-automation' }],
    technologies: ['GPT', 'Zapier', 'Automation'],
    date: '2023-10-15',
    solution: '',
    challenge: '',
    role: undefined,
  },
  {
    id: 'portfolio-creation',
    title: 'Portfolio Creation',
    subtitle: 'Showcasing AI-Assisted Development',
    description:
      'A demonstration of how I leveraged AI tools as a non-developer to create professional portfolios, including this one and others.',
    highlights: [
      'AI-assisted development',
      'No-code solutions',
      'Responsive design',
      'Modern UI/UX',
    ],
    image: {
      src: '/Sahil-Ali-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-600w.webp',
      alt: 'AI-Powered Portfolio Creation',
      srcSet: '/Sahil-Ali-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-600w.webp 600w, /Sahil-Ali-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-1200w.webp 1200w',
      sizes: '(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px'
    },
    gallery: [
      {
        src: '/Sahil-Ali-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-600w.webp',
        alt: 'Portfolio Showcase',
        caption: 'Modern Portfolio Showcase',
        srcSet: '/Sahil-Ali-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/Sahil-Ali-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-600w.webp',
        alt: 'Responsive Design',
        caption: 'Fully Responsive Layout',
        srcSet: '/Sahil-Ali-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      }
    ],
    links: [{ label: 'View Project', url: '/projects/portfolio-creation' }],
    technologies: ['AI Tools', 'React', 'TypeScript', 'Tailwind CSS', 'Responsive Design'],
    date: '2024-08-01',
    featured: true,
    solution: '',
    challenge: '',
    role: undefined,
  },
];

export { projects as default };
