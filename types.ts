export interface ServiceTime {
  day: string;
  slots: string[];
}

export interface ChurchInfo {
  welcomeMessage: string;
  pastorName: string;
  contactNumber: string;
  timings: ServiceTime[];
  addressUrl: string;
  websiteUrl: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GeneratedContent {
  imageUrl?: string;
  text?: string;
}
