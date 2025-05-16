"use server";
import { createClient, getUser } from "./server";

export async function deleteProblem(problemId) {
  try {
    // Fetch the authenticated user
    const user = await getUser();

    // Initialize Supabase client
    const supabase = await createClient();
    //    console.log("called");
    // Perform deletion in the 'problems' table
    const { error } = await supabase
      .from("problems")
      .delete()
      .eq("problem_id", problemId)
      .eq("user_id", user.id);

    // Throw an error if deletion fails
    if (error) {
      throw new Error(`Failed to delete problem: ${error.message}`);
    }
    
    // Return success status or null
   
  } catch (err) {
    console.error("Error deleting problem:", err.message);
    throw err; // Re-throw the error for the caller to handle
  }
}
