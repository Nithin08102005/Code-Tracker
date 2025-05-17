import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Code, 
  Trophy, 
  BookOpen, 
  ChevronRight, 
  Github, 
  UserCircle,
  Zap,
  Star,
  TrendingUp,
  Award,
  BarChart,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-1/3 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center relative z-10">
        <Badge variant="outline" className="mb-4 py-1 px-4 bg-primary/10 text-primary border-primary/20">
          <Zap className="h-4 w-4 mr-1" /> Supercharge Your Coding Journey
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
          CodeTracker
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Manage your competitive programming journey in one place. Track your profiles, 
          upcoming contests, and saved problems from your favorite coding platforms.
        </p>
        
        
        
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Profiles Feature */}
        <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4">
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
              <UserCircle className="h-3 w-3 mr-1" /> Profiles
            </Badge>
          </div>
          <CardHeader>
            <div className="mb-2 p-3 w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/10 shadow-lg shadow-primary/5">
              <UserCircle className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl">Coding Profiles</CardTitle>
            <CardDescription className="text-base">
              Connect and view your profiles from LeetCode, CodeForces, and CodeChef in one place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Track your progress, see your ratings, and monitor your competitive status across all platforms.
            </p>
            
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs px-2 py-1 bg-primary/5 text-primary rounded-full">Rating Tracker</span>
              <span className="text-xs px-2 py-1 bg-primary/5 text-primary rounded-full">Profile Analysis</span>
              
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full justify-between group bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90" asChild>
              <Link href="/profiles" className="flex items-center">
                View Profiles 
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Contests Feature */}
        <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-violet-500/10 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4">
            <Badge variant="outline" className="bg-violet-500/5 border-violet-500/20 text-violet-500">
              <Trophy className="h-3 w-3 mr-1" /> Contests
            </Badge>
          </div>
          <CardHeader>
            <div className="mb-2 p-3 w-14 h-14 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-500/10 flex items-center justify-center border border-violet-500/10 shadow-lg shadow-violet-500/5">
              <Trophy className="h-7 w-7 text-violet-500" />
            </div>
            <CardTitle className="text-2xl">Upcoming Contests</CardTitle>
            <CardDescription className="text-base">
              Never miss a coding contest again with our comprehensive contest tracker.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Stay updated with contests from LeetCode, CodeForces, and CodeChef, complete with timing and registration details.
            </p>
            
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs px-2 py-1 bg-violet-500/5 text-violet-500 rounded-full">Contest Calendar</span>
              <span className="text-xs px-2 py-1 bg-violet-500/5 text-violet-500 rounded-full">Reminders</span>
              <span className="text-xs px-2 py-1 bg-violet-500/5 text-violet-500 rounded-full">Platform Filters</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full justify-between group bg-gradient-to-r from-violet-500/80 to-violet-500 hover:from-violet-500 hover:to-violet-500/90" asChild>
              <Link href="/contests" className="flex items-center">
                Browse Contests
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Problems Feature */}
        <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-blue-500/10 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-4">
            <Badge variant="outline" className="bg-blue-500/5 border-blue-500/20 text-blue-500">
              <BookOpen className="h-3 w-3 mr-1" /> Problems
            </Badge>
          </div>
          <CardHeader>
            <div className="mb-2 p-3 w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center border border-blue-500/10 shadow-lg shadow-blue-500/5">
              <BookOpen className="h-7 w-7 text-blue-500" />
            </div>
            <CardTitle className="text-2xl">Problem Library</CardTitle>
            <CardDescription className="text-base">
              Organize and access your saved problems  in one convenient location.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Store your favorite problems and build your personal problem archive.
            </p>
            
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs px-2 py-1 bg-blue-500/5 text-blue-500 rounded-full">Custom Collections</span>
              <span className="text-xs px-2 py-1 bg-blue-500/5 text-blue-500 rounded-full">Difficulty Tags</span>
              <span className="text-xs px-2 py-1 bg-blue-500/5 text-blue-500 rounded-full"> Notes</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full justify-between group bg-gradient-to-r from-blue-500/80 to-blue-500 hover:from-blue-500 hover:to-blue-500/90" asChild>
              <Link href="/problems" className="flex items-center">
                View Problems
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

    
      
   
    </div>
  );
}