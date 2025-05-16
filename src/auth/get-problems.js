"use server";
import { getUser } from "./server";
import { createClient } from "./server";

export async function getProblems() {
    const supabase = await createClient();
    const user = await getUser();

    if (!user || !user.id) {
        return { data: null, error: 'User not authenticated or invalid user object' };
    }

    const { data, error } = await supabase
        .from('problems')
        .select(`
          *,
          tags (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching problems:', error);
        return { data: null, error }; // Return error if query fails
    }

    const serializedData = JSON.parse(JSON.stringify(data)); // Ensure data is plain and serializable
    return { data: serializedData, error: null }; // Return serialized data and null error
}
