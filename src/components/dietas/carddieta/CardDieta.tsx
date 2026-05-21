import { CalendarDays, Flame, Ham, Wheat, Trash2, Activity } from "lucide-react";
import type Dieta from "../../../models/Dieta";

interface CardDietaProps {
  dieta: Dieta;
  isDarkMode: boolean;
  onDeletar?: (id: number) => void;
}

function CardDieta({ dieta, isDarkMode, onDeletar }: CardDietaProps) {
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

  return (
    <div className={`group relative w-full max-w-4xl overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 backdrop-blur-md ${
      isDarkMode ? "border-white/10 bg-black/20 shadow-2xl" : "border-white/20 bg-white/10 shadow-xl"
    }`}>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 items-center">
            <img
              src={dieta.usuario?.foto || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Foto do usuário"
              className={`h-14 w-14 md:h-16 md:w-16 rounded-full border object-cover shadow-lg transition-colors duration-500 ${
                isDarkMode ? "border-[#f27825]/40" : "border-[#074334]/40"
              }`}
            />

            <div className="flex flex-col justify-center">
              <h2 className="font-kare text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-none">
                Refeição - {dieta.tipo || "Geral"}
              </h2>
              <span className={`mt-2 w-fit rounded-lg px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white/90 ${
                isDarkMode ? "bg-white/10" : "bg-black/20"
              }`}>
                🍏 PLANEJAMENTO DIETETICO
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-1.5 text-white/60">
              <CalendarDays size={13} className="text-white/40" />
              <span className="text-[10px] md:text-xs font-bold tracking-wider">
                {formatarData(dieta.data)}
              </span>
            </div>
            
            {onDeletar && (
              <button
                type="button"
                onClick={() => onDeletar(dieta.id)}
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
            {dieta.descricao}
          </p>
        </div>

        <div className="my-5 h-px w-full bg-white/10" />

        {/* METABOLISMO / MACROS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/10 p-3">
            <div className={`rounded-lg p-2.5 text-white ${isDarkMode ? "bg-[#f27825]/20 text-[#f27825]" : "bg-[#074334]/20 text-[#074334]"}`}>
              <Flame size={16} />
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">CALORIAS</p>
              <h3 className="text-xs font-black text-white mt-0.5">3.200 KCAL</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/10 p-3">
            <div className={`rounded-lg p-2.5 text-white ${isDarkMode ? "bg-[#f27825]/20 text-[#f27825]" : "bg-[#074334]/20 text-[#074334]"}`}>
              <Ham size={16} />
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">PROTEÍNAS</p>
              <h3 className="text-xs font-black text-white mt-0.5">220G</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/10 p-3">
            <div className={`rounded-lg p-2.5 text-white ${isDarkMode ? "bg-[#f27825]/20 text-[#f27825]" : "bg-[#074334]/20 text-[#074334]"}`}>
              <Wheat size={16} />
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">CARBOS</p>
              <h3 className="text-xs font-black text-white mt-0.5">380G</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/10 p-3">
            <div className="rounded-lg p-2.5 bg-blue-500/20 text-blue-400">
              <Activity size={16} />
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">MÉTRICA IMC</p>
              <h3 className="text-xs font-black text-blue-400 mt-0.5">
                {typeof dieta.imc === "number" ? dieta.imc.toFixed(1) : dieta.imc}
              </h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CardDieta;