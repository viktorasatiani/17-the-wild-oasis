import supabase from '../services/supabase';
async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error);
  }

  return data;
}

export { login };

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error);
  }

  console.log(data);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error);
  }
}
