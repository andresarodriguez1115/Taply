export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 animate-pulse">

      <div className="w-24 h-24 bg-gray-300 rounded-full"></div>

      <div className="w-48 h-4 bg-gray-300 rounded"></div>

      <div className="w-64 h-4 bg-gray-300 rounded"></div>

    </div>
  );
}