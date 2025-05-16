"use server";
import { createClient } from "./server";
export async function getTags() {
  const supabase = await createClient();
  
let { data: tags, error } = await supabase
.from('tags')
.select("tag_id,name");
// console.log(tags);
if (error) {
    console.error('Error fetching tags:', error);
    return { data: null, error }; // Return error if query fails
}


// console.log(tags);
// console.log(realTags);
    return {realTags:tags,error:null}; // Return serialized data and null error

}