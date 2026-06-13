"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h2>Something went wrong</h2>
      <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-black text-white rounded">
        Try Again
      </button>
    </div>
  );
}