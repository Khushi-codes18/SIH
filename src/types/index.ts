export type TabType = 
  | 'home' 
  | 'live-map' 
  | 'alerts' 
  | 'forecast' 
  | 'resources' 
  | 'digital-twin' 
  | 'history' 
  | 'admin' 
  | 'about-us';

export type UserPersona = 'citizen' | 'authority';

export type LanguageCode = 
  | 'en' 
  | 'hi' 
  | 'bn' 
  | 'ta' 
  | 'te' 
  | 'mr' 
  | 'gu' 
  | 'as' 
  | 'kn' 
  | 'ml' 
  | 'pa' 
  | 'ne';

export type RiskLevel = 'Critical' | 'High' | 'Moderate' | 'Low' | 'Safe';

export type AlertType = 'Flood Alert' | 'Rainfall Alert' | 'Landslide Alert' | 'Landslide Risk Alert' | 'Info / Update';

export interface AlertItem {
  id: string;
  type: AlertType;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  location: string;
  district: string;
  timestamp: string;
  relativeTime: string;
  description: string;
  actionRequired?: string;
  coordinates?: [number, number];
}

export interface StationData {
  id: string;
  name: string;
  wardName: string;
  riskLevel: RiskLevel;
  rainfallMm: number;
  riverLevelM: number;
  slopeDeg: number;
  soilMoisture: number;
  coordinates: [number, number];
  sheltersNearby: number;
  lastUpdated: string;
}

export interface ShelterData {
  id: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  status: 'Open' | 'Full' | 'Standby';
  coordinates: [number, number];
  contact: string;
  distanceKm: string;
  waterSupply?: boolean;
  medicalSupport?: boolean;
  electricity?: boolean;
  toilets?: boolean;
  foodAvailable?: boolean;
  elevationM?: number;
}

export interface ForecastDay {
  day: string;
  date: string;
  rainfallMm: number;
  intensity: 'Very Heavy' | 'Heavy' | 'Moderate' | 'Light' | 'Very Light';
  riskLevel: RiskLevel;
}

export interface RiverStationForecast {
  stationName: string;
  river: string;
  dangerLevel: number;
  warningLevel: number;
  normalLevel: number;
  currentLevel: number;
  rateOfRiseMh: number;
  historyLabels: string[];
  historyData: (number | null)[];
  forecastLabels: string[];
  forecastData: (number | null)[];
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'guide' | 'report' | 'training' | 'toolkit';
  format: 'PDF' | 'Video' | 'Interactive' | 'Checklist' | 'Quiz';
  size: string;
  lastUpdated: string;
  hazardType: 'Flood' | 'Cloudburst' | 'Landslide' | 'Evacuation' | 'Emergency Preparedness';
  modules?: { id: number; title: string; content: string }[];
  quiz?: { question: string; options: string[]; answerIndex: number }[];
  checklistItems?: { id: string; text: string; completed: boolean }[];
  methodology?: string;
  keyFindings?: string[];
  durationMinutes?: number;
}

export type ResourceGuide = ResourceItem;

export interface EducationalVideo {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  thumbnail: string;
  youtubeId?: string;
  description: string;
}

export type DriveSafetyStatus = 'Safe' | 'Caution' | 'Dangerous';

export interface DriveAdvisory {
  status: DriveSafetyStatus;
  headline: string;
  reasons: string[];
  safeSpeedKmh: string;
  visibilityKm: number;
  aquaplaningRisk: 'Low' | 'Moderate' | 'Severe';
  underpassRisk: 'Normal' | 'Waterlogged' | 'Flooded';
  roadClosureCount: number;
}

export interface CityStatePrediction {
  id: string;
  name: string;
  type: 'city' | 'state';
  state: string;
  coordinates: [number, number];
  rainfall24hMm: number;
  rainfallNext24hMm: number;
  precipitationProbability: number;
  weatherCondition: string;
  temperatureC: number;
  humidityPercent: number;
  riverBasin: string;
  riverStage: string;
  floodRiskLevel: RiskLevel;
  driveSafety: DriveAdvisory;
  keyAdvisory: string;
  lastUpdated: string;
}

export interface BuildingFeature {
  id: string;
  name: string;
  type: 'house' | 'school' | 'hospital' | 'bridge' | 'shelter' | 'river_gauge';
  riskLevel: RiskLevel;
  elevationM: number;
  distanceToRiverM: number;
  coordinates: [number, number];
  occupancy?: number;
  statusText?: string;
  actionRequired?: string;
  reason?: string;
}

export interface RoadFeature {
  id: string;
  name: string;
  status: 'safe' | 'risky' | 'blocked';
  reason?: string;
  path: [number, number][];
}

export interface VillageWardData {
  id: string;
  state: string;
  district: string;
  villageName: string;
  wardName: string;
  coordinates: [number, number];
  riskLevel: RiskLevel;
  rainfallMm: number;
  riverLevelM: number;
  soilMoisturePercent: number;
  population: number;
  vulnerableCount: number;
  buildings: BuildingFeature[];
  roads: RoadFeature[];
  shelters: ShelterData[];
}

export interface DigitalTwinSimStep {
  hourLabel: string;
  rainfallMm: number;
  riverLevelM: number;
  atRiskBuildingsCount: number;
  bridgeStatus: 'Normal' | 'Warning' | 'At Risk' | 'Submerged';
  schoolEvacuation: boolean;
  hospitalStatus: 'Operational' | 'Standby' | 'At Risk';
  floodedRoadIds: string[];
  recommendedShelterId: string;
}

export interface HistoricalFloodEvent {
  year: number;
  name: string;
  region: string;
  state: string;
  severity: RiskLevel;
  dateRange: string;
  summary: string;
  actualRainfallMm: number;
  actualMaxRiverLevelM: number;
  actualAffectedVillages: number;
  actualWarningTimeHours: number;
  predictedRisk: RiskLevel;
  predictedProbabilityPercent: number;
  predictedLeadTimeHours: number;
  accuracyPercent: number;
  keyFindings: string[];
  actualExtentPolygon: [number, number][];
  predictedExtentPolygon: [number, number][];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: LanguageCode;
  isEmergency?: boolean;
  quickActions?: { label: string; actionTab: TabType }[];
}


