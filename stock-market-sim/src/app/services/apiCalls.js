import { supabase } from "../_lib/supabase";

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

export async function updateData(tableName, values, condition) {
  const { data, error } = await supabase
    .from(tableName)
    .update(values)
    .match(condition);
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
