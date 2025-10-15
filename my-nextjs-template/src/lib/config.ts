// Application configuration

export const config = {
  flaskApiUrl: process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://localhost:5000',
  apiTimeout: 30000, // 30 seconds
  appName: 'AI/ML Prediction Platform',
  appDescription: 'Connect your machine learning models with a modern web interface',
};
