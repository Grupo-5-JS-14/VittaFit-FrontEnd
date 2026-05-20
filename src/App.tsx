import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react"; 
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Perfil from './pages/perfil/Perfil'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          </Routes>
        </div>
        <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </BrowserRouter>
    </>
  );
}

export default App;