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
            This project analyzes sales data from Bansal Supermarket to derive actionable insights
            for inventory management, pricing strategies, and sales optimization. As a GRN Officer
            at Bansal Supermarket, I leveraged my experience to interpret the data and provide
            relevant recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">₹238,035</div>
            <div className="text-sm text-blue-600 dark:text-blue-200">Total Sale Value</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">1,188</div>
            <div className="text-sm text-green-600 dark:text-green-200">Top Profit (₹)</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">17.5%</div>
            <div className="text-sm text-purple-600 dark:text-purple-200">Top Margin</div>
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
                Collected and cleaned sales and inventory data from Bansal Supermarket's retail
                software.
              </li>
              <li>
                Analyzed item-wise sales and profit performance to identify top-selling and most
                profitable products.
              </li>
              <li>
                Created interactive Tableau dashboards to visualize sales vs. profit, category
                contributions, and profit by item.
              </li>
              <li>
                Compared product categories (Food vs Non-Food) to highlight revenue drivers and
                optimize inventory focus.
              </li>
              <li>
                Calculated profit margins and stock turnover rates to recommend pricing and
                inventory improvements.
              </li>
              <li>
                Summarized actionable insights for management, including which items to promote and
                where to reduce losses.
              </li>
            </ul>
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
      {
        src: '/Sahil-Ali-Portfolio/images/projects/Bansal_Project2/bs-top10-600w.webp',
        alt: 'Top 10 Products by Sales',
        caption: 'Bar chart displaying the top 10 best-selling products by total sales value.',
      },
      {
        src: '/Sahil-Ali-Portfolio/images/projects/Bansal_Project2/bs2-Dashboard.webp',
        alt: 'Top 10 Products by Sales',
        caption: 'Bar chart displaying the top 10 best-selling products by total sales value.',
      },
      {
        src: '/images/projects/Bansal_Project2/bs3-Dashboard.webp',
        alt: 'Top 10 Products by Sales',
        caption: 'Bar chart displaying the top 10 best-selling products by total sales value.',
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
