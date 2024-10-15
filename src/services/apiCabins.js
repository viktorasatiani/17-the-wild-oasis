import supabase, { supabaseUrl } from './supabase';
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.log(error);
    throw new Error(`Cabins could not be loaded`);
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be deleted`);
  }
  return data;
}

export async function editCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from('cabins');
  query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be Edited`);
  }
  console.log(data);
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  console.log(data.image);
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('Image could not be uploaded');
  }
  return data;
}

export async function createCabin(newCabin) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }]);

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be Created`);
  }
  console.log(data);
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  console.log(data.image);
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('Image could not be uploaded');
  }
  return data;
}
