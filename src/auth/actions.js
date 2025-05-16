"use server";
import { createClient } from "@/auth/server";

export async function loginAction(email, password) {
  // Create Supabase client
  const supabase = await createClient();
//    console.log(supabase.auth);
  try {
    // Attempt to sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Handle errors
    if (error) {
      console.error("Login Error:", error.message);

      // You can customize error messages based on the Supabase error codes
      switch (error.message) {
        case "Invalid login credentials":
          throw new Error("Invalid email or password. Please try again.");
        case "Email not confirmed":
          throw new Error("Please verify your email before logging in.");
        default:
          throw new Error(
            "An unexpected error occurred. Please try again later."
          );
      }
    }

    // Handle successful login
    return { errorMessage: null };
  } catch (err) {
    // Catch and log any unexpected errors
    if (err instanceof Error) {
      return { errorMessage: err.message };
    } else {
      return {
        errorMessage: "An unexpected error occurred. Please try again later.",
      };
    }
  }
}


export async function signUpAction(username, email, password) {
  // Create Supabase client
  const supabase = await createClient();
//   console.log(supabase.auth);

  try {
    // Attempt to sign up the user with email and password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username, // Custom user data
        },
      },
    });

    // Handle errors during sign-up
    if (error) {
      console.error("Sign-Up Error:", error.message);

      // Customize error messages based on Supabase error codes
      switch (error.message) {
        case "User already registered":
          throw new Error("This email is already associated with an account.");
        case "Invalid email format":
          throw new Error("Please provide a valid email address.");
        default:
          throw new Error(
            "An unexpected error occurred while signing up. Please try again later."
          );
      }
    }

    // If sign-up is successful, add user to the 'users' table
    const userId = data.user.id;
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: userId, // Use the unique user ID
        username,
        email,
      },
    ]);
    if (insertError) {
      console.error("Database Insert Error:", insertError.message);
      throw new Error(
        "Could not add user to the database. Please contact support."
      );
    }
    const { error: insertError2 } = await supabase.from("handles").insert([
      {
        id: userId, // Use the unique user ID
        username,
        
      },
    ]);
    if (insertError2) {
      console.error("Database Insert Error:", insertError2.message);
      throw new Error(
        "Could not add user to the database. Please contact support."
      );
    }
    // Handle errors during insertion into the 'users' table
  

    // Return success response
    return { errorMessage: null, userId };
  } catch (err) {
    // Catch and log any unexpected errors
    if (err instanceof Error) {
      return { errorMessage: err.message };
    } else {
      return {
        errorMessage: "An unexpected error occurred. Please try again later.",
      };
    }
  }
}

// Adjust the path based on your project structure

export async function logOutAction() {
  // Create Supabase client
  const supabase = await createClient();

  try {
    // Sign out the user
    const { error } = await supabase.auth.signOut();

    // Handle potential errors during logout
    if (error) {
      throw new Error(error.message);
    }

    // Return success response
    return { errorMessage: null };
  } catch (err) {
    // Return error response
    return { errorMessage: err.message || "An unexpected error occurred while logging out." };
  }
}


  
