"use server";
import { getUser } from "./server";
import { createClient } from "./server";

export async function updateProblemTags(problemId, selectedTags) {
  const user = await getUser();
  const supabase = await createClient();

  try {
    // Fetch existing tags for the problem
    const { data: existingTags, error: fetchError } = await supabase
      .from("problem_tags")
      .select("tag_id")
      .eq("problem_id", problemId);

    if (fetchError) throw new Error(fetchError.message);

    // Extract current tag IDs
    const existingTagIds = existingTags.map((tag) => tag.tag_id);
     console.log("Existing Tags:", existingTagIds);
     console.log("Selected Tags:", selectedTags);
    // Determine tags to add and remove
    const tagIdsToAdd = selectedTags.filter((tagId) => !existingTagIds.includes(tagId));
    const tagIdsToRemove = existingTagIds.filter((tagId) => !selectedTags.includes(tagId));

    // Add new tags
    if (tagIdsToAdd.length > 0) {
      const { error: insertError } = await supabase
        .from("problem_tags")
        .insert(tagIdsToAdd.map((tagId) => ({ problem_id: problemId, tag_id: tagId })));
      if (insertError) throw new Error(insertError.message);
    }

    // Remove unselected tags
    if (tagIdsToRemove.length > 0) {
      const { error: deleteError } = await supabase
        .from("problem_tags")
        .delete()
        .eq("problem_id", problemId)
        .in("tag_id", tagIdsToRemove);
      if (deleteError) throw new Error(deleteError.message);
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating tags:", error.message);
    throw new Error(error.message);
  }
}
