import { motion } from 'framer-motion';
import React from 'react';
import { FaYoutube } from 'react-icons/fa';

// Define animation functions directly in the file
const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.25,
        delay,
      },
    },
  };
};

const staggerContainer = (staggerChildren: number, delayChildren: number) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

// Define formatter functions directly in the file
const formatNumber = (num: number, digits: number = 0): string => {
  return num.toFixed(digits);
};

interface YoutubeVideo {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  viewCount: string;
  publishedAt: string;
  duration: string;
  videoUrl: string;
}

interface BlogYoutubeProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  videos?: YoutubeVideo[];
  channelName?: string;
  channelUrl?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const defaultVideos: YoutubeVideo[] = [
  {
    id: '1',
    title: '"Kyun Main Jaagoon" Full Song Patiala House | Akshay Kumar',
    description: 'Dil Hai Kahin Aur Dhadkan Hai Kahin, Saansen Hai Magar Kyun Zinda Main Nahin',
    thumbnailUrl: 'https://i.ytimg.com/vi/lN1m7zLBbSU/hqdefault.jpg',
    viewCount: '150000000',
    publishedAt: '2023-06-10T15:30:00Z',
    duration: '5:34',
    videoUrl: 'https://youtu.be/lN1m7zLBbSU?si=uvvLuxWo8MTC6kSn',
  },
  {
    id: '2',
    title: 'Tune Jo Na Kaha Song | New York',
    description: 'Tune Jo Na Kaha Song | New York',
    thumbnailUrl: 'https://i.ytimg.com/vi/dTu5dTEzVM4/hqdefault.jpg',
    viewCount: '150000000',
    publishedAt: '2023-06-10T15:30:00Z',
    duration: '3:34',
    videoUrl: 'https://youtu.be/dTu5dTEzVM4?si=dCvWSESkUA1y2KpS',
  },
  {
    id: '3',
    title: 'Nishan ( Official Video ) Khushi Baliyan | Krrish Rao | 8 Saal Ka Tha Pyar',
    description: 'Nishan ( Official Video ) Khushi Baliyan | Krrish Rao | 8 Saal Ka Tha Pyar',
    thumbnailUrl: 'https://i.ytimg.com/vi/da5p0sMVUDI/hqdefault.jpg',
    viewCount: '150000000',
    publishedAt: '2023-06-10T15:30:00Z',
    duration: '4:34',
    videoUrl: 'https://youtu.be/da5p0sMVUDI?si=AXBQUjZk16AAXK3V',
  },
];

const BlogYoutube: React.FC<BlogYoutubeProps> = ({
  id,
  className = '',
  title = 'Latest Videos',
  subtitle = 'Watch my latest tutorials and tech reviews',
  videos = defaultVideos,
  channelName = 'King OP',
  channelUrl = 'https://www.youtube.com/channel/UC3sxEdd8JnaZjTdbMJd1qCA',
  ctaText = 'Subscribe to My Channel',
  onCtaClick = () => {
    window.open(
      'https://www.youtube.com/channel/UC3sxEdd8JnaZjTdbMJd1qCA?sub_confirmation=1',
      '_blank'
    );
  },
}) => {
  // Format view count
  const formatViewCount = (count: string): string => {
    const num = parseInt(count.replace(/\D/g, ''), 10);
    if (isNaN(num)) return count;

    if (num >= 1000000) {
      return `${formatNumber(num / 1000000, 1)}M views`;
    }
    if (num >= 1000) {
      return `${formatNumber(num / 1000, 1)}K views`;
    }
    return `${num} views`;
  };

  // Format published date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  // Function to extract video ID from URL (kept for future use)
  // const getVideoId = (url: string): string => {
  //   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  //   const match = url.match(regExp);
  //   return match && match[2].length === 11 ? match[2] : '';
  // };

  return (
    <section 
      id={id}
      className={`py-16 md:py-24 bg-background ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 sm:mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn('down', 0.1)}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer(0.2, 0.1)}
        >
          {videos.map((video, index) => (
            <motion.article
              key={video.id}
              className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              variants={fadeIn('up', 0.1 * index)}
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded dark:bg-white/20">
                  {video.duration}
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{formatViewCount(video.viewCount)}</span>
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                >
                  Watch on YouTube
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {channelUrl && (
          <motion.div
            className="text-center"
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCtaClick}
              className="group inline-flex items-center justify-center px-6 py-3 space-x-2 text-base font-medium text-white transition-all duration-200 bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-105"
            >
              <FaYoutube className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="group-hover:scale-105 transition-transform duration-200">
                {ctaText}
              </span>
            </a>
            {channelName && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {channelName} • {formatViewCount('1500000')} subscribers
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogYoutube;
