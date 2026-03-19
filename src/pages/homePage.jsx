import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import NotFoundPage from "./404Page";
import ContactPage from "./contactusPage";
import AboutPage from "./aboutPage";

export default function HomePage(){
    return (
        <div>
           <Header/>

           <Routes>
               <Route path="/" element={<h1>home page</h1>} />
               <Route path="/products" element={<h1>product page</h1>} />
               <Route path="/about" element={<AboutPage/>} />
               <Route path="/contact" element={<ContactPage/>} />
               <Route path="/*" element={<NotFoundPage/>} />
           </Routes>

        </div>
    )
}