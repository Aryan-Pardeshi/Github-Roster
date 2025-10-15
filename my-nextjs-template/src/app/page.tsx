'use client';

import RoastForm from '@/components/RoastForm';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-slate-900 dark:to-red-950">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-red-100 dark:bg-red-900/30 rounded-full">
              <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                🔥 AI-Powered Roasting
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <span className="block text-slate-900 dark:text-white">GitHub Profile</span>
              <span className="block bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">Roaster</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Get your GitHub profile roasted by AI. Choose your roast level and brace yourself.
            </p>
          </div>
          <div className="mt-12">
            <RoastForm />
          </div>
        </div>
      </section>
    </div>
  );
}
