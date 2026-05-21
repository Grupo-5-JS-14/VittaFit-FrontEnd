import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

interface LoginProps {
  isDarkMode?: boolean;
}

function Login({ isDarkMode = true }: LoginProps) {
  const navigate = useNavigate(); 
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const [credenciais, setCredenciais] = useState({
    usuario: "",
    senha: "",
  });

  const [registro, setRegistro] = useState({
    nome: "",
    usuario: "",
    senha: "",
    confirmarSenha: "",
    foto: "",
    peso: "",   // Adicionado para o fluxo de IMC
    altura: "", // Adicionado para o fluxo de IMC
  });

  function atualizarLogin(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredenciais({ ...credenciais, [name]: value });
  }

  function atualizarRegistro(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRegistro({ ...registro, [name]: value });
  }

  async function executarLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      console.log("Autenticando:", credenciais);
      
      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate("/perfil");

    } catch (err) {
      console.error(err);
      setErro("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  async function ejecutarRegistro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    if (registro.senha !== registro.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      // Montamos o objeto convertendo Peso e Altura para Number
      // para que o NestJS consiga rodar a lógica matemática do IMC
      const dadosParaEnviar = {
        nome: registro.nome,
        usuario: registro.usuario,
        senha: registro.senha,
        foto: registro.foto,
        peso: Number(registro.peso) || 0,
        altura: Number(registro.altura) || 0,
      };

      console.log("Cadastrando usuário na service do NestJS:", dadosParaEnviar);
      
      // Chame a sua função de API aqui se necessário, ex:
      // await cadastrarUsuario(dadosParaEnviar);
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      setErro("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`
        min-h-screen flex items-center justify-center p-6 transition-colors duration-300 font-sans relative overflow-hidden
        ${isDarkMode ? "bg-[#053227] text-white" : "bg-[#F8F9FA] text-zinc-900"}
      `}
    >
      {/* BACKGROUND VIDEO */}
      {isDarkMode && (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="src\assets\vittafit.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-[#053227]/70 to-[#053227]" />
        </div>
      )}

      {/* CARD DE AUTENTICAÇÃO / REGISTRO */}
      <div
        className={`
          w-full max-w-md rounded-[35px] p-8 sm:p-10 shadow-2xl relative z-10 transition-all duration-300 border
          ${
            isDarkMode
              ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-black/40"
              : "bg-white border-zinc-200/80 shadow-zinc-300/50"
          }
        `}
      >
        {/* BRAND HEADLINE */}
        <div className="text-center mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#f27825] mb-1">
            {isLogin ? "Welcome to Performance" : "Comece sua jornada"}
          </p>
          <h1 className="text-4xl font-bold font-kare tracking-tighter uppercase">
            Vitta<span className="text-[#f27825]">Fit</span>
          </h1>
          <p
            className={`text-xs font-light mt-2 ${isDarkMode ? "text-white/50" : "text-zinc-500"}`}
          >
            {isLogin
              ? "Acesse sua conta para gerenciar sua evolução."
              : "Crie sua conta de alta performance."}
          </p>
        </div>

        {erro && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
            {erro}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={executarLogin} className="space-y-4">
            <div>
              <label
                className={`block mb-1 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-white/40" : "text-zinc-500"}`}
              >
                E-mail / Usuário
              </label>
              <input
                type="text"
                name="usuario"
                required
                value={credenciais.usuario}
                onChange={atualizarLogin}
                placeholder="seu@email.com"
                className={`w-full rounded-xl p-3 text-sm outline-none transition-all border ${
                  isDarkMode
                    ? "bg-white/5 border-white/10 text-white focus:border-[#f27825]"
                    : "bg-zinc-100 border-zinc-200 text-zinc-900 focus:border-[#f27825] focus:bg-white"
                }`}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-white/40" : "text-zinc-500"}`}
                >
                  Senha
                </label>
                <a
                  href="#"
                  className="text-[11px] font-medium text-[#f27825] hover:underline"
                >
                  Esqueceu?
                </a>
              </div>
              <input
                type="password"
                name="senha"
                required
                value={credenciais.senha}
                onChange={atualizarLogin}
                placeholder="••••••••"
                className={`w-full rounded-xl p-3 text-sm outline-none transition-all border ${
                  isDarkMode
                    ? "bg-white/5 border-white/10 text-white focus:border-[#f27825]"
                    : "bg-zinc-100 border-zinc-200 text-zinc-900 focus:border-[#f27825] focus:bg-white"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f27825] hover:bg-[#d9651c] disabled:bg-zinc-600 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 mt-4 shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Entrar na Plataforma"
              )}
            </button>
          </form>
        ) : (
          /* FORMULÁRIO DE REGISTRO INTEGRADO COM IMC */
          <form onSubmit={ejecutarRegistro} className="space-y-4">
            <div>
              <label
                className={`block mb-1 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-white/40" : "text-zinc-500"}`}
              >
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                required
                value={registro.nome}
                onChange={atualizarRegistro}
                placeholder="Ex: Pedro Gomes"
                className={`w-full rounded-xl p-3 text-sm outline-none transition-all border ${
                  isDarkMode
                    ? "bg-white/5 border-white/10 text-white focus:border-[#f27825]"
                    : "bg-zinc-100 border-zinc-200 text-zinc-900 focus:border-[#f27825] focus:bg-white"
                }`}
              />
            </div>

            <div>
              <label
                className={`block mb-1 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-white/40" : "text-zinc-500"}`}
              >
                E-mail de Acesso
              </label>
              <input
                type="email"
                name="usuario"
                required
                value={registro.usuario}
                onChange={atualizarRegistro}
                placeholder="seu@email.com"
                className={`w-full rounded-xl p-3 text-sm outline-none transition-all border ${
                  isDarkMode
                    ? "bg-white/5 border-white/10 text-white focus:border-[#f27825]"
                    : "bg-zinc-100 border-zinc-200 text-zinc-900 focus:border-[#f27825] focus:bg-white"
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className={`block mb-1 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-white/40" : "text-zinc-500"}`}
                >
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  required
                  value={registro.senha}
                  onChange={atualizarRegistro}
                  placeholder="••••••••"
                  className={`w-full rounded-xl p-3 text-sm outline-none transition-all border ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 text-white focus:border-[#f27825]"
                      : "bg-zinc-100 border-zinc-200 text-zinc-900 focus:border-[#f27825] focus:bg-white"
                  }`}
                />
              </div>
              <div>
                <label
                  className={`block mb-1 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-white/40" : "text-zinc-500"}`}
                >
                  Confirmar
                </label>
                <input
                  type="password"
                  name="confirmarSenha"
                  required
                  value={registro.confirmarSenha}
                  onChange={atualizarRegistro}
                  placeholder="••••••••"
                  className={`w-full rounded-xl p-3 text-sm outline-none transition-all border ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 text-white focus:border-[#f27825]"
                      : "bg-zinc-100 border-zinc-200 text-zinc-900 focus:border-[#f27825] focus:bg-white"
                  }`}
                />
              </div>
            </div>

            {/* NOVOS CAMPOS ADICIONADOS: PESO E ALTURA */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <label
                  className={`block mb-1 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-white/40" : "text-zinc-500"}`}
                >
                  Peso Corporal (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="peso"
                  required
                  value={registro.peso}
                  onChange={atualizarRegistro}
                  placeholder="Ex: 78.5"
                  className={`w-full rounded-xl p-3 text-sm outline-none transition-all border ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 text-white focus:border-[#f27825]"
                      : "bg-zinc-100 border-zinc-200 text-zinc-900 focus:border-[#f27825] focus:bg-white"
                  }`}
                />
              </div>
              <div>
                <label
                  className={`block mb-1 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-white/40" : "text-zinc-500"}`}
                >
                  Altura (metros)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="altura"
                  required
                  value={registro.altura}
                  onChange={atualizarRegistro}
                  placeholder="Ex: 1.75"
                  className={`w-full rounded-xl p-3 text-sm outline-none transition-all border ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 text-white focus:border-[#f27825]"
                      : "bg-zinc-100 border-zinc-200 text-zinc-900 focus:border-[#f27825] focus:bg-white"
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f27825] hover:bg-[#d9651c] disabled:bg-zinc-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 mt-4 shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Criar Conta VittaFit"
              )}
            </button>
          </form>
        )}

        {/* ALTERNADOR DE ESTADO (FOOTER DO CARD) */}
        <div
          className={`mt-6 pt-4 border-t text-center ${isDarkMode ? "border-white/5" : "border-zinc-100"}`}
        >
          <p
            className={`text-xs font-light ${isDarkMode ? "text-white/40" : "text-zinc-500"}`}
          >
            {isLogin ? (
              <>
                Não possui uma conta?{" "}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setErro("");
                  }}
                  className="font-semibold text-[#f27825] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Cadastre-se grátis
                </button>
              </>
            ) : (
              <>
                Já faz parte da equipe?{" "}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setErro("");
                  }}
                  className="font-semibold text-[#f27825] hover:underline bg-transparent border-none cursor-pointer"
                >
                  Faça seu Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;