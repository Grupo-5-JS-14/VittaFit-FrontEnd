import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react"; 
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Perfil from './pages/perfil/Perfil';
import Login from "./pages/login/Login";
import Explorar from "./pages/explorar/Explorar";

import './App.css'
import Treinos from "./pages/treinos/Treinos";
import Dietas from "./pages/dietas/Dietas";
import ModalPostar from "./components/modais/ModalPostar";
import ModalCriarTreino from "./components/modais/ModalCriarTreino";
import ModalMontarDieta from "./components/modais/ModalMontarDieta"; // <-- IMPORTAÇÃO ADICIONADA

function AppContent({ isDarkMode, setIsDarkMode }: { 
  isDarkMode: boolean; 
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> 
}) {
  const location = useLocation();
  const esconderLayoutGlobal = location.pathname === "/login";

  // Estados para controlar as aberturas dos Modais globais
  const [modalPostarAberto, setModalPostarAberto] = useState(false);
  const [modalTreinoAberto, setModalTreinoAberto] = useState(false);
  const [modalDietaAberto, setModalDietaAberto] = useState(false); // <-- ESTADO ADICIONADO

  // Função adaptada para a assinatura nova do ModalPostar
  const handleNovaPublicacao = (dados: { 
    texto: string; 
    imagemUrl?: string; 
    tipo: "TREINO" | "DIETA";
    detalhesEspecificos: { tipoCategoria: string; atributoExtra: string };
  }) => {
    console.log("Enviando nova publicação manual para a API:", dados);
    // Exemplo futuro: await cadastrar("/postagens", dados);
  };

  // Função para lidar com o salvamento do treino criado no modal
  const handleNovoTreino = (dados: {
    tipoTreino: string;
    intensidade: string;
    descricao: string;
    data: string;
  }) => {
    console.log("Salvando novo treino na API:", dados);
    // Exemplo futuro: await cadastrar("/treinos", dados);
  };

  // Função para lidar com o salvamento da dieta criada no modal
  const handleNovaDieta = (dados: {
    tipo: string;
    imc: number;
    descricao: string;
    data: string;
  }) => {
    console.log("Salvando nova dieta na API:", dados);
    // Exemplo futuro: await cadastrar("/dietas", dados);
  };

  return (
    <>
      {!esconderLayoutGlobal && (
        <Navbar 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          onAbrirPostar={() => setModalPostarAberto(true)} 
        />
      )}
      
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/home" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
          
          {/* ROTA DO PERFIL ATUALIZADA COM OS GATILHOS DOS MODAIS */}
          <Route 
            path="/perfil" 
            element={
              <Perfil 
                isDarkMode={isDarkMode} 
                onAbrirCriarTreino={() => setModalTreinoAberto(true)} 
                onAbrirMontarDieta={() => setModalDietaAberto(true)} 
              />
            } 
          />
          
          <Route path="/explorar" element={<Explorar isDarkMode={isDarkMode} />} />
          <Route path="/treinos" element={<Treinos isDarkMode={isDarkMode} />} />
          <Route path="/dietas" element={<Dietas isDarkMode={isDarkMode} />} />
        </Routes>
      </div>

      {/* Camada Global de Modais */}
      <ModalPostar 
        isOpen={modalPostarAberto} 
        onClose={() => setModalPostarAberto(false)} 
        isDarkMode={isDarkMode} 
        onPostar={handleNovaPublicacao} 
      />

      <ModalCriarTreino 
        isOpen={modalTreinoAberto}
        onClose={() => setModalTreinoAberto(false)}
        isDarkMode={isDarkMode}
        onCriarTreino={handleNovoTreino}
      />

      <ModalMontarDieta 
        isOpen={modalDietaAberto}
        onClose={() => setModalDietaAberto(false)}
        isDarkMode={isDarkMode}
        onMontarDieta={handleNovaDieta}
      />

      {!esconderLayoutGlobal && (
        <Footer isDarkMode={isDarkMode} />
      )}
    </>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <AppContent isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </BrowserRouter>
  );
}

export default App;