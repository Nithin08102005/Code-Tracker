"use server";
import { createClient, getUser } from "./server";

export async function addProblem(problem) {
  try {
    // Initialize Supabase client
    const user = await getUser();
    const supabase = await createClient();

    // Perform insertion in the 'problems' table
    
const { data, error } = await supabase
.from('problems')
.insert([
 
  { "user_id": user.id ,
  "name":problem.name,
  "url":problem.url,
  "website":problem.website,
  "difficulty":problem.difficulty,
  "status":problem.status,
  "is_starred":problem.is_starred,
  "notes":problem.notes,
  "time_complexity":problem.timeComplexity,
    "space_complexity":problem.spaceComplexity},

])
.select()
if (error) {
    throw new Error(`Failed to add problem: ${error.message}`);
  }
//   console.log(data);
        const id=data[0].problem_id;

        const rowsToInsert = problem.tags.map((tagId) => ({
            "problem_id": id,
            "tag_id": tagId,
          }));
        //   console.log(rowsToInsert);
          const { data:data2, error2 } = await supabase
          .from("problem_tags")
          .insert(rowsToInsert);
    // Throw an error if insertion fails

    if (error2) {
      throw new Error(`Failed to add problem: ${error2.message}`);
    }
    const { data:data3, error3 } = await supabase
    .from('problems')
    .select(`
      *,
      tags (*)
    `)
    .eq('user_id', user.id)
    .eq('problem_id', id)
    // console.log(data3);
    // console.log(error3);
    // Return the inserted data or null
    return data3 || null;
  } catch (err) {
    console.error("Error adding problem:", err.message);
    throw err; // Re-throw the error for the caller to handle
  }
}