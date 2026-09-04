import React from 'react';
import { TabType } from '../types';
import { DigitalTwinView } from '../components/DigitalTwinView';

interface Props {
  onNavigate: (tab: TabType) => void;
  onOpenEmergency: () => void;
  darkMode?: boolean;
}

export const VillageDigitalTwinPage: React.FC<Props> = ({ 
  onNavigate, 
  onOpenEmergency, 
  darkMode = false 
}) => {
  return (
    <DigitalTwinView
      onNavigateTab={onNavigate}
      onOpenEmergency={onOpenEmergency}
      darkMode={darkMode}
    />
  );
};
