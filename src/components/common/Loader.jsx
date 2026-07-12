export default function Loader({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
