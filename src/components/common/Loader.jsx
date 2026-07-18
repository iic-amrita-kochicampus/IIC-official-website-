export default function Loader({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-admin-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-[3px] border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-admin-muted text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-9 h-9 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
