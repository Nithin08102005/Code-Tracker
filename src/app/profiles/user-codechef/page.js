"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getUserHandleStatus } from "@/auth/handleStatus";
import { getData } from "@/auth/get-info";
import { updateHandle } from "@/auth/handleStatus";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Code, UserCircle, ChevronRight, ExternalLink, Star, Trophy, Award, BarChart, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Page() {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasHandle, setHasHandle] = useState(null);
  const [checkingHandle, setCheckingHandle] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [triggerReload, setTriggerReload] = useState(false);

  // Function to check if the user has a codechef handle
  useEffect(() => {
    async function checkHandle() {
      try {
        const response = await getUserHandleStatus("codechef");
        setHasHandle(response.hasHandle || false);
        if (response.hasHandle) {
          const fetchedData = (await getData("codechef", response.userhandle)).data;
          if (fetchedData.error) {
            setError(fetchedData.error);
          } else {
            setData(fetchedData);
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
      const response = await updateHandle("codechef", handle);

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

  // Helper function to get color based on star rating
  const getStarColor = (rating) => {
    if (!rating) return "gray";
    
    if (rating.includes("7★")) return "red";
    if (rating.includes("6★")) return "amber";
    if (rating.includes("5★")) return "amber";
    if (rating.includes("4★")) return "violet";
    if (rating.includes("3★")) return "blue";
    if (rating.includes("2★")) return "green";
    if (rating.includes("1★")) return "gray";
    return "gray";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-1/3 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl"></div>
  
      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
          Your CodeChef Profile
        </h1>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Profile Info Card */}
          <div className="lg:col-span-2">
            {checkingHandle ? (
              <div className="flex items-center justify-center h-64 bg-card/50 backdrop-blur-sm rounded-lg border border-border shadow-md">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 border-4 border-t-blue-500 border-r-blue-500/30 border-b-blue-500/30 border-l-blue-500/30 rounded-full animate-spin mb-4"></div>
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
              <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-blue-500/10 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2 py-1 px-3 bg-blue-500/10 text-blue-500 border-blue-500/20">
                        <UserCircle className="h-3 w-3 mr-1" /> CodeChef
                      </Badge>
                      <CardTitle className="text-2xl">
                        {data.username}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        {data.country && (
                          <span className="flex items-center gap-1">
                            <span className="h-4 w-4 rounded-full bg-muted flex items-center justify-center">
                              🌍
                            </span>
                            {data.country}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <span className="h-4 w-4 rounded-full bg-muted flex items-center justify-center">
                            🏫
                          </span>
                          {data.institution || "Not specified"}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Badge className={`px-3 py-1 text-sm capitalize bg-${getStarColor(data.rating)}-500/20 text-${getStarColor(data.rating)}-500`}>
                        {data.rating || "Unrated"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
  
                <CardContent>
                  {/* Rating Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-card border-border/50">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center">
                          <Star className="h-3 w-3 mr-1" /> Rating
                        </p>
                        <p className="text-lg font-bold text-blue-500">{data.rating_number || "N/A"}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border/50">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center">
                          <Trophy className="h-3 w-3 mr-1" /> Global Rank
                        </p>
                        <p className="text-lg font-bold text-violet-500">{data.global_rank || "N/A"}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border/50">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center">
                          <Award className="h-3 w-3 mr-1" /> Country Rank
                        </p>
                        <p className="text-lg font-bold text-amber-500">{data.country_rank || "N/A"}</p>
                      </CardContent>
                    </Card>
                  </div>
  
                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">User Type</h4>
                        <p className="text-lg">{data.user_type || "Not specified"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Institution</h4>
                        <p className="text-lg">{data.institution || "Not specified"}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Max Rating</h4>
                        <p className="text-lg">{data.max_rank || "N/A"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Country</h4>
                        <p className="text-lg">{data.country || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
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
                    className="bg-gradient-to-r from-blue-500/80 to-blue-500 hover:from-blue-500 hover:to-blue-500/90"
                    onClick={() => window.open(`https://www.codechef.com/users/${data.username}`, '_blank')}
                  >
                    View on CodeChef <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-muted/30 shadow-md">
                <CardContent className="pt-6 pb-6 flex flex-col items-center">
                  <div className="mb-4 p-3 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center border border-blue-500/10 shadow-lg shadow-blue-500/5">
                    <UserCircle className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-lg font-medium">No profile data found</p>
                  <p className="text-muted-foreground text-center mt-2">
                    Please enter your CodeChef handle to view your profile details.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
  
          {/* Handle Form Card */}
          <div>
            {checkingHandle ? (
              <div className="flex items-center justify-center h-48 bg-card/50 backdrop-blur-sm rounded-lg border border-border shadow-md">
                <div className="h-6 w-6 border-4 border-t-blue-500 border-r-blue-500/30 border-b-blue-500/30 border-l-blue-500/30 rounded-full animate-spin"></div>
              </div>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-violet-500/10 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5">
                <CardHeader>
                  <div className="mb-2 p-3 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center border border-blue-500/10 shadow-lg shadow-blue-500/5">
                    <Code className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle className="text-xl">
                    {hasHandle ? "Update Your Profile" : "Enter Your Handle"}
                  </CardTitle>
                  <CardDescription>
                    {hasHandle 
                      ? "Change your CodeChef handle to update profile data" 
                      : "Connect your CodeChef account to see your profile stats"}
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
                          CodeChef Handle
                        </label>
                        <input
                          type="text"
                          id="handle"
                          value={handle}
                          onChange={(e) => setHandle(e.target.value)}
                          placeholder="Enter your CodeChef handle"
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
                      className="w-full bg-gradient-to-r from-blue-500/80 to-blue-500 hover:from-blue-500 hover:to-blue-500/90"
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
                      <BarChart className="h-4 w-4 text-blue-500" />
                    </div>
                    <CardTitle className="text-lg">Ranking Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center text-sm pb-2 border-b border-border/30">
                      <span className="text-muted-foreground">Global Rank</span>
                      <span className="font-medium">{data.global_rank || "N/A"}</span>
                    </li>
                    <li className="flex justify-between items-center text-sm pb-2 border-b border-border/30">
                      <span className="text-muted-foreground">Country Rank</span>
                      <span className="font-medium">{data.country_rank || "N/A"}</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Max Rating</span>
                      <span className="font-medium">{data.max_rank || "N/A"}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
     
    </div>
  );
}

export default Page;