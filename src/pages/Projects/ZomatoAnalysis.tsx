import React from 'react';

import type { Project } from '../../data/projects';
import ProjectTemplate from './ProjectTemplate';

const ZomatoAnalysis: React.FC<{
  project: Project;
  currentIndex: number;
  totalProjects: number;
}> = ({ project, currentIndex, totalProjects }) => {
  const projectContent = {
    overview: (
      <div className="space-y-6">
        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
          <p className="text-lg">
            Strategic market identification leveraging restaurant data to guide expansion decisions.
            Analyzed Zomato's restaurant data across multiple countries using Excel to identify
            optimal markets for expansion. Evaluated key metrics including restaurant counts,
            average ratings, cuisine diversity, and price ranges to inform strategic decisions.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Objective</h3>
          <p className="text-blue-700 dark:text-blue-100">
            Build an interactive Excel dashboard that highlights market saturation, customer
            satisfaction, and growth potential to recommend high-opportunity regions.
          </p>
        </div>
      </div>
    ),
    sections: [
      {
        title: 'Key Insights',
        content: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Restaurant Counts:</strong> Turkey leads with the highest number of
              restaurants, followed by the Philippines and Indonesia.
            </li>
            <li>
              <strong>Ratings:</strong> Philippines and Indonesia show superior average ratings,
              indicating strong customer approval.
            </li>
            <li>
              <strong>Price Range:</strong> Qatar exhibits the highest average pricing, suggesting a
              premium market segment.
            </li>
            <li>
              <strong>Cuisine Diversity:</strong> Turkey offers the most diverse cuisines,
              presenting varied expansion opportunities.
            </li>
            <li>
              <strong>Market Size:</strong> Across selected countries, 97 restaurants average a 4.29
              rating, reflecting promising market conditions.
            </li>
          </ul>
        ),
      },
      {
        title: 'Recommendations',
        content: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Prioritize expansion in the Philippines and Indonesia for quality-focused growth.
            </li>
            <li>Target Qatar for premium market positioning.</li>
            <li>Leverage Turkey's volume-driven market with diverse cuisine offerings.</li>
            <li>Maintain high service and food quality to sustain customer satisfaction.</li>
            <li>Customize menus to local tastes while introducing trending cuisines.</li>
          </ul>
        ),
      },
      {
        title: 'Approach',
        content: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Cleaned and mapped country codes using Excel functions.</li>
            <li>
              Created PivotTables and PivotCharts to analyze ratings, counts, cuisines, and prices.
            </li>
            <li>Implemented slicers for dynamic country filtering to enhance interactivity.</li>
            <li>Designed a KPI-focused dashboard for quick, actionable insights.</li>
            <li className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm mt-3">
              <span className="text-gray-500">// Sample Excel Formula</span>
              <br />
              <span className="text-blue-600 dark:text-blue-400">=AVERAGEIFS</span>(RatingColumn,
              CountryColumn,{' '}
              <span className="text-green-600 dark:text-green-400">"Philippines"</span>)
            </li>
          </ul>
        ),
      },
      {
        title: 'Impact',
        content: (
          <p className="text-gray-700 dark:text-gray-300">
            Enabled Zomato's team to identify priority regions swiftly, reducing reporting time by
            70% and improving market opportunity accuracy.
          </p>
        ),
      },
      {
        title: 'Tools Used',
        content: (
          <div className="flex flex-wrap gap-2">
            {[
              'Microsoft Excel (PivotTables, Charts, Conditional Formatting)',
              'Data Cleaning & Merging Techniques',
            ].map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        ),
      },
    ],
    images: [
      {
        src: '/images/projects/Zomto_Project1/Project1_Cover-1200w.webp',
        alt: 'Zomato Expansion Dashboard Overview',
        caption:
          'Dashboard overview: Visualizing restaurant distribution, ratings, pricing, and cuisine diversity across target countries.',
      },
      {
        src: '/images/projects/Zomto_Project1/zometo-ds-1200w.webp',
        alt: 'Restaurant Evaluation by Country',
        caption:
          'Market evaluation: Highlighting countries with high potential for new restaurant openings.',
      },
      {
        src: '/images/projects/Zomto_Project1/zt1-1200w.webp',
        alt: 'Strategic Insights Dashboard',
        caption: 'Detailed analysis of customer ratings and market potential.',
      },
      {
        src: '/images/projects/Zomto_Project1/zt2-1200w.webp',
        alt: 'Final Dashboard Summary',
        caption: 'Summary dashboard consolidating insights for strategic expansion decisions.',
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

export default ZomatoAnalysis;
