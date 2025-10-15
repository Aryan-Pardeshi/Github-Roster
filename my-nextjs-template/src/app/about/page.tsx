export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            About This Project
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            A personal machine learning project
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              🎯 Project Goal
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              This is a personal project to learn how to integrate machine learning models with modern web technologies.
              The goal is to create a full-stack application where users can interact with ML models through a clean web interface.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              🛠️ Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Frontend</h3>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-sm">
                  <li>• Next.js 15 (React framework)</li>
                  <li>• TypeScript (type safety)</li>
                  <li>• Tailwind CSS (styling)</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Backend</h3>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-sm">
                  <li>• Flask (Python web framework)</li>
                  <li>• NumPy (numerical computing)</li>
                  <li>• Your ML model here</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              ⚙️ How It Works
            </h2>
            <ol className="space-y-3 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>User enters input values in the web form</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Next.js API route receives the request</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span>Request is forwarded to Flask backend</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <span>Flask processes data through ML model</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <span>Prediction result is returned and displayed</span>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-xl text-white">
            <h2 className="text-3xl font-bold mb-4">
              🚀 Try It Out
            </h2>
            <p className="text-lg text-indigo-100 mb-6">
              Test the ML prediction interface and see how the integration works.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/predict" className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                Make a Prediction
              </a>
              <a href="https://github.com" className="px-6 py-3 bg-transparent border-2 border-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                View Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
