import React from 'react';
import { TabType } from '../types';
import { HistoricalValidationView } from '../components/HistoricalValidationView';

interface Props {
  onNavigate: (tab: TabType) => void;
  darkMode?: boolean;
}

export const HistoricalTimelinePage: React.FC<Props> = ({ 
  onNavigate, 
  darkMode = false 
}) => {
  return (
    <HistoricalValidationView
      onNavigateTab={onNavigate}
      darkMode={darkMode}
    />
  );
};
