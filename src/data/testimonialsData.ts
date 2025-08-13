interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  date: string;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Alex Johnson',
    role: 'CEO',
    company: 'Bansal Supermarket',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces',
    content:
      'Sahil transformed our sales analysis with his Tableau dashboard. The insights helped us increase revenue by 12% through better inventory management. His attention to detail and understanding of retail operations is exceptional.',
    rating: 5,
    date: '2024-02-20',
    project: 'Bansal Supermarket Tableau Dashboard',
  },
  {
    id: 'testimonial-2',
    name: 'Priya Sharma',
    role: 'HR Manager',
    company: 'Ekam Indian Groceries',
    avatar:
      'https://images.unsplash.com/photo-1603415526960-f8fbdc7a2f5b?w=200&h=200&fit=crop&crop=faces',
    content:
      'The attendance tracking system Sahil automated for us saved countless hours of manual work. His SQL and Google Sheets integration was a game-changer for our HR and finance teams. Highly recommended for any business looking to streamline operations.',
    rating: 5,
    date: '2024-01-25',
    project: 'Ekam Attendance Tracker',
  },
  {
    id: 'testimonial-3',
    name: 'Michael Chen',
    role: 'Finance Director',
    company: 'Retail Chain Australia',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    content:
      "Sahil's Power BI dashboard gave us real-time visibility into our multi-store cash flow. His ability to identify and flag discrepancies has been invaluable. A true professional who delivers beyond expectations.",
    rating: 5,
    date: '2023-12-15',
  },
  {
    id: 'testimonial-4',
    name: 'Sarah Williams',
    role: 'Operations Manager',
    company: 'FoodTech Solutions',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
    content:
      'The AI decision system Sahil built has become an integral part of our daily operations. His understanding of AI and automation is impressive, and he delivered exactly what we needed to optimize our workflows.',
    rating: 4,
    date: '2023-11-10',
  },
  {
    id: 'testimonial-5',
    name: 'Raj Patel',
    role: 'CTO',
    company: 'TechStart Inc.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    content:
      "Sahil's GPT automation suite saved us over 15 hours of manual work each month. His ability to integrate various tools and create seamless workflows is remarkable. Looking forward to more collaborations!",
    rating: 5,
    date: '2023-10-20',
    project: 'GPT Automation Suite',
  },
  {
    id: 'testimonial-6',
    name: 'Emma Wilson',
    role: 'Marketing Director',
    company: 'Creative Minds Agency',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
    content:
      'Working with Sahil on our portfolio website was a pleasure. He understood our vision and delivered a stunning, responsive design that perfectly showcases our work. His technical skills and creative approach are top-notch!',
    rating: 5,
    date: '2023-09-30',
  },
];

export default testimonials;
