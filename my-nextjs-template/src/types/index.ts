// Type definitions for the AI/ML application

export interface PredictionInput {
  features: number[];
  modelType?: string;
}

export interface PredictionResult {
  prediction: number[] | string;
  confidence?: number;
  success: boolean;
  error?: string;
}

export interface ModelInfo {
  name: string;
  description: string;
  inputShape: number;
  outputShape: number;
}
