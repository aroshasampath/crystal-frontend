import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage";
import HomePage from "./pages/homePage";
import Loginpage from "./pages/loginPage";
import { Toaster } from "react-hot-toast";
import TestPage from "./pages/testPage";
import DemoPage from "./pages/demo";
import RegisterPage from "./pages/registerPage";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/register" element={< RegisterPage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;