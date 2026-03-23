import { createClient } from "@supabase/supabase-js";

const annonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zZmdsYXJqZmNpampnZHp2Z3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDM2MjQsImV4cCI6MjA4OTgxOTYyNH0.jRWLpb9pZC5_3JYR8I4mdBOx6HEave3-8FlApiDzI-c";
const supabaseurl = "https://msfglarjfcijjgdzvgzf.supabase.co";
const supabase = createClient(supabaseurl, annonkey);

/*
supabase.storage.from("images").upload(file.name, file, {
      upsert: false,
      cacheControl: "3600",
    }).then(
      () => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl;
        console.log(publicUrl);
      }
    );
*/

export default function mediaUpload(file){
  return new Promise(
    (resolve , reject)=>{
      if(file == null){
        reject("No File Selected")
      }else{
        const timestamp = new Date().getTime();
        const fileName = timestamp+file.name;
        supabase.storage.from("images").upload(fileName, file, {
        upsert: false,
        cacheControl: "3600",
        }).then(
         () => {
          const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
          resolve(publicUrl);
         }
        ).catch(
          ()=>{
            reject("an error occured while uploading")
          }
        )

      }
    }
  )
    
  
}