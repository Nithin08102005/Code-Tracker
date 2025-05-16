"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  CircleHelp,
  CheckCircle,
} from "lucide-react";
import Footer from "@/components/footer";

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-1/3 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 py-1 px-4 bg-primary/10 text-primary border-primary/20 inline-flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" /> Get In Touch
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
            Contact Me
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Have a question about CodeTracker? Want to suggest a new feature? Or just want to say hi? I'd love to hear from you!
          </p>
        </div>

        {/* Contact Cards - Centered in a flex layout */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info Card */}
            <Card className="bg-card/50 backdrop-blur-sm border-violet-500/10 shadow-lg shadow-violet-500/5 h-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Contact Info</CardTitle>
                <CardDescription>Reach out via email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a href="mailto:raonithin457@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      raonithin457@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">College Email</p>
                    <a href="mailto:ee230002015@iiti.ac.in" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      ee230002015@iiti.ac.in
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Connect Card */}
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/10 shadow-lg shadow-blue-500/5 h-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Connect With Me</CardTitle>
                <CardDescription>Find me on social platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="https://github.com/Nithin08102005" target="_blank" className="flex items-center gap-3 group">
                  <div className="p-2 bg-slate-800 text-white rounded-full group-hover:bg-slate-700 transition-colors">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                      @Nithin08102005
                    </p>
                  </div>
                </Link>
                
                <Link href="https://www.linkedin.com/in/nithin-bachupally" target="_blank" className="flex items-center gap-3 group">
                  <div className="p-2 bg-blue-600 text-white rounded-full group-hover:bg-blue-700 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                      nithin-bachupally
                    </p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Try CodeTracker Button - Full width centered */}
          <div className="mt-6">
            <Card className="bg-card/50 backdrop-blur-sm border-violet-500/10 shadow-lg shadow-violet-500/5">
              <CardContent className="p-6">
                <Button variant="default" className="w-full bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90" asChild>
                  <Link href="/profiles">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Try CodeTracker Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <CircleHelp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Is CodeTracker free to use?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, CodeTracker is completely free to use. It's a project I built to help competitive programmers like myself organize their coding journey.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">How do I add my profiles?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simply go to the Profiles page and enter your usernames for CodeForces, CodeChef, and LeetCode. The app will automatically fetch and display your profile data.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Is my data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All your data is stored securely in Supabase and is only accessible to you when logged in. I don't share your information with any third parties.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">I found a bug or have a feature request</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Please report any bugs or feature requests by emailing me or by opening an issue on the GitHub repository. I'm always looking to improve CodeTracker!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
}