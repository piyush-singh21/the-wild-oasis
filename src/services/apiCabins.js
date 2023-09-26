import toast from "react-hot-toast";
import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    toast.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}
// 1.Create cabin
export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://lzfpyxmekuhhbpsrvsqj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...newCabin, image: imagePath });
  if (error) {
    toast.error(error);
    throw new Error("Cabin could not be added");
  }
  // 2.Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // 3.Delete the cabin if there was error in uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    toast.error(storageError);
    throw new Error("Cabin image could not be added and cabin was not created");
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
