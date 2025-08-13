import { Box, Database, FileSpreadsheet, GitBranch, LineChart, Settings } from 'lucide-react';
export const ServiceIcons = {
  Box: () => <Box className="w-6 h-6" />,
  LineChart: () => <LineChart className="w-6 h-6" />,
  Settings: () => <Settings className="w-6 h-6" />,
  Database: () => <Database className="w-6 h-6" />,
  FileSpreadsheet: () => <FileSpreadsheet className="w-6 h-6" />,
  GitBranch: () => <GitBranch className="w-6 h-6" />,
} as const;
