import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Connect Your AI/ML Models
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Deploy machine learning models with a modern web interface.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/predict" className="px-8 py-4 bg-blue-600 text-white rounded-lg">
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
