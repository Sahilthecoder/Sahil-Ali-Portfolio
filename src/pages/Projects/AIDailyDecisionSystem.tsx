import React from 'react';
import { FaChartLine, FaCogs, FaDatabase, FaGoogle, FaLightbulb, FaRobot } from 'react-icons/fa';

import type { Project } from '../../data/projects';
import ProjectTemplate from './ProjectTemplate';

const AIDailyDecisionSystem: React.FC<{
  project: Project;
  currentIndex: number;
  totalProjects: number;
}> = ({ project, currentIndex, totalProjects }) => {
  const projectContent = {
    overview: (
      <div className="space-y-6">
        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
          <p className="text-lg">
            An intelligent decision-making system that leverages Notion and Google Sheets to
            automate data workflows and provide actionable insights through AI analysis.
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
                <div className="text-sm text-blue-600 dark:text-blue-200">Decision Making</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <FaGoogle className="text-purple-600 dark:text-purple-400 text-2xl mr-3" />
              <div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  Seamless
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-200">Integration</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <FaLightbulb className="text-green-600 dark:text-green-400 text-2xl mr-3" />
              <div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">Smart</div>
                <div className="text-sm text-green-600 dark:text-green-200">Insights</div>
              </div>
            </div>
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
              The AI Daily Decision System bridges the gap between Notion's powerful knowledge
              management capabilities and Google Sheets' robust data processing, creating a seamless
              workflow for data-driven decision making. This system automates data collection,
              processing, and analysis, providing actionable insights directly within your existing
              tools.
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-lg">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                Core Features
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Automated data synchronization between Notion and Google Sheets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>AI-powered trend analysis and pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Customizable dashboards for real-time insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Automated reporting and alerting system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Natural language processing for data queries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Predictive analytics for forecasting</span>
                </li>
              </ul>
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
                <FaCogs className="inline mr-2 text-blue-500" />
                System Architecture
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-white">1. Data Layer</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    Integration with Notion API and Google Sheets API for bidirectional data flow
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-white">2. Processing Layer</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    Python-based data processing with Pandas and NumPy for analysis
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-white">3. AI/ML Layer</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    TensorFlow models for predictive analytics and pattern recognition
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                <FaDatabase className="inline mr-2 text-green-500" />
                Data Flow Example
              </h4>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
                  <code>
                    {`// Sample Google Apps Script for Notion to Sheets sync
function syncNotionToSheets() {
  const notion = new NotionClient(API_KEY);
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Notion Data');
  
  // Query Notion database
  const response = notion.databases.query({
    database_id: DATABASE_ID,
    filter: { /* filters */ }
  });
  
  // Process and update sheet
  const data = response.results.map(page => ({
    'Title': page.properties.Name.title[0]?.plain_text,
    'Status': page.properties.Status.select?.name,
    'Last Edited': page.last_edited_time
  }));
  
  // Update sheet with new data
  sheet.getRange(2, 1, data.length, 3).setValues(data);
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'AI-Powered Analytics',
        content: (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                <FaChartLine className="inline mr-2 text-purple-500" />
                Machine Learning Integration
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The system employs various ML models to provide intelligent insights:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <div>
                    <span className="font-medium">Time Series Forecasting</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Predict future trends based on historical data
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <div>
                    <span className="font-medium">Anomaly Detection</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Identify unusual patterns in your data
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <div>
                    <span className="font-medium">Sentiment Analysis</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Analyze text data from notes and comments
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <div>
                    <span className="font-medium">Recommendation Engine</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Suggest actions based on data patterns
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Sample Python Code for Time Series Analysis
                </h5>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-800 dark:text-gray-200">
                    <code>
                      {`import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

def forecast_sales(data, periods=7):
    # Prepare time series data
    series = pd.Series(data['sales'].values, index=pd.to_datetime(data['date']))
    
    # Fit ARIMA model
    model = ARIMA(series, order=(5,1,0))
    model_fit = model.fit()
    
    # Make prediction
    forecast = model_fit.forecast(steps=periods)
    return forecast

# Example usage
# forecast = forecast_sales(sales_data)`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'Business Impact',
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                  <FaChartLine className="inline mr-2 text-green-500" />
                  Key Benefits
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        75% Time Savings
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Automated data processing reduces manual work
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Data-Driven Decisions
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        AI insights lead to better business outcomes
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Seamless Integration
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Works with your existing Notion and Google Sheets
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                  <FaCogs className="inline mr-2 text-blue-500" />
                  Implementation Steps
                </h4>
                <ol className="space-y-3 list-decimal list-inside">
                  <li className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Connect Data Sources</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-5">
                      Link your Notion and Google Sheets accounts
                    </p>
                  </li>
                  <li className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Define Data Models</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-5">
                      Map your Notion properties to spreadsheet columns
                    </p>
                  </li>
                  <li className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Set Up Automation</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-5">
                      Configure sync frequency and triggers
                    </p>
                  </li>
                  <li className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Enable AI Features</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-5">
                      Activate the analytics models you need
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        ),
      },
    ],
    images: [
      {
        src: '/Sahil_Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Cover-600w.webp',
        alt: 'AI Daily Decision System Dashboard',
        caption: 'Dashboard showing AI-powered insights and data visualization from Notion and Google Sheets integration.',
        srcSet: '/Sahil_Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Cover-300w.webp 300w, /Sahil_Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Cover-600w.webp 600w, /Sahil_Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Cover-1200w.webp 1200w',
        sizes: '(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px'
      },
      {
        src: '/Sahil_Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Architecture-600w.webp',
        alt: 'Data Flow Architecture',
        caption: 'Architecture diagram showing the data flow between Notion, Google Sheets, and AI processing layer.',
        srcSet: '/Sahil_Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Architecture-300w.webp 300w, /Sahil_Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Architecture-600w.webp 600w',
        sizes: '(max-width: 640px) 300px, 600px'
      },
      {
        src: '/Sahil_Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Analytics-600w.webp',
        alt: 'AI Analytics in Action',
        caption: 'Example of AI-generated insights and predictions from the integrated data.',
        srcSet: '/Sahil_Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Analytics-300w.webp 300w, /Sahil_Ali-Portfolio/images/projects/AIautomation_Project5/Project5_Analytics-600w.webp 600w',
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

export default AIDailyDecisionSystem;
