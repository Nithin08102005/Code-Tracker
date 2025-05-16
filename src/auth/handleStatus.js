"use server";
import { getUser } from "@/auth/server";
import { createClient } from "@/auth/server";
import { getData } from "./get-info";
export async function getUserHandleStatus(type) {
  try {
    // Create Supabase client
    const supabase = await createClient();

    // Fetch the current user
    const user = await getUser();

    if (!user || !user.id) {
      console.error("User not authenticated or missing username in metadata.");
      return { hasHandle: false, userhandle: null, error: "User is not authenticated or username is missing." };
    }

    // console.log("Current User:", user);

    // Query the Supabase database for the specific type of handle
    const { data: handle, error } = await supabase
      .from("handles")
      .select(type)
      .eq("id", user.id);

    if (error) {
      console.error("Error fetching handle from database:", error.message);
      return { hasHandle: false, userhandle: null, error: error.message };
    }

    if (handle && handle.length > 0 && handle[0]?.[type]) {
    //   console.log(`${type} Handle found:`, handle[0][type]);
      return { hasHandle: true, userhandle: handle[0][type], error: null }; // Handle exists
    } else {
      console.log("No handle found for the user.");
      return { hasHandle: false, userhandle: null, error: null }; // No handle exists
    }
  } catch (err) {
    console.error("Unexpected error occurred:", err);
    return { hasHandle: false, userhandle: null, error: "An unexpected error occurred. Please try again later." };
  }
}



export async function updateHandle(type, handle) {
  try {
    if (type == 'codeforces') {
        // Fetch data based on type and handle
        const fetchedData = await getData(type, handle); // Call getData to fetch object
      
        // Check for errors in the fetched data at API level
        if (fetchedData.error) {
          return { error: fetchedData.error }; // Return the error in an object
        }
      
        // Check for errors in the fetched data's response
        if (fetchedData.data[0]?.error) {
          return { error: fetchedData.data[0].error }; // Return the data-level error in an object
        }
      }
      else if(type=="leetcode"){
        const fetchedData = (await getData(type, handle)).data;
        if(fetchedData.errors){
            // console.log(fetchedData.errors);
     return {error:fetchedData.errors[0].message}
      }
    }
    else if(type=="codechef"){
        const fetchedData = (await getData(type,handle)).data;
        //   console.log(fetchedData); // Call getData to fetch object
        // console.log(fetchedData);
          if (fetchedData.error) {
            // console.log(fetchedData.error); // Log the error
           return {error:fetchedData.error} // Handle error returned by getData
          } 
    }

    // Fetch the current user
    const user = await getUser();

    if (!user || !user.id) {
      return { error: "User authentication failed or username is missing." };
    }

    // Create Supabase client
    const supabase = await createClient();

    // Update the handle in the database for the current user
    const { data, error } = await supabase
      .from("handles") // Replace with your table name
      .update({ [type]: handle }) // Dynamic column update (e.g., codeforces: handle)
      .eq("id", user.id) // Match the row by username
      .select(); // Return the updated data for verification
      
    // Handle database error
    if (error) {
      return { error: `Database update failed: ${error.message}` }; // Return detailed error message
    }

    // Verify the updated data (optional, based on your requirements)
    // if (!data || data.length === 0) {
    //   return { error: "Handle update verification failed. No rows were updated." };
    // }

    // Return success response
    return { error: null };
  } catch (err) {
    console.error("Unexpected error in updateHandle:", err);
    // Return a general unexpected error message
    return { error: "An unexpected error occurred during the handle update." };
  }
}
