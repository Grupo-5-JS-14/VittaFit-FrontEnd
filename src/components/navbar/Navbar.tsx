import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  Compass,
  User,
  Menu,
  X,
  Settings,
  PlusCircle,
  Bookmark,
  Sun,
  Moon,
} from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onAbrirPostar?: () => void;
}

export default function Navbar({
  isDarkMode,
  setIsDarkMode,
  onAbrirPostar,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const hoverColor = isDarkMode
    ? "hover:text-[#f27825]"
    : "hover:text-[#074334]";

  const themeDrawerBg = isDarkMode
    ? "bg-[#074334] text-white"
    : "bg-white text-[#074334]";

  const themeInputBg = isDarkMode
    ? "bg-[#053227] border-white/20 text-white placeholder-gray-400"
    : "bg-gray-50 border-[#074334]/20 text-[#074334] placeholder-gray-500";

  function fecharTudo() {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
  }

  function irParaExplorar() {
    fecharTudo();
    navigate("/explorar");
  }

  function abrirPerfil() {
    fecharTudo();
    setIsProfileOpen(true);
  }

  function abrirNovaPostagem() {
    fecharTudo();

    if (onAbrirPostar) {
      onAbrirPostar();
      return;
    }

    navigate("/explorar");
  }

  return (
    <>
      <header className="absolute top-0 left-0 z-50 flex w-full items-center justify-between bg-transparent px-6 py-6 text-white md:px-12">
        <div className="text-4xl font-bold font-kare tracking-tighter">
          <Link to="/" onClick={fecharTudo} className={`transition-colors ${hoverColor}`}>
            VF
          </Link>
        </div>

        <nav className="hidden gap-8 text-sm font-medium tracking-wide uppercase md:flex">
          <Link
            to="/treinos"
            onClick={fecharTudo}
            className={`transition-colors ${hoverColor}`}
          >
            Treinos
          </Link>

          <Link
            to="/dietas"
            onClick={fecharTudo}
            className={`transition-colors ${hoverColor}`}
          >
            Dietas
          </Link>

          <button
            type="button"
            onClick={abrirNovaPostagem}
            className={`transition-colors uppercase ${hoverColor}`}
          >
            Nova Postagem
          </button>
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            onClick={() => setIsDarkMode((estadoAtual) => !estadoAtual)}
            className={`transition-colors ${hoverColor}`}
            title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
          >
            {isDarkMode ? (
              <Sun size={20} strokeWidth={1.5} />
            ) : (
              <Moon size={20} strokeWidth={1.5} />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              fecharTudo();
              setIsSearchOpen(true);
            }}
            className={`transition-colors ${hoverColor}`}
            title="Buscar"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={irParaExplorar}
            className={`transition-colors ${hoverColor}`}
            title="Explorar"
          >
            <Compass size={20} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={abrirPerfil}
            className={`transition-colors ${hoverColor}`}
            title="Perfil"
          >
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around bg-transparent pt-4 pb-8 text-white backdrop-blur-md md:hidden">
        <button
          type="button"
          onClick={() => {
            fecharTudo();
            setIsSearchOpen(true);
          }}
          className={`transition-transform active:scale-90 ${hoverColor}`}
        >
          <Search size={24} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={irParaExplorar}
          className={`transition-transform active:scale-90 ${hoverColor}`}
        >
          <Compass size={24} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={abrirPerfil}
          className={`transition-transform active:scale-90 ${hoverColor}`}
        >
          <User size={24} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={() => setIsDarkMode((estadoAtual) => !estadoAtual)}
          className={`transition-transform active:scale-90 ${hoverColor}`}
        >
          {isDarkMode ? (
            <Sun size={24} strokeWidth={1.5} />
          ) : (
            <Moon size={24} strokeWidth={1.5} />
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className={`transition-transform active:scale-90 ${hoverColor}`}
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div
            className={`w-full max-w-md p-8 shadow-2xl flex flex-col h-full overflow-y-auto md:max-w-lg transition-colors duration-300 ${themeDrawerBg}`}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Buscar</h2>

              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-black/10 rounded-full transition-colors text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Pesquisar treinos, dietas e receitas..."
                className={`w-full border rounded-xl p-4 pl-12 text-sm focus:outline-none focus:border-[#f27825] focus:ring-1 focus:ring-[#f27825] transition-colors ${themeInputBg}`}
              />

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-400">
                Sugestões
              </h3>

              <div className="flex flex-wrap gap-2">
                {["Hipertrofia", "Emagrecimento", "Cardio", "Dieta Low Carb"].map(
                  (item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(`/explorar?query=${item}`);
                      }}
                      className={`border px-4 py-2 text-xs rounded-full hover:border-[#f27825] hover:text-[#f27825] transition-colors ${
                        isDarkMode
                          ? "border-white/20 text-white"
                          : "border-[#074334]/20 text-[#074334]"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div
            className={`w-full max-w-md p-8 shadow-2xl flex flex-col h-full md:max-w-lg transition-colors duration-300 ${themeDrawerBg}`}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Minha Conta</h2>

              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="p-2 hover:bg-black/10 rounded-full transition-colors text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      isDarkMode
                        ? "bg-[#f27825] text-white"
                        : "bg-[#074334] text-white"
                    }`}
                  >
                    VF
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Atleta VittaFit</h3>
                    <p className="text-xs text-gray-400">Acessando modo local</p>
                  </div>
                </div>

                <div className="flex flex-col border-t border-gray-100/10 pt-4 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      fecharTudo();
                      navigate("/perfil");
                    }}
                    className="flex items-center gap-3 w-full p-3 text-sm font-medium hover:bg-black/5 hover:text-[#f27825] rounded text-left transition-colors"
                  >
                    <User size={18} strokeWidth={1.5} />
                    Meu Perfil
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      fecharTudo();
                      navigate("/explorar");
                    }}
                    className="flex items-center gap-3 w-full p-3 text-sm font-medium hover:bg-black/5 hover:text-[#f27825] rounded text-left transition-colors"
                  >
                    <Bookmark size={18} strokeWidth={1.5} />
                    Minhas Postagens
                  </button>

                  <button
                    type="button"
                    onClick={abrirNovaPostagem}
                    className="flex items-center gap-3 w-full p-3 text-sm font-medium hover:bg-black/5 hover:text-[#f27825] rounded text-left transition-colors"
                  >
                    <PlusCircle size={18} strokeWidth={1.5} />
                    Nova Postagem
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      fecharTudo();
                      navigate("/perfil");
                    }}
                    className="flex items-center gap-3 w-full p-3 text-sm font-medium hover:bg-black/5 hover:text-[#f27825] rounded text-left transition-colors"
                  >
                    <Settings size={18} strokeWidth={1.5} />
                    Configurações
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  fecharTudo();
                  navigate("/perfil");
                }}
                className={`w-full p-4 flex items-center justify-between font-medium transition-colors rounded mt-auto ${
                  isDarkMode
                    ? "bg-[#f27825] text-white hover:bg-[#d9621c]"
                    : "bg-[#074334] text-white hover:bg-[#f27825]"
                }`}
              >
                <span>Ir para o Perfil Completo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#074334]/98 text-xl font-semibold space-y-6 text-white md:hidden">
          <Link
            to="/"
            onClick={fecharTudo}
            className={`transition-colors ${hoverColor}`}
          >
            Home
          </Link>

          <Link
            to="/treinos"
            onClick={fecharTudo}
            className={`transition-colors ${hoverColor}`}
          >
            Treinos
          </Link>

          <Link
            to="/dietas"
            onClick={fecharTudo}
            className={`transition-colors ${hoverColor}`}
          >
            Dietas
          </Link>

          <button
            type="button"
            onClick={abrirNovaPostagem}
            className={`font-semibold transition-colors ${hoverColor}`}
          >
            Nova Postagem
          </button>

          <button
            type="button"
            onClick={abrirPerfil}
            className={`font-semibold transition-colors ${hoverColor}`}
          >
            Meu Perfil
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-sm font-light uppercase tracking-widest text-gray-300"
          >
            Fechar ✕
          </button>
        </div>
      )}
    </>
  );
}