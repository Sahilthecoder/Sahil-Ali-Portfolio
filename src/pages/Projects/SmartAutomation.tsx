import React from 'react';
import { FaBrain, FaChartLine, FaCogs, FaRobot, FaServer, FaSync } from 'react-icons/fa';

import type { Project } from '../../data/projects';
import ProjectTemplate from './ProjectTemplate';

const SmartAutomation: React.FC<{
  project: Project;
  currentIndex: number;
  totalProjects: number;
}> = ({ project, currentIndex, totalProjects }) => {
  const projectContent = {
    overview: (
      <div className="space-y-6">
        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
          <p className="text-lg">
            An advanced automation platform that leverages AI and machine learning to streamline
            business processes, reduce manual work, and enhance operational efficiency across
            multiple domains.
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
                <div className="text-sm text-blue-600 dark:text-blue-200">Automation</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <FaSync className="text-purple-600 dark:text-purple-400 text-2xl mr-3" />
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
              <FaChartLine className="text-green-600 dark:text-green-400 text-2xl mr-3" />
              <div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  Real-time
                </div>
                <div className="text-sm text-green-600 dark:text-green-200">Analytics</div>
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
              The Smart Automation Platform revolutionizes business processes by combining
              artificial intelligence with robotic process automation (RPA) to create intelligent
              workflows that learn and adapt over time. This solution reduces manual intervention,
              minimizes errors, and provides actionable insights through advanced analytics.
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-lg">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                Key Features
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Intelligent process automation with machine learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Natural language processing for document understanding</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Predictive analytics for process optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Cross-platform integration with enterprise systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Real-time monitoring and alerting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Self-learning algorithms for continuous improvement</span>
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
                <FaServer className="inline mr-2 text-blue-500" />
                System Architecture
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    1. Data Ingestion Layer
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    Handles data collection from multiple sources including APIs, databases, and
                    file systems
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    2. Processing Engine
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    Python-based microservices for data transformation and workflow orchestration
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-white">3. AI/ML Layer</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    TensorFlow and PyTorch models for predictive analytics and decision making
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                <FaCogs className="inline mr-2 text-green-500" />
                Sample Automation Workflow
              </h4>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200">
                  <code>
                    {`async function processInvoices() {
  // 1. Fetch new invoices from email/API
  const invoices = await fetchNewInvoices();
  
  // 2. Process each invoice with AI
  for (const invoice of invoices) {
    // 3. Extract data using OCR and NLP
    const extractedData = await extractInvoiceData(invoice);
    
    // 4. Validate against business rules
    const validation = await validateInvoice(extractedData);
    
    // 5. Route for approval if needed
    if (validation.requiresApproval) {
      await routeForApproval(invoice, validation.issues);
    } else {
      // 6. Process payment if valid
      await processPayment(extractedData);
      
      // 7. Update accounting system
      await updateAccountingSystem(extractedData);
      
      // 8. Send confirmation
      await sendConfirmation(extractedData);
    }
    
    // 9. Log completion
    await logProcessCompletion(invoice.id);
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'AI & Machine Learning',
        content: (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                <FaBrain className="inline mr-2 text-purple-500" />
                Intelligent Automation Features
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The platform leverages cutting-edge AI technologies to deliver smart automation
                solutions:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <div>
                    <span className="font-medium">Document Intelligence</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Extract and process information from various document formats with high
                      accuracy
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <div>
                    <span className="font-medium">Predictive Analytics</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Forecast trends and identify patterns in business processes
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <div>
                    <span className="font-medium">Anomaly Detection</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Identify and flag unusual patterns or potential issues in real-time
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <div>
                    <span className="font-medium">Process Mining</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Analyze and optimize business processes using event logs
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Sample Machine Learning Pipeline
                </h5>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-800 dark:text-gray-200">
                    <code>
                      {`from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split

def train_document_classifier(documents, labels):
    # Create a pipeline for text classification
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer()),
        ('clf', RandomForestClassifier(n_estimators=100))
    ])
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        documents, labels, test_size=0.2, random_state=42
    )
    
    # Train model
    pipeline.fit(X_train, y_train)
    
    # Evaluate
    accuracy = pipeline.score(X_test, y_test)
    print(f"Model accuracy: {accuracy:.2f}")
    
    return pipeline`}
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
                        80% Reduction
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        In manual data entry and processing time
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        99.9% Accuracy
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        In data processing and extraction
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        24/7 Operation
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Automated workflows run around the clock
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                  <FaCogs className="inline mr-2 text-blue-500" />
                  Implementation Roadmap
                </h4>
                <ol className="space-y-3 list-decimal list-inside">
                  <li className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Process Assessment</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-5">
                      Identify automation opportunities and prioritize use cases
                    </p>
                  </li>
                  <li className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Solution Design</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-5">
                      Create detailed automation workflows and technical specifications
                    </p>
                  </li>
                  <li className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Development & Testing</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-5">
                      Build and rigorously test automation solutions
                    </p>
                  </li>
                  <li className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Deployment & Training</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-5">
                      Implement solutions and train end-users
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
        src: '/images/projects/CommingSoon_Project6/Project6_Cover.webp',
        alt: 'Smart Automation Platform Dashboard',
        caption: 'Dashboard showing automation workflows, performance metrics, and system health',
      },
      {
        src: '/images/projects/CommingSoon_Project6/Project6_Cover-1200w.webp',
        alt: 'Automation Workflow Designer',
        caption: 'Visual workflow designer for creating and managing automation processes',
      },
      {
        src: '/images/projects/CommingSoon_Project6/Project6_Cover-600w.webp',
        alt: 'AI-Powered Analytics',
        caption: 'Advanced analytics and insights from automated processes',
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

export default SmartAutomation;
