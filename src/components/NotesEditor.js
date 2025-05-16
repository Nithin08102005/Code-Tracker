"use client";
import { useEffect, useState } from 'react';
import { FileText, X, Save, Archive, Clock, AlertCircle } from 'lucide-react';
import { updateNotes } from '@/auth/updateNotes';
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export default function NotesEditor({ isOpen, onClose, problem, setProblems, problems }) {
  const [notes, setNotes] = useState(problem.notes || '');
  const [editedNotes, setEditedNotes] = useState(problem.notes || '');
  
  const [charCount, setCharCount] = useState(problem.notes ? problem.notes.length : 0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Character limit for the notes
  const MAX_CHARS = 500;
  
  useEffect(() => {
    // Update character count when notes change
    setCharCount(editedNotes.length);
  }, [editedNotes]);

  const handleSave = async () => {
    if (editedNotes === notes) {
      toast("No changes", {
        description: "No changes were made to save.",
        variant: "default",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // Update the specific problem's notes in local state
      setNotes(editedNotes);

      setProblems((prevProblems) =>
        prevProblems.map((p) =>
          p.problem_id === problem.problem_id
            ? { ...p, notes: editedNotes }
            : p
        )
      );

      // Call Supabase function to update the notes in the database
      const response = await updateNotes(problem.problem_id, editedNotes);

      if (!response.success) {
        throw new Error(response.message);
      }

      // Set last saved time
    

      // Show success toast notification
      toast("Success", {
        description: "Notes updated successfully!",
        variant: "success",
      });

      // Don't close immediately to give user feedback
      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 800);
    } catch (error) {
      setIsLoading(false);
      toast("Error", {
        description: error.message || "Something went wrong while updating notes.",
        variant: "destructive",
      });
    }
  };

  const formatCharCount = () => {
    const percentage = (charCount / MAX_CHARS) * 100;
    return {
      text: `${charCount}/${MAX_CHARS}`,
      color: percentage > 90 ? 'text-red-500' : percentage > 70 ? 'text-amber-500' : 'text-green-500'
    };
  };

  return (
    <div>
      {/* Notes Icon Button with animation */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={() => onClose()}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="View and edit notes"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="h-5 w-5 text-primary-500 dark:text-primary-400" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="top">
      <p className="text-xs">Add Notes</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Modal Backdrop with animation */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          {/* Modal Content with animation */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-150 mx-4 overflow-hidden border border-gray-200 dark:border-gray-700 "
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
              <div className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-primary-500 dark:text-primary-400" />
                <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">Problem Notes</h3>
              </div>
              <motion.button
                onClick={() => onClose()}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </motion.button>
            </div>
            
            {/* Problem title preview if available */}
            {problem.name && (
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Problem: <span className="text-primary-600 dark:text-primary-400">{problem.name}</span>
                </p>
              </div>
            )}
            
            <div className="p-4">
              <div className="relative">
                <textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="w-full min-h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-lg
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                             shadow-inner transition-all duration-200 h-70"
                  placeholder="Add your notes, insights, and solutions here..."
                  maxLength={MAX_CHARS}
                />
                
                {/* Character counter */}
                <div className="absolute bottom-2 right-3">
                  <span className={`text-xs font-medium ${formatCharCount().color}`}>
                    {formatCharCount().text}
                  </span>
                </div>
              </div>
              
              {/* Last saved indicator */}
             
            </div>
            
            <div className="flex justify-between items-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              {/* Tip */}
              <div className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-primary-500 dark:text-primary-400" />
                <p className="text-xs text-gray-600 dark:text-gray-400">Tips are saved automatically</p>
              </div>
              
              <div className="flex gap-2">
                <motion.button
                  onClick={() => onClose()}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                            text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                            transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  disabled={isLoading}
                  className={`px-4 py-2 bg-primary-500 text-white rounded-md flex items-center gap-1
                              hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500
                              shadow-md hover:shadow-lg transition-all duration-200
                              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                 {isLoading ? (
  <>
    <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin mr-1" />
    <span className="text-foreground">Saving...</span>
  </>
) : (
  <>
    <Save className="h-4 w-4 mr-1 text-foreground" />
    <span className="text-foreground">Save</span>
  </>
)}

                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}