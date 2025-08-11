import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import LazyImage from '@/components/LazyImage';
import testimonials from '../../data/testimonialsData';
import { SectionHeader } from '@/components/ui/AnimatedSection';

// Animation variants for individual testimonial items
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
      className="py-8 sm:py-12 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full mb-12 sm:mb-16 lg:mb-20">
          <SectionHeader
            title="What People Say"
            subtitle="Client testimonials and feedback"
          />
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Pagination, A11y]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index, className) {
              return `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}" tabindex="0"></span>`;
            }
          }}
          className="pb-16 px-1"
          style={{
            '--swiper-pagination-bullet-size': '12px',
            '--swiper-pagination-bullet-horizontal-gap': '8px',
            '--swiper-pagination-bullet-inactive-color': '#9CA3AF',
            '--swiper-pagination-bullet-inactive-opacity': '0.8',
            '--swiper-pagination-color': '#3B82F6',
            '--swiper-pagination-bullet-width': '24px',
            '--swiper-pagination-bullet-height': '6px',
            '--swiper-pagination-bullet-border-radius': '3px'
          } as React.CSSProperties}
        >
          {testimonials.map(({ id, name, role, company, avatar, content, rating, date, project }) => (
            <SwiperSlide key={id}>
              <motion.article
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col mx-2 sm:mx-0"
                tabIndex={0}
              >
                <p className="text-gray-800 dark:text-gray-200 mb-6 flex-grow leading-relaxed text-base">
                  &ldquo;{content}&rdquo;
                </p>
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                    <LazyImage
                      src={avatar}
                      alt={`${name}'s avatar`}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {role} @ {company}
                    </p>
                  </div>
                </div>
                <div className="mb-3">
                  <div aria-hidden="true" className="flex">
                    {stars(rating)}
                  </div>
                  <div className="sr-only">Rating: {rating} out of 5 stars</div>
                </div>
                {project && (
                  <p className="text-sm text-primary-700 dark:text-blue-400 font-medium mb-2">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {testimonials.map(({ id, name, role, company, avatar, content, rating, date, project }) => (
          <motion.article
            key={id}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            tabIndex={0}
          >
            <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow leading-relaxed">
              &ldquo;{content}&rdquo;
            </p>
            <div className="flex items-center mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                <LazyImage
                  src={avatar}
                  alt={`${name}'s avatar`}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {role} @ {company}
                </p>
              </div>
            </div>
            <div className="mb-3">
              <div aria-hidden="true" className="flex">
                {stars(rating)}
              </div>
              <div className="sr-only">Rating: {rating} out of 5 stars</div>
            </div>
            {project && (
              <p className="text-xs text-primary dark:text-blue-400 font-medium mb-2">
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
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
