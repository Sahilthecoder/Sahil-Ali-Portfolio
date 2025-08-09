import type { Education } from '@/types/experience.types';

const certifications: Omit<Education, 'degree'>[] = [
  {
    id: 'cert1',
    institution: 'Aayna Agrifarm Pvt. Ltd. (Under DDUGKY)',
    period: 'June 2021 – November 2021',
    fieldOfStudy: 'Warehouse Operations & Logistics Management',
    imageUrl: 'images/certifications/warehouse.jpg',
    description: [
      'Completed a certified training program under the Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDUGKY), focusing on warehouse operations and logistics management.',
      'Gained practical exposure in warehouse supervision, inventory handling, and stock reconciliation.',
      'Learned logistics coordination, dispatch planning, and storage protocols.',
      'Understood safety standards, FIFO/LIFO inventory methods, and warehouse layout optimization.',
      'Participated in hands-on sessions for Excel-based stock reporting and manual register maintenance.',
    ],
    location: 'Skill Development Training (Certified)',
  },
];

export default certifications;
