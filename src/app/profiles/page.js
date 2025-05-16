import { CodeChefIcon, CodeforcesIcon } from "@/components/icons";
import { LeetcodeIcon } from "@/components/icons";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { UserCircle,ExternalLink,Trophy,Zap,BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-1/3 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-16 flex flex-col items-center relative z-10">
        {/* Title Section */}
        <header className="text-center mb-12">
          <Badge variant="outline" className="mb-4 py-1 px-4 bg-primary/10 text-primary border-primary/20">
            <UserCircle className="h-4 w-4 mr-1" /> Track Your Progress
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500 pb-0.5 leading-[1.3]">
            Your Competitive Programming Profiles
          </h1>
          
          <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
            Access your personalized profiles on Codeforces, LeetCode, and CodeChef, and stay engaged with coding challenges that help you sharpen your skills. Navigate to the links below and level up your programming journey!
          </p>
        </header>
        
        {/* Profile Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-16">
          {/* Codeforces */}
          <Card 
            className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden"
          >
            <Link
              href="/profiles/user-codeforces"
              className="block h-full"
            >
              <CardContent className="p-6 flex flex-col items-center space-y-4">
                <div className="p-4 w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/10 shadow-lg shadow-primary/5">
                  <CodeforcesIcon className="w-10 h-10 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Codeforces</h3>
                  <p className="text-muted-foreground mt-2">View your rating, contests, and rankings</p>
                </div>
                <div className="flex items-center text-primary mt-2">
                  <span>View Profile</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          </Card>
          
          {/* LeetCode */}
          <Card 
            className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-violet-500/10 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1 overflow-hidden"
          >
            <Link
              href="/profiles/user-leetcode"
              className="block h-full"
            >
              <CardContent className="p-6 flex flex-col items-center space-y-4">
                <div className="p-4 w-16 h-16 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-500/10 flex items-center justify-center border border-violet-500/10 shadow-lg shadow-violet-500/5">
                  <LeetcodeIcon className="w-10 h-10 text-violet-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">LeetCode</h3>
                  <p className="text-muted-foreground mt-2">Track your solving streak and problem stats</p>
                </div>
                <div className="flex items-center text-violet-500 mt-2">
                  <span>View Profile</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          </Card>
          
          {/* CodeChef */}
          <Card 
            className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-blue-500/10 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 overflow-hidden"
          >
            <Link
              href="/profiles/user-codechef"
              className="block h-full"
            >
              <CardContent className="p-6 flex flex-col items-center space-y-4">
                <div className="p-4 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center border border-blue-500/10 shadow-lg shadow-blue-500/5">
                  <CodeChefIcon className="w-10 h-10 text-blue-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">CodeChef</h3>
                  <p className="text-muted-foreground mt-2">Access your ratings and rankings</p>
                </div>
                <div className="flex items-center text-blue-500 mt-2">
                  <span>View Profile</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
        
        {/* Extra Content Section */}
        <section className="mt-8 text-center max-w-4xl">
          <Badge variant="outline" className="mb-4 py-1 px-4 bg-primary/10 text-primary border-primary/20 inline-flex items-center">
            <Trophy className="h-4 w-4 mr-1" /> Sharpen Your Skills
          </Badge>
          
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500 pb-0.5 leading-[1.3]">
            Why Competitive Programming?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 p-6 text-left">
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-md bg-primary/10 mr-4">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Problem-Solving Skills</h3>
                  <p className="text-muted-foreground">
                    Platforms like Codeforces, LeetCode, and CodeChef are essential for honing your problem-solving skills, preparing for coding interviews, and staying ahead in the competitive programming arena.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 p-6 text-left">
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-md bg-violet-500/10 mr-4">
                  <BookOpen className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Continuous Learning</h3>
                  <p className="text-muted-foreground">
                    Explore new challenges every day, track your progress, and analyze solutions to grow as a programmer. Remember, consistency and perseverance are key to success!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="mt-16 text-sm text-muted-foreground flex items-center justify-center">
          <Zap className="h-4 w-4 mr-2 text-primary" />
          Happy Coding!
        </footer>
      </div>
    </div>
  );
}

export default Page;
