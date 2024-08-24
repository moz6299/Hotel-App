import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from 'uuid';

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("cabins not be loaded");
  }

  return data;
};

///////////////////////////////////////////////////////

async function uploadImage(image) {
  // التحقق من صحة الصورة
  if (!image || !image.name || !image.type.startsWith('image/')) {
    throw new Error("Invalid image file provided");
  }

  // التحقق من أن image.name ليس undefined
  const fileName = image.name || 'default-image.jpg'; // تعيين اسم افتراضي إذا لم يكن موجود
  const fileExtension = fileName.split('.').pop() || 'jpg'; // استخدام قيمة افتراضية لامتداد الملف
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9-_.]/g, '') || 'image';
  const imageName = `${uuidv4()}.${fileExtension}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins_images/${imageName}`;

  // تسجيل معلومات للتحقق
  console.log('Uploading image with name:', imageName);

  // رفع الصورة إلى تخزين Supabase
  const { data, error } = await supabase.storage
      .from('cabins_images')
      .upload(imageName, image);

  if (error) {
      console.error("Error uploading image:", error.message);
      throw new Error("Image upload failed");
  }

  // تسجيل معلومات للتحقق
  console.log('Image uploaded successfully:', data);

  return imagePath;
}



////////////////////////////////////////////////////

export async function createCabin(newCabin) {
  const { image, ...cabinData } = newCabin;
  
  // إذا كان هناك صورة جديدة، رفعها، وإلا استخدام المسار الحالي
  const imagePath = image instanceof File ? await uploadImage(image) : image;

  const { data, error } = await supabase
      .from('cabins')
      .insert([{ ...cabinData, image: imagePath }])
      .select().single();

  if (error) {
      console.error(error);
      throw new Error("Cabin create failed");
  }

  return data;
}

/////////////////////////////////////////////////////

export async function updateCabin(updatedCabin) {
  const { id, image, ...cabinData } = updatedCabin;

  // إذا كانت الصورة موجودة بالفعل ولم يتم رفع صورة جديدة
  let imagePath = cabinData.image;
  
  // إذا كانت الصورة من نوع File (أي تم اختيار صورة جديدة)، رفع الصورة واستخدام المسار الجديد
  if (image instanceof File) {
    imagePath = await uploadImage(image);
  }

  // تحديث البيانات في قاعدة البيانات
  const { data, error } = await supabase
      .from('cabins')
      .update({ ...cabinData, image: imagePath })
      .eq('id', id)
      .select()
      .single();

  if (error) {
      console.error(error);
      throw new Error("Cabin update failed");
  }

  return data;
}





/////////////////////////////////////////////

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Cabin Cannot be deleted");
  }

  return data;
};
