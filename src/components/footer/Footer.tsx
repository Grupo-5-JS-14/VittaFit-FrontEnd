import Grupo05 from "../extras/Grupo05";
import { Link } from "react-router-dom";

interface FooterProps {
  isDarkMode: boolean;
}

function Footer({ isDarkMode }: FooterProps) {
  const footerBg = isDarkMode ? "bg-[#053227] text-white" : "bg-[#074334] text-white";
  
  const highlightText = isDarkMode ? "text-[#f27825]" : "text-[#f27825]";
  const linkHover = isDarkMode ? "hover:text-[#f27825]" : "hover:text-[#f27825]/80";
  const bottomLinkHover = isDarkMode ? "hover:text-white" : "hover:text-[#f27825]";

  const logoBadgeStyle = `flex items-center gap-2 shrink-0 bg-white border border-gray-100 p-2.5 rounded-xl shadow-lg shadow-black/5 transition-all`;

  return (
    <footer className={`w-full ${footerBg} pt-16 pb-12 px-6 md:px-12 border-t border-white/5 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Coluna 1: Navegação Interna */}
          <div className="flex flex-col gap-3 items-start">
            <h3 className={`font-kare text-xl ${highlightText} uppercase tracking-wider mb-2`}>
              VF
            </h3>

            <Link
              to="/"
              className={`${linkHover} font-medium text-sm uppercase tracking-wide transition-colors text-white/80`}
            >
              Início
            </Link>

            <Link
              to="/sobre"
              className={`${linkHover} font-medium text-sm uppercase tracking-wide transition-colors text-white/80`}
            >
              Quem Somos
            </Link>

            <Link
              to="/explorar"
              className={`${linkHover} font-medium text-sm uppercase tracking-wide transition-colors text-white/80`}
            >
              Explorar
            </Link>
          </div>

          {/* Coluna 2: Hub Corporativo / Ecossistema */}
          <div className="flex flex-col gap-3 items-start">
            <h3 className={`font-kare text-xl ${highlightText} uppercase tracking-wider mb-2`}>
              Acompanhe
            </h3>

            <Link
              to="/perfil"
              className={`${linkHover} font-medium text-sm uppercase tracking-wide transition-colors text-white/80`}
            >
              Meus registros
            </Link>

            <a
              href="#"
              className={`${linkHover} font-medium text-sm uppercase tracking-wide transition-colors text-white/80`}
            >
              Comunidade
            </a>

            <a
              href="#"
              className={`${linkHover} font-medium text-sm uppercase tracking-wide transition-colors text-white/80`}
            >
              Projetos Vitta
            </a>
          </div>

          {/* Coluna 3: Componente de Autores */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-1">
              Equipe de Devs
            </h3>

            <div className="w-full">
              <Grupo05 variante="compacto" />
            </div>
          </div>
        </div>

        {/* Divisor sutil e limpo */}
        <hr className="border-white/10 mb-10" />

        {/* Linha de Créditos e Termos Legais */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-xs text-center lg:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            {/* Logo VF no Footer com o peso visual correto */}
            <div className={logoBadgeStyle}>
              <h1 className="text-2xl font-bold font-kare tracking-tighter leading-none uppercase">
                <span className="text-[#074334]">Vitta</span>
                <span className="text-[#f27825]">Fit</span>
              </h1>
            </div>

            <p className="leading-relaxed text-white/60 font-normal max-w-xl">
              © Copyright {new Date().getFullYear()} - VittaFit - Todos os direitos reservados.
              <br />
              Projeto Acadêmico Integrador desenvolvido para o Bootcamp da Generation Brasil.
              <br />
              VittaFit | Plataforma de Saúde e Performance Física S.A. • CNPJ 12.345.678/0001-90
            </p>
          </div>

          {/* Links de Políticas Legais no canto inferior direito */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-3 max-w-md text-white/50 font-medium">
            <a href="#" className={`${bottomLinkHover} transition-colors uppercase tracking-wider text-[10px]`}>
              Termos e condições
            </a>

            <a href="#" className={`${bottomLinkHover} transition-colors uppercase tracking-wider text-[10px]`}>
              Código de conduta
            </a>

            <a href="#" className={`${bottomLinkHover} transition-colors uppercase tracking-wider text-[10px]`}>
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;