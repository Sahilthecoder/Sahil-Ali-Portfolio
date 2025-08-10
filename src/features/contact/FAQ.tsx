import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiDollarSign } from 'react-icons/fi';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';

// Define FAQ item type
type FAQItemType = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

// Mock data since we can't import contact.data
const FAQ_ITEMS: FAQItemType[] = [
  {
    id: '1',
    question: 'How can I get started with your services?',
    answer:
      "You can get started by contacting us through our contact form or by sending us an email. We'll schedule a consultation to discuss your project requirements.",
    category: 'general',
  },
  {
    id: '2',
    question: 'What technologies do you work with?',
    answer:
      'We specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various databases. We stay updated with the latest industry standards.',
    category: 'technical',
  },
  {
    id: '3',
    question: 'What are your rates?',
    answer:
      'Our rates vary depending on the project scope and requirements. We offer competitive pricing and can work on both hourly and fixed-price projects.',
    category: 'pricing',
  },
];

// Simple cn utility for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const FAQItem = ({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 mb-4 last:mb-0 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <button
        className="w-full py-4 px-5 text-left flex justify-between items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-${index}`}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} question: ${question}`}
      >
        <div className="flex items-start">
          <div className="p-1.5 mr-3.5 mt-0.5 rounded-lg bg-primary/10 text-primary">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-200 text-left">
            {question}
          </h3>
        </div>
        <div className="ml-4 flex-shrink-0 p-1 rounded-md group-hover:bg-accent/30 transition-colors duration-200">
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-${index}`}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                height: 'auto',
                transition: {
                  opacity: { duration: 0.2, ease: 'easeInOut' },
                  height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                },
              },
              collapsed: {
                opacity: 0,
                height: 0,
                transition: {
                  opacity: { duration: 0.15, ease: 'easeInOut' },
                  height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                },
              },
            }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/30">
              <p className="text-muted-foreground leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');

  const categories = [
    { id: 'general', name: 'General', icon: <FiInfo className="w-5 h-5" /> },
    { id: 'technical', name: 'Technical', icon: '⚙️' },
    { id: 'pricing', name: 'Pricing', icon: <FiDollarSign className="w-5 h-5" /> },
  ];

  // Filter FAQ items by active category
  const filteredFaqs = FAQ_ITEMS.filter(
    (faq) => faq.category === activeCategory || activeCategory === 'general'
  ) as FAQItemType[];

  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircle className="w-3.5 h-3.5 mr-2" />
            Common Questions
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get quick answers to common questions about our services and how we can help
            bring your ideas to life.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center',
                'border border-border/50',
                'hover:bg-accent/30',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                activeCategory === category.id
                  ? 'bg-primary/10 text-primary border-primary/30'
                  : 'bg-card/50 text-foreground/80 hover:text-foreground'
              )}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              <span className="mr-2 text-base">{category.icon}</span>
              {category.name}
              {activeCategory === category.id && (
                <span className="ml-2 w-1.5 h-1.5 rounded-full bg-primary"></span>
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="space-y-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.05 }}
        >
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </motion.div>

       
      </div>
    </section>
  );
};

export default FAQ;
