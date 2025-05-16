'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CodeforcesIcon, LeetcodeIcon, CodeChefIcon } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Zap, Trophy, Calendar, Clock, ExternalLink } from 'lucide-react';

export default function ContestsPage() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredContests, setFilteredContests] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function fetchContests() {
      try {
        setLoading(true);
        const response = await fetch('https://competeapi.vercel.app/contests/upcoming/');
        const data = await response.json();
        console.log(data);
        setContests(data);
        setFilteredContests(data);
      } catch (error) {
        console.error('Error fetching contests:', error);
        toast.error('Failed to load contests. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchContests();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredContests(contests);
    } else {
      const filtered = contests.filter(
        contest => contest.site.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilteredContests(filtered);
    }
  }, [activeFilter, contests]);

  const createGoogleCalendarLink = (contest) => {
    try {
      const formatDateForGCal = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().replace(/-|:|\.\d+/g, '');
      };
      
      const startDate = formatDateForGCal(contest.startTime);
      const endDate = formatDateForGCal(contest.endTime);
      const title = encodeURIComponent(contest.title);
      const details = encodeURIComponent(`Details: ${contest.site} Contest\nURL: ${contest.url}`);
      const location = encodeURIComponent(contest.url);

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    } catch (error) {
      console.error('Calendar link error:', error);
      toast.error('Failed to generate Google Calendar link.');
      return '#';
    }
  };

  const handleCalendarClick = (e, contest) => {
    e.stopPropagation();
    const calendarLink = createGoogleCalendarLink(contest);
    window.open(calendarLink, '_blank');
  };

  const getSiteIcon = (site) => {
    switch (site.toLowerCase()) {
      case 'codeforces':
        return <CodeforcesIcon className="w-6 h-6 text-primary" />;
      case 'leetcode':
        return <LeetcodeIcon className="w-6 h-6 text-violet-500" />;
      case 'codechef':
        return <CodeChefIcon className="w-6 h-6 text-blue-500" />;
      default:
        return null;
    }
  };

  const getSiteColor = (site) => {
    switch (site.toLowerCase()) {
      case 'codeforces':
        return "primary";
      case 'leetcode':
        return "violet-500";
      case 'codechef':
        return "blue-500";
      default:
        return "primary";
    }
  };

  const getFormattedTitle = (contest) => {
    if (contest.site.toLowerCase() === 'leetcode') {
      return `LeetCode ${contest.title}`;
    }
    if (contest.site.toLowerCase() === 'codechef') {
      return `CodeChef ${contest.title}`;
    }
    return contest.title;
  };

  const getTimeUntil = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffTime = start - now;
    
    if (diffTime <= 0) return "Started";
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  const platforms = ['all', ...new Set(contests.map(contest => contest.site.toLowerCase()))];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-1/3 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-start mb-8">
          <Badge variant="outline" className="mb-4 py-1 px-4 bg-primary/10 text-primary border-primary/20">
            <Trophy className="h-4 w-4 mr-1" /> Stay competitive
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500 pb-1 leading-tight">
  Upcoming Contests
</h1>
          
          <p className="text-muted-foreground max-w-2xl mb-6">
            Never miss a coding contest again. Track upcoming challenges from your favorite platforms.
          </p>

          {/* Platform filter buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {platforms.map((platform) => (
              <Button
                key={platform}
                onClick={() => setActiveFilter(platform)}
                variant={activeFilter === platform ? "default" : "outline"}
                className={`
                  capitalize text-sm px-4 py-2 h-9 rounded-lg transition-all
                  ${activeFilter === platform 
                    ? platform === 'all' 
                      ? 'bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90' 
                      : platform === 'codeforces' 
                        ? 'bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90' 
                        : platform === 'leetcode' 
                          ? 'bg-gradient-to-r from-violet-500/80 to-violet-500 hover:from-violet-500 hover:to-violet-500/90' 
                          : 'bg-gradient-to-r from-blue-500/80 to-blue-500 hover:from-blue-500 hover:to-blue-500/90'
                    : 'bg-background/50 hover:bg-background/80 border-muted/30 hover:border-muted/50'}
                `}
              >
                {platform === "all" ? "All Platforms" : platform}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading & Empty States */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredContests.length === 0 ? (
          <div className="text-center py-12 bg-card/50 backdrop-blur-sm border border-primary/10 rounded-lg shadow-md">
            <p className="text-lg font-medium text-muted-foreground">
              {activeFilter === "all"
                ? "No upcoming contests found"
                : `No upcoming ${activeFilter} contests found`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContests.map((contest) => {
              const siteColor = getSiteColor(contest.site);
              return (
                <Card
                  key={`${contest.title}-${contest.startTime}`}
                  className={`cursor-pointer bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-${siteColor}/10 hover:border-${siteColor}/30 hover:shadow-xl hover:shadow-${siteColor}/5 hover:-translate-y-1`}
                  onClick={() => handleCardClick(contest.url)}
                >
                  <CardHeader className="relative">
                    <div className="absolute top-0 right-0 p-4">
                      <Badge className={`bg-${siteColor}/5 border-${siteColor}/20 text-${siteColor}`}>
                        <Clock className="h-3 w-3 mr-1" /> {getTimeUntil(contest.startTime)}
                      </Badge>
                    </div>
                    
                    <div className="mb-2 p-3 w-24 h-12 rounded-lg bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center border border-muted/10 shadow-lg shadow-muted/5">
                      {getSiteIcon(contest.site)}
                    </div>
                    
                    <CardTitle className="text-xl font-bold hover:text-primary transition-colors">
                      {getFormattedTitle(contest)}
                    </CardTitle>
                    
                    <CardDescription className="text-base text-muted-foreground">
                      {format(new Date(contest.startTime), "MMM dd, yyyy")} • {Math.round(contest.duration / 3600000)} hours
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{format(new Date(contest.startTime), "h:mm a")} - {format(new Date(contest.endTime), "h:mm a")}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={`bg-${siteColor}/5 text-${siteColor}`}>
                          {contest.site}
                        </Badge>
                        <Badge variant="outline" className="bg-muted/10 text-muted-foreground">
                          {Math.round(contest.duration / 3600000)}h duration
                        </Badge>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 pb-4">
                    <Button
                      onClick={(e) => handleCalendarClick(e, contest)}
                      className={`w-full justify-between group bg-gradient-to-r from-${siteColor}/80 to-${siteColor} hover:from-${siteColor} hover:to-${siteColor}/90`}
                    >
                      <span className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </span>
                      <ExternalLink className="h-4 w-4 opacity-70" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}