import React from 'react';

import type { Project } from '../../data/projects';
import ProjectTemplate from './ProjectTemplate';

const RetailCashFlow: React.FC<{
  project: Project;
  currentIndex: number;
  totalProjects: number;
}> = ({ project, currentIndex, totalProjects }) => {
  const projectContent = {
    overview: (
      <div className="space-y-6">
        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
          <p className="text-lg">
            Automated daily cash tracking for two retail stores, reducing errors and enabling
            real-time financial decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">80%</div>
            <div className="text-sm text-blue-600 dark:text-blue-200">Error Reduction</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">Real-time</div>
            <div className="text-sm text-purple-600 dark:text-purple-200">Financial Tracking</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">2+</div>
            <div className="text-sm text-green-600 dark:text-green-200">Stores Monitored</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">100%</div>
            <div className="text-sm text-orange-600 dark:text-orange-200">Automated</div>
          </div>
        </div>
      </div>
    ),
    sections: [
      {
        title: 'Project Overview',
        content: (
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300">
              Developed a robust daily cash flow management system for two retail stores by
              integrating Google Sheets (for data entry) with Power BI (for visualization and
              analysis). This solution automates daily tracking of cash inflows, outflows, deposits,
              and discrepancies, providing real-time insights for better decision-making.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Key Features</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Automated data import from Google Sheets to Power BI for real-time dashboard
                  updates
                </li>
                <li>
                  Daily tracking of sales, expenses, coin additions, and deposits for each store
                </li>
                <li>
                  Dynamic calculation of opening/closing balances, shortfall/excess, and cash left
                  in drawer
                </li>
                <li>
                  Custom Power BI dashboards for trend analysis, store comparisons, and anomaly
                  detection
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        title: 'How Daily Cash Flow Works',
        content: (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                  1. Opening Balance
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  At the beginning of each day, the cashier starts with an Opening Balance from the
                  previous day's closing balance. This amount is carried over and represents the
                  cash available to begin the day's operations.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-medium">Example:</span> If yesterday's closing balance was
                  ₹5,000, this becomes today's opening balance.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                  2. Cash Sales
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Throughout the day, as customers make cash purchases, the cashier records the
                  amount. This cash is added to the Opening Balance to calculate the total cash
                  available for the day.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-medium">Example:</span> If today's cash sales total ₹8,000,
                  then the total cash available becomes ₹5,000 (opening) + ₹8,000 (sales) = ₹13,000.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                  3. Expenses (Store and Staff Payments)
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  The store incurs daily expenses such as rent, electricity, and staff payments.
                  These are deducted from the total available cash.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-medium">Example:</span> If store expenses are ₹2,000 and
                  staff payments ₹3,000, then ₹5,000 is deducted from the total cash available.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                  4. Closing Balance
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  After all expenses, the remaining cash is the Closing Balance — the final amount
                  at day's end, ready for deposit or carryover.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-medium">Example:</span> If, after deducting ₹5,000 in
                  expenses, ₹8,000 remains, this is the closing balance.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">5. Deposit</h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  At day's end, a portion of the closing balance is deposited into the store's bank
                  account to minimize overnight cash holding.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-medium">Example:</span> If ₹6,000 is deposited, ₹2,000 stays
                  with the cashier for the next day.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                  6. Next Day's Opening Balance
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  The Opening Balance for the next day is the remaining amount after the deposit.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-medium">Example:</span> If closing balance was ₹8,000 and
                  ₹6,000 was deposited, the next day's opening balance will be ₹2,000.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'Technical Implementation',
        content: (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                Google Sheets Integration
              </h4>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
                  <code>
                    {`=LEFT_TO_DRAWER + DEPOSIT - CLOSING_BALANCE
= D7346 + D7345 - D7342`}
                  </code>
                </pre>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                This formula calculates the amount left in the drawer by adding the deposit to the
                opening balance and subtracting the closing balance.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                Power BI DAX Measures
              </h4>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
                  <code>
                    {`// Calculate Closing Balance
Closing Balance = 
SUM('CashFlow'[Opening Balance]) +
SUM('CashFlow'[Total Income]) -
SUM('CashFlow'[Total Expenses]) -
SUM('CashFlow'[Deposit])

// Calculate Variance
Variance = 
[Actual Closing Balance] - [Expected Closing Balance]`}
                  </code>
                </pre>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                These DAX measures help in calculating the closing balance and variance for better
                financial tracking.
              </p>
            </div>
          </div>
        ),
      },
      {
        title: 'Business Impact',
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4">
                Key Benefits
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      80% Reduction in Errors
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Automated calculations eliminated manual entry mistakes
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Real-time Financial Visibility
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Immediate access to cash position and trends
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Improved Decision Making
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Data-driven insights for better financial control
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ),
      },
    ],
    images: [
      {
        src: '/images/projects/RetailCashFlow_Project4/Project4_Cover-600w.webp',
        alt: 'Retail Cash Flow Dashboard Overview',
        caption: 'Dashboard: High-level daily cash inflows and outflows for both stores, enabling quick financial insights and decisions.',
        srcSet: '/images/projects/RetailCashFlow_Project4/Project4_Cover-300w.webp 300w, /images/projects/RetailCashFlow_Project4/Project4_Cover-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/RetailCashFlow_Project4/CashFlow1-600w.webp',
        alt: 'Store-wise Cash Summary',
        caption: 'Store summary: Compare cash performance by location, monitor trends, and ensure accuracy across outlets',
        srcSet: '/images/projects/RetailCashFlow_Project4/CashFlow1-300w.webp 300w, /images/projects/RetailCashFlow_Project4/CashFlow1-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/images/projects/RetailCashFlow_Project4/CashFlow2-600w.webp',
        alt: 'Detailed Transaction Analysis',
        srcSet: '/images/projects/RetailCashFlow_Project4/CashFlow2-300w.webp 300w, /images/projects/RetailCashFlow_Project4/CashFlow2-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px',
        caption: 'Detailed transaction analysis showing daily cash flow patterns and anomalies',
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

export default RetailCashFlow;
