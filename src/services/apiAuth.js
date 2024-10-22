import supabase from '../services/supabase';
async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error);
  }
  console.log(data);

  return data;
}

export { login };
