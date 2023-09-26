import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    toast.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  // console.log(newCabin);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://lzfpyxmekuhhbpsrvsqj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // 1.Create/Edit cabin
  let query = supabase.from("cabins");
  // A. CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B. EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();
  if (error) {
    toast.error(error);
    throw new Error("Cabin could not be added");
  }
  // 2.Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // 3.Delete the cabin if there was error in uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    toast.error(storageError);
    throw new Error("Cabin image could not be added and cabin was not created");
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    toast.error(error);
    throw new Error("Cabin could not be created");
  }
  return data;
}
