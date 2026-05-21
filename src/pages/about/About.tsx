import {
  Heart,
  ShieldCheck,
  Users,
  Leaf,
  Lightning,
  Star,
  LinkedinLogo,
  InstagramLogo,
  GithubLogo
} from "@phosphor-icons/react";

import sobre from "../../assets/sobre-tela.jpg";

interface SobreProps {
  isDarkMode: boolean;
}

function Sobre({ isDarkMode }: SobreProps) {
  const colaboradores = [
    {
      nome: "Lohanna Benjamim",
      cargo: "Front-end Developer",
      foto: "https://avatars.githubusercontent.com/u/188930169?v=4",
      github: "https://github.com/lohannab",
      linkedin: "https://www.linkedin.com/in/lohannab/",
      instagram: "https://www.instagram.com/lohannabr/"
    },
    {
      nome: "André Lucas",
      cargo: "Front-end Developer",
      foto: "https://avatars.githubusercontent.com/u/197832797?v=4",
      github: "https://github.com/luhdias-png",
      linkedin: "https://www.linkedin.com/in/andre-lucas-dias-lima/",
      instagram: "https://www.instagram.com/luhdias.gif/"
    },
    {
      nome: "Andressa Andrade",
      cargo: "Front-end Developer",
      foto: "https://avatars.githubusercontent.com/u/128521737?v=4",
      github: "https://github.com/Dessxevy",
      linkedin: "https://www.linkedin.com/in/andressa-andrade-dev/",
      instagram: "https://www.instagram.com/dessxevy/"
    },
    {
      nome: "Bruna Zuppini",
      cargo: "Front-end Developer",
      foto: "https://avatars.githubusercontent.com/u/48595147?s=400&u=37fda6b65b1ad54ff3d7d98f6f7662f12df7d2cc&v=4",
      github: "https://github.com/bruzuppini",
      linkedin: "https://www.linkedin.com/in/brunazuppini",
      instagram: "https://instagram.com/bruzuppini"
    },
    {
      nome: "Gabriel Coutinho",
      cargo: "Front-end Developer",
      foto: "https://avatars.githubusercontent.com/u/156151153?v=4",
      github: "https://github.com/gcoutinhoo",
      linkedin: "https://www.linkedin.com/in/gabriel-coutinho-de-souza/",
      instagram: "https://www.instagram.com/g_coutinhoo"
    },
    {
      nome: "Kay Ira do Val",
      cargo: "Sobre e Produtos Vitta",
      foto: "https://avatars.githubusercontent.com/u/260806102?v=4",
      github: "https://github.com/kayanedvlsantos-create",
      linkedin: "https://www.linkedin.com/in/kayane-do-val-lima/",
      instagram: "https://www.instagram.com/ratomanchado/"
    },
    {
      nome: "Douglas Santos",
      cargo: "Front-end Developer",
      foto: "https://avatars.githubusercontent.com/u/99764080?v=4",
      github: "https://github.com/DougSan7",
      linkedin: "https://www.linkedin.com/in/douglas-santos-ds/",
      instagram: "https://www.instagram.com/douglas_san7/"
    }
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-[#074334] text-white"
          : "bg-zinc-300 text-[#074334]"
      }`}
    >
      {/* HERO */}
      <section className="w-full px-6 py-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

          <h1
            className={`text-6xl font-black mt-6 flex flex-wrap justify-center gap-3 ${
              isDarkMode ? "text-white" : "text-[#074334]"
            }`}
          >
            <span>SOBRE A</span>

            <span className={`${isDarkMode ?"text-[#f27825]" :"text-[#f27825]"}`}>
              VITTARUN
            </span>
          </h1>

          <h2
            className={`font-bold text-2xl mt-6 ${
              isDarkMode
                ? "text-[#EAE0C8]"
                : "text-[#074334]"
            }`}
          >
            EVOLUA SUA ROTINA, TODOS OS DIAS!
          </h2>

          <p
            className={`max-w-3xl text-lg mt-6 leading-relaxed ${
              isDarkMode
                ? "text-[#EAE0C8]"
                : "text-zinc-700"
            }`}
          >
            Seu diário digital fitness para registrar treinos,
            acompanhar dietas e compartilhar evolução com pessoas
            que possuem os mesmos objetivos.
          </p>
        </div>
      </section>

      {/* NOSSA HISTÓRIA */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className={`${isDarkMode ? "bg-[#f27825]" : "bg-[#074334]"} text-[#EAE0C8] w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl`}>
                1
              </span>

              <h2
                className={`text-5xl font-black ${
                  isDarkMode
                    ? "text-white"
                    : "text-[#f27825]"
                }`}
              >
                NOSSA{" "}

                <span className={`${isDarkMode ? "text-[#f27825]" : "text-[#074334]"}`}>
                  HISTÓRIA
                </span>
              </h2>
            </div>

            <div
              className={`space-y-6 text-lg leading-relaxed ${
                isDarkMode
                  ? "text-[#EAE0C8]"
                  : "text-zinc-700"
              }`}
            >
              <p>
                A VittaRun vai além de um serviço de entregas.
                Somos uma parceira na construção de uma rotina
                mais saudável, equilibrada e ativa.
              </p>

              <p>
                Nascemos de uma ideia simples: tornar escolhas
                saudáveis mais acessíveis no dia a dia.
              </p>
            </div>
          </div>

          <div>
            <img
              src={sobre}
              alt="Treino colaborativo"
              className="rounded-[40px] w-full h-137.5 object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section
        className={`px-6 py-20 transition-colors duration-500 ${
          isDarkMode
            ? "bg-[#06372b]"
            : "bg-zinc-100"
        }`}
      >
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4">

              <span
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl ${
                  isDarkMode
                    ? "bg-[#f27825] text-white"
                    : "bg-[#074334] text-white"
                }`}
              >
                2
              </span>

              <h2
                className={`text-5xl font-black ${
                  isDarkMode
                    ? "text-white"
                    : "text-[#074334]"
                }`}
              >
                NOSSOS{" "}

                <span className="text-[#f27825]">
                  VALORES
                </span>
              </h2>
            </div>

            <p
              className={`mt-6 text-lg ${
                isDarkMode
                  ? "text-zinc-300"
                  : "text-[#074334]"
              }`}
            >
              Os princípios que guiam nossas decisões.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">

            <CardValor
              icon={<Heart size={40} />}
              titulo="Disciplina e evolução"
              descricao="Acreditamos que pequenas ações diárias constroem grandes resultados."
              isDarkMode={isDarkMode}
            />

            <CardValor
              icon={<ShieldCheck size={40} />}
              titulo="Saúde e bem-estar"
              descricao="Promovemos hábitos saudáveis através da alimentação e atividade física."
              isDarkMode={isDarkMode}
            />

            <CardValor
              icon={<Users size={40} />}
              titulo="Comunidade"
              descricao="Conectamos as pessoas com objetivos semelhantes."
              isDarkMode={isDarkMode}
            />

            <CardValor
              icon={<Leaf size={40} />}
              titulo="Constância"
              descricao="Incentivamos a continuidade da rotina fitness."
              isDarkMode={isDarkMode}
            />

            <CardValor
              icon={<Lightning size={40} />}
              titulo="Evolução"
              descricao="Transformamos pequenas ações em grandes resultados."
              isDarkMode={isDarkMode}
            />

            <CardValor
              icon={<Star size={40} />}
              titulo="Motivação"
              descricao="Inspiramos evolução pessoal diariamente."
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* COLABORADORES */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4">

              <span className={`${isDarkMode ? "bg-[#f27825]" : "bg-[#074334]"} text-[#EAE0C8] w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl`}>
                3
              </span>

              <h2 className="text-5xl font-black text-[#f27825]">
                COLABORADORES
              </h2>
            </div>

            <p
              className={`mt-6 text-lg ${
                isDarkMode
                  ? "text-[#EAE0C8]"
                  : "text-zinc-700"
              }`}
            >
              O time que faz a Vittarun acontecer todos os dias.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">

            {colaboradores.map((colaborador, index) => (
              <div
                key={index}
                className={`rounded-3xl border p-8 w-75 flex flex-col items-center shadow-md hover:-translate-y-2 transition-all duration-300 ${
                  isDarkMode
                    ? "bg-[#06372b] border-white/10"
                    : "bg-white border-zinc-200"
                }`}
              >
                <img
                  src={colaborador.foto}
                  alt={colaborador.nome}
                  className="w-28 h-28 rounded-full object-cover"
                />

                <h3
                  className={`mt-5 text-xl font-bold text-center ${
                    isDarkMode
                      ? "text-white"
                      : "text-[#074334]"
                  }`}
                >
                  {colaborador.nome}
                </h3>

                <span
                  className={`font-semibold text-center text-sm ${
                    isDarkMode
                      ? "text-zinc-300"
                      : "text-[#074334]"
                  }`}
                >
                  {colaborador.cargo}
                </span>

                <div className="flex gap-4 mt-5">

                  <a
                    href={colaborador.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all ${
                      isDarkMode
                        ? "bg-white/10 hover:bg-black hover:text-white"
                        : "bg-zinc-100 hover:bg-black hover:text-white"
                    }`}
                  >
                    <GithubLogo size={22} />
                  </a>

                  <a
                    href={colaborador.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all ${
                      isDarkMode
                        ? "bg-white/10 hover:bg-[#074334] hover:text-white"
                        : "bg-zinc-100 hover:bg-[#074334] hover:text-white"
                    }`}
                  >
                    <LinkedinLogo size={22} />
                  </a>

                  <a
                    href={colaborador.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all ${
                      isDarkMode
                        ? "bg-white/10 hover:bg-[#f27825] hover:text-white"
                        : "bg-zinc-100 hover:bg-[#f27825] hover:text-white"
                    }`}
                  >
                    <InstagramLogo size={22} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

interface CardValorProps {
  icon: React.ReactNode;
  titulo: string;
  descricao: string;
  isDarkMode: boolean;
}

function CardValor({
  icon,
  titulo,
  descricao,
  isDarkMode
}: CardValorProps) {
  return (
    <div
      className={`rounded-4xl border p-10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
        isDarkMode
          ? "bg-[#074334] border-white/10"
          : "bg-white border-zinc-200"
      }`}
    >
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
          isDarkMode
            ? "bg-white/10 text-white"
            : "bg-[#EEF7F1] text-[#074334]"
        }`}
      >
        {icon}
      </div>

      <h3
        className={`text-2xl font-black text-center mt-8 ${
          isDarkMode
            ? "text-white"
            : "text-[#074334]"
        }`}
      >
        {titulo}
      </h3>

      <div className="w-14 h-1 bg-[#F97316] rounded-full mx-auto mt-4"></div>

      <p
        className={`text-center mt-6 leading-relaxed ${
          isDarkMode
            ? "text-zinc-300"
            : "text-zinc-600"
        }`}
      >
        {descricao}
      </p>
    </div>
  );
}

export default Sobre;