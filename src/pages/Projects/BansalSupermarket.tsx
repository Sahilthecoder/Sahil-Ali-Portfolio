import React from 'react';

import type { Project } from '../../data/projects';
import ProjectTemplate from './ProjectTemplate';

const BansalSupermarket: React.FC<{
  project: Project;
  currentIndex: number;
  totalProjects: number;
}> = ({ project, currentIndex, totalProjects }) => {
  const projectContent = {
    overview: (
      <div className="space-y-6">
        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
          <p className="text-lg">
            This project transformed Bansal Supermarket&apos;s traditional retail operations into a modern omnichannel retail experience. As the E-commerce & Operations Lead, I spearheaded the digital transformation, integrating online sales channels with existing physical store operations to create a seamless customer experience.
          </p>
          <p className="text-lg mt-4">
            The initiative involved implementing an e-commerce platform, synchronizing inventory across channels, and developing data-driven strategies to optimize both online and in-store performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">20%</div>
            <div className="text-sm text-blue-600 dark:text-blue-200">Online Sales Contribution</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">40%</div>
            <div className="text-sm text-green-600 dark:text-green-200">Fulfillment Time Reduction</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">35%</div>
            <div className="text-sm text-purple-600 dark:text-purple-200">Customer Satisfaction Increase</div>
          </div>
        </div>
      </div>
    ),
    sections: [
      {
        title: 'Project Highlights',
        content: (
          <div className="space-y-4">
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Led the end-to-end implementation of an e-commerce platform, integrating it with existing POS and inventory management systems.
              </li>
              <li>
                Developed an omnichannel inventory management system that synchronized stock levels in real-time across physical stores and online channels.
              </li>
              <li>
                Implemented a data-driven pricing strategy that optimized margins while remaining competitive across online marketplaces.
              </li>
              <li>
                Created automated order routing logic to optimize fulfillment from multiple store locations based on inventory availability and proximity to customer.
              </li>
              <li>
                Launched targeted digital marketing campaigns that increased online customer acquisition by 65% within the first quarter.
              </li>
              <li>
                Developed a customer data platform to unify online and offline purchase history, enabling personalized marketing and loyalty programs.
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: 'Key Achievements',
        content: (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Omnichannel Success
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Achieved 20% of total sales through the new e-commerce channel within 6 months of launch, with 45% of online orders utilizing in-store pickup options.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Operational Efficiency
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Reduced order fulfillment time by 40% through process optimization and staff training, while decreasing order inaccuracies by 65%.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Customer Experience
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Improved customer satisfaction scores by 35% through better online order accuracy, faster fulfillment, and an intuitive mobile shopping experience.
              </p>
            </div>
          </div>
        ),
      },
      {
        title: 'Technical Implementation',
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">E-commerce Platform</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Implemented a headless commerce architecture using Next.js for the frontend and integrated with a robust backend API for seamless performance and scalability.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Inventory Management</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Developed real-time inventory synchronization across all sales channels, reducing stock discrepancies by 75% and preventing overselling.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Data Analytics</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Built custom dashboards in Tableau to track KPIs across channels, enabling data-driven decision making for inventory and marketing strategies.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Mobile Experience</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Created a progressive web app (PWA) that provided native-app like experience with offline capabilities and push notifications, increasing mobile conversions by 30%.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'Key Insights',
        content: (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Sales Distribution
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Food items account for 65% of total sales, while Non-Food items contribute 35%,
                indicating a stronger performance in the food category.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Top Performing Products
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                TIRUPATI COTTONSEED OIL 1lt is the highest-selling product with total sales of
                ₹63,636, though with a modest 1.87% profit margin.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Profit Margins
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                LOVE BITE NANKHATAI 500g shows the highest profit margin at 17.5%, indicating
                potential for increased promotion and inventory focus.
              </p>
            </div>
          </div>
        ),
      },
      {
        title: 'Recommendations',
        content: (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Inventory Management
              </h4>
              <p className="text-blue-700 dark:text-blue-300">
                Focus on increasing stock turnover rates for slow-moving items to reduce holding
                costs and free up working capital.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 dark:text-green-200">Pricing Strategy</h4>
              <p className="text-green-700 dark:text-green-300">
                Consider slight price adjustments for high-demand, low-margin items to improve
                overall profitability without significantly impacting sales volume.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                Marketing Focus
              </h4>
              <p className="text-purple-700 dark:text-purple-300">
                Develop targeted promotions for high-margin items like LOVE BITE NANKHATAI to drive
                both sales and profitability.
              </p>
            </div>
          </div>
        ),
      },
    ],
    images: [
      {
        src: '/Sahil-Ali-Portfolio/images/projects/Bansal_Project2/Project2_Cover-600w.webp',
        alt: 'Bansal Supermarket Sales Dashboard',
        caption: 'Dashboard overview: Top selling items, profitability, and key metrics visualized from Bansal Supermarket sales data.',
        srcSet: '/Sahil-Ali-Portfolio/images/projects/Bansal_Project2/Project2_Cover-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/Bansal_Project2/Project2_Cover-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/Sahil-Ali-Portfolio/images/projects/Bansal_Project2/bs-saleVSpft-600w.webp',
        alt: 'Sales vs Profit Analysis',
        caption: 'Scatter plot showing the relationship between sales volume and profit margin across product categories.',
        srcSet: '/Sahil-Ali-Portfolio/images/projects/Bansal_Project2/bs-saleVSpft-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/Bansal_Project2/bs-saleVSpft-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/Sahil-Ali-Portfolio/images/projects/Bansal_Project2/bs-stockTO-600w.webp',
        alt: 'Stock Turnover Analysis',
        caption: 'Visualization of stock turnover rates by product category to optimize inventory management.',
        srcSet: '/Sahil-Ali-Portfolio/images/projects/Bansal_Project2/bs-stockTO-300w.webp 300w, /Sahil-Ali-Portfolio/images/projects/Bansal_Project2/bs-stockTO-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
    ],
  };

  return (
    <ProjectTemplate
      project={project}
      currentIndex={currentIndex}
      totalProjects={totalProjects}
      customContent={{
        overview: projectContent.overview,
        sections: projectContent.sections,
        images: projectContent.images,
      }}
    />
  );
};

export default BansalSupermarket;
