export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to The Kiddush Collective
      </h1>
      <p className="text-lg text-center mb-8">
        A global catalog of how Kiddush is said around the world, celebrating diversity and unity.
      </p>

      {/* Placeholder for map component */}
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Map will be displayed here</span>
      </div>
    </main>
  );
}