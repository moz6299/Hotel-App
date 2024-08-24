// auth.js

import supabase from "./supabase";

export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data; // Return user data if successful
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw new Error(error.message); // Throw an error if login fails
  }
};

//////////////////////////////////////////////////////////////

export const getCurrentUserSession = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
};


///////////////////////////////////////////////////////////////

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error; // Throw an error if logout fails
    }

    return true; // Return true if logout is successful
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw new Error(error.message); // Throw an error if logout fails
  }
};
//////////////////////////////////////////////////////////////
export const signUp = async (email, password, fullName) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName: fullName, // إضافة fullName إلى بيانات المستخدم
          avatar: "" // إضافة avatar كحقل فارغ
        }
      }
    });

    if (error) {
      throw error;
    }

    return data; // عودة البيانات إذا كان التسجيل ناجحًا
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw new Error(error.message); // رمي خطأ إذا فشل التسجيل
  }
};


export const updateUserData = async (fullName, avatarFile) => {
  try {
    let avatarUrl = null;

    // Upload the avatar to the Supabase storage bucket if a file is provided
    if (avatarFile) {
      // Generate a unique file name with a timestamp and the original file name
      const fileName = `${Date.now()}_${avatarFile.name}`;

      // Upload the file to the 'avatar' bucket in the Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatar') // The name of the storage bucket
        .upload(fileName, avatarFile, {
          cacheControl: '3600',
          upsert: true, // Overwrite any existing file with the same name
        });

      if (uploadError) {
        throw new Error('Failed to upload avatar image');
      }

      // Construct the URL for the uploaded image based on the provided format
      avatarUrl = `https://tytdgsmuvaxyacljgphy.supabase.co/storage/v1/object/public/avatar/${fileName}`;
    }

    // Update user metadata with fullName and avatar URL
    const { data, error } = await supabase.auth.updateUser({
      data: {
        fullName,
        avatar: avatarUrl || '', // Update avatar URL or keep it empty
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data; // Return the updated user data
  } catch (error) {
    console.error('Error updating user data:', error.message);
    throw new Error(error.message);
  }
};


export const updatePassword = async (newPassword) => {
  try {
    // Use Supabase's updateUser function to update the user's password
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data; // Return updated user data
  } catch (error) {
    console.error('Error updating password:', error.message);
    throw new Error(error.message);
  }
};
