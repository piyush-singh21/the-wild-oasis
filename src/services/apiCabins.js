import toast from "react-hot-toast";
import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    toast.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase.from("cabins").insert(newCabin);
  if (error) {
    toast.error(error);
    throw new Error("Cabin could not be added");
  }
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    toast.error(error);
    throw new Error("Cabin could not be created");
  }
  return data;
}
