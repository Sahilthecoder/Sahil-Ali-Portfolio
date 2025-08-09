import { motion } from 'framer-motion';

const stats = [
  { value: '4+', label: 'Experience' },
  { value: '15+', label: 'Projects' },
  { value: '10+', label: 'Clients' },
  { value: '20+', label: 'Tech' },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 12,
    },
  },
};

const StatsSection = () => {
  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-5 px-3 text-background shadow-inner"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary to-primary/70 opacity-80" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
        >
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="text-center rounded-lg bg-white/10 border border-white/20 p-2.5 transition-all duration-200 hover:bg-white/20 hover:scale-105 hover:shadow-md"
            >
              <div className="text-xl md:text-2xl font-extrabold text-white drop-shadow-md">{value}</div>
              <div className="text-[0.7rem] font-medium text-white/90 uppercase tracking-wider mt-1">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
