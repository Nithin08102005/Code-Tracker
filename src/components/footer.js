import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Code } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 py-8 mt-auto border-t border-muted/20 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center">
          <Code className="h-5 w-5 text-blue-500 mr-2" />
          <p className="text-sm font-medium">CodeTracker</p>
          <span className="mx-2 text-muted-foreground">|</span>
          <p className="text-sm text-muted-foreground">
            © 2025 All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-blue-500/5 hover:text-blue-500"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Link href="/About" variant="ghost" size="sm" className="rounded-full hover:bg-blue-500/5 hover:text-blue-500">
            About
          </Link>
          <Link href="/Contact" variant="ghost" size="sm" className="rounded-full hover:bg-blue-500/5 hover:text-blue-500">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
