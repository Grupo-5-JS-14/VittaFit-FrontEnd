import { useEffect, useState } from "react";
import { buscar, cadastrar, deletar } from "../../services/Service";
import { Plus, Loader2, SlidersHorizontal, Target, Flame, Compass, ArrowUpRight } from "lucide-react";
import FormTreino from "../../components/treinos/formtreino/FormTreino";
import ListaTreinos from "../../components/treinos/listatreino/ListaTreino";
import type Treino from "../../models/Treino";


interface TreinosProps {
  isDarkMode?: boolean;
}

function Treinos({ isDarkMode = true }: TreinosProps) {
  const usuarioSalvo = localStorage.getItem("usuario");
  const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [abrirForm, setAbrirForm] = useState(false);

  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroIntensidade, setFiltroIntensidade] = useState("TODAS");

  const sugestoesMindset = [
    {
      tipo: "texto",
      icon: <Target className="text-white" size={20} />,
      titulo: "REGRA DOS 15 MINUTOS",
      descricao: "Nos dias de desmotivação, prometa a si mesmo treinar por apenas 15 minutos. Na maioria das vezes, o cérebro vence a inércia inicial e você conclui a sessão inteira.",
      gridClass: "md:col-span-2 h-[220px] bg-black/30",
    },
    {
      tipo: "imagem",
      url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
      alt: "Foco Operacional",
      gridClass: "md:col-span-1 h-[220px]",
    },
    {
      tipo: "texto",
      icon: <Flame className="text-white" size={20} />,
      titulo: "DISCIPLINA > MOTIVAÇÃO",
      descricao: "A motivação faz você começar, mas é o hábito automatizado que te mantém no jogo quando o cansaço mental aparece. Trate o treino como um compromisso inegociável.",
      gridClass: "md:col-span-1 h-[220px] bg-black/40",
    },
    {
      tipo: "imagem",
      url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
      alt: "Consistência de Carga",
      gridClass: "md:col-span-1 h-[220px]",
    },
    {
      tipo: "texto",
      icon: <Compass className="text-white" size={20} />,
      titulo: "REGISTRE CADA EVOLUÇÃO",
      descricao: "Alimentar o seu histórico de treinos diariamente gera um gatilho de recompensa visual no cérebro. Olhar para trás e ver a sequência construída impede você de quebrar a corrente.",
      gridClass: "md:col-span-3 h-[220px] bg-black/20",
    }
  ];

  async function carregarTreinos() {
    setIsLoading(true);
    try {
      await buscar("/treinos", (dados: Treino[]) => {
        setTreinos(dados);
        localStorage.setItem("treinosCache", JSON.stringify(dados));
      });
    } catch (error) {
      console.error("Erro ao carregar os treinos do back-end:", error);
      const cache = localStorage.getItem("treinosCache");
      if (cache) setTreinos(JSON.parse(cache));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    carregarTreinos();
  }, []);

  async function handleAdicionarTreino(novoTreino: Omit<Treino, "id" | "usuario">) {
    if (!usuarioLogado || !usuarioLogado.id) {
      alert("Erro: Você precisa estar autenticado para registrar um treino.");
      return;
    }

    const payload = {
      ...novoTreino,
      usuario: { id: usuarioLogado.id },
    };

    try {
      const dadosRetornados: Treino = await cadastrar("/treinos", payload);
      setTreinos((antigos) => [dadosRetornados, ...antigos]);
    } catch (error) {
      console.error("Erro ao salvar treino no banco. Criando em modo offline...", error);
      const treinoMock: Treino = {
        ...novoTreino,
        id: Date.now(),
        usuario: usuarioLogado,
      };
      setTreinos((antigos) => [treinoMock, ...antigos]);
    }
  }

  async function handleDeletarTreino(id: number) {
    if (!confirm("Deseja realmente excluir esse registro de treino?")) return;

    try {
      await deletar(`/treinos/${id}`);
      setTreinos((antigos) => antigos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao deletar treino no servidor, removendo do estado local.", error);
      setTreinos((antigos) => antigos.filter((t) => t.id !== id));
    }
  }

  const treinosFiltrados = treinos.filter((treino) => {
    const correspondeTexto =
      treino.tipoTreino?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      treino.descricao?.toLowerCase().includes(filtroTexto.toLowerCase());

    const correspondeIntensidade =
      filtroIntensidade === "TODAS" || treino.intensidade === filtroIntensidade;

    return correspondeTexto && correspondeIntensidade;
  });

  return (
    <main className={`min-h-screen transition-colors duration-500 px-4 md:px-8 py-28 selection:bg-white/10 ${
      isDarkMode ? "bg-[#074334] text-white" : "bg-[#f27825] text-white"
    }`}>
      <section className="max-w-4xl mx-auto space-y-12">
        
        {/* HERO HEADER */}
        <div className={`relative overflow-hidden rounded-3xl p-8 md:p-14 border transition-all duration-500 ${
          isDarkMode 
            ? "bg-linear-to-br from-[#06372b] to-[#074334] border-white/10 shadow-2xl shadow-black/30" 
            : "bg-linear-to-br from-[#df6613] to-[#f27825] border-white/20 shadow-2xl shadow-black/10"
        }`}>
          <div className={`absolute -right-12 -top-12 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-colors ${
            isDarkMode ? "bg-[#f27825]" : "bg-[#074334]"
          }`} />
          
          <div className="relative z-10 max-w-2xl">
            <p className={`text-[11px] font-bold tracking-[0.25em] uppercase mb-3 ${
              isDarkMode ? "text-[#f27825]" : "text-[#074334]"
            }`}>
              Sua saúde sob controle diário
            </p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none select-none">
              MEUS <br />
              TREINOS
            </h1>
            <p className="mt-4 text-xs md:text-sm leading-relaxed font-light text-white/80 max-w-md">
              Acompanhe sua evolução física, monitore a consistência e gerencie a intensidade de cada sessão em alta performance.
            </p>
          </div>
        </div>

        {/* CONTROLES E FILTROS */}
        <div className={`rounded-2xl p-4 border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-500 backdrop-blur-md ${
          isDarkMode ? "bg-black/20 border-white/10" : "bg-white/10 border-white/20"
        }`}>
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
              placeholder="BUSCAR POR GRUPO OU DESCRIÇÃO..."
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold tracking-wider uppercase text-white placeholder-white/40 outline-none focus:border-white/30 transition-all duration-300"
            />

            <div className="relative flex items-center">
              <select
                value={filtroIntensidade}
                onChange={(e) => setFiltroIntensidade(e.target.value)}
                className="appearance-none bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold tracking-wider uppercase text-white outline-none focus:border-white/30 transition-all duration-300 cursor-pointer pr-10"
              >
                <option value="TODAS" className="bg-[#074334] text-white">TODAS INTENSIDADES</option>
                <option value="LEVE" className="bg-[#074334] text-white">LEVE</option>
                <option value="MODERADA" className="bg-[#074334] text-white">MODERADA</option>
                <option value="INTENSA" className="bg-[#074334] text-white">INTENSA</option>
              </select>
              <SlidersHorizontal size={12} className="absolute right-4 text-white/50 pointer-events-none" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAbrirForm(true)}
            className={`group cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] ${
              isDarkMode 
                ? "bg-[#f27825] hover:bg-[#df6613] text-white shadow-lg shadow-[#f27825]/20" 
                : "bg-[#074334] hover:bg-[#053227] text-white shadow-lg shadow-[#074334]/20"
            }`}
          >
            <Plus size={14} className="stroke-3 transition-transform group-hover:rotate-90 duration-300" />
            Novo Registro
          </button>
        </div>

        {/* MODAL / FORMULÁRIO */}
        {abrirForm && (
          <FormTreino
            isDarkMode={isDarkMode}
            onAdicionar={handleAdicionarTreino}
            onFechar={() => setAbrirForm(false)}
          />
        )}

        {/* FEED DE TREINOS */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/60">
            <Loader2 className="animate-spin text-white" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Sincronizando Módulos...</span>
          </div>
        ) : (
          <ListaTreinos
            treinos={treinosFiltrados}
            isDarkMode={isDarkMode}
            onDeletar={handleDeletarTreino}
          />
        )}

        {/* --- NOVA SEÇÃO: GALERIA DE CARD SUGESTÕES DE MINDSET & DISCIPLINA --- */}
        <hr className="border-white/10" />
        
        <div className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5 ${
                isDarkMode ? "text-gray-400" : "text-[#074334]"
              }`}>
                Mentalidade Executiva
              </p>
              <h2 className="font-black text-2xl md:text-3xl uppercase tracking-tight leading-none">
                CONSTRUINDO <span className={isDarkMode ? "text-[#f27825]" : "text-[#074334]"}>DISCIPLINA</span>
              </h2>
            </div>
            <p className="text-xs max-w-xs font-light leading-relaxed text-white/70">
              Pilares básicos para blindar a sua mente contra a procrastinação e manter o ritmo operacional.
            </p>
          </div>

          {/* Grid Mosaico de Dicas e Imagens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {sugestoesMindset.map((item, index) =>
              item.tipo === "texto" ? (
                /* Card de Dica Teórica */
                <div
                  key={index}
                  className={`relative overflow-hidden p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 ${item.gridClass}`}
                >
                  <div className="space-y-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md ${
                      isDarkMode ? "bg-white/10" : "bg-black/20"
                    }`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xs font-black tracking-wider uppercase text-white">
                      {item.titulo}
                    </h3>
                    <p className="text-[11px] font-light text-white/70 leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={14} className="text-white/40" />
                  </div>
                </div>
              ) : (
                /* Card de Imagem Estilizada com Blend Mode */
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 group ${item.gridClass}`}
                >
                  <div className={`absolute inset-0 z-10 transition-colors duration-500 pointer-events-none mix-blend-multiply opacity-30 ${
                    isDarkMode ? "bg-[#074334]" : "bg-[#f27825]"
                  }`} />
                  <img
                    src={item.url}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale mix-blend-luminosity scale-100 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out brightness-[0.75]"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md text-white/90">
                      {item.alt}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

      </section>
    </main>
  );
}

export default Treinos;