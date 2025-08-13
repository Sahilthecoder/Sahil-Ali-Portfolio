import type { ContactInfo } from '../types/contact.types';

export const CONTACT_INFO: ContactInfo = {
  name: 'Sahil Ali',
  email: 'sahilkhan36985@gmail.com',
  phone: '+91 98757 71550',
  workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
  socialLinks: {
    whatsapp: 'https://wa.me/919857771550',
    github: 'https://github.com/Sahilthecoder',
    linkedin: 'https://linkedin.com/in/sahilkhan36985',
  },
};

export const FAQ_ITEMS = [
  {
    question: 'How can I contact you?',
    answer:
      'You can reach me via email at sahilkhan36985@gmail.com or through the contact form on this page.',
  },
  {
    question: 'What services do you offer?',
    answer: 'I offer web development, UI/UX design, and technical consulting services.',
  },
  {
    question: 'What is your availability?',
    answer: 'I typically respond to inquiries within 24-48 hours during weekdays.',
  },
];

import { FiCode, FiLayers, FiSmartphone, FiHelpCircle } from 'react-icons/fi';

export const SERVICES = [
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies.',
    icon: FiCode,
  },
  {
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces with great user experience.',
    icon: FiLayers,
  },
  {
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications for iOS and Android.',
    icon: FiSmartphone,
  },
  {
    title: 'Consulting',
    description: 'Expert advice on software architecture and development strategies.',
    icon: FiHelpCircle,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO at Company',
    content:
      'Working with this developer was a great experience. They delivered high-quality work on time and were very professional throughout the project.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Product Manager',
    content:
      'Exceptional skills and attention to detail. Would definitely recommend for any web development projects.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Alex Johnson',
    role: 'Startup Founder',
    content:
      'Transformed our vision into a beautiful, functional product. Great communication and technical expertise.',
    rating: 5,
  },
];
