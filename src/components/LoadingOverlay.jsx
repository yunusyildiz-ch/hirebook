export default function LoadingOverlay({ message }) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div className="text-white text-lg font-medium">{message || "Loading..."}</div>
      </div>
    );
  }
  