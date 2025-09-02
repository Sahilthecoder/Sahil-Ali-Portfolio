import React from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiMail, FiPhone, FiLinkedin, FiAward, FiExternalLink, FiGithub } from 'react-icons/fi';
import { FaAmazon, FaMicrosoft, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';
import educationData from '@/data/educationData';
import skills from '@/data/skills';
import certifications from '@/data/certifications';

// Import types from your types file
import type { 
  WorkExperience as ExpWorkExperience, 
  Education as EducationType, 
  Certification as CertType, 
  Skill as ExperienceSkill 
} from '@/types/experience.types';

// Type for the skills grouped by category
type SkillsByCategory = Record<string, ExperienceSkill[]>;

const Resume: React.FC = () => {
  // Use the imported data directly with proper typing
  const experienceData = experiences as ExpWorkExperience[];
  const educationItems = educationData as EducationType[];
  const certificationItems = certifications as CertType[];
  
  // Group skills by category
  const skillItems = (skills as unknown as ExperienceSkill[]).reduce<SkillsByCategory>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div 
            className="bg-gradient-to-r from-teal-800 to-teal-950 p-8 text-white"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-extrabold text-white">Sahil Ali</h1>
                <p className="text-white text-lg mt-1 font-semibold">Operations & Process Improvement Specialist</p>
              </div>
              <a 
                href="/assets/Sahil_Ali_Cv.pdf" 
                download
                className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 border-2 border-white text-base font-semibold rounded-md text-white bg-transparent hover:bg-white hover:text-teal-900 transition-colors duration-200 shadow-lg"
              >
                <FiDownload className="mr-2" />
                Download CV
              </a>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-base">
              {[
                { icon: <FiMail className="w-6 h-6 text-teal-200" />, text: 'sahilkhan36985@gmail.com', href: 'mailto:sahilkhan36985@gmail.com' },
                { icon: <FiPhone className="w-6 h-6 text-teal-200" />, text: '+91 98757 71550', href: 'tel:+919875771550' },
                { icon: <FaWhatsapp className="w-6 h-6 text-teal-200" />, text: 'Message on WhatsApp', href: 'https://wa.me/919875771550' },
                { icon: <FiGithub className="w-6 h-6 text-teal-200" />, text: 'github.com/sahilthecoder', href: 'https://github.com/sahilthecoder' },
                { icon: <FiLinkedin className="w-6 h-6 text-teal-200" />, text: 'linkedin.com/in/sahil-ali-714867242', href: 'https://www.linkedin.com/in/sahil-ali-714867242' },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-2 group"
                  whileHover={{ x: 2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <span className="text-teal-200 group-hover:text-white transition-colors">
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-teal-200 transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-white font-medium">{item.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="p-8">
            {/* Summary */}
            <motion.section className="mb-10" variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">Summary</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Results-driven Operations and Process Improvement Specialist with expertise in supply chain management, vendor relations, and operational efficiency. 
                Proven track record in optimizing processes, reducing costs, and implementing innovative solutions in retail and e-commerce environments. 
                Skilled in data analysis, project management, and cross-functional team leadership.
              </p>
            </motion.section>

            {/* Experience */}
            <motion.section className="mb-10" variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2">Work Experience</h2>
              <div className="space-y-8">
                {experienceData.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-blue-500 pl-4 relative">
                    <div className="absolute -left-2 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                      <div className="text-teal-600 dark:text-teal-400 font-medium">
                        {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'} - {exp.isCurrent || !exp.endDate ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">{exp.company}</span>
                      {exp.companyUrl && (
                        <a 
                          href={exp.companyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-1 text-teal-600 dark:text-teal-400 hover:underline"
                        >
                          <FiExternalLink className="inline w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                      {exp.achievements?.map((achievement, i) => (
                        <li key={i} className="text-justify">{achievement}</li>
                      ))}
                    </ul>
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.span 
                              key={i}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="px-3 py-1.5 text-xs font-medium bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 rounded-full shadow-sm border border-teal-200 dark:border-teal-800/50 hover:bg-teal-200 dark:hover:bg-teal-800/70 transition-colors cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Education */}
            <motion.section className="mb-10" variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2">Education</h2>
              <div className="space-y-6">
                {educationItems.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-green-500 pl-4 relative">
                    <div className="absolute -left-2 top-0 w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                    <div className="text-gray-600 dark:text-gray-400">
                      {edu.institution}
                      {edu.institutionUrl && (
                        <a 
                          href={edu.institutionUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-1 text-teal-600 dark:text-teal-400 hover:underline"
                        >
                          <FiExternalLink className="inline w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    {edu.fieldOfStudy && (
                      <div className="text-gray-600 dark:text-gray-400 text-sm">{edu.fieldOfStudy}</div>
                    )}
                    <div className="text-gray-500 dark:text-gray-500 text-sm">
                      {edu.period || `${edu.startDate} - ${edu.endDate || 'Present'}`}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section className="mb-10" variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(skillItems).map(([category, skillList]) => (
                  <div key={category} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 capitalize">{category}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skillList.map((skill: ExperienceSkill, i: number) => (
                        <motion.span 
                          key={skill.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors cursor-default"
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Certifications */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificationItems.map((cert) => (
                  <div key={cert.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                        {cert.institution?.toLowerCase().includes('microsoft') ? (
                          <FaMicrosoft className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        ) : cert.institution?.includes('Amazon') ? (
                          <FaAmazon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        ) : (
                          <FiAward className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{cert.fieldOfStudy || 'Professional Certification'}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {cert.institution} • {cert.period || cert.year}
                        </p>
                        {cert.location && (
                          <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">{cert.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </motion.div>

        <motion.div 
          className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm"
          variants={itemVariants}
        >
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          <p className="mt-2">
            View my <Link to="/experience" className="text-blue-600 dark:text-blue-400 hover:underline">Experience</Link> page for more details.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;
