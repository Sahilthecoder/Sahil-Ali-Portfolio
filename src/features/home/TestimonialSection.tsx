import { motion } from 'framer-motion';
import LazyImage from '@/components/LazyImage';
import testimonials from '../../data/testimonialsData'; // Adjust path if needed
import { SectionHeader } from '@/components/ui/AnimatedSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
    },
  },
};

const stars = (count: number) => {
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 inline-block ${
          i < count ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.287 3.969c.3.922-.755 1.688-1.54 1.118l-3.384-2.454a1 1 0 00-1.176 0L5.21 16.05c-.784.57-1.838-.196-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.117L1.208 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.285-3.97z" />
      </svg>
    ));
};

const TestimonialSection = () => {
  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="py-12 sm:py-16 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full mb-12 sm:mb-16 lg:mb-20">
          <SectionHeader
            title="What People Say"
            subtitle="Client testimonials and feedback"
          />
        </div>
      </div>

      {/* Testimonials Grid */}
      <motion.div
        className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {testimonials.map(
          ({
            id,
            name,
            role,
            company,
            avatar,
            content,
            rating,
            date,
            project,
          }) => (
            <motion.article
              key={id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm sm:shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              tabIndex={0} // for keyboard accessibility
            >
              <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow leading-relaxed">
                “{content}”
              </p>

              <div className="flex items-center mb-4">
                <LazyImage
                  src={avatar}
                  alt={`${name}'s avatar`}
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-primary"
                />
                <div className="ml-3 sm:ml-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {role} @ {company}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div aria-hidden="true">
                  {stars(rating)}
                </div>
                <div className="sr-only">Rating: {rating} out of 5 stars</div>
              </div>

              {project && (
                <p className="text-sm text-primary dark:text-blue-400 font-medium mb-2">
                  Project: <span className="italic">{project}</span>
                </p>
              )}

              <time
                dateTime={date}
                className="mt-auto text-xs text-gray-400 dark:text-gray-500"
              >
                {new Date(date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </motion.article>
          )
        )}
      </motion.div>
    </section>
  );
};

export default TestimonialSection;
