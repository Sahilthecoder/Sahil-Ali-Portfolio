import { motion } from 'framer-motion';

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '15+', label: 'Projects' },
  { value: '10+', label: 'Happy Clients' },
  { value: '20+', label: 'Technologies' },
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
      className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-6 sm:py-8 text-background shadow-inner"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary to-primary/70 opacity-80" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="text-center rounded-lg bg-white/10 border border-white/20 p-3 sm:p-4 transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] hover:shadow-lg active:scale-95"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">{value}</div>
              <div className="text-xs sm:text-sm font-medium text-white/90 uppercase tracking-wider mt-1 sm:mt-2">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
