"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  User,
  BookOpen,
  Trophy,
  GraduationCap,
  MapPin,
  Heart,
  Zap,
  BarChart3,
} from "lucide-react";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-1/3 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <Badge variant="outline" className="mb-4 py-1 px-4 bg-primary/10 text-primary border-primary/20">
          <User className="h-4 w-4 mr-1" /> About Me
        </Badge>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
          The Story Behind CodeTracker
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Personal Info Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg shadow-primary/5 col-span-1">
            <CardContent className="p-6">
              <div className="mb-6 p-3 w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/10 shadow-lg shadow-primary/5 mx-auto">
                <User className="h-8 w-8 text-primary" />
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-4">Nithin Bachupally</h2>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>B.Tech Student at IIT Indore</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>From Telangana, India</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Passionate about Competitive Programming, DSA, and Web Development</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" size="icon" asChild className="rounded-full">
                  <Link href="https://github.com/Nithin08102005" target="_blank">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="icon" asChild className="rounded-full">
                  <Link href="https://www.linkedin.com/in/nithin-bachupally-368955298/" target="_blank">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="icon" asChild className="rounded-full">
                  <Link href="mailto:raonithin457@gmail.com">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card className="bg-card/50 backdrop-blur-sm border-violet-500/10 shadow-lg shadow-violet-500/5 col-span-1 md:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
                About CodeTracker
              </h2>
              
              <p className="text-muted-foreground mb-6">
                CodeTracker is my first independent project, born from a desire to streamline the competitive programming experience. 
                As an avid coder juggling multiple platforms, I found myself constantly switching between websites to track my progress, 
                find contests, and organize problems. CodeTracker solves this by bringing everything into one convenient dashboard.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Key Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Unified Profiles</h4>
                    <p className="text-sm text-muted-foreground">
                      View all your CodeForces, CodeChef, and LeetCode profiles on a single page
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-violet-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Contest Aggregator</h4>
                    <p className="text-sm text-muted-foreground">
                      Track upcoming contests across platforms with Google Calendar integration
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Problem Repository</h4>
                    <p className="text-sm text-muted-foreground">
                      Organize problems with tags, difficulty markers, and solution notes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Advanced Filters</h4>
                    <p className="text-sm text-muted-foreground">
                      Filter problems by tags, difficulty, solved status, and starred markers
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Tech Stack</h3>
              
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Next.js</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">React</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Tailwind CSS</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">shadcn/ui</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Supabase</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Competitive Profiles Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-primary">
            My Competitive Programming Profiles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CodeChef Profile */}
            <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/10">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">CodeChef</h3>
                    <p className="text-sm text-muted-foreground">@nithin261</p>
                  </div>
                </div>
                
                <Button variant="default" className="w-full mt-2 bg-gradient-to-r from-primary/80 to-primary" asChild>
                  <Link href="https://www.codechef.com/users/nithin261" target="_blank">
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* CodeForces Profile */}
            <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-violet-500/10 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-500/10 flex items-center justify-center border border-violet-500/10">
                    <Code className="h-6 w-6 text-violet-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">CodeForces</h3>
                    <p className="text-sm text-muted-foreground">@nithin0810</p>
                  </div>
                </div>
                
                <Button variant="default" className="w-full mt-2 bg-gradient-to-r from-violet-500/80 to-violet-500" asChild>
                  <Link href="https://codeforces.com/profile/nithin0810" target="_blank">
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* LeetCode Profile */}
            <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-blue-500/10 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center border border-blue-500/10">
                    <Code className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">LeetCode</h3>
                    <p className="text-sm text-muted-foreground">@nithin810</p>
                  </div>
                </div>
                
                <Button variant="default" className="w-full mt-2 bg-gradient-to-r from-blue-500/80 to-blue-500" asChild>
                  <Link href="https://leetcode.com/u/nithin810/" target="_blank">
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

     
    </div>
  );
}