// API service for communicating with Flask backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface GitHubProfile {
  username: string;
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  company: string;
  blog: string;
  twitter_username: string;
  total_stars: number;
  followers: number;
  following: number;
  top_language: string;
  num_repos: number;
  created_at: string;
  updated_at: string;
}

export interface RoastResponse {
  success: boolean;
  roast?: string;
  profile?: GitHubProfile;
  error?: string;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  github_token_set: boolean;
}

export class ApiService {
  /**
   * Generate a roast for a GitHub user
   */
  static async generateRoast(
    username: string,
    temperature: number = 0.85
  ): Promise<RoastResponse> {
    try {
      const response = await fetch(`${API_URL}/api/roast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, temperature }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP error! status: ${response.status}`,
        };
      }

      return data;
    } catch (error) {
      console.error('Roast generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to connect to server',
      };
    }
  }

  /**
   * Get GitHub profile without generating roast
   */
  static async getProfile(username: string): Promise<RoastResponse> {
    try {
      const response = await fetch(`${API_URL}/api/profile/${username}`);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP error! status: ${response.status}`,
        };
      }

      return data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
      };
    }
  }

  /**
   * Check if the API is healthy and model is loaded
   */
  static async healthCheck(): Promise<HealthResponse | null> {
    try {
      const response = await fetch(`${API_URL}/api/health`);
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      return null;
    }
  }
}
