export default function Loading({ text }) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-6">
      <div className="w-16 h-16 border-2 border-gray-600 border-t-red-600 rounded-full animate-spin"></div>

      <div className="text-white text-xl font-medium flex items-center">
        <span>{text}</span>
      </div>
    </div>
  );
}
