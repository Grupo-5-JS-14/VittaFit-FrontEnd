import { useEffect, useState } from "react";
import { buscar, cadastrar, deletar } from "../../services/Service";
import { Plus, Loader2, SlidersHorizontal, ArrowUpRight, Ban, Sparkles, ShieldAlert, HeartPulse } from "lucide-react";
import ListaDieta from "../../components/dietas/listadieta/ListaDieta";
import FormDieta from "../../components/dietas/formdieta/FormDieta";
import type Dieta from "../../models/Dieta";

interface DietasProps {
  isDarkMode?: boolean;
}

export default function Dietas({ isDarkMode = true }: DietasProps) {
  const usuarioSalvo = localStorage.getItem("usuario");
  const usuarioLogado = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [abrirForm, setAbrirForm] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState("TODAS");

  // ARRAY ESTRUTURADO PARA O MOSAICO DE INFRAESTRUTURA/CONSCIENTIZAÇÃO
  const sugestoesMindset = [
    {
      tipo: "texto",
      titulo: "Sem Atalhos Facilitados",
      descricao: "O corpo responde a estímulos constantes e adaptações graduais. Soluções imediatistas desregulam o organismo, cobrando um preço alto da sua saúde física mais adiante.",
      icon: <Ban size={14} className="text-white" />,
      gridClass: "md:col-span-2 md:row-span-1",
    },
    {
      tipo: "imagem",
      url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
      alt: "Consistência Humana",
      gridClass: "md:col-span-1 md:row-span-1 h-48 md:h-auto",
    },
    {
      tipo: "texto",
      titulo: "Alimentos vs Remédios",
      descricao: "Uma rotina alimentar estratégica age na causa biológica da vitalidade, corrigindo a disposição de forma limpa. Não amorteça sintomas se você pode nutrir a sua recuperação.",
      icon: <Sparkles size={14} className="text-white" />,
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      tipo: "imagem",
      url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop",
      alt: "Nutrição Limpa",
      gridClass: "md:col-span-1 md:row-span-1 h-48 md:h-auto",
    },
    {
      tipo: "texto",
      titulo: "O Perigo de Pular Horários",
      descricao: "Omitir refeições sabota seu metabolismo protetor, gerando catabolismo muscular e picos inflamatórios de cortisol. Abasteça suas janelas de energia com precisão.",
      icon: <ShieldAlert size={14} className="text-white" />,
      gridClass: "md:col-span-2 md:row-span-1",
    },
    {
      tipo: "texto",
      titulo: "Suporte Clínico Real",
      descricao: "Dados e aplicativos auxiliam no monitoramento diário, mas jamais substituem a análise laboratorial individualizada e a conduta de um médico ou nutricionista.",
      icon: <HeartPulse size={14} className="text-white" />,
      gridClass: "md:col-span-1 md:row-span-1",
    },
  ];

  async function carregarDietas() {
    setIsLoading(true);
    try {
      await buscar("/dietas", (dados: Dieta[]) => setDietas(dados));
    } catch (e) { 
      console.error("Erro ao carregar dietas:", e); 
    } finally { 
      setIsLoading(false); 
    }
  }

  useEffect(() => { 
    carregarDietas(); 
  }, []);

  async function handleAdicionar(nova: Omit<Dieta, "id" | "usuario">) {
    if (!usuarioLogado?.id) return;
    const payload = { ...nova, usuario: { id: usuarioLogado.id } };
    const res = await cadastrar("/dietas", payload);
    setDietas([res, ...dietas]);
  }

  async function handleDeletar(id: number) {
    if (!confirm("Deseja realmente excluir este planejamento?")) return;
    try {
      await deletar(`/dietas/${id}`);
      setDietas(dietas.filter(d => d.id !== id));
    } catch (e) {
      console.error("Erro ao deletar dieta:", e);
    }
  }

  const dietasFiltradas = dietas.filter((dieta) => {
    return filtroTipo === "TODAS" || dieta.tipo?.toUpperCase().includes(filtroTipo);
  });

  return (
    <main className={`min-h-screen px-4 md:px-8 py-28 transition-colors duration-500 selection:bg-white/10 ${
      isDarkMode ? "bg-[#074334] text-white" : "bg-[#f27825] text-white"
    }`}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HERO HEADER */}
        <div className={`relative overflow-hidden rounded-3xl p-8 md:p-14 border transition-all duration-500 ${
          isDarkMode 
            ? "bg-linear-to-br from-[#06372b] to-[#074334] border-white/10 shadow-2xl shadow-black/30" 
            : "bg-linear-to-br from-[#df6613] to-[#f27825] border-white/20 shadow-2xl shadow-black/10"
        }`}>
          <div className="relative z-10 max-w-2xl">
            <p className={`text-[11px] font-bold tracking-[0.25em] uppercase mb-3 transition-colors ${
              isDarkMode ? "text-[#f27825]" : "text-[#074334]"
            }`}>
              Nutrição & Composição Corporal
            </p>
            <h1 className="font-kare text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">
              MINHAS <br />
              DIETAS
            </h1>
            <p className="mt-4 text-xs md:text-sm leading-relaxed font-light text-white/80 max-w-md">
              Monitore seus planejamentos alimentares, controle a divisão de macronutrientes e registre variações de IMC.
            </p>
          </div>
        </div>

        {/* CONTROLES E FILTROS */}
        <div className={`rounded-2xl p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-500 backdrop-blur-md ${
          isDarkMode ? "bg-black/20 border-white/10" : "bg-white/10 border-white/20"
        }`}>
          <div className="relative flex items-center flex-1">
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="appearance-none w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold tracking-wider uppercase text-white outline-none focus:border-white/30 cursor-pointer pr-10"
            >
              <option value="TODAS" className="bg-[#074334] text-white">TODOS OS OBJETIVOS</option>
              <option value="BULKING" className="bg-[#074334] text-white">BULKING LIMPO</option>
              <option value="CUTTING" className="bg-[#074334] text-white">CUTTING / DEFINIÇÃO</option>
              <option value="MANUTENCAO" className="bg-[#074334] text-white">MANUTENÇÃO</option>
            </select>
            <SlidersHorizontal size={12} className="absolute right-4 text-white/50 pointer-events-none" />
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
            Novo Plano
          </button>
        </div>

        {/* FORMULÁRIO DE CADASTRO */}
        {abrirForm && (
          <FormDieta 
            isDarkMode={isDarkMode} 
            onAdicionar={handleAdicionar} 
            onFechar={() => setAbrirForm(false)} 
          />
        )}

        {/* FEED OU REQUISICAO */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/60">
            <Loader2 className="animate-spin text-white" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Sincronizando Nutrientes...</span>
          </div>
        ) : (
          <ListaDieta 
            dietas={dietasFiltradas} 
            isDarkMode={isDarkMode} 
            onDeletar={handleDeletar} 
          />
        )}

        {/* SEÇÃO EXTRA: GRID MOSAICO DE DIRETRIZES NUTRICIONAIS */}
        <section className="pt-8 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-kare text-2xl font-black uppercase tracking-tight">
              PILARES DA CONSTANCIA
            </h2>
            <p className="text-[11px] font-light text-white/60 uppercase tracking-wider mt-1">
              Mentalidade de alta performance e proteção metabólica
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {sugestoesMindset.map((item, index) =>
              item.tipo === "texto" ? (
                /* Card de Dica Teórica */
                <div
                  key={index}
                  className={`relative overflow-hidden p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 backdrop-blur-md ${
                    isDarkMode ? "bg-black/20" : "bg-white/10"
                  } ${item.gridClass}`}
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
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
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
        </section>

      </div>
    </main>
  );
}