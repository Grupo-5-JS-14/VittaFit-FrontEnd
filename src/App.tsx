import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react"; 
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Perfil from './pages/perfil/Perfil';
import Login from "./pages/login/Login";
import Explorar from "./pages/explorar/Explorar";
import Sobre from "./pages/about/About";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/home" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/explorar" element={<Explorar />} />
            <Route path= "/sobre" element={<Sobre/>} />
          </Routes>
        </div>
        <Footer isDarkMode={isDarkMode} />
      </BrowserRouter>
    </>
  );
}

export default App;