'use client';

import { useState } from 'react';
import { ApiService, GitHubProfile } from '@/services/api';

type RoastLevel = 'mild' | 'medium' | 'savage';

interface RoastResult {
  success: boolean;
  roast?: string;
  error?: string;
  username?: string;
  level?: string;
  profile?: GitHubProfile;
}

export default function RoastForm() {
  const [username, setUsername] = useState<string>('');
  const [roastLevel, setRoastLevel] = useState<RoastLevel>('medium');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoastResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Map roast level to temperature
      const temperatureMap = {
        mild: 0.7,
        medium: 0.85,
        savage: 1.0,
      };

      const temperature = temperatureMap[roastLevel];

      // Call your trained ML model via Flask backend
      const response = await ApiService.generateRoast(username, temperature);

      if (response.success && response.roast) {
        setResult({
          success: true,
          roast: response.roast,
          username: username,
          level: roastLevel,
          profile: response.profile,
        });
      } else {
        setResult({
          success: false,
          error: response.error || 'Failed to generate roast',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to connect to server. Make sure the Flask backend is running.',
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoastLevelColor = (level: RoastLevel) => {
    const colors = {
      mild: 'from-green-500 to-emerald-500',
      medium: 'from-yellow-500 to-orange-500',
      savage: 'from-red-500 to-rose-600',
    };
    return colors[level];
  };

  const getRoastLevelBg = (level: RoastLevel) => {
    const colors = {
      mild: 'bg-green-50 dark:bg-green-900/20 border-green-300',
      medium: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300',
      savage: 'bg-red-50 dark:bg-red-900/20 border-red-300',
    };
    return colors[level];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 bg-gradient-to-br ${getRoastLevelColor(roastLevel)} rounded-xl flex items-center justify-center`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Roast Dashboard
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* GitHub Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              GitHub Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">@</span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full pl-10 pr-5 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-slate-700 dark:text-white text-lg transition-all"
                required
              />
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Enter your GitHub username to get roasted
            </p>
          </div>

          {/* Roast Level Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Roast Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['mild', 'medium', 'savage'] as RoastLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setRoastLevel(level)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    roastLevel === level
                      ? `bg-gradient-to-br ${getRoastLevelColor(level)} text-white border-transparent shadow-lg`
                      : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="text-2xl mb-1">
                    {level === 'mild' && '😊'}
                    {level === 'medium' && '😏'}
                    {level === 'savage' && '💀'}
                  </div>
                  <div className="font-bold text-sm capitalize">{level}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Stats Preview (shown after generating) */}
          {result?.profile && (
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="flex items-center gap-4">
                {result.profile.avatar_url && (
                  <img 
                    src={result.profile.avatar_url} 
                    alt={result.profile.username}
                    className="w-16 h-16 rounded-full border-2 border-slate-300 dark:border-slate-600"
                  />
                )}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">⭐ Stars</div>
                    <div className="font-bold text-slate-900 dark:text-white">{result.profile.total_stars}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">👥 Followers</div>
                    <div className="font-bold text-slate-900 dark:text-white">{result.profile.followers}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">📦 Repos</div>
                    <div className="font-bold text-slate-900 dark:text-white">{result.profile.num_repos}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">💻 Language</div>
                    <div className="font-bold text-slate-900 dark:text-white">{result.profile.top_language}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 bg-gradient-to-r ${getRoastLevelColor(roastLevel)} text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating roast...
              </span>
            ) : (
              '🔥 Roast Me!'
            )}
          </button>
        </form>

        {/* Results Display */}
        {result && (
          <div className={`mt-8 p-6 rounded-xl border-2 ${
            result.success 
              ? getRoastLevelBg(roastLevel as RoastLevel)
              : 'bg-red-50 dark:bg-red-900/20 border-red-300'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              <div className="text-3xl">
                {result.success ? (
                  roastLevel === 'mild' ? '😊' :
                  roastLevel === 'medium' ? '😏' : '💀'
                ) : '❌'}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-2 ${
                  result.success ? 'text-slate-900 dark:text-white' : 'text-red-900 dark:text-red-100'
                }`}>
                  {result.success ? `${roastLevel.charAt(0).toUpperCase() + roastLevel.slice(1)} Roast` : 'Error'}
                </h3>
                
                {result.success ? (
                  <div className="space-y-2">
                    <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed">
                      {result.roast}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-600">
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Target: <span className="font-mono font-bold">@{result.username}</span> • Level: <span className="capitalize font-semibold">{result.level}</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-900 dark:text-red-100">{result.error}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Warning Note */}
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
          <span className="text-lg">⚠️</span>
          <span>This is all in good fun! The roasts are AI-generated humor and not meant to be taken seriously. If you can't laugh at yourself, choose &quot;Mild&quot; mode.</span>
        </p>
      </div>
    </div>
  );
}
