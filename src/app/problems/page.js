"use client";
import { CodeChefIcon, CodeforcesIcon, LeetcodeIcon } from "@/components/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProblems } from "@/auth/get-problems";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import ProblemStatistics from "@/components/problemStatistics";
import { updateProblem } from "@/auth/update-problem";
import { getTags } from "@/auth/getTags";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible";
import { BookOpen, Tag, Plus, ChevronDown } from "lucide-react";
import { updateProblemTags } from "@/auth/update-tags";
import { deleteProblem } from "@/auth/deleteProblem"; // Import the delete function
import { set } from "date-fns";
import { PencilIcon, Tag as TagIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import {
  Check,
  Filter,
  Sparkles,
  Bookmark,
  Tags,
  X,
  Trophy,
  Star,
  Search,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import AddProblemModal from "@/components/AddProblem"; // Import the modal component
import NotesEditor from "@/components/NotesEditor";
function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [allTags, setAllTags] = useState([]); // State to hold all tags
  // Track which cell is currently being edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  // Add this near your other state declarations
  const [filters, setFilters] = useState({
    difficulty: "all",
    status: "all",
    website: "all",
    starred: "all",
    tags: [], // Array of selected tag IDs instead of single tag
    searchTerm: "",
  });
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleModal2 = () => setIsModalOpen2(!isModalOpen2);

  const toggleTag = (tagId) => {
    if (filters.tags.includes(tagId)) {
      setFilters({
        ...filters,
        tags: filters.tags.filter((id) => id !== tagId),
      });
    } else {
      setFilters({
        ...filters,
        tags: [...filters.tags, tagId],
      });
    }
  };
  const removeTag = (tagId) => {
    setFilters({
      ...filters,
      tags: filters.tags.filter((id) => id !== tagId),
    });
  };

  // Find tag name by id
  const getTagName = (tagId) => {
    const tag = allTags.find((tag) => tag.tag_id === tagId);
    return tag ? tag.name : "";
  };
  const resetAllFilters = () => {
    setFilters({
      difficulty: "all",
      status: "all",
      website: "all",
      starred: "all",
      tags: [],
      searchTerm: "",
    });
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTagDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleOpenModal = (problem) => {
    setCurrentProblem(problem); // Set the clicked problem as the current problem
    setIsModalOpen2(true); // Open the modal
  };
  const [loadingProblems, setLoadingProblems] = useState({});

  const [editingCell, setEditingCell] = useState({
    problemId: null,
    column: null,
  });

  useEffect(() => {
    const fetchProblems = async () => {
      const { data, error } = await getProblems();

      if (error) {
        toast("Error", {
          description:
            error.message || "Something went wrong while fetching problems.",
          variant: "destructive",
        });
        return;
      }
      // console.log("Problems fetched:", data);
      setProblems(data);
    };

    fetchProblems();
    const fetchTags = async () => {
      const { realTags, error } = await getTags();
      if (error) {
        toast("Error", {
          description:
            error.message || "Something went wrong while fetching problems.",
          variant: "destructive",
        });
        return;
      }
      // console.log("Tags fetched:", realTags);
      setAllTags(realTags);
    };
    fetchTags();
  }, []);

  const toggleShowTags = () => {
    setShowTags(!showTags);
  };

  const renderWebsiteIcon = (website) => {
    const websiteLower = website.toLowerCase();
    if (websiteLower.includes("leetcode")) {
      return <LeetcodeIcon className="w-5 h-5 text-yellow-500" />;
    } else if (websiteLower.includes("codeforces")) {
      return <CodeforcesIcon className="w-5 h-5 text-blue-500" />;
    } else if (websiteLower.includes("codechef")) {
      return <CodeChefIcon className="w-5 h-5 text-purple-500" />;
    }
    return <span className="text-xs">{website}</span>;
  };

  const getDifficultyClass = (difficulty) => {
    const base = "px-2 py-1 rounded-full text-xs font-medium";
    switch (difficulty.toLowerCase()) {
      case "easy":
        return `${base} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
      case "medium":
        return `${base} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400`;
      case "hard":
        return `${base} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`;
      default:
        return `${base} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400`;
    }
  };

  const getStatusClass = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase().replace(" ", "_")) {
      case "solved":
        return `${base} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`;
      case "attempted":
        return `${base} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400`;
      case "not_started":
        return `${base} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400`;
      default:
        return `${base} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400`;
    }
  };

  // Handle starting to edit a cell
  const handleEditCell = (problemId, column) => {
    setEditingCell({ problemId, column });
  };

  // Handle saving changes
  const handleSaveEdit = async (problemId, column, value) => {
    try {
      // Create a copy of the problems array for optimistic updates
      if (column === "tags") {
        let x;
        const updatedProblems = problems.map((problem) => {
          if (problem.problem_id === problemId) {
            const tagsWithIds = value.map((tagName) => {
              const tag = allTags.find((t) => t.name === tagName);
              return { tag_id: tag?.tag_id || null, name: tagName }; // Ensure both tag_id and name are included
            });
            x = tagsWithIds.map((tag) => tag.tag_id);
            return { ...problem, [column]: tagsWithIds };
          }
          return problem;
        });
        const response = await updateProblemTags(problemId, x);
        setProblems(updatedProblems);
      } else {
        const updatedProblems = problems.map((problem) => {
          if (problem.problem_id === problemId) {
            return { ...problem, [column]: value };
          }
          return problem;
        });
        const response = await updateProblem(problemId, column, value);
        setProblems(updatedProblems);
      }

      // Update state (optimistic update)

      // Clear editing state
      setEditingCell({ problemId: null, column: null });

      // Send update to the backend

      // No errors, show success message
      toast("Updated", {
        description: `Successfully updated ${column}`,
      });
    } catch (error) {
      // Consolidate backend errors and unexpected errors into one toast
      const errorMessage = error.message || "An unexpected error occurred.";
      toast("Error", {
        description: `Failed to update: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setEditingCell({ problemId: null, column: null });
  };

  // Render editable cell for website/source
  const renderEditableSource = (problem) => {
    const isEditing =
      editingCell.problemId === problem.problem_id &&
      editingCell.column === "website";

    if (isEditing) {
      return (
        <Input
          type="text"
          className="w-full h-8 text-center text-sm bg-background border-primary/30 focus-visible:ring-primary/20"
          defaultValue={problem.website}
          autoFocus
          onBlur={(e) =>
            handleSaveEdit(problem.problem_id, "website", e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSaveEdit(problem.problem_id, "website", e.target.value);
            } else if (e.key === "Escape") {
              handleCancelEdit();
            }
          }}
        />
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="flex justify-center items-center group relative cursor-pointer p-2 rounded-md hover:bg-primary/5 transition-colors"
              onClick={() => handleEditCell(problem.problem_id, "website")}
            >
              {renderWebsiteIcon(problem.website)}
              <span className="ml-2 text-sm text-muted-foreground">
                {problem.website}
              </span>
              <span className="absolute right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <PencilIcon className="h-3.5 w-3.5 text-primary" />
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Edit source</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const EditableTagsCell = ({
    problem,
    editingCell,
    handleEditCell,
    handleSaveEdit,
    handleCancelEdit,
    allTags,
  }) => {
    const isEditing =
      editingCell.problemId === problem.problem_id &&
      editingCell.column === "tags";

    const [open, setOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
      if (isEditing) {
        setOpen(true);
        setSelectedTags(problem.tags.map((tag) => tag.name));
      } else {
        setOpen(false);
      }
    }, [isEditing, problem.tags]);

    const toggleTag = (tagName) => {
      setSelectedTags((current) => {
        if (current.includes(tagName)) {
          return current.filter((name) => name !== tagName);
        } else {
          return [...current, tagName];
        }
      });
    };

    const saveChanges = () => {
      handleSaveEdit(problem.problem_id, "tags", selectedTags);
      setOpen(false);
    };

    if (isEditing) {
      return (
        <div className="w-full p-1">
          <Popover
            open={open}
            onOpenChange={(newOpen) => {
              setOpen(newOpen);
              if (!newOpen) handleCancelEdit();
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between bg-background border-primary/30 text-sm"
              >
                {selectedTags.length > 0
                  ? `${selectedTags.length} tag${
                      selectedTags.length !== 1 ? "s" : ""
                    } selected`
                  : "Select tags..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command className="w-full">
                <CommandInput
                  placeholder="Search tags..."
                  className="h-9"
                  autoFocus
                />
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {allTags.map((tag) => (
                    <CommandItem
                      key={tag.tag_id}
                      value={tag.name}
                      onSelect={() => toggleTag(tag.name)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTags.includes(tag.name)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {tag.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
              <div className="flex items-center justify-between p-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCancelEdit()}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  onClick={saveChanges}
                >
                  Save
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="flex flex-wrap gap-1.5 group relative cursor-pointer p-2 rounded-md hover:bg-primary/5 transition-colors"
              onClick={() => handleEditCell(problem.problem_id, "tags")}
            >
              {problem.tags.length > 0 ? (
                problem.tags.map((tag) => (
                  <span
                    key={tag.tag_id}
                    className="inline-flex items-center rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 text-xs font-medium"
                  >
                    {tag.name}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No tags</p>
              )}
              <span className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <PencilIcon className="h-3.5 w-3.5 text-primary" />
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">
              {problem.tags.length > 0 ? "Edit tags" : "Add Tags"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // The render function that uses the component
  const renderEditableTags = (problem) => {
    return (
      <EditableTagsCell
        problem={problem}
        editingCell={editingCell}
        handleEditCell={handleEditCell}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        allTags={allTags}
      />
    );
  };

  // Render editable cell for difficulty
  const renderEditableDifficulty = (problem) => {
    const isEditing =
      editingCell.problemId === problem.problem_id &&
      editingCell.column === "difficulty";

    if (isEditing) {
      return (
        <select
          className="w-full p-2 rounded-md text-sm bg-background text-foreground border border-input focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-colors"
          defaultValue={problem.difficulty.toLowerCase()}
          autoFocus
          onBlur={(e) =>
            handleSaveEdit(problem.problem_id, "difficulty", e.target.value)
          }
          onChange={(e) =>
            handleSaveEdit(problem.problem_id, "difficulty", e.target.value)
          }
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="group relative cursor-pointer p-1 rounded-md hover:bg-primary/5 transition-colors flex items-center"
              onClick={() => handleEditCell(problem.problem_id, "difficulty")}
            >
              <span className={getDifficultyClass(problem.difficulty)}>
                {problem.difficulty}
              </span>
              <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-primary/70"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Edit Difficulty</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Render editable cell for status
  const renderEditableStatus = (problem) => {
    const isEditing =
      editingCell.problemId === problem.problem_id &&
      editingCell.column === "status";

    if (isEditing) {
      return (
        <select
          className="w-full p-2 rounded-md text-sm bg-background text-foreground border border-input focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:outline-none transition-colors"
          defaultValue={problem.status.toLowerCase().replace(" ", "_")}
          autoFocus
          onBlur={(e) =>
            handleSaveEdit(problem.problem_id, "status", e.target.value)
          }
          onChange={(e) =>
            handleSaveEdit(problem.problem_id, "status", e.target.value)
          }
        >
          <option value="solved">Solved</option>
          <option value="attempted">Attempted</option>
          <option value="not_started">Not Started</option>
        </select>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="group relative cursor-pointer p-1 rounded-md hover:bg-violet-500/5 transition-colors flex items-center"
              onClick={() => handleEditCell(problem.problem_id, "status")}
            >
              <span className={getStatusClass(problem.status)}>
                {problem.status.replace("_", " ")}
              </span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-violet-500/70"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Edit Status</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Render editable cell for time complexity
  const renderEditableTimeComplexity = (problem) => {
    const isEditing =
      editingCell.problemId === problem.problem_id &&
      editingCell.column === "time_complexity";

    if (isEditing) {
      return (
        <input
          type="text"
          className="w-full p-2 rounded-md text-sm font-mono bg-background text-foreground border border-input focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-colors"
          defaultValue={problem.time_complexity || "O(?)"}
          placeholder="O(?)"
          autoFocus
          onBlur={(e) =>
            handleSaveEdit(
              problem.problem_id,
              "time_complexity",
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSaveEdit(
                problem.problem_id,
                "time_complexity",
                e.target.value
              );
            } else if (e.key === "Escape") {
              handleCancelEdit();
            }
          }}
        />
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="group relative cursor-pointer p-1 rounded-md hover:bg-blue-500/5 transition-colors flex items-center font-mono"
              onClick={() =>
                handleEditCell(problem.problem_id, "time_complexity")
              }
            >
              <span>{problem.time_complexity || "O(?)"}</span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-500/70"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Time Complexity</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  // Render editable cell for space complexity
  const renderEditableSpaceComplexity = (problem) => {
    const isEditing =
      editingCell.problemId === problem.problem_id &&
      editingCell.column === "space_complexity";

    if (isEditing) {
      return (
        <input
          type="text"
          className="w-full p-2 rounded-md text-sm font-mono bg-background text-foreground border border-input focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-colors"
          defaultValue={problem.space_complexity || "O(?)"}
          placeholder="O(?)"
          autoFocus
          onBlur={(e) =>
            handleSaveEdit(
              problem.problem_id,
              "space_complexity",
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSaveEdit(
                problem.problem_id,
                "space_complexity",
                e.target.value
              );
            } else if (e.key === "Escape") {
              handleCancelEdit();
            }
          }}
        />
      );
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="group relative cursor-pointer p-1 rounded-md hover:bg-blue-500/5 transition-colors flex items-center font-mono"
              onClick={() =>
                handleEditCell(problem.problem_id, "space_complexity")
              }
            >
              <span>{problem.space_complexity || "O(?)"}</span>
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-500/70"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Space Complexity</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Render editable starred cell
  const renderEditableStarred = (problem) => {
    return (
      <div
        className="text-center cursor-pointer"
        onClick={() =>
          handleSaveEdit(problem.problem_id, "is_starred", !problem.is_starred)
        }
      >
        <span
          className={`text-xl ${
            problem.is_starred ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          {problem.is_starred ? "★" : "☆"}
        </span>
      </div>
    );
  };
  const deleteProblem2 = async (problemId) => {
    try {
      // Remove problem from database/backend
      setLoadingProblems((prevState) => ({
        ...prevState,
        [problemId]: true, // Set loading state for the specific problem
      }));
      await deleteProblem(problemId); // Define this API function to delete from your backend

      // Update the local state
      setProblems((prevProblems) =>
        prevProblems.filter((problem) => problem.problem_id !== problemId)
      );

      toast("Deleted", { description: "Problem successfully deleted!" });
    } catch (error) {
      toast("Error", {
        description: `Failed to delete problem: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoadingProblems((prevState) => ({
        ...prevState,
        [problemId]: false,
      })); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        {/* Page Header with gradient text like main page */}
        <div className="flex items-center gap-2">
          <div className="p-2 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center border border-blue-500/10 shadow-lg shadow-blue-500/5">
            <BookOpen className="h-5 w-5 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
            Problem List
          </h1>
        </div>

        {/* Button Group with styling similar to cards */}
        <div className="flex gap-3">
          <Button
            onClick={toggleShowTags}
            variant="default"
            className="group bg-gradient-to-r from-blue-500/80 to-blue-500 hover:from-blue-500 hover:to-blue-500/90 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-500/10"
          >
            <Tag className="mr-2 h-4 w-4" />
            {showTags ? "Hide Tags" : "Show Tags"}
          </Button>

          <Button
            onClick={toggleModal}
            variant="default"
            className="group bg-gradient-to-r from-violet-500/80 to-violet-500 hover:from-violet-500 hover:to-violet-500/90 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-violet-500/10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Problem
          </Button>
        </div>
      </div>
      <ProblemStatistics problems={problems} filters={filters} />
      <div className="relative mb-8">
        {/* Animated Background Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl -z-10"></div>

        <Collapsible className="mb-6 bg-card/30 backdrop-blur-sm border border-primary/10 rounded-lg shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 relative">
      {/* Background blur elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
      
      <CollapsibleTrigger asChild>
        <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-card/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 w-8 h-8 rounded-md bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/10 shadow-md shadow-primary/5">
              <Filter className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Problem Filters
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
              <Sparkles className="h-3 w-3 mr-1" />
              Customize
            </Badge>
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
          </div>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="px-4 pb-4">
          {/* Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Difficulty filter */}
            <div className="group">
              <label
                htmlFor="difficultyFilter"
                className="flex items-center text-sm font-medium mb-1.5 group-hover:text-primary transition-colors"
              >
                <Trophy className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
                Difficulty
              </label>
              <div className="relative">
                <select
                  id="difficultyFilter"
                  className="w-full p-2 pl-3 border rounded-md bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all"
                  value={filters.difficulty}
                  onChange={(e) => {
                    setFilters({ ...filters, difficulty: e.target.value });
                  }}
                >
                  <option value="all">All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Status filter */}
            <div className="group">
              <label
                htmlFor="statusFilter"
                className="flex items-center text-sm font-medium mb-1.5 group-hover:text-violet-500 transition-colors"
              >
                <Check className="h-3.5 w-3.5 mr-1.5 text-violet-500/70" />
                Status
              </label>
              <div className="relative">
                <select
                  id="statusFilter"
                  className="w-full p-2 pl-3 border rounded-md bg-background text-foreground focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 outline-none transition-all"
                  value={filters.status}
                  onChange={(e) => {
                    setFilters({ ...filters, status: e.target.value });
                  }}
                >
                  <option value="all">All</option>
                  <option value="solved">Solved</option>
                  <option value="attempted">Attempted</option>
                  <option value="not_started">Not Started</option>
                </select>
              </div>
            </div>

            {/* Website filter */}
            <div className="group">
              <label
                htmlFor="websiteFilter"
                className="flex items-center text-sm font-medium mb-1.5 group-hover:text-blue-500 transition-colors"
              >
                <Bookmark className="h-3.5 w-3.5 mr-1.5 text-blue-500/70" />
                Platform
              </label>
              <div className="relative">
                <select
                  id="websiteFilter"
                  className="w-full p-2 pl-3 border rounded-md bg-background text-foreground focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all"
                  value={filters.website}
                  onChange={(e) => {
                    setFilters({ ...filters, website: e.target.value });
                  }}
                >
                  <option value="all">All</option>
                  <option value="leetcode">LeetCode</option>
                  <option value="codeforces">CodeForces</option>
                  <option value="codechef">CodeChef</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Starred filter */}
            <div className="group">
              <label
                htmlFor="starredFilter"
                className="flex items-center text-sm font-medium mb-1.5 group-hover:text-amber-500 transition-colors"
              >
                <Star className="h-3.5 w-3.5 mr-1.5 text-amber-500/70" />
                Starred
              </label>
              <div className="relative">
                <select
                  id="starredFilter"
                  className="w-full p-2 pl-3 border rounded-md bg-background text-foreground focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 outline-none transition-all"
                  value={filters.starred}
                  onChange={(e) => {
                    setFilters({ ...filters, starred: e.target.value });
                  }}
                >
                  <option value="all">All</option>
                  <option value="starred">Starred</option>
                  <option value="not_starred">Not Starred</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tag filter and Search row */}
          <div className="space-y-6 overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-visible">
              {/* Multi-select Tag filter */}
              <div className="group overflow-visible">
                <label className="flex items-center text-sm font-medium mb-1.5 group-hover:text-emerald-500 transition-colors">
                  <Tags className="h-3.5 w-3.5 mr-1.5 text-emerald-500/70" />
                  Filter by Tags
                </label>

                <div className="relative overflow-visible" ref={dropdownRef}>
                  {/* Tag selector dropdown */}
                  <div
                    className="w-full p-2 pl-3 border rounded-md bg-background text-foreground cursor-pointer flex items-center justify-between hover:border-emerald-500 transition-all"
                    onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
                  >
                    <span
                      className={`${
                        filters.tags.length === 0
                          ? "text-muted-foreground"
                          : ""
                      }`}
                    >
                      {filters.tags.length > 0
                        ? `${filters.tags.length} tag${
                            filters.tags.length > 1 ? "s" : ""
                          } selected`
                        : "Select tags..."}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>

                  {tagDropdownOpen && (
                    <div
                      className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg"
                      style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        overflowX: "hidden",
                      }}
                    >
                      <div className="p-2 border-b flex items-center sticky top-0 bg-background z-10">
                        <button
                          className="text-xs text-blue-500 hover:text-blue-700 mr-auto"
                          onClick={() => setFilters({ ...filters, tags: [] })}
                        >
                          Clear selection
                        </button>
                        <button
                          className="text-xs text-blue-500 hover:text-blue-700"
                          onClick={() =>
                            setFilters({
                              ...filters,
                              tags: allTags.map((t) => t.tag_id),
                            })
                          }
                        >
                          Select all
                        </button>
                      </div>
                      <div className="py-1">
                        {allTags.map((tag) => (
                          <div
                            key={tag.tag_id}
                            className={`px-3 py-2 cursor-pointer hover:bg-muted flex items-center justify-between ${
                              filters.tags.includes(tag.tag_id)
                                ? "bg-emerald-50 dark:bg-emerald-900/20"
                                : ""
                            }`}
                            onClick={() => toggleTag(tag.tag_id)}
                          >
                            <span className="truncate mr-2">{tag.name}</span>
                            {filters.tags.includes(tag.tag_id) && (
                              <Check className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected tags display */}
                {filters.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {filters.tags.map((tagId) => (
                      <div
                        key={tagId}
                        className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 text-xs rounded-full px-2.5 py-1 flex items-center gap-1 group/tag"
                      >
                        {getTagName(tagId)}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTag(tagId);
                          }}
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {filters.tags.length < allTags.length && (
                      <button
                        onClick={() => setTagDropdownOpen(true)}
                        className="bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 text-xs rounded-full px-2.5 py-1 flex items-center gap-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        Add tag
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Search by problem name */}
              <div className="group">
                <label
                  htmlFor="searchInput"
                  className="flex items-center text-sm font-medium mb-1.5 group-hover:text-purple-500 transition-colors"
                >
                  <Search className="h-3.5 w-3.5 mr-1.5 text-purple-500/70" />
                  Search by Problem Name
                </label>
                <div className="relative">
                  <input
                    id="searchInput"
                    type="text"
                    placeholder="Search problems..."
                    className="w-full p-2 pl-8 border rounded-md bg-background text-foreground focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 outline-none transition-all"
                    value={filters.searchTerm}
                    onChange={(e) => {
                      setFilters({ ...filters, searchTerm: e.target.value });
                    }}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <Search className="w-4 h-4 text-muted-foreground" />
                  </div>
                  {filters.searchTerm && (
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        setFilters({ ...filters, searchTerm: "" })
                      }
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Reset button */}
            <div className="flex justify-center mt-10 mb-5">
              <button
                onClick={resetAllFilters}
                className="bg-gradient-to-r from-gray-500/80 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white flex items-center gap-2 px-5 py-2 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <RefreshCw className="h-4 w-4" /> Reset All Filters
              </button>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
      </div>
      {/* Table */}
      <div className="rounded-lg border  bg-white shadow-md dark:bg-gray-900 dark:border-gray-800 mt-20">
        <Table>
          <TableCaption className="text-gray-500 dark:text-gray-400">
            A list of your competitive programming problems with relevant
            details
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4 text-left text-lg font-semibold">
                Problem
              </TableHead>
              <TableHead className="w-50 text-center text-lg font-semibold">
                Source
              </TableHead>
              <TableHead className="text-lg font-semibold">
                Difficulty
              </TableHead>
              <TableHead className="text-lg font-semibold">Status</TableHead>
              <TableHead className="text-lg font-semibold">Time</TableHead>
              <TableHead className="text-lg font-semibold">Space</TableHead>
              <TableHead className="text-lg font-semibold">Notes</TableHead>
              <TableHead className="text-lg mt-10 font-semibold">
                Starred
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.length > 0 ? (
              problems
                .filter((problem) => {
                  // Apply difficulty filter
                  if (
                    filters.difficulty !== "all" &&
                    problem.difficulty.toLowerCase() !== filters.difficulty
                  ) {
                    return false;
                  }

                  // Apply status filter
                  if (
                    filters.status !== "all" &&
                    problem.status.toLowerCase().replace(" ", "_") !==
                      filters.status
                  ) {
                    return false;
                  }

                  // Apply website filter
                  if (filters.website !== "all") {
                    if (filters.website === "other") {
                      // For "other", show if not in the main three platforms
                      if (
                        problem.website.toLowerCase().includes("leetcode") ||
                        problem.website.toLowerCase().includes("codeforces") ||
                        problem.website.toLowerCase().includes("codechef")
                      ) {
                        return false;
                      }
                    } else if (
                      !problem.website.toLowerCase().includes(filters.website)
                    ) {
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
                  if (filters.tags.length > 0) {
                    // Check if problem has ALL of the selected tags
                    const hasAllSelectedTags = filters.tags.every(
                      (selectedTagId) =>
                        problem.tags.some(
                          (problemTag) => problemTag.tag_id === selectedTagId
                        )
                    );
                    if (!hasAllSelectedTags) {
                      return false;
                    }
                  }

                  // Apply name search
                  if (filters.searchTerm) {
                    if (
                      !problem.name
                        .toLowerCase()
                        .includes(filters.searchTerm.toLowerCase())
                    ) {
                      return false;
                    }
                  }

                  return true;
                })
                .map((problem) => (
                  <TableRow key={problem.problem_id}>
                    {/* Problem Name and Tags */}
                    <TableCell className="align-top">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                          <a
                            href={problem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:underline transition-colors"
                          >
                            {problem.name}
                          </a>
                        </div>
                        {showTags &&
                          problem.tags &&
                          renderEditableTags(problem)}
                      </div>
                    </TableCell>

                    {/* Website Icon - Editable */}
                    <TableCell className="text-center">
                      {renderEditableSource(problem)}
                    </TableCell>

                    {/* Difficulty - Editable */}
                    <TableCell>{renderEditableDifficulty(problem)}</TableCell>

                    {/* Status - Editable */}
                    <TableCell>{renderEditableStatus(problem)}</TableCell>

                    {/* Time Complexity - Editable */}
                    <TableCell className="text-sm">
                      {renderEditableTimeComplexity(problem)}
                    </TableCell>

                    {/* Space Complexity - Editable */}
                    <TableCell className="text-sm">
                      {renderEditableSpaceComplexity(problem)}
                    </TableCell>

                    {/* Notes - Not editable for now */}
                    <TableCell>
                      <NotesEditor
                        isOpen={isModalOpen2}
                        onClose={toggleModal2}
                        problem={problem}
                        setProblems={setProblems}
                        problems={problems}
                      />
                    </TableCell>

                    {/* Starred - Click to toggle */}
                    <TableCell>{renderEditableStarred(problem)}</TableCell>
                    {/* Delete Button */}
                    <TableCell>
                      {loadingProblems[problem.problem_id] ? (
                        <button
                          disabled
                          className="bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm font-medium opacity-70 cursor-not-allowed"
                        >
                          Deleting...
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete "${problem.name}"?`
                              )
                            ) {
                              deleteProblem2(problem.problem_id);
                            }
                          }}
                          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan="8" className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mb-2 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg font-medium">No problems found</p>
                    <p className="text-sm mt-1">
                      Start by adding some problems to your list
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AddProblemModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        setProblems={setProblems} // Pass setProblems
        problems={problems} // Pass problems
        AllTags={allTags} // Pass allTags to the modal
      />
    </div>
  );
}

export default ProblemsPage;
// this is for
