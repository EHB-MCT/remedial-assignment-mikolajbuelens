import { supabase } from "../_lib/supabase";

export async function fetchData(endpoint) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(
      `Error fetching data from ${endpoint}: ${response.statusText}`
    );
  }
  return response.json();
}

export async function getData(tableName) {
  const { data, error } = await supabase.from(tableName).select("*");
  if (error)
    throw new Error(`Error fetching data from ${tableName}: ${error.message}`);
  return data;
}

export async function postData(tableName, values) {
  const { data, error } = await supabase.from(tableName).insert(values);
  if (error)
    throw new Error(`Error inserting data into ${tableName}: ${error.message}`);
  return data;
}

export async function updateData(tableName, values) {
  const { data, error } = await supabase
    .from(tableName)
    .upsert(values, { onConflict: "id" });
  if (error)
    throw new Error(`Error updating data in ${tableName}: ${error.message}`);
  return data;
}

export async function deleteData(tableName, condition) {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .match(condition);
  if (error)
    throw new Error(`Error deleting data from ${tableName}: ${error.message}`);
  return data;
}
