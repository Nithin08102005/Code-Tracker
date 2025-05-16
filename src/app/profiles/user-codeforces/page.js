"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner"; // Toast from ShadCN UI
import { useRouter } from "next/navigation";
import { getUserHandleStatus } from "@/auth/handleStatus";
import { getData } from "@/auth/get-info"; // Function to fetch user data
import { updateHandle } from "@/auth/handleStatus"; // Function to update handle
import { Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter } from "@/components/ui/card";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge,UserCircle,Clock,TrendingUp,Award,Star,Trophy,ChevronRight,BarChart,ExternalLink} from "lucide-react";
import { Github } from "lucide-react";
function Page() {
  const [handle, setHandle] = useState(""); // State for the Codeforces handle
  const [loading, setLoading] = useState(false); // State to track form submission
  const [hasHandle, setHasHandle] = useState(null); // Null indicates loading state for `hasHandle`
  const [checkingHandle, setCheckingHandle] = useState(true); // State to track loading during useEffect
  const [data, setData] = useState(null); // State to store user data from API
  const [error, setError] = useState(null); // State to handle errors from getData
  const router = useRouter(); // For navigation
  const[triggerReload,setTriggerReload]=useState(false); // State to trigger reload
  // Convert lastOnlineTimeSeconds to readable date
  const convertToDate = (seconds) => {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString();
  };

  // Function to check if the user has a Codeforces handle
  useEffect(() => {
    async function checkHandle() {
      try {
        const response = await getUserHandleStatus("codeforces"); // Replace with actual API function
        setHasHandle(response.hasHandle || false);
        if (response.hasHandle) {
          const fetchedData = await getData("codeforces", response.userhandle); // Call getData to fetch object
          if (fetchedData.error) {
            setError(fetchedData.error); // Handle error returned by getData
          } else {
            // console.log(fetchedData);
            if(fetchedData.data[0].error)setError(fetchedData.data[0].error);
            else  // Log the fetched data
            setData(fetchedData.data); // Store the returned object in state
          }
        }
      } catch (error) {
        console.error("Error checking handle:", error);
        setHasHandle(false); // Default to false on error
      } finally {
        setCheckingHandle(false); // Mark that the check is complete
      }
    }
    checkHandle();
  }, [triggerReload]);
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Show loading state
    //  console.log(handle);
    try {
      const response = await updateHandle("codeforces",handle); // Call the updateHandle function

      if (!response.error) {
        // Handle success case
        toast("Success", {
          description: "Handle updated successfully!",
          unstyled: true, // Unstyled option
          classNames: {
            toast: "bg-green-600", // Green background for success
            title: "text-white font-bold text-xl", // Bold white title
            description: "text-white text-sm", // White description
            actionButton: "bg-green-500 hover:bg-green-400", // Styled action button
            closeButton: "bg-green-400 hover:bg-green-300", // Close button styling
          },
        });
        setTriggerReload((prev) => !prev);
      } else {
        // Handle error case
        toast("Error", {
          description: response.error, // Error message from API
          unstyled: true,
          classNames: {
            toast: "bg-red-600", // Red background for error
            title: "text-white font-bold text-xl", // Bold white title
            description: "text-white text-sm", // White description
            actionButton: "bg-red-500 hover:bg-red-400", // Styled action button
            closeButton: "bg-red-400 hover:bg-red-300", // Close button styling
          },
          variant: "destructive",
        });
      }
    } catch (error) {
      // Handle unexpected errors
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
      setLoading(false); // Stop loading state
    }
  }
  const getRankColor = (rank) => {
    const rankColors = {
      'newbie': 'gray',
      'pupil': 'green',
      'specialist': 'cyan',
      'expert': 'blue',
      'candidate master': 'violet',
      'master': 'orange',
      'international master': 'orange',
      'grandmaster': 'red',
      'international grandmaster': 'red',
      'legendary grandmaster': 'red'
    };
    return rankColors[rank.toLowerCase()] || 'gray';
  };
  const calculatePercentile = (rating) => {
    // Placeholder calculation - replace with actual Codeforces percentile logic
    return Math.min(99, Math.max(1, Math.floor((rating / 3000) * 100)));
  };

