"use client";
import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { 
 
  BookOpen,
  CheckCircle,
 ChevronDown,
  Star,
  TrendingUp,
  Award,
  Globe,
  Tag,
  Eye,
  EyeOff
} from "lucide-react";
const ProblemStatistics = ({ problems, filters }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Apply the same filters as in the main component to ensure consistency
  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      // Apply difficulty filter
      if (filters.difficulty !== "all" && problem.difficulty.toLowerCase() !== filters.difficulty) {
        return false;
      }
      
      // Apply status filter
      if (filters.status !== "all" && problem.status.toLowerCase().replace(" ", "_") !== filters.status) {
        return false;
      }
      
      // Apply website filter
      if (filters.website !== "all") {
        if (filters.website === "other") {
          if (problem.website.toLowerCase().includes("leetcode") || 
              problem.website.toLowerCase().includes("codeforces") || 
              problem.website.toLowerCase().includes("codechef")) {
            return false;
          }
        } else if (!problem.website.toLowerCase().includes(filters.website)) {
          return false;
        }
      }
      
      // Apply starred filter
      if (filters.starred !== "all") {
        const isStarred = filters.starred === "starred";
        if (problem.is_starred !== isStarred) {
          return false;
        }
      }
      
      // Apply tag filter
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.every(tag => problem.tags.some(
          (problemTag) => problemTag.tag_id === tag
        ));
        if (!hasMatchingTag) return false;
      }
      
      // Apply name search
      if (filters.searchTerm) {
        if (!problem.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
          return false;
        }
      }
      
      return true;
    });
  }, [problems, filters]);

  // Calculate basic statistics
  const stats = useMemo(() => {
    const totalProblems = filteredProblems.length;
    
    // Status counts
    const statusCounts = {
      solved: 0,
      attempted: 0,
      not_started: 0,
    };
    
    // Difficulty counts
    const difficultyCounts = {
      easy: 0,
      medium: 0,
      hard: 0,
    };
    
    // Website counts
    const websiteCounts = {};
    
    // Tag counts
    const tagCounts = {};
    
    // Starred count
    let starredCount = 0;
    
    filteredProblems.forEach((problem) => {
      // Count by status
      const status = problem.status.toLowerCase().replace(" ", "_");
      statusCounts[status] = (statusCounts[status] || 0) + 1;
      
      // Count by difficulty
      const difficulty = problem.difficulty.toLowerCase();
      difficultyCounts[difficulty] = (difficultyCounts[difficulty] || 0) + 1;
      
      // Count by website
      let website = "other";
      if (problem.website.toLowerCase().includes("leetcode")) {
        website = "leetcode";
      } else if (problem.website.toLowerCase().includes("codeforces")) {
        website = "codeforces";
      } else if (problem.website.toLowerCase().includes("codechef")) {
        website = "codechef";
      }
      websiteCounts[website] = (websiteCounts[website] || 0) + 1;
      
      // Count starred problems
      if (problem.is_starred) {
        starredCount++;
      }
      
      // Count by tags
      if (problem.tags && problem.tags.length) {
        problem.tags.forEach(tag => {
          tagCounts[tag.name] = (tagCounts[tag.name] || 0) + 1;
        });
      }
    });
    
    // Calculate completion percentage
    const completionPercentage = totalProblems > 0 
      ? Math.round((statusCounts.solved / totalProblems) * 100) 
      : 0;
    
    // Prepare data for charts
    const statusData = Object.keys(statusCounts).map(key => ({
      name: key.replace("_", " "),
      value: statusCounts[key],
    }));
    
    const difficultyData = Object.keys(difficultyCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: difficultyCounts[key],
    }));
    
    const websiteData = Object.keys(websiteCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: websiteCounts[key],
    }));
    
    // Get top 5 tags
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
    
    return {
      totalProblems,
      statusCounts,
      difficultyCounts,
      websiteCounts,
      tagCounts,
      starredCount,
      completionPercentage,
      statusData,
      difficultyData,
      websiteData,
      topTags,
    };
  }, [filteredProblems]);

  // Colors for charts
  const COLORS = {
    status: {
      solved: "#10b981", // green
      attempted: "#3b82f6", // blue
      "not started": "#6b7280", // gray
    },
    difficulty: {
      Easy: "#10b981", // green
      Medium: "#f59e0b", // yellow
      Hard: "#ef4444", // red
    },
    website: {
      Leetcode: "#f59e0b", // yellow
      Codeforces: "#3b82f6", // blue
      Codechef: "#8b5cf6", // purple
      Other: "#6b7280", // gray
    },
  };

  // Format percentage for display
  const formatPercentage = (percent) => {
    return `${percent}%`;
  };

  return (
    <Collapsible className="mb-6 bg-card/30 backdrop-blur-sm border border-blue-500/10 rounded-lg shadow-sm hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 relative">
      {/* Background blur elements - smaller & less intrusive */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl -z-10"></div>
      
      <CollapsibleTrigger asChild>
        <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-card/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 w-8 h-8 rounded-md bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center border border-blue-500/10 shadow-md shadow-blue-500/5">
              <BarChart className="h-4 w-4 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
              Problem Statistics
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-2">
              <Badge className="bg-green-500 border-0 text-white px-1.5 py-0.5 flex items-center justify-center h-6 w-6 rounded-full">
                {stats.statusCounts.solved || 0}
              </Badge>
              <Badge className="bg-blue-500 border-0 text-white px-1.5 py-0.5 flex items-center justify-center h-6 w-6 rounded-full">
                {stats.completionPercentage}%
              </Badge>
              <Badge className="bg-yellow-500 border-0 text-white px-1.5 py-0.5 flex items-center justify-center h-6 w-6 rounded-full">
                {stats.starredCount}
              </Badge>
            </div>
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
          </div>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="px-4 pb-4">
          {/* Summary Cards - more compact */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="bg-card/40 backdrop-blur-sm border border-primary/10 rounded-lg p-3 flex flex-col">
              <span className="text-xs font-medium text-muted-foreground flex items-center">
                <BookOpen className="h-3 w-3 mr-1 text-primary" />
                Total
              </span>
              <p className="text-2xl font-bold text-foreground">{stats.totalProblems}</p>
            </div>

            <div className="bg-card/40 backdrop-blur-sm border border-green-500/10 rounded-lg p-3 flex flex-col">
              <span className="text-xs font-medium text-muted-foreground flex items-center">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                Solved
              </span>
              <p className="text-2xl font-bold text-green-500">{stats.statusCounts.solved || 0}</p>
            </div>

            <div className="bg-card/40 backdrop-blur-sm border border-blue-500/10 rounded-lg p-3 flex flex-col">
              <span className="text-xs font-medium text-muted-foreground flex items-center">
                <PieChart className="h-3 w-3 mr-1 text-blue-500" />
                Completion
              </span>
              <p className="text-2xl font-bold text-blue-500">{stats.completionPercentage}%</p>
            </div>

            <div className="bg-card/40 backdrop-blur-sm border border-yellow-500/10 rounded-lg p-3 flex flex-col">
              <span className="text-xs font-medium text-muted-foreground flex items-center">
                <Star className="h-3 w-3 mr-1 text-yellow-500" />
                Starred
              </span>
              <p className="text-2xl font-bold text-yellow-500">{stats.starredCount}</p>
            </div>
          </div>

          {/* Progress & Difficulty - Combined for space efficiency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {/* Progress Bar - Simplified */}
            <div className="bg-card/40 backdrop-blur-sm border border-blue-500/10 rounded-lg p-3">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-blue-500" />
                  <span className="text-xs font-medium text-foreground">Overall Completion</span>
                </div>
                <Badge variant="outline" className="text-xs bg-blue-500/5 border-blue-500/20 text-blue-500">
                  {stats.completionPercentage}%
                </Badge>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500/80 to-blue-500 h-2 rounded-full"
                  style={{ width: `${stats.completionPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Difficulty Distribution - Simplified */}
            <div className="bg-card/40 backdrop-blur-sm border border-primary/10 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Award className="h-3 w-3 mr-1 text-primary" />
                <span className="text-xs font-medium text-foreground">Difficulty</span>
              </div>
              
              <div className="flex gap-2">
                {Object.entries(stats.difficultyCounts).map(([key, value]) => {
                  const total = stats.totalProblems;
                  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

                  const colors = {
                    easy: {
                      pill: "text-xs bg-green-500/10 border-green-500/20 text-green-500",
                      bar: "bg-gradient-to-r from-green-500/80 to-green-500",
                      badge: "bg-green-500/10 border-green-500/20 text-green-500"
                    },
                    medium: {
                      pill: "text-xs bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
                      bar: "bg-gradient-to-r from-yellow-500/80 to-yellow-500",
                      badge: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                    },
                    hard: {
                      pill: "text-xs bg-red-500/10 border-red-500/20 text-red-500",
                      bar: "bg-gradient-to-r from-red-500/80 to-red-500",
                      badge: "bg-red-500/10 border-red-500/20 text-red-500"
                    }
                  };
                  
                  return (
                    <div key={key} className="flex-1">
                      <div className="flex justify-between mb-1">
                        <Badge variant="outline" className={colors[key].pill}>{key}</Badge>
                        <span className="text-xs text-muted-foreground">{percent}%</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-1.5">
                        <div
                          className={`${colors[key].bar} h-1.5 rounded-full transition-all duration-300`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Charts Toggle */}
          <div className="flex justify-end mb-2">
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              size="sm"
              className="text-xs bg-card/40 backdrop-blur-sm border-blue-500/10 hover:border-blue-500/30 hover:shadow-sm hover:shadow-blue-500/5"
            >
              {showDetails ? (
                <>
                  <EyeOff className="mr-1 h-3 w-3" />
                  Hide Charts
                </>
              ) : (
                <>
                  <Eye className="mr-1 h-3 w-3" />
                  Show Charts
                </>
              )}
            </Button>
          </div>

          {/* Detailed charts - if expanded */}
          {showDetails && (
            <div className="grid grid-cols-2 gap-3">
              {/* Status Distribution Chart */}
              <div className="bg-card/40 backdrop-blur-sm border border-primary/10 rounded-lg p-2">
                <div className="flex items-center mb-1">
                  <CheckCircle className="h-3 w-3 mr-1 text-primary" />
                  <span className="text-xs font-medium text-foreground">Status</span>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {stats.statusData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS.status[entry.name] || "#6b7280"}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, "Problems"]} />
                      <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Difficulty Distribution Chart */}
              <div className="bg-card/40 backdrop-blur-sm border border-blue-500/10 rounded-lg p-2">
                <div className="flex items-center mb-1">
                  <Award className="h-3 w-3 mr-1 text-blue-500" />
                  <span className="text-xs font-medium text-foreground">Difficulty</span>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.difficultyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {stats.difficultyData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS.difficulty[entry.name] || "#6b7280"}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, "Problems"]} />
                      <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Platform Distribution Chart */}
              <div className="bg-card/40 backdrop-blur-sm border border-violet-500/10 rounded-lg p-2">
                <div className="flex items-center mb-1">
                  <Globe className="h-3 w-3 mr-1 text-violet-500" />
                  <span className="text-xs font-medium text-foreground">Platform</span>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.websiteData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {stats.websiteData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS.website[entry.name] || "#6b7280"}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, "Problems"]} />
                      <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Tags Bar Chart */}
              <div className="bg-card/40 backdrop-blur-sm border border-green-500/10 rounded-lg p-2">
                <div className="flex items-center mb-1">
                  <Tag className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-xs font-medium text-foreground">Top Tags</span>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.topTags.slice(0, 5)} layout="vertical" margin={{right: 10}}>
                      <XAxis type="number" hide={true} />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={60}
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip formatter={(value) => [value, "Problems"]} />
                      <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ProblemStatistics;