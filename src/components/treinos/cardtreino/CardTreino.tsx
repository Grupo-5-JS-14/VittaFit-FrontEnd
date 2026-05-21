import { Dumbbell, Activity, CalendarDays, Trash2 } from "lucide-react";
import type Treino from "../../../models/Treino";

interface CardTreinoProps {
  treino: Treino;
  isDarkMode: boolean;
  onDeletar?: (id: number) => void;
}

function CardTreino({ treino, isDarkMode, onDeletar }: CardTreinoProps) {
  function formatarData(dataStr: string) {
    if (!dataStr) return "SEM DATA";
    const dataObj = new Date(dataStr);
    if (Number.isNaN(dataObj.getTime())) return dataStr.toUpperCase();
    return dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  // Determina as cores da tag de intensidade dinamicamente com base no tema e valor
  const eIntensa = treino.intensidade === "INTENSA";

  return (
    <div
      className={`group relative w-full max-w-4xl overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 backdrop-blur-md ${
        isDarkMode
          ? "border-white/10 bg-black/20 shadow-2xl shadow-black/30 hover:border-white/20"
          : "border-white/20 bg-white/10 shadow-xl shadow-black/5 hover:border-white/30"
      }`}
    >
      {/* Efeitos sutis de iluminação de fundo no Hover baseados na paleta */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
        <div className={`absolute -left-10 top-0 h-40 w-40 rounded-full blur-3xl opacity-10 ${
          isDarkMode ? "bg-[#f27825]" : "bg-[#074334]"
        }`} />
        <div className={`absolute bottom-0 right-0 h-40 w-40 rounded-full blur-3xl opacity-10 ${
          isDarkMode ? "bg-[#074334]" : "bg-[#f27825]"
        }`} />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 items-center">
            <img
              src={treino.usuario?.foto || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Foto do usuário"
              className={`h-14 w-14 md:h-16 md:w-16 rounded-full border object-cover shadow-lg transition-colors duration-500 ${
                isDarkMode ? "border-[#f27825]/40" : "border-[#074334]/40"
              }`}
            />

            <div className="flex flex-col justify-center">
              <h2 className="font-kare text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-none">
                {treino.tipoTreino}
              </h2>

              <span className={`mt-2 w-fit rounded-lg px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white/90 transition-all duration-300 ${
                isDarkMode ? "bg-white/10" : "bg-black/20"
              }`}>
                🏋️ SESSÃO OPERACIONAL
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-1.5 text-white/60">
              <CalendarDays size={13} className="text-white/40" />
              <span className="text-[10px] md:text-xs font-bold tracking-wider">
                {formatarData(treino.data)}
              </span>
            </div>
            
            {onDeletar && (
              <button
                type="button"
                onClick={() => onDeletar(treino.id)}
                className={`cursor-pointer p-2 rounded-xl border transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-red-500/20 hover:border-red-500/30" 
                    : "bg-black/10 border-white/10 text-white/60 hover:text-white hover:bg-red-600/30 hover:border-red-600/40"
                }`}
              >
                <Trash2 size={13} className="stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs md:text-sm leading-relaxed font-light text-white/80 max-w-3xl">
            {treino.descricao}
          </p>
        </div>

        {/* Linha divisória minimalista */}
        <div className="my-5 h-px w-full bg-white/10" />

        {/* Grid de Sub-métricas do Card */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          
          {/* Métrica 1: Categoria */}
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/10 p-3.5">
            <div className={`rounded-lg p-2.5 text-white transition-colors duration-500 ${
              isDarkMode ? "bg-[#074334]/50" : "bg-[#f27825]/50"
            }`}>
              <Dumbbell size={16} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">GRUPO MUSCULAR</p>
              <h3 className="text-xs font-black uppercase text-white mt-0.5 tracking-wide">{treino.tipoTreino}</h3>
            </div>
          </div>

          {/* Métrica 2: Intensidade com badge dinâmico inteligente */}
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/10 p-3.5">
            <div className={`rounded-lg p-2.5 text-white transition-colors duration-500 ${
              eIntensa 
                ? "bg-red-500/20 text-red-400" 
                : isDarkMode ? "bg-[#f27825]/30 text-[#f27825]" : "bg-[#074334]/30 text-[#074334]"
            }`}>
              <Activity size={16} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">INTENSIDADE DO COMPROMISSO</p>
              <h3 className={`text-xs font-black uppercase mt-0.5 tracking-wide ${
                eIntensa ? "text-red-400" : "text-white"
              }`}>
                {treino.intensidade}
              </h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CardTreino;