import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import mediaUpload from "../utills/mediaUpload";



export default function TestPage() {
  const [file, setFile] = useState(null);

  async function uploadimage() {
    const link = await mediaUpload(file)
    console.log(link)
  }

  return (
    <div className="w-full h-full items-center justify-center">
      <input
        type="file"
        onChange={
          (e) => {
            setFile(e.target.files[0]);
          }
        }
      />
      <button onClick={uploadimage} className="bg-blue-500" >Upload</button>
    </div>
  );
}