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

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error);
  }
}

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });
  if (error) {
    throw new Error(error);
  }

  return { data };
}
export async function updateUser({ password, fullName, avatar }) {
  let updatedData;
  if (password) updatedData = { password };
  if (fullName)
    updatedData = {
      data: {
        fullName,
      },
    };
  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) throw new Error(error);
  if (!avatar) return;

  let fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError);

  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  console.log(data);
  if (updatedUserError) throw new Error(updatedUserError);
  return updatedUser;
}
