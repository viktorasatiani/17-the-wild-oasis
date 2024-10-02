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

export async function createCabin(newCabin) {
  // https://arevxibxxxbxaxxvjfoo.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(newCabin);
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be Created`);
  }
  console.log(data);
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
