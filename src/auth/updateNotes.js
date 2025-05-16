"use server";
import { getUser } from "./server";
import { createClient } from "./server";

export async function updateNotes(problemId, notes) {
    try {
        const user = await getUser();  // Get user (if authentication is required)
        const supabase = await createClient();  // Create Supabase client

        const { data, error } = await supabase
            .from("problems")  // Table name
            .update({ notes:notes })  // Update the notes column
            .eq("problem_id", problemId);  // Match the problem_id

            if (error) {
                throw new Error(`Supabase error: ${error.message || "Unknown error occurred"}`);
            }
            

        return { success: true, data };

    } catch (err) {
        console.error("Error updating notes:", err);
        return { success: false, message: err.message };
    }
}
