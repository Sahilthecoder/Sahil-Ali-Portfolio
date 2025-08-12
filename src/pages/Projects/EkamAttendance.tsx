import React from 'react';

import type { Project } from '../../data/projects';
import ProjectTemplate from './ProjectTemplate';

const EkamAttendance: React.FC<{
  project: Project;
  currentIndex: number;
  totalProjects: number;
}> = ({ project, currentIndex, totalProjects }) => {
  const projectContent = {
    overview: (
      <div className="space-y-6">
        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
          <p className="text-lg">
            An intelligent workforce management platform leveraging computer vision and machine
            learning to automate time tracking, predict staffing needs, and optimize labor costs
            with 97% accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">97%</div>
            <div className="text-sm text-blue-600 dark:text-blue-200">AI Accuracy</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">95%</div>
            <div className="text-sm text-purple-600 dark:text-purple-200">Process Automation</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">22%</div>
            <div className="text-sm text-green-600 dark:text-green-200">Labor Cost Reduction</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">8K+/mo</div>
            <div className="text-sm text-orange-600 dark:text-orange-200">AI Predictions</div>
          </div>
        </div>
      </div>
    ),
    sections: [
      {
        title: 'AI Transformation Impact',
        content: (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg border border-red-100 dark:border-red-900/20">
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-4">
                  Before: Legacy System
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Manual entry led to frequent errors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>No real-time validation of working hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Difficult to track overtime and compliance</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg border border-green-100 dark:border-green-900/20">
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
                  After: AI-Powered Platform
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Automated Attendance System</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Color-coded validation (green = valid, red = error)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Automatic overtime calculation and alerts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Real-time data validation and error highlighting</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                AI-Powered Solution
              </h3>

              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-4 mt-1 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        AI-Powered Recognition
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Implemented computer vision and facial recognition to automate attendance
                        tracking with 97% accuracy, eliminating manual entry errors and buddy
                        punching.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-4 mt-1 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Predictive Analytics
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Developed ML models that analyze historical data to predict staffing needs
                        and prevent overtime, reducing labor costs by 22%.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex items-start">
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-4 mt-1 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Payroll Inaccuracies
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Incorrect attendance data led to payroll errors and processing delays.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Solution Developed
              </h3>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Color-coded Attendance System
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Green cells indicate valid working hours (8-12 hours)</li>
                  <li>Red cells highlight incorrect working hour calculations</li>
                  <li>Automatic validation of entries against business rules</li>
                </ul>

                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Relational SQL Database
                  </h4>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                    <code className="text-gray-800 dark:text-gray-200">
                      {`-- Database Schema
CREATE TABLE stores (
  store_id INT PRIMARY KEY,
  store_name VARCHAR(100) NOT NULL,
  location VARCHAR(200),
  monthly_budget_hours INT DEFAULT 4000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  store_id INT,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100),
  hourly_rate DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (store_id) REFERENCES stores(store_id)
);

CREATE TABLE attendance (
  attendance_id SERIAL PRIMARY KEY,
  employee_id INT,
  work_date DATE NOT NULL,
  hours_worked DECIMAL(5,2) NOT NULL,
  is_valid BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);`}
                    </code>
                  </pre>
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Time Management Controls
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      Enterprise limit: 4000 total hours/month enforced via database checks and
                      spreadsheet formulas
                    </li>
                    <li>
                      Anomaly detection: SQL alerts and sheet conditional formatting for high usage
                    </li>
                    <li>Overtime tracking: Automatic calculation and flagging of overtime hours</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Technology Stack
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Google Sheets
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Data entry, validation, and collaboration
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">SQL</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Data storage, querying, and reporting
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Data Validation
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Automated rules and conditional formatting
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Key SQL Queries
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Invalid Entries
                  </h4>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                    <code className="text-gray-800 dark:text-gray-200">
                      {`-- Find all invalid attendance entries
SELECT 
  e.name as employee_name,
  a.date,
  a.hours_worked,
  a.notes
FROM attendance a
JOIN employees e ON a.employee_id = e.employee_id
WHERE a.is_valid = FALSE
ORDER BY a.date DESC
LIMIT 10;`}
                    </code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Monthly Hours
                  </h4>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                    <code className="text-gray-800 dark:text-gray-200">
                      {`SELECT 
  e.name,
  SUM(a.hours_worked) as total_hours,
  CASE 
    WHEN SUM(a.hours_worked) > 176 THEN 'Over Limit'
    ELSE 'Within Limit'
  END as status
FROM attendance a
JOIN employees e ON a.employee_id = e.employee_id
WHERE EXTRACT(MONTH FROM a.date) = 6
  AND EXTRACT(YEAR FROM a.date) = 2023
GROUP BY e.name;`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg border border-blue-100 dark:border-blue-900/20">
              <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                Business Impact
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-blue-700 dark:text-blue-200">
                <li>Streamlined payroll processing with accurate data</li>
                <li>Better compliance with labor regulations</li>
                <li>Improved workforce planning and budgeting</li>
              </ul>
            </div>
          </div>
        ),
      },
    ],
    images: [
      {
        src: '/Sahil_Ali-Portfolio/images/projects/Attendance_Project3/Attendance_before-600w.webp',
        alt: 'Legacy Attendance System',
        caption: 'Manual attendance tracking system with potential for errors',
        srcSet: '/Sahil_Ali-Portfolio/images/projects/Attendance_Project3/Attendance_before-300w.webp 300w, /Sahil_Ali-Portfolio/images/projects/Attendance_Project3/Attendance_before-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/Sahil_Ali-Portfolio/images/projects/Attendance_Project3/Attendance_after-600w.webp',
        alt: 'AI-Powered Attendance System',
        caption: 'Automated attendance system with real-time validation',
        srcSet: '/Sahil_Ali-Portfolio/images/projects/Attendance_Project3/Attendance_after-300w.webp 300w, /Sahil_Ali-Portfolio/images/projects/Attendance_Project3/Attendance_after-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/Sahil_Ali-Portfolio/images/projects/Attendance_Project3/Project3_Cover-600w.webp',
        alt: 'Dashboard Overview',
        caption: 'Comprehensive dashboard showing attendance analytics',
        srcSet: '/Sahil_Ali-Portfolio/images/projects/Attendance_Project3/Project3_Cover-300w.webp 300w, /Sahil_Ali-Portfolio/images/projects/Attendance_Project3/Project3_Cover-600w.webp 600w',
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

export default EkamAttendance;
