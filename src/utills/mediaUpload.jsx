import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jttooxaiutjdzmlqxzno.supabase.co";
const anonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0dG9veGFpdXRqZHptbHF4em5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MjA1MTgsImV4cCI6MjA4OTQ5NjUxOH0.ByRiPnrSvxab637n7OMkXON5Xhml44uOrBpm41X42j4";

const supabase = createClient(supabaseUrl, anonKey);



export default function MediaUpload(file){
    return new Promise(
      (resolve,reject)=>{
        if(file == null){
          reject("No file selected");
        }else{
          const timestamp = new Date().getTime();
          const fileName= timestamp + file.name;
          supabase.storage.from("product-images").upload(fileName,file,
          {upsert:false,
           cacheControl:"3600"}
          ).then(
           ()=>{
           const publicUrl = supabase.storage.from("product-images").getPublicUrl(fileName).data.publicUrl;
           console.log(publicUrl);
         }
        )
          resolve(publicUrl);
        }
      }
    ).catch(
      ()=>{
        reject("Failed to upload image");
      }
    )
}