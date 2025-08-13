import React from 'react';
import { FaCode, FaLightbulb, FaMagic, FaPalette, FaRobot, FaTools } from 'react-icons/fa';
import { SiGithub, SiNetlify, SiOpenai, SiVercel } from 'react-icons/si';

import type { Project } from '../../data/projects';
import ProjectTemplate from './ProjectTemplate';

const PortfolioCreation: React.FC<{
  project: Project;
  currentIndex: number;
  totalProjects: number;
}> = ({ project, currentIndex, totalProjects }) => {
  const projectContent = {
    overview: (
      <div className="space-y-6">
        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
          <p className="text-lg">
            A showcase of how I leveraged AI tools as a non-developer to create professional
            portfolios, including this one and others like Mahira&apos;s portfolio. This project
            demonstrates the power of AI in modern web development for non-coders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <FaRobot className="text-blue-600 dark:text-blue-400 text-2xl mr-3" />
              <div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  AI-Powered
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-200">Development</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <FaMagic className="text-purple-600 dark:text-purple-400 text-2xl mr-3" />
              <div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  No-Code
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-200">Solutions</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <FaPalette className="text-green-600 dark:text-green-400 text-2xl mr-3" />
              <div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  Professional
                </div>
                <div className="text-sm text-green-600 dark:text-green-200">Design</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    sections: [
      {
        title: 'My AI-Powered Portfolio Journey',
        content: (
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300">
              As an AI generalist with no formal web development background, I&apos;ve successfully
              created multiple professional portfolios using a combination of AI tools and no-code
              platforms. This project documents my journey and the tools that made it possible.
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-lg">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                Featured Portfolio Projects
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h5 className="font-medium text-gray-900 dark:text-white">This Portfolio</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    Built with React, TypeScript, and Tailwind CSS, using AI assistance for code
                    generation and design.
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <a
                    href="https://mahiradesignhub.github.io/mahira-portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Mahira&apos;s Portfolio
                  </a>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    A creative portfolio showcasing design work, built with similar AI-assisted
                    techniques.
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <a
                    href="https://sahilthecoder.github.io/portfolio-website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    My Previous Portfolio
                  </a>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    An earlier version of my portfolio, demonstrating the evolution of my skills and
                    approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'AI Tools & Technologies',
        content: (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                <FaTools className="inline mr-2 text-blue-500" />
                My AI Toolkit
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                    Core AI Tools
                  </h5>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <SiOpenai className="text-green-600 mt-1 mr-2" />
                      <div>
                        <span className="font-medium">ChatGPT</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          For code generation, debugging, and content creation
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FaRobot className="text-blue-500 mt-1 mr-2" />
                      <div>
                        <span className="font-medium">Windsurf AI</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          For component generation and UI/UX suggestions
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FaLightbulb className="text-yellow-500 mt-1 mr-2" />
                      <div>
                        <span className="font-medium">Perplexity AI</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          For research and best practices in web development
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                    Development & Deployment
                  </h5>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <SiGithub className="text-gray-800 dark:text-gray-200 mt-1 mr-2" />
                      <div>
                        <span className="font-medium">GitHub</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          For version control and collaboration
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <SiVercel className="text-black dark:text-white mt-1 mr-2" />
                      <SiNetlify className="text-teal-500 mt-1 mr-2" />
                      <div>
                        <span className="font-medium">Vercel & Netlify</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          For seamless deployment and hosting
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'The Development Process',
        content: (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                <FaCode className="inline mr-2 text-purple-500" />
                How I Built It
              </h4>

              <ol className="relative border-l border-gray-200 dark:border-gray-700 space-y-8">
                <li className="ml-4">
                  <div className="absolute w-3 h-3 bg-blue-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-blue-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    1. Planning & Design
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Used AI tools to generate layout ideas, color schemes, and component structures
                    based on modern web design principles.
                  </p>
                </li>
                <li className="ml-4">
                  <div className="absolute w-3 h-3 bg-blue-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-blue-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    2. Component Development
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Generated React components using AI, then customized them to fit the design.
                    Used Tailwind CSS for styling with AI assistance for responsive design.
                  </p>
                </li>
                <li className="ml-4">
                  <div className="absolute w-3 h-3 bg-blue-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-blue-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    3. Content Creation
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Leveraged AI to help craft compelling content, project descriptions, and ensure
                    consistent tone throughout the portfolio.
                  </p>
                </li>
                <li className="ml-4">
                  <div className="absolute w-3 h-3 bg-blue-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-blue-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    4. Testing & Refinement
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Used AI-powered tools to test responsiveness, accessibility, and performance
                    across devices.
                  </p>
                </li>
                <li className="ml-4">
                  <div className="absolute w-3 h-3 bg-blue-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-blue-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    5. Deployment
                  </h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Automated deployment using GitHub Actions to Vercel/Netlify, with AI assistance
                    in troubleshooting any issues.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        ),
      },
      {
        title: 'Key Learnings & Tips',
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                  <FaLightbulb className="inline mr-2 text-yellow-500" />
                  AI-Assisted Development Tips
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Be Specific with Prompts</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The more detailed your requests to AI tools, the better the output
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Iterate and Refine</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Use AI suggestions as a starting point, then customize to your needs
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Combine Multiple Tools</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Different AI tools excel at different tasks - use them together
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                  <FaTools className="inline mr-2 text-blue-500" />
                  Resources for Non-Developers
                </h4>
                <ul className="space-y-3">
                  <li className="text-gray-700 dark:text-gray-300">
                    <a
                      href="https://github.com/features/copilot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      GitHub Copilot
                    </a>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      AI pair programmer that helps you write better code
                    </p>
                  </li>
                  <li className="text-gray-700 dark:text-gray-300">
                    <a
                      href="https://www.figma.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Figma
                    </a>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Design tool with AI plugins for non-designers
                    </p>
                  </li>
                  <li className="text-gray-700 dark:text-gray-300">
                    <a
                      href="https://vercel.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Vercel
                    </a>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Easy deployment for web projects with GitHub integration
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
    ],
    images: [
      {
        src: '/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-600w.webp',
        alt: 'Portfolio Creation',
        caption: 'Visualizing the AI-powered portfolio creation process',
        srcSet: '/images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-300w.webp 300w, /images/projects/Mahira_Portfolio_Web+AI/Project7_Cover-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      
    ],
  };

  return (
    <ProjectTemplate
      project={project}
      currentIndex={currentIndex}
      totalProjects={totalProjects}
      customContent={projectContent}
    />
  );
};

export default PortfolioCreation;
