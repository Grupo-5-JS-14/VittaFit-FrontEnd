import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { api } from "../../services/Service";
import type { Usuario } from "../../models/Usuario";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [usuario, setUsuario] =
    useState<Usuario>({
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      altura: 0,
      peso: 0,
    });

  function atualizarEstado(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {

      if (isLogin) {

        const resposta = await api.post(
          "/usuarios",
          {
            usuario: usuario.usuario,
            senha: usuario.senha,
          }
        );

        localStorage.setItem(
          "usuario",
          JSON.stringify(resposta.data)
        );

        alert("Login realizado!");

      } else {

        await api.post(
          "/usuarios",
          usuario
        );

        alert("Usuário cadastrado!");

        setIsLogin(true);
      }

      navigate("/home");

    } catch (error) {

      console.log(error);

      alert(
        "Erro ao autenticar usuário!"
      );
    }
  }

  return (
    <section className="min-h-screen bg-[#F7FAF7] flex ">

      {/* IMAGEM */}
      <div className="w-full lg:w-1/2  p-5 ">
        <img
          src="/public/person-jogging-park.jpg"
          alt="VittaFit"
          className="w-full h-full object-cover object-center rounded-3xl shadow-2xl"
        />
      </div>

      {/* FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className=" w-full max-w-md rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8">

          {/* LOGO */}
          <div className="mb-10">

            <h1 className="text-3xl font-semibold text-[#1F2937]">VittaFit</h1>

            <p className="text-[#6B7280] mt-2">Mais constância. Mais disciplina. Mais resultado.</p>
          </div>

          {/* TOGGLE */}
          <div className="relative flex bg-[#E5E7EB] p-1 rounded-full mb-10">

            {/* BACKGROUND */}
            <div
              className={` absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#2E9E45] transition-all duration-300 ease-in-out
                ${
                  isLogin
                    ? "left-1"
                    : "left-[calc(50%)]"
                }
              `}
            />

            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={` relative z-10 flex-1 py-2.5 rounded-full text-sm font-medium transition-colors
                ${
                  isLogin
                    ? "text-white"
                    : "text-[#1F2937]"
                }
              `}
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={` relative z-10 flex-1 py-2.5 rounded-full text-sm font-medium transition-colors
                ${
                  !isLogin
                    ? "text-white"
                    : "text-[#1F2937]"
                }
              `}
            >
              Criar conta
            </button>
          </div>

          {/* TITULO */}
          <div className="mb-8">

            <h2 className="text-4xl font-semibold text-[#1F2937] mb-3">

              {isLogin
                ? "Faça login"
                : "Crie sua conta"}

            </h2>

            <p className="text-[#6B7280]">

              {isLogin
                ? "Entre para continuar sua jornada."
                : "Cadastre-se para acessar a plataforma."}

            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <AnimatePresence mode="wait">

              {!isLogin && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >

                  {/* NOME */}
                  <input
                    type="text"
                    required
                    placeholder="Nome completo"
                    name="nome"
                    value={usuario.nome}
                    onChange={atualizarEstado}
                    className="w-full bg-white border border-[#E5E7EB] rounded-2xl px-4 py-4 outline-none transition-all duration-200 focus:border-[#2E9E45] focus:ring-4 focus:ring-[#2E9E45]/10"/>
                </motion.div>
              )}
            </AnimatePresence>

            {/* EMAIL */}
            <input
              type="email"
              required
              placeholder="E-mail"
              name="usuario"
              value={usuario.usuario}
              onChange={atualizarEstado}
              className="w-full bg-white border border-[#E5E7EB] rounded-2xl px-4 py-4 outline-none transition-all duration-200 focus:border-[#2E9E45] focus:ring-4 focus:ring-[#2E9E45]/10"/>

            <AnimatePresence>

              {!isLogin && (

                <>
                  {/* ALTURA */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="Altura"
                      name="altura"
                      value={usuario.altura}
                      onChange={atualizarEstado}
                      className=" w-full bg-white border border-[#E5E7EB] rounded-2xl px-4 py-4 outline-none transition-all duration-200 focus:border-[#2E9E45] focus:ring-4 focus:ring-[#2E9E45]/10"/>
                  </motion.div>

                  {/* PESO */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="Peso"
                      name="peso"
                      value={usuario.peso}
                      onChange={atualizarEstado}
                      className="w-full bg-white border border-[#E5E7EB] rounded-2xl px-4 py-4 outline-none transition-all duration-200 focus:border-[#2E9E45] focus:ring-4 focus:ring-[#2E9E45]/10"/>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
              
              <AnimatePresence>

                {!isLogin && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >

                    <input
                      type="text"
                      placeholder="URL da foto"
                      name="foto"
                      value={usuario.foto}
                      onChange={atualizarEstado}
                      className=" w-full bg-white border border-[#E5E7EB] rounded-2xl px-4 py-4 outline-none transition-all duration-200 focus:border-[#2E9E45] focus:ring-4 focus:ring-[#2E9E45]/10"/>

                  </motion.div>
                )}

              </AnimatePresence>
            

            {/* SENHA */}
            <input
              type="password"
              required
              placeholder="Senha"
              name="senha"
              value={usuario.senha}
              onChange={atualizarEstado}
              className="w-full bg-white border border-[#E5E7EB] rounded-2xl px-4 py-4 outline-none transition-all duration-200 focus:border-[#2E9E45] focus:ring-4 focus:ring-[#2E9E45]/10"/>

            {/* BOTÃO */}
            <button
              type="submit"
              className="w-full bg-[#2E9E45] text-white rounded-full py-4 mt-4 font-medium transition-all duration-300 hover:bg-[#1F6E31] hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLogin
                ? "Continuar"
                : "Criar conta"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default Login;