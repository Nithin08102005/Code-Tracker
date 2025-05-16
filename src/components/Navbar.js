import { LogOutButton } from "@/components/logOutButton";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { getUser } from "@/auth/server";
import { UserCircle, Zap, ChevronRight } from "lucide-react";

export async function Navbar() {
  const user = await getUser();

  return (
    <div className="relative bg-background text-foreground w-full">
      {/* Floating Glow Elements (Matching Main Page Colors) */}
      <div className="absolute top-10 left-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-16 w-56 h-56 bg-violet-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 left-1/3 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-10 py-6 bg-card/50 backdrop-blur-md border-b border-muted/20 relative z-10 shadow-lg">
        <div className="flex items-center space-x-3">
          <Zap className="h-7 w-7 text-primary" />
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
            CodeTracker {user && user.user_metadata.username}
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          {user ? (
            <LogOutButton />
          ) : (
            <Button
              variant="default"
              className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90 text-white rounded-lg transition-transform hover:scale-105"
            >
              <Link href="/login" className="flex items-center dark:text-gray-900">
                Log In
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