const getNextRankThreshold = (rating) => {
  const thresholds = {
    1200: 'Pupil (1200)',
    1400: 'Specialist (1400)',
    1600: 'Expert (1600)',
    1900: 'Candidate Master (1900)',
    2100: 'Master (2100)',
    2300: 'International Master (2300)',
    2400: 'Grandmaster (2400)',
    2600: 'International Grandmaster (2600)',
    3000: 'Legendary Grandmaster (3000)'
  };
  for (const threshold in thresholds) {
    if (rating < parseInt(threshold)) {
      return thresholds[threshold];
    }
  }
  return 'Max rank achieved';
};
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-1/3 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
    
        <div className="container mx-auto px-4 py-12 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
            Your Codeforces Profile
          </h1>
    
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* Profile Info Card */}
            <div className="lg:col-span-2">
              {checkingHandle ? (
                <div className="flex items-center justify-center h-64 bg-card/50 backdrop-blur-sm rounded-lg border border-border shadow-md">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 border-4 border-t-primary border-r-primary/30 border-b-primary/30 border-l-primary/30 rounded-full animate-spin mb-4"></div>
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
                <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2 py-1 px-3 bg-primary/10 text-primary border-primary/20">
                          <UserCircle className="h-3 w-3 mr-1" /> Codeforces
                        </Badge>
                        <CardTitle className="text-2xl">
                          {data[0].firstName} {data[0].lastName}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          {data[0].country && (
                            <span className="flex items-center gap-1">
                              <span className="h-4 w-4 rounded-full bg-muted flex items-center justify-center">
                                🌍
                              </span>
                              {data[0].country}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            Last Online: {convertToDate(data[0].lastOnlineTimeSeconds)}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Badge className={`px-3 py-1 text-sm capitalize bg-${getRankColor(data[0].rank)}-500/20 text-${getRankColor(data[0].rank)}-500`}>
                          {data[0].rank}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
    
                  <CardContent>
                    {/* Rating Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <Card className="bg-card border-border/50">
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> Current Rating
                          </p>
                          <p className="text-lg font-bold text-primary">{data[0].rating}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-card border-border/50">
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center">
                            <Award className="h-3 w-3 mr-1" /> Current Rank
                          </p>
                          <p className="text-lg font-bold text-violet-500">{data[0].rank}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-card border-border/50">
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center">
                            <Star className="h-3 w-3 mr-1" /> Max Rating
                          </p>
                          <p className="text-lg font-bold text-blue-500">{data[0].maxRating}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-card border-border/50">
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center">
                            <Trophy className="h-3 w-3 mr-1" /> Max Rank
                          </p>
                          <p className="text-lg font-bold text-amber-500">{data[0].maxRank}</p>
                        </CardContent>
                      </Card>
                    </div>
    
                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                      <div className="space-y-4">
                        {data[0].organization && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Organization</h4>
                            <p className="text-lg">{data[0].organization}</p>
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Friend Count</h4>
                          <p className="text-lg">{data[0].friendOfCount}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Contribution</h4>
                          <p className="text-lg">{data[0].contribution}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Contests Participated</h4>
                          <p className="text-lg">{data[1].ratings ? Object.keys(data[1].ratings).length : 0}</p>
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
                      className="bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90"
                      onClick={() => window.open(`https://codeforces.com/profile/${data[0].handle}`, '_blank')}
                    >
                      View on Codeforces  <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="bg-card/50 backdrop-blur-sm border-muted/30 shadow-md">
                  <CardContent className="pt-6 pb-6 flex flex-col items-center">
                    <div className="mb-4 p-3 w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/10 shadow-lg shadow-primary/5">
                      <UserCircle className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-lg font-medium">No profile data found</p>
                    <p className="text-muted-foreground text-center mt-2">
                      Please enter your Codeforces handle to view your profile details.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
    
            {/* Handle Form Card */}
            <div>
              {checkingHandle ? (
                <div className="flex items-center justify-center h-48 bg-card/50 backdrop-blur-sm rounded-lg border border-border shadow-md">
                  <div className="h-6 w-6 border-4 border-t-primary border-r-primary/30 border-b-primary/30 border-l-primary/30 rounded-full animate-spin"></div>
                </div>
              ) : (
                <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-violet-500/10 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5">
                  <CardHeader>
                    <div className="mb-2 p-3 w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-500/10 flex items-center justify-center border border-violet-500/10 shadow-lg shadow-violet-500/5">
                      <Code className="h-5 w-5 text-violet-500" />
                    </div>
                    <CardTitle className="text-xl">
                      {hasHandle ? "Update Your Profile" : "Enter Your Handle"}
                    </CardTitle>
                    <CardDescription>
                      {hasHandle 
                        ? "Change your Codeforces handle to update profile data" 
                        : "Connect your Codeforces account to see your profile stats"}
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
                            Codeforces Handle
                          </label>
                          <input
                            type="text"
                            id="handle"
                            value={handle}
                            onChange={(e) => setHandle(e.target.value)}
                            placeholder="Enter your Codeforces handle"
                            className="flex h-10 w-full  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="mt-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-violet-500/80 to-violet-500 hover:from-violet-500 hover:to-violet-500/90"
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
                      <CardTitle className="text-lg">Quick Stats</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center text-sm pb-2 border-b border-border/30">
                        <span className="text-muted-foreground">Rating Change (last contest)</span>
                        <span className={data[1].ratings && data[1].ratings.length > 0 ? 
                          (data[1].ratings[data[1].ratings.length-1].newRating > data[1].ratings[data[1].ratings.length-1].oldRating ? 
                            "text-green-500" : "text-red-500") : "text-muted-foreground"}>
                          {data[1].ratings && data[1].ratings.length > 0 ? 
                            `${data[1].ratings[data[1].ratings.length-1].newRating - data[1].ratings[data[1].ratings.length-1].oldRating > 0 ? "+" : ""}${data[1].ratings[data[1].ratings.length-1].newRating - data[1].ratings[data[1].ratings.length-1].oldRating}` : 
                            "N/A"}
                        </span>
                      </li>
                     
                      <li className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Next Rating Needed</span>
                        <span>{getNextRankThreshold(data[0].rating)}</span>
                      </li>
                    </ul>
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
