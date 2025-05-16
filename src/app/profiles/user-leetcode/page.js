"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getUserHandleStatus } from "@/auth/handleStatus";
import { getData } from "@/auth/get-info";
import { updateHandle } from "@/auth/handleStatus";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  UserCircle, 
  Clock, 
  ChevronRight, 
  Award, 
  BarChart3, 
  Trophy, 
  Star, 
  Github, 
  Brain,
  Hash,
  Calendar,
  Target,
  AlignLeft,
  ExternalLink
} from "lucide-react";

function Page() {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasHandle, setHasHandle] = useState(null);
  const [checkingHandle, setCheckingHandle] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [triggerReload, setTriggerReload] = useState(false);

  // Convert seconds to readable date
  const convertToDate = (seconds) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString();
  };

  // Function to check if the user has a leetcode handle
  useEffect(() => {
    async function checkHandle() {
      try {
        const response = await getUserHandleStatus("leetcode");
        setHasHandle(response.hasHandle || false);
        if (response.hasHandle) {
          const fetchedData = (await getData("leetcode", response.userhandle)).data;
          if (fetchedData.error) {
            setError(fetchedData.error);
          } else {
            if (fetchedData.errors) {
              setError(fetchedData.errors[0].message);
            } else {
              setData(fetchedData.data);
            }
          }
        }
      } catch (error) {
        console.error("Error checking handle:", error);
        setHasHandle(false);
      } finally {
        setCheckingHandle(false);
      }
    }
    checkHandle();
  }, [triggerReload]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateHandle("leetcode", handle);

      if (!response.error) {
        toast("Success", {
          description: "Handle updated successfully!",
          unstyled: true,
          classNames: {
            toast: "bg-green-600",
            title: "text-white font-bold text-xl",
            description: "text-white text-sm",
            actionButton: "bg-green-500 hover:bg-green-400",
            closeButton: "bg-green-400 hover:bg-green-300",
          },
        });
        setTriggerReload((prev) => !prev);
      } else {
        toast("Error", {
          description: response.error,
          unstyled: true,
          classNames: {
            toast: "bg-red-600",
            title: "text-white font-bold text-xl",
            description: "text-white text-sm",
            actionButton: "bg-red-500 hover:bg-red-400",
            closeButton: "bg-red-400 hover:bg-red-300",
          },
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast("Error", {
        description: "An unexpected error occurred while updating the handle.",
        unstyled: true,
        classNames: {
          toast: "bg-red-600",
          title: "text-white font-bold text-xl",
          description: "text-white text-sm",
          actionButton: "bg-red-500 hover:bg-red-400",
          closeButton: "bg-red-400 hover:bg-red-300",
        },
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  // Get badge color based on problems solved
  const getBadgeColor = (problemCount) => {
    if (problemCount > 1000) return "text-amber-500 bg-amber-500/20 border-amber-500/30";
    if (problemCount > 500) return "text-violet-500 bg-violet-500/20 border-violet-500/30";
    if (problemCount > 100) return "text-primary bg-primary/20 border-primary/30";
    return "text-blue-500 bg-blue-500/20 border-blue-500/30";
  };

  // Calculate progress to next hundred problems solved
  const getNextMilestone = (totalProblems) => {
    const nextHundred = Math.ceil(totalProblems / 100) * 100;
    return nextHundred;
  };

  // Calculate percentage to next hundred
  const getProgressToNextMilestone = (totalProblems) => {
    const currentHundred = Math.floor(totalProblems / 100) * 100;
    const nextHundred = currentHundred + 100;
    return Math.floor(((totalProblems - currentHundred) / (nextHundred - currentHundred)) * 100);
  };
  
  // Get different difficulty color
  const getDifficultyColor = (difficulty) => {
    if (difficulty === "Hard") return "text-red-500";
    if (difficulty === "Medium") return "text-amber-500";
    return "text-green-500";
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-1/3 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-primary">
          Your LeetCode Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Profile Info Card */}
          <div className="lg:col-span-2">
            {checkingHandle ? (
              <div className="flex items-center justify-center h-64 bg-card/50 backdrop-blur-sm rounded-lg border border-border shadow-md">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 border-4 border-t-violet-500 border-r-violet-500/30 border-b-violet-500/30 border-l-violet-500/30 rounded-full animate-spin mb-4"></div>
                  <p className="text-lg font-medium">Loading profile data...</p>
                </div>
              </div>
            ) : error ? (
              <Card className="border-destructive/30 bg-card/50 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <div className="p-3 w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center border border-destructive/20 mb-2">
                    <span className="text-xl font-bold text-destructive">!</span>
                  </div>
                  <CardTitle className="text-2xl text-destructive">Error Loading Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-destructive/90">{error}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="border-destructive/30 text-destructive hover:bg-destructive/10"
                    onClick={() => setTriggerReload(prev => !prev)}
                  >
                    Try Again
                  </Button>
                </CardFooter>
              </Card>
            ) : hasHandle && data ? (
              <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-violet-500/10 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2 py-1 px-3 bg-violet-500/10 text-violet-500 border-violet-500/20">
                        <Code className="h-3 w-3 mr-1" /> LeetCode
                      </Badge>
                      <CardTitle className="text-2xl">
                        {data.matchedUser.username}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          Active Days: {data.matchedUser.userCalendar.totalActiveDays}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="mt-4 md:mt-0">
                      {data.matchedUser.badges && data.matchedUser.badges.length > 0 && (
                        <Badge className="px-3 py-1 text-sm bg-amber-500/20 text-amber-500">
                          {data.matchedUser.badges.some(badge => badge.name === "Guardian") 
                            ? "Guardian" 
                            : data.matchedUser.badges.some(badge => badge.name === "Knight") 
                            ? "Knight" 
                            : data.matchedUser.badges[0].name}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Profile Image */}
                  <div className="flex justify-center mb-6">
                    <div className="p-1 rounded-full bg-gradient-to-r from-violet-500/50 to-primary/50">
                      <img
                        src={data.matchedUser.profile.userAvatar || "/api/placeholder/100/100"}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full border-4 border-card"
                      />
                    </div>
                  </div>

                  {/* Problem Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-card border-border/50">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center">
                          <Brain className="h-3 w-3 mr-1" /> Total Problems
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {data.matchedUser.submitStats.acSubmissionNum.find(difficulty => difficulty.difficulty === "All")?.count || 0}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border/50">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center">
                          <Award className="h-3 w-3 mr-1" /> Contest Ranking
                        </p>
                        <p className="text-lg font-bold text-violet-500">
                          {data.userContestRanking?.globalRanking?.toLocaleString() || "N/A"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border/50">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center">
                          <Star className="h-3 w-3 mr-1" /> Rating
                        </p>
                        <p className="text-lg font-bold text-blue-500">
                          {data.userContestRanking?.rating ? Math.floor(data.userContestRanking.rating) : "N/A"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border/50">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center">
                          <Trophy className="h-3 w-3 mr-1" /> Contests
                        </p>
                        <p className="text-lg font-bold text-amber-500">
                          {data.userContestRanking?.attendedContestsCount || 0}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Problems by Difficulty */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Hash className="h-4 w-4 mr-2 text-violet-500" />
                      Problems Solved by Difficulty
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <Card className="bg-green-500/10 border-green-500/20">
                        <CardContent className="p-4 flex flex-col items-center">
                          <span className="text-xs text-muted-foreground mb-1">Easy</span>
                          <span className="text-2xl font-bold text-green-500">
                            {data.matchedUser.submitStats.acSubmissionNum.find(difficulty => difficulty.difficulty === "Easy")?.count || 0}
                          </span>
                        </CardContent>
                      </Card>
                      <Card className="bg-amber-500/10 border-amber-500/20">
                        <CardContent className="p-4 flex flex-col items-center">
                          <span className="text-xs text-muted-foreground mb-1">Medium</span>
                          <span className="text-2xl font-bold text-amber-500">
                            {data.matchedUser.submitStats.acSubmissionNum.find(difficulty => difficulty.difficulty === "Medium")?.count || 0}
                          </span>
                        </CardContent>
                      </Card>
                      <Card className="bg-red-500/10 border-red-500/20">
                        <CardContent className="p-4 flex flex-col items-center">
                          <span className="text-xs text-muted-foreground mb-1">Hard</span>
                          <span className="text-2xl font-bold text-red-500">
                            {data.matchedUser.submitStats.acSubmissionNum.find(difficulty => difficulty.difficulty === "Hard")?.count || 0}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Languages Used */}
                  {data.matchedUser.languageProblemCount && data.matchedUser.languageProblemCount.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <AlignLeft className="h-4 w-4 mr-2 text-blue-500" />
                        Top Languages
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {data.matchedUser.languageProblemCount
                          .filter(lang => lang.problemsSolved > 0)
                          .sort((a, b) => b.problemsSolved - a.problemsSolved)
                          .slice(0, 3)
                          .map((lang, index) => (
                            <div key={index} className="flex items-center justify-between bg-card/80 p-3 rounded-md border border-border/50">
                              <span className="text-sm font-medium">{lang.languageName}</span>
                              <Badge variant="outline" className={getBadgeColor(lang.problemsSolved)}>
                                {lang.problemsSolved}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-border/50 pt-4 flex justify-between">
                  <Button
                    variant="outline" 
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" /> Back
                  </Button>
                  <Button 
                    variant="default"
                    className="bg-gradient-to-r from-violet-500/80 to-violet-500 hover:from-violet-500 hover:to-violet-500/90"
                    onClick={() => window.open(`https://leetcode.com/${data.matchedUser.username}`, '_blank')}
                  >
                    View on LeetCode <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-muted/30 shadow-md">
                <CardContent className="pt-6 pb-6 flex flex-col items-center">
                  <div className="mb-4 p-3 w-16 h-16 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-500/10 flex items-center justify-center border border-violet-500/10 shadow-lg shadow-violet-500/5">
                    <UserCircle className="h-8 w-8 text-violet-500" />
                  </div>
                  <p className="text-lg font-medium">No profile data found</p>
                  <p className="text-muted-foreground text-center mt-2">
                    Please enter your LeetCode handle to view your profile details.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Handle Form Card */}
          <div>
            {checkingHandle ? (
              <div className="flex items-center justify-center h-48 bg-card/50 backdrop-blur-sm rounded-lg border border-border shadow-md">
                <div className="h-6 w-6 border-4 border-t-violet-500 border-r-violet-500/30 border-b-violet-500/30 border-l-violet-500/30 rounded-full animate-spin"></div>
              </div>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <CardHeader>
                  <div className="mb-2 p-3 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/10 shadow-lg shadow-primary/5">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {hasHandle ? "Update Your Profile" : "Enter Your Handle"}
                  </CardTitle>
                  <CardDescription>
                    {hasHandle 
                      ? "Change your LeetCode handle to update profile data" 
                      : "Connect your LeetCode account to see your profile stats"}
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label 
                          htmlFor="handle" 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          LeetCode Handle
                        </label>
                        <input
                          type="text"
                          id="handle"
                          value={handle}
                          onChange={(e) => setHandle(e.target.value)}
                          placeholder="Enter your LeetCode handle"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-3">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-t-background border-r-background/30 border-b-background/30 border-l-background/30 rounded-full animate-spin mr-2"></div>
                          {hasHandle ? "Updating..." : "Submitting..."}
                        </>
                      ) : (
                        <>{hasHandle ? "Update Profile" : "Connect Profile"}</>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}

            {/* Quick Stats Card (visible when profile exists) */}
            {hasHandle && data && (
              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/10 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 mt-6">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-blue-500/10">
                      <BarChart3 className="h-4 w-4 text-blue-500" />
                    </div>
                    <CardTitle className="text-lg">Progress Stats</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center text-sm pb-2 border-b border-border/30">
                      <span className="text-muted-foreground">Next Milestone</span>
                      <span>{getNextMilestone(data.matchedUser.submitStats.acSubmissionNum.find(difficulty => difficulty.difficulty === "All")?.count || 0)} problems</span>
                    </li>
                    <li className="flex justify-between items-center text-sm pb-2 border-b border-border/30">
                      <span className="text-muted-foreground">Top Percentage</span>
                      <span className="text-primary font-medium">
                        {data.userContestRanking?.topPercentage ? `${data.userContestRanking.topPercentage.toFixed(1)}%` : "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Daily Streak Focus</span>
                      <span className="text-blue-500 font-medium">
                        {data.matchedUser.userCalendar?.streak || 0} days
                      </span>
                    </li>
                  </ul>
                  
                  {/* Progress bar to next milestone */}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress to next milestone</span>
                      <span>{getProgressToNextMilestone(data.matchedUser.submitStats.acSubmissionNum.find(difficulty => difficulty.difficulty === "All")?.count || 0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-500 to-primary rounded-full" 
                        style={{ width: `${getProgressToNextMilestone(data.matchedUser.submitStats.acSubmissionNum.find(difficulty => difficulty.difficulty === "All")?.count || 0)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Additional Stats if available */}
            {hasHandle && data && data.matchedUser.userCalendar && (
              <Card className="bg-card/50 backdrop-blur-sm border-violet-500/10 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 mt-6">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-violet-500/10">
                      <Calendar className="h-4 w-4 text-violet-500" />
                    </div>
                    <CardTitle className="text-lg">Activity Insights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card/80 p-3 rounded-md border border-border/50">
                      <p className="text-xs text-muted-foreground">Total Active Days</p>
                      <p className="text-xl font-bold text-violet-500">{data.matchedUser.userCalendar.totalActiveDays}</p>
                    </div>
                    <div className="bg-card/80 p-3 rounded-md border border-border/50">
                      <p className="text-xs text-muted-foreground">Max Streak</p>
                      <p className="text-xl font-bold text-primary">{data.matchedUser.userCalendar.streak || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      
    </div>
  );
}

export default Page;