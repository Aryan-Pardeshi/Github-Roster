// API service for communicating with Flask backend
import { PredictionInput, PredictionResult } from '@/types';
import { config } from '@/lib/config';

export class ApiService {
  static async predict(input: PredictionInput): Promise<PredictionResult> {
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Prediction error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        prediction: [],
      };
    }
  }

  static async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch('/api/health');
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
