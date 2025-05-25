import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">
          Loading your profile...
        </h1>
        <p className="text-zinc-400">
          Preparing to find your perfect skill matches
        </p>
      </div>
    </div>
  );
}
