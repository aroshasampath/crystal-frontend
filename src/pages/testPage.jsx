import { createClient } from "@supabase/supabase-js";
import { cache, useState } from "react";

import MediaUpload from "../utills/mediaUpload";
import mediaUpload from "../utills/mediaUpload";




export default function TestPage() {

  const [file, setFile] = useState(null);

  async  function uploadImage(){
   
    const link= await MediaUpload(file)
    console.log(link);
      
    
    return(

      <div>

      </div>
    )
  }
  return (
    <div className="w-full h-full justify-center items-center">
      <input type="file" onChange={
        (e)=>{
            setFile(e.target.files[0])
        }
      }/>
      <button className="bg-blue-500" onClick={uploadImage}>
        upload
      </button>

    </div>
    
  );
}