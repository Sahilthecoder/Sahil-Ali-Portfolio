interface BasicInformation {
  fullName: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
}

interface ProfessionalSummary {
  summary: string;
  skills: string[];
  experienceYears: string;
}

interface SocialMedia {
  linkedin: string;
  facebook: string;
  instagram: string;
  email: string;
  phone: string;
}

interface ContactInformation {
  businessEmail: string;
  preferredContact: string;
  availability: string;
}

interface Resume {
  cvDownloadLink: string;
  linkedinProfile: string;
}

interface PersonalDetails {
  dob: string;
  nationality: string;
  languages: string[];
}

interface CurrentFocus {
  currentlyWorkingOn: string;
  interests: string[];
  technologiesLearning: string[];
}

export interface PersonalInfo {
  basicInformation: BasicInformation;
  professionalSummary: ProfessionalSummary;
  socialMedia: SocialMedia;
  contactInformation: ContactInformation;
  resume: Resume;
  personalDetails: PersonalDetails;
  currentFocus: CurrentFocus;
}

const personalInfo: PersonalInfo = {
  basicInformation: {
    fullName: 'Sahil Ali',
    title: 'Data Analyst | Inventory Specialist | AI Generalist',
    bio: 'A detail-oriented professional with strong experience in inventory control, purchase reconciliation, and data analysis. Adept at using modern AI tools and automation platforms to enhance business processes.',
    location: 'Rajasthan, India',
    email: 'sahilkhan36985@gmail.com',
    phone: '+91 9875771550',
    profileImage: '/images/profile/profile.webp',
  },
  professionalSummary: {
    summary:
      'Experienced Inventory Specialist and Data Analyst with a demonstrated history of managing stock, vendor coordination, and reporting. Now exploring AI tools and automations to build smarter, faster workflows.',
    skills: [
      'Inventory Management',
      'Data Analysis',
      'Excel & Google Sheets',
      'Vendor Coordination',
      'AI Tools (Make.com, ChatGPT, Notion AI)',
      'Automation Workflows',
      'Python (basic)',
      'SQL (basic)',
    ],
    experienceYears: '4+ years',
  },
  socialMedia: {
    linkedin: 'https://www.linkedin.com/in/sahil-ali-714867242/',
    facebook: 'https://www.facebook.com/donotuse',
    instagram: 'https://www.instagram.com/hey___sahilll/',
    email: 'sahilkhan36985@gmail.com',
    phone: '+91 9875771550',
  },
  contactInformation: {
    businessEmail: 'sahilkhan36985@gmail.com',
    preferredContact: 'Email or WhatsApp',
    availability: 'Open to freelance, part-time, and full-time work opportunities',
  },
  resume: {
    cvDownloadLink: '/Sahil_Ali-Portfolio/assets/Sahil_Ali_Cv.pdf',
    linkedinProfile: 'https://www.linkedin.com/in/sahil-ali-714867242/',
  },
  personalDetails: {
    dob: 'Dec 25, 2002',
    nationality: 'Indian',
    languages: ['English', 'Hindi', 'Rajasthani'],
  },
  currentFocus: {
    currentlyWorkingOn: 'Building portfolio projects that combine data analysis with AI workflows',
    interests: ['AI Tools', 'Data Visualization', 'Automation', 'Personal Productivity'],
    technologiesLearning: ['Tableau', 'Make.com', 'Python for data', 'SQL'],
  },
};

export default personalInfo;
export { personalInfo };
