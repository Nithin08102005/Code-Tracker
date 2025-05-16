"use client";
import { toast } from "sonner"; // Sonner for toast notifications
import { Loader2 } from "lucide-react"; // Loader spinner
import { useState } from "react";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";
import { logOutAction } from "@/auth/actions";
export  function LogOutButton() {
    const [loading, setLoading] = useState(false); // To manage loading state
    const router = useRouter();
    async function handleLogOut() {
        setLoading(true); // Show loading spinner
        try {
          // Call the server-side logOutAction function
          const response = await logOutAction();
    
          if (response.errorMessage) {
            // Show error toast if logout fails
            toast("Error", {
              description: response.errorMessage,
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
          } else {
            // Show success toast if logout succeeds
            toast("Success", {
              description: "Logged out successfully!",
              unstyled: true,
              classNames: {
                toast: "bg-green-600", // Green background for success
                title: "text-white font-bold text-xl", // Bold white title
                description: "text-white text-sm", // White description
                actionButton: "bg-green-500 hover:bg-green-400", // Styled action button
                closeButton: "bg-green-400 hover:bg-green-300", // Close button styling
              },
            });
    
            // Redirect to login page after logout
            router.replace("/");
          }
        } catch (err) {
          // Handle unexpected errors and show an error toast
          toast("Unexpected Error", {
            description: "An unexpected error occurred. Please try again later.",
            unstyled: true,
            classNames: {
              toast: "bg-red-600", // Red background for unexpected errors
              title: "text-white font-bold text-xl", // Bold white title
              description: "text-white text-sm", // White description
              actionButton: "bg-red-500 hover:bg-red-400", // Styled action button
              closeButton: "bg-red-400 hover:bg-red-300", // Close button styling
            },
            variant: "destructive",
          });
          console.error("Unexpected Error:", err);
        } finally {
          setLoading(false); // Hide loading spinner
        }
      }
    
    return (
        <Button
  onClick={handleLogOut}
  disabled={loading} // Disable button while loading
  className={`flex items-center justify-center px-4 py-2 w-20 rounded 
    bg-gray-800 text-white border border-gray-800 hover:border-gray-500
    dark:bg-gray-700 dark:text-white dark:border-white dark:hover:border-gray-400 
    ${loading ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
>
  {loading ? (
    <Loader2 className="mr-2 h-4 w-20 animate-spin" /> // Show loader during logout
  ) : (
    "LogOut"
  )}
</Button>

    );
}