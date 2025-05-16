"use client";
import { useState } from 'react';
import { 
  Check, X, Bold, Italic, Underline, Strikethrough, 
  List, ListOrdered, BookOpen, Zap, Tag, Clock,
  Code, AlertTriangle, CheckCircle, FileCode, BarChart2
} from 'lucide-react';
import { addProblem } from '@/auth/addProblem';
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AddProblemModal = ({isOpen, onClose, AllTags, setProblems, problems}) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    websiteName: '',
    tags: [],
    difficulty: 'easy',
    status: 'unsolved',
    timeComplexity: '',
    spaceComplexity: '',
    starred: false,
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notesLength, setNotesLength] = useState(0);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'tags') {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setFormData({ ...formData, tags: selectedOptions });
    } else if (name === 'notes') {
      setNotesLength(value.length);
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };
  
  const HandleAddProblem = async () => {
    try {
      setIsSubmitting(true);
      if (!formData) throw new Error("Form data is missing.");
  
      // Map tag names to tag IDs
      const tagIds = formData.tags.map((tagName) => {
        const tag = AllTags.find((t) => t.name === tagName);
        if (!tag) throw new Error(`Tag not found for name: ${tagName}`);
        return tag.tag_id;
      });
  
      const problemData = {
        name: formData.name, 
        url: formData.url,
        website: formData.websiteName, 
        difficulty: formData.difficulty,
        timeComplexity: formData.timeComplexity,
        spaceComplexity: formData.spaceComplexity,
        status: formData.status === "unsolved" ? "not_started" : formData.status,
        tags: tagIds,
        is_starred: formData.starred,
        notes: formData.notes,
      };
  
      const response = await addProblem(problemData);
      setProblems((prevProblems) => [...prevProblems, response[0]]);
  
      toast.success("Problem added successfully!", {
        description: `${formData.name} has been added to your problem library.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error in HandleAddProblem:", error.message);
      toast.error("Failed to add problem", { 
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    HandleAddProblem();
    setFormData({
      name: '',
      url: '',
      websiteName: '',
      tags: [],
      difficulty: 'easy',
      status: 'unsolved',
      timeComplexity: '',
      spaceComplexity: '',
      starred: false,
      notes: ''
    });
    setNotesLength(0);
    onClose();
  };
  
  // Difficulty badge color mapping
  const difficultyColors = {
    easy: "text-green-500 border-green-500/20 bg-green-500/5",
    medium: "text-orange-500 border-orange-500/20 bg-orange-500/5",
    hard: "text-red-500 border-red-500/20 bg-red-500/5"
  };
  
  // Status icon mapping
  const statusIcons = {
    solved: <CheckCircle className="h-4 w-4 mr-2 text-green-500" />,
    attempted: <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />,
    unsolved: <FileCode className="h-4 w-4 mr-2 text-blue-500" />
  };
  
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Animated backdrop with blur effect */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-all duration-300"
            onClick={() => onClose()}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-card/95 text-card-foreground rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border animate-in fade-in-90 zoom-in-90 duration-200 ease-out">
            {/* Decorative elements inspired by main page */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-36 h-36 bg-violet-500/5 rounded-full blur-3xl"></div>
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-border relative z-10">
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center border border-blue-500/10 shadow-sm shadow-blue-500/5">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
                  Add New Problem
                </h2>
              </div>
              <Badge variant="outline" className="mr-8 py-1 px-3 bg-blue-500/10 text-blue-500 border-blue-500/20">
                <Zap className="h-3.5 w-3.5 mr-1" /> Problem Library
              </Badge>
              <button 
                onClick={() => onClose()}
                className="text-muted-foreground hover:text-foreground rounded-full p-1.5 hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Problem Name */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1.5 flex items-center">
                    <Code className="h-4 w-4 mr-1.5 text-primary" />
                    Problem Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-input bg-background/50 backdrop-blur-sm text-foreground rounded-lg focus:ring-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-offset-0 transition-all"
                    required
                    placeholder="e.g. Two Sum, Merge Intervals"
                  />
                </div>
                
                {/* Problem URL */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1.5 flex items-center">
                    <FileCode className="h-4 w-4 mr-1.5 text-violet-500" />
                    Problem URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://leetcode.com/problems/example"
                    className="w-full p-2.5 border border-input bg-background/50 backdrop-blur-sm text-foreground rounded-lg focus:ring-violet-500/30 focus:border-violet-500/60 focus:ring-2 focus:ring-offset-0 transition-all"
                  />
                </div>
                
                {/* Website Name */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1.5 flex items-center">
                    <BarChart2 className="h-4 w-4 mr-1.5 text-blue-500" />
                    Website Name
                  </label>
                  <input
                    type="text"
                    name="websiteName"
                    value={formData.websiteName}
                    onChange={handleInputChange}
                    placeholder="LeetCode, Codeforces, Codechef, etc."
                    className="w-full p-2.5 border border-input bg-background/50 backdrop-blur-sm text-foreground rounded-lg focus:ring-blue-500/30 focus:border-blue-500/60 focus:ring-2 focus:ring-offset-0 transition-all"
                  />
                </div>
                
                {/* Tags Selection */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1.5 flex items-center">
                    <Tag className="h-4 w-4 mr-1.5 text-emerald-500" />
                    Tags (Hold Ctrl/Cmd to select multiple)
                  </label>
                  <select
                    multiple
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-input bg-background/50 backdrop-blur-sm text-foreground rounded-lg focus:ring-emerald-500/30 focus:border-emerald-500/60 focus:ring-2 focus:ring-offset-0 transition-all h-32"
                  >
                    {AllTags.map((tag) => (
                      <option key={tag.tag_id} value={tag.name}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {formData.tags.slice(0, 3).map((tagName) => (
                        <Badge key={tagName} variant="outline" className="bg-emerald-500/5 text-emerald-500 border-emerald-500/20">
                          {tagName}
                        </Badge>
                      ))}
                      {formData.tags.length > 3 && (
                        <Badge variant="outline" className="bg-emerald-500/5 text-emerald-500 border-emerald-500/20">
                          +{formData.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1.5 text-yellow-500" />
                    Difficulty
                  </label>
                  <div className="relative">
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-input bg-background/50 backdrop-blur-sm text-foreground rounded-lg focus:ring-yellow-500/30 focus:border-yellow-500/60 focus:ring-2 focus:ring-offset-0 transition-all appearance-none pr-10"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <Badge variant="outline" className={`${difficultyColors[formData.difficulty]}`}>
                        {formData.difficulty.charAt(0).toUpperCase() + formData.difficulty.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1.5 text-green-500" />
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-input bg-background/50 backdrop-blur-sm text-foreground rounded-lg focus:ring-green-500/30 focus:border-green-500/60 focus:ring-2 focus:ring-offset-0 transition-all appearance-none pl-10"
                    >
                      <option value="solved">Solved</option>
                      <option value="attempted">Attempted</option>
                      <option value="unsolved">Unsolved</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none">
                      {statusIcons[formData.status]}
                    </div>
                  </div>
                </div>
                
                {/* Time Complexity */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 flex items-center">
                    <Clock className="h-4 w-4 mr-1.5 text-indigo-500" />
                    Time Complexity
                  </label>
                  <input
                    type="text"
                    name="timeComplexity"
                    value={formData.timeComplexity}
                    onChange={handleInputChange}
                    placeholder="O(n), O(n log n)"
                    className="w-full p-2.5 border border-input bg-background/50 backdrop-blur-sm text-foreground rounded-lg focus:ring-indigo-500/30 focus:border-indigo-500/60 focus:ring-2 focus:ring-offset-0 transition-all"
                  />
                </div>
                
                {/* Space Complexity */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 flex items-center">
                    <BarChart2 className="h-4 w-4 mr-1.5 text-fuchsia-500" />
                    Space Complexity
                  </label>
                  <input
                    type="text"
                    name="spaceComplexity"
                    value={formData.spaceComplexity}
                    onChange={handleInputChange}
                    placeholder="O(n), O(1)"
                    className="w-full p-2.5 border border-input bg-background/50 backdrop-blur-sm text-foreground rounded-lg focus:ring-fuchsia-500/30 focus:border-fuchsia-500/60 focus:ring-2 focus:ring-offset-0 transition-all"
                  />
                </div>
                
                {/* Starred */}
                <div className="flex items-center">
                  <div className="flex items-center space-x-2 bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10 hover:border-amber-500/20 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      id="starred"
                      name="starred"
                      checked={formData.starred}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-amber-500 border-input rounded focus:ring-amber-500"
                    />
                    <label htmlFor="starred" className="text-sm text-foreground flex items-center cursor-pointer">
                      <span className="mr-1.5">Mark as Starred</span>
                      {formData.starred && (
                        <span className="text-amber-500">
                          <Zap className="h-4 w-4" />
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                
                {/* Notes */}
                <div className="col-span-2 mt-4">
                  <label className="block text-sm font-medium mb-1.5 flex items-center">
                    <List className="h-4 w-4 mr-1.5 text-teal-500" />
                    Notes
                  </label>
                  <div className="border border-input rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm">
                    {/* Text formatting toolbar */}
                    
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Enter your approach, insights, or any additional notes about this problem..."
                      rows="5"
                      maxLength="2000"
                      className="w-full p-3 border-0 bg-transparent text-foreground focus:ring-0 focus:outline-none placeholder:text-muted-foreground h-50"
                    ></textarea>
                  </div>
                  <div className="text-right text-xs text-muted-foreground mt-1.5">
                    {notesLength}/500
                  </div>
                </div>
              </div>
              
              {/* Form Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => onClose()}
                  variant="outline"
                  className="border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-500/90 to-blue-500 hover:from-blue-500 hover:to-blue-500/90 text-white shadow-md hover:shadow-blue-500/20 transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </span>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Check className="mr-2 h-4 w-4" />
                      Save Problem
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProblemModal;