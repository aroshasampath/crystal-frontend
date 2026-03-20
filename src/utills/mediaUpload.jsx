import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jttooxaiutjdzmlqxzno.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0dG9veGFpdXRqZHptbHF4em5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MjA1MTgsImV4cCI6MjA4OTQ5NjUxOH0.ByRiPnrSvxab637n7OMkXON5Xhml44uOrBpm41X42j4";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = "product-images";

export async function MediaUpload(files) {
  if (!files || files.length === 0) {
    throw new Error("No files selected");
  }

  const fileArray = Array.from(files);
  const uploadedUrls = [];

  for (const file of fileArray) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 10)}.${fileExt}`;

    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}