"use server";
import { getUser } from "./server";
import { createClient } from "./server";

export async function updateProblem(problemId, column, value) {
  try {
    const user = await getUser();
    const supabase = await createClient();

    // Perform the update
    const { data, error } = await supabase
      .from("problems")
      .update({ [column]: value }) // Correct bracket notation for dynamic column names
      .eq("user_id", user.id) // Filter rows by user ID
      .eq("problem_id", problemId) // Filter rows by problem ID
      .select(); // Optional: Fetch updated rows if needed

    if (error) {
      throw new Error(`Failed to update problem: ${error.message}`);
    }

    return data; // Return updated rows if select() is included
  } catch (err) {
    console.error("Error in updateProblem:", err.message);
    throw err; // Re-throw the error for higher-level error handling
  }
}
