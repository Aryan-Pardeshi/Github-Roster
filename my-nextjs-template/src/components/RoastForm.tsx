'use client';

import { useState } from 'react';

type RoastLevel = 'mild' | 'medium' | 'savage';

interface RoastOptions {
  topLanguage: boolean;
  repoCount: boolean;
  followers: boolean;
  following: boolean;
  commitFrequency: boolean;
  repoDescriptions: boolean;
}

interface RoastResult {
  success: boolean;
  roast?: string;
  error?: string;
  username?: string;
  level?: string;
}

export default function RoastForm() {
  const [username, setUsername] = useState<string>('');
  const [roastLevel, setRoastLevel] = useState<RoastLevel>('medium');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoastResult | null>(null);
  const [options, setOptions] = useState<RoastOptions>({
    topLanguage: true,
    repoCount: true,
    followers: false,
    following: false,
    commitFrequency: false,
    repoDescriptions: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Simulate API call - replace with actual API endpoint later
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock roast responses
      const roasts = {
        mild: `Hey @${username}, your GitHub profile is... interesting. Like a participation trophy, but for code. At least you tried! 😊`,
        medium: `@${username}, I see your commit history is as consistent as my gym attendance. Your repos are like a museum of abandoned dreams. 😏`,
        savage: `@${username}, your GitHub profile is a masterclass in mediocrity. Your code quality and commit frequency suggest you treat programming like a hobby you picked up last Tuesday. 💀`
      };

      setResult({
        success: true,
        roast: roasts[roastLevel],
        username: username,
        level: roastLevel,
      });
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to generate roast. Even the AI gave up.',
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

          {/* Analysis Options */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              What to Analyze
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <input 
                  type="checkbox" 
                  checked={options.topLanguage}
                  onChange={(e) => setOptions({...options, topLanguage: e.target.checked})}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500" 
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Top Language</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <input 
                  type="checkbox" 
                  checked={options.repoCount}
                  onChange={(e) => setOptions({...options, repoCount: e.target.checked})}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500" 
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Repository Count</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <input 
                  type="checkbox" 
                  checked={options.followers}
                  onChange={(e) => setOptions({...options, followers: e.target.checked})}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500" 
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Followers</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <input 
                  type="checkbox" 
                  checked={options.following}
                  onChange={(e) => setOptions({...options, following: e.target.checked})}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500" 
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Following</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <input 
                  type="checkbox" 
                  checked={options.commitFrequency}
                  onChange={(e) => setOptions({...options, commitFrequency: e.target.checked})}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500" 
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Commit Frequency</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <input 
                  type="checkbox" 
                  checked={options.repoDescriptions}
                  onChange={(e) => setOptions({...options, repoDescriptions: e.target.checked})}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500" 
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Repo Descriptions</span>
              </label>
            </div>
          </div>

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
