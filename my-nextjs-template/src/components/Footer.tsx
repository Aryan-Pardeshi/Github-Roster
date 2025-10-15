export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo and Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              GitHub Roaster
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
            An AI-powered tool that analyzes your GitHub profile and delivers humorous roasts based on your repositories, 
            commit history, and coding patterns. Enter your username, select your roast level, and brace yourself!
          </p>

          {/* Roast Levels */}
          <div className="flex gap-4 text-xs">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
              😊 Mild
            </span>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
              😏 Medium
            </span>
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
              💀 Savage
            </span>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 w-full">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} GitHub Roaster • All roasts are AI-generated for entertainment purposes only
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
