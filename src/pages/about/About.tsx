import { Heart, ShieldCheck, Users, Leaf, Lightning, Star, LinkedinLogo, InstagramLogo, GithubLogo} from "@phosphor-icons/react";



function Sobre() {
  const colaboradores  = [
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
    <div className="bg-[#074334] min-h-screen text-zinc-900">
      {/* HERO */}
      <section className="w-full px-6 py-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

          <h1 className="text-6xl text-[074334] font-black mt-6 flex flex-wrap justify-center gap-3">
            <span>SOBRE A </span>
            <span className="text-[#f27825]">VITTARUN</span>
          </h1>

          <h2 className="text-[#EAE0C8] font-bold text-2xl mt-6">
            EVOLUA SUA ROTINA, TODOS OS DIAS!
          </h2>

          <p className="max-w-3xl text-[#EAE0C8] text-lg mt-6 leading-relaxed">
            Seu diário digital fitness para registrar treinos, acompanhar dietas
            e compartilhar evolução com pessoas que possuem os mesmos objetivos.
          </p>
        </div>
      </section>

      {/* NOSSA HISTÓRIA */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* TEXTO */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#f27825] text-[#EAE0C8] w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl">
                1
              </span>

              <h2 className="text-5xl font-black">
                NOSSA{" "}
                <span className="text-[#f27825]">HISTÓRIA</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-[#EAE0C8]">
              <p>
                A VittaRun vai além de um serviço de entregas. Somos uma
                parceira na construção de uma rotina mais saudável, equilibrada
                e ativa.
              </p>

              <p>
                Nascemos de uma ideia simples: tornar escolhas saudáveis mais
                acessíveis no dia a dia. Hoje, seguimos criando uma comunidade
                conectada pelo bem-estar e pela qualidade de vida.
              </p>
            </div>
          </div>

          {/* IMAGEM */}
          <div>
            <img
              src="src\assets\kare-font\sobre-tela.jpg"
              alt="Treino colaborativo"
              className="rounded-[40px] w-full h-137.5 object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="px-6 py-20 bg-[#F4F1EB]">
        <div className="max-w-7xl mx-auto">
          {/* TITULO */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4">
              <span className="bg-[#074334] text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl">
                2
              </span>

              <h2 className="text-5xl font-black">
                NOSSOS{" "}
                <span className="text-[#074334]">VALORES</span>
              </h2>
            </div>

            <p className="text-[#074334] mt-6 text-lg">
              Os princípios que guiam nossas decisões e fortalecem nossa missão
              todos os dias.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            
            <p className="text-[#074334]">
              <CardValor
                icon={<Heart size={40} />}
                titulo="Disciplina e evolução"
                descricao="Acreditamos que pequenas ações diárias constroem grandes resultados."
                />
            </p>

            <p className="text-[#074334]">
              <CardValor
                icon={<ShieldCheck size={40} />}
                titulo="Saúde e bem-estar"
                descricao="Promovemos hábitos saudáveis através da alimentação e atividade física."
              />
            </p>

            <p className="text-[#074334]">
              <CardValor
                icon={<Users size={40} />}
                titulo="Comunidade"
                descricao="Conectamos aspessoas com objetivos semelhantes para evoluírem juntas."
              />
            </p>
            
            <p className="text-[#074334]">
              <CardValor
                icon={<Leaf size={40} />}
                titulo="Constância"
                descricao="Incentivamos a continuidade da rotina fitness todos os dias."
              />
            </p>

            <p className="text-[#074334]">
              <CardValor
                icon={<Lightning size={40} />}
                titulo="Constância"
                descricao="Transformamos pequenas ações diárias em grandes resultados ao longo do tempo."
              />
            </p>

            <p className="text-[#074334]">
              <CardValor
                icon={<Star size={40} />}
                titulo="Motivação"
                descricao="Transformamos evolução pessoal em inspiração para outras pessoas."
              />
            </p>
          </div>
        </div>
      </section>

      {/* COLABORADORES */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* TITULO */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4">
              <span className="bg-[#f27825] text-[#EAE0C8] w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl">
                3
              </span>

              <h2 className="text-5xl font-black">
                <span className="text-[#f27825]">COLABORADORES</span>
              </h2>
            </div>

            <p className="text-[#EAE0C8] mt-6 text-lg">
              O time que faz a Vittarun acontecer todos os dias.
            </p>
          </div>

          {/* Pessoa Colaboradora */}         
          <div className="flex flex-wrap justify-center gap-6  grid-cols-3">

            {colaboradores.map((colaborador, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl border border-zinc-200 p-8 w-75 flex flex-col items-center shadow-md hover:-translate-y-2 transition-all duration-300"
            >

              <img
                src={colaborador.foto}
                alt={colaborador.nome}
                className="w-28 h-28 rounded-full object-cover"
              />

              <h3 className="mt-5 text-xl font-bold text-[#074334] text-center">
                {colaborador.nome}
              </h3>

              <span className="text-[#074334] font-semibold text-center text-sm">
                {colaborador.cargo}
              </span>

              <div className="flex gap-4 mt-5">

                <a
                  href={colaborador.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-100 p-3 rounded-full hover:bg-black hover:text-white transition-all"
                >
                  <GithubLogo size={22} />
                </a>

                <a
                  href={colaborador.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-100 p-3 rounded-full hover:bg-[#074334] hover:text-white transition-all"
                >
                  <LinkedinLogo size={22} />
                </a>

                <a
                  href={colaborador.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-100 p-3 rounded-full hover:bg-[#f27825] hover:text-white transition-all"
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
}

function CardValor({ icon, titulo, descricao }: CardValorProps) {
  return (
    <div className="bg-white rounded-4xl border border-zinc-200 p-10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="bg-[#EEF7F1] w-20 h-20 rounded-full flex items-center justify-center text-[#074334] mx-auto">
        {icon}
      </div>

      <h3 className="text-2xl font-black text-center mt-8">{titulo}</h3>

      <div className="w-14 h-1 bg-[#F97316] rounded-full mx-auto mt-4"></div>

      <p className="text-zinc-600 text-center mt-6 leading-relaxed">
        {descricao}
      </p>
    </div>
  );
}

export default Sobre;