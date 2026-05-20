import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Compass, User, Menu, X, ArrowRight, Settings, LogOut, ShieldAlert, Sun, Moon } from 'lucide-react';

interface NavBarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function NavBar({ isDarkMode, setIsDarkMode }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);   
  const [isExploreOpen, setIsExploreOpen] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  
  const navigate = useNavigate();
  const isAuthenticated = false; 

  const openProfileDrawer = () => {
    setIsProfileOpen(true);
    setIsSearchOpen(false);
    setIsExploreOpen(false);
    setIsMenuOpen(false);
  };

  // Classes dinâmicas para as gavetas laterais
  const themeDrawerBg = isDarkMode ? 'bg-[#074334] text-white' : 'bg-white text-[#074334]';
  const themeInputBg = isDarkMode ? 'bg-[#053227] border-white/20 text-white placeholder-gray-400' : 'bg-gray-50 border-[#074334]/20 text-[#074334]';
  const themeCardBg = isDarkMode ? 'bg-[#053227] border-white/10' : 'bg-gray-50 border-gray-100';
  const themeTextMuted = isDarkMode ? 'text-gray-300' : 'text-gray-500';

  // 1. CRIAMOS UMA VARIÁVEL PARA CONTROLAR O HOVER DINÂMICO DOS LINKS
  // Se for escuro, o hover é laranja. Se for claro (fundo laranja), o hover vira verde escuro!
  const hoverColor = isDarkMode ? 'hover:text-[#f27825]' : 'hover:text-[#074334]';

  return (
    <>
      {/* =========================================================================
          1. NAVBAR SUPERIOR (Transparente - Desktop & Base Mobile)
          ========================================================================= */}
      <header className="absolute top-0 left-0 z-50 flex w-full items-center justify-between bg-transparent px-6 py-6 text-white md:px-12">
        
        {/* Logo VF com hover dinâmico */}
        <div className="text-4xl font-bold font-kare tracking-tighter">
          <Link to="/" className={`transition-colors ${hoverColor}`}>
            VF
          </Link>
        </div>

        {/* Links Centrais com hover dinâmico */}
        <nav className="hidden gap-8 text-sm font-medium tracking-wide uppercase md:flex">
          <Link to="/treinos" className={`transition-colors ${hoverColor}`}>Treinos</Link>
          <Link to="/dietas" className={`transition-colors ${hoverColor}`}>Dietas</Link>
          <Link to="/postar" className={`transition-colors ${hoverColor}`}>Nova Postagem</Link>
        </nav>

        {/* Ícones da Direita com hover dinâmico */}
        <div className="hidden items-center gap-6 md:flex">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className={`transition-colors ${hoverColor}`}
            title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
          >
            {isDarkMode ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
          </button>

          <button onClick={() => { setIsSearchOpen(true); setIsExploreOpen(false); setIsProfileOpen(false); }} className={`transition-colors ${hoverColor}`}>
            <Search size={20} strokeWidth={1.5} />
          </button>

          <button onClick={() => { setIsExploreOpen(true); setIsSearchOpen(false); setIsProfileOpen(false); }} className={`transition-colors ${hoverColor}`}>
            <Compass size={20} strokeWidth={1.5} />
          </button>

          <button onClick={openProfileDrawer} className={`transition-colors ${hoverColor}`}>
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. BARRA INFERIOR PARA CELULAR (Mobile)
          ========================================================================= */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around bg-transparent pt-4 pb-8 text-white backdrop-blur-md md:hidden">
        <button onClick={() => { setIsSearchOpen(true); setIsExploreOpen(false); setIsProfileOpen(false); }} className={`transition-transform active:scale-90 ${hoverColor}`}>
          <Search size={24} strokeWidth={1.5} />
        </button>
        
        <button onClick={() => { setIsExploreOpen(true); setIsSearchOpen(false); setIsProfileOpen(false); }} className={`transition-transform active:scale-90 ${hoverColor}`}>
          <Compass size={24} strokeWidth={1.5} />
        </button>
        
        <button onClick={openProfileDrawer} className={`transition-transform active:scale-90 ${hoverColor}`}>
          <User size={24} strokeWidth={1.5} />
        </button>

        <button onClick={() => setIsDarkMode(!isDarkMode)} className={`transition-transform active:scale-90 ${hoverColor}`}>
          {isDarkMode ? <Sun size={24} strokeWidth={1.5} /> : <Moon size={24} strokeWidth={1.5} />}
        </button>
        
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`transition-transform active:scale-90 ${hoverColor}`}>
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* =========================================================================
          3. SUBMENU DE BUSCA (Lupa)
          ========================================================================= */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className={`w-full max-w-md p-8 shadow-2xl flex flex-col h-full overflow-y-auto md:max-w-lg transition-colors duration-300 ${themeDrawerBg}`}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Buscar</h2>
              <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-black/10 rounded-full transition-colors text-gray-400">
                <X size={24} />
              </button>
            </div>
            <div className="relative mb-8">
              <input 
                type="text" 
                placeholder="Pesquisar treinos, dietas e receitas..." 
                className={`w-full border p-4 pl-12 text-sm focus:outline-none focus:border-[#f27825] focus:ring-1 focus:ring-[#f27825] transition-colors ${themeInputBg}`} 
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-400">Sugestões</h3>
              <div className="flex flex-wrap gap-2">
                {['Hipertrofia', 'Emagrecimento', 'Cardio', 'Dieta Low Carb'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => { setIsSearchOpen(false); navigate(`/explorar?query=${item}`); }} 
                    className={`border px-4 py-2 text-xs rounded-full hover:border-[#f27825] hover:text-[#f27825] transition-colors ${isDarkMode ? 'border-white/20 text-white' : 'border-[#074334]/20 text-[#074334]'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          4. SUBMENU DE EXPLORAR (Estrela)
          ========================================================================= */}
      {isExploreOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className={`w-full max-w-md p-8 shadow-2xl flex flex-col h-full md:max-w-lg transition-colors duration-300 ${themeDrawerBg}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Explorar</h2>
              <button onClick={() => setIsExploreOpen(false)} className="p-2 hover:bg-black/10 rounded-full transition-colors text-gray-400">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-6 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Últimas postagens</h3>
            </div>
            
            <button 
              onClick={() => { setIsExploreOpen(false); navigate('/explorar'); }} 
              className={`w-full p-4 flex items-center justify-between font-medium transition-colors rounded ${isDarkMode ? 'bg-[#f27825] text-white hover:bg-[#d9621c]' : 'bg-[#074334] text-white hover:bg-[#f27825]'}`}
            >
              <span>Ver tudo</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. SUBMENU DE USUÁRIO (Perfil / Login)
          ========================================================================= */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className={`w-full max-w-md p-8 shadow-2xl flex flex-col h-full md:max-w-lg transition-colors duration-300 ${themeDrawerBg}`}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Minha Conta</h2>
              <button onClick={() => setIsProfileOpen(false)} className="p-2 hover:bg-black/10 rounded-full transition-colors text-gray-400">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              {!isAuthenticated ? (
                <div className="space-y-6 py-4">
                  <div className={`p-6 rounded-lg border flex items-start gap-4 transition-colors ${themeCardBg}`}>
                    <ShieldAlert className="text-[#f27825] shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-base mb-1">Você não está conectado</h3>
                      <p className={`text-sm leading-relaxed ${themeTextMuted}`}>
                        Faça login para acompanhar sua evolução de treinos, acessar suas dietas personalizadas e interagir com o clube.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isDarkMode ? 'bg-[#f27825] text-white' : 'bg-[#074334] text-white'}`}>
                      VF
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Atleta VittaFit</h3>
                      <p className="text-xs text-gray-400">usuario@vittafit.com</p>
                    </div>
                  </div>

                  <div className="flex flex-col border-t border-gray-100/10 pt-4 space-y-1">
                    <button onClick={() => { setIsProfileOpen(false); navigate('/perfil'); }} className="flex items-center gap-3 w-full p-3 text-sm font-medium hover:bg-black/5 hover:text-[#f27825] rounded text-left transition-colors">
                      <User size={18} strokeWidth={1.5} /> Meu Painel Geral
                    </button>
                    <button onClick={() => { setIsProfileOpen(false); navigate('/configuracoes'); }} className="flex items-center gap-3 w-full p-3 text-sm font-medium hover:bg-black/5 hover:text-[#f27825] rounded text-left transition-colors">
                      <Settings size={18} strokeWidth={1.5} /> Configurações da Conta
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 text-sm font-medium hover:bg-red-500/10 rounded text-red-500 text-left mt-4 transition-colors">
                      <LogOut size={18} strokeWidth={1.5} /> Sair do App
                    </button>
                  </div>
                </div>
              )}

              <button 
                onClick={() => { setIsProfileOpen(false); navigate(isAuthenticated ? '/perfil' : '/login'); }}
                className={`w-full p-4 flex items-center justify-between font-medium transition-colors rounded mt-auto ${isDarkMode ? 'bg-[#f27825] text-white hover:bg-[#d9621c]' : 'bg-[#074334] text-white hover:bg-[#f27825]'}`}
              >
                <span>{isAuthenticated ? 'Acessar Perfil Completo' : 'Entrar na minha Conta'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. MENU HAMBÚRGUER MOBILE com hover dinâmico
          ========================================================================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#074334]/98 text-xl font-semibold space-y-6 text-white md:hidden">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className={`transition-colors ${hoverColor}`}>Home</Link>
          <Link to="/treinos" onClick={() => setIsMenuOpen(false)} className={`transition-colors ${hoverColor}`}>Treinos</Link>
          <Link to="/dietas" onClick={() => setIsMenuOpen(false)} className={`transition-colors ${hoverColor}`}>Dietas</Link>
          <Link to="/postar" onClick={() => setIsMenuOpen(false)} className={`transition-colors ${hoverColor}`}>Nova Postagem</Link>
          
          <button onClick={openProfileDrawer} className={`font-semibold transition-colors ${hoverColor}`}>
            {isAuthenticated ? 'Meu Perfil' : 'Entrar / Cadastrar'}
          </button>
          
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-sm font-light uppercase tracking-widest text-gray-300">
            Fechar ✕
          </button>
        </div>
      )}
    </>
  );
}