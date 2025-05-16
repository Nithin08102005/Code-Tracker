"use server";
import { getUser } from "@/auth/server";

export async function getData(type, username) {
  try {
    // Ensure the `getUser` function works correctly
    const user = await getUser();
    //   console.log("Current User:", user);
    
    if (!user) {
      throw new Error("User is not authenticated.");
    }

    if (!type || !username) {
      throw new Error("Type and username are required to fetch data.");
    }

    // Build the request URL
    const reqUrl = `https://competeapi.vercel.app/user/${type}/${username}/`;

    // Make the API request
    const response = await fetch(reqUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data from API. Status: ${response.status}`);
    }

    // Parse the response JSON
    const data = await response.json();
    // console.log(data);
    // Return the total data
    return { data, error: null };
  } catch (error) {
    console.error("Error occurred in getData:", error.message);
    
    // Return the error for further handling
    return { data: null, error: error.message };
  }
}
