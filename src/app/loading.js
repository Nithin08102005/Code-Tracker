export default function Loading() {
    // This creates a full-page loading component that Next.js will use automatically
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm z-50">
        <div className="bg-card border border-primary/10 p-4 rounded-lg shadow-lg flex items-center">
          <div className="animate-spin w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full mr-3"></div>
          <span className="text-primary">Loading...</span>
        </div>
      </div>
    );
  }