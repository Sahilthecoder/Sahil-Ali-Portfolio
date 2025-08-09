import { Box, Database, FileSpreadsheet, GitBranch, LineChart, Settings } from 'lucide-react';
import type { ComponentType } from 'react';

type ColorVariant = 'blue' | 'green' | 'purple' | 'amber' | 'red' | 'indigo';

export const colorVariants: Record<ColorVariant, string> = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
} as const;

export interface Service {
  title: string;
  description: string;
  icon: IconComponent;
  features: string[];
  color: ColorVariant;
}

// Define icon component type
type IconComponent = ComponentType<{ className?: string }>;

// Define services with proper typing
export const services: Service[] = [
  {
    title: 'Inventory Management',
    description:
      'Expert in managing stock levels, implementing FIFO principles, and optimizing warehouse operations.',
    icon: Box,
    features: [
      'Stock Control & Optimization',
      'FIFO Implementation',
      'Warehouse Optimization',
      'Inventory Auditing',
    ],
    color: 'blue',
  },
  {
    title: 'Data Analysis & Reporting',
    description: 'Transforming raw data into actionable insights and comprehensive reports.',
    icon: LineChart,
    features: ['Financial Reporting', 'Data Visualization', 'Performance Metrics', 'KPI Tracking'],
    color: 'green',
  },
  {
    title: 'Process Automation',
    description: 'Streamlining operations through automation of repetitive tasks and workflows.',
    icon: Settings,
    features: [
      'Workflow Optimization',
      'Excel Automation',
      'Process Mapping',
      'Efficiency Improvement',
    ],
    color: 'purple',
  },
  {
    title: 'ERP & System Management',
    description: 'Proficient in managing and optimizing ERP systems for business operations.',
    icon: Database,
    features: ['System Implementation', 'User Training', 'Data Migration', 'Troubleshooting'],
    color: 'amber',
  },
  {
    title: 'Financial Management',
    description: 'Expertise in financial record keeping, reconciliation, and analysis.',
    icon: FileSpreadsheet,
    features: ['Accounts Management', 'Financial Reporting', 'Budget Tracking', 'Expense Analysis'],
    color: 'red',
  },
  {
    title: 'Supply Chain Optimization',
    description: 'Enhancing supply chain efficiency through strategic planning and execution.',
    icon: GitBranch,
    features: [
      'Vendor Management',
      'Logistics Coordination',
      'Demand Forecasting',
      'Cost Reduction',
    ],
    color: 'indigo',
  },
];
