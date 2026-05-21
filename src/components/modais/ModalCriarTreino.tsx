import { useState, type FormEvent } from "react";
import { X, Dumbbell, Calendar, AlignLeft, BarChart } from "lucide-react";

interface ModalCriarTreinoProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onCriarTreino: (treino: {
    tipoTreino: string;
    intensidade: string;
    descricao: string;
    data: string;
  }) => void;
}

export default function ModalCriarTreino({ isOpen, onClose, isDarkMode, onCriarTreino }: ModalCriarTreinoProps) {
  const [tipoTreino, setTipoTreino] = useState("");     // Ex: "A - Peito e Tríceps"
  const [intensidade, setIntensidade] = useState("");   // Ex: "Alta"
  const [descricao, setDescricao] = useState("");       // Ex: "4x10 Supino, 3x12 Crossover..."
  const [data, setData] = useState("");                 // Data do treino

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!tipoTreino.trim() || !intensidade || !descricao.trim() || !data) return;

    onCriarTreino({
      tipoTreino: tipoTreino.trim(),
      intensidade,
      descricao: descricao.trim(),
      data, // Formato YYYY-MM-DD nativo do input
    });

    // Limpa os campos após o envio
    setTipoTreino("");
    setIntensidade("");
    setDescricao("");
    setData("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop de Fundo Desfocado */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Caixa do Modal */}
      <div className={`relative w-full max-w-xl overflow-hidden rounded-2xl border p-6 shadow-2xl transition-all duration-500 backdrop-blur-md ${
        isDarkMode 
          ? "bg-black/80 border-white/10 text-white shadow-black/50" 
          : "bg-[#074334]/95 border-white/20 text-white shadow-black/30"
      }`}>
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <Dumbbell size={18} className={isDarkMode ? "text-[#f27825]" : "text-white"} />
            <h3 className="font-kare text-lg font-black uppercase tracking-tight">
              Montar Novo Treino
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-red-500/20 transition-all duration-300"
          >
            <X size={14} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Divisão do Treino e Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1 flex items-center gap-1">
                <Dumbbell size={10} /> Identificação do Treino *
              </label>
              <input
                type="text"
                required
                value={tipoTreino}
                onChange={(e) => setTipoTreino(e.target.value)}
                placeholder="Ex: Treino A - Superior, Legday"
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-white/30"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1 flex items-center gap-1">
                <Calendar size={10} /> Data do Planejamento *
              </label>
              <input
                type="date"
                required
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-white/30 color-scheme-dark"
              />
            </div>
          </div>

          {/* Intensidade */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1 flex items-center gap-1">
              <BarChart size={10} /> Nível de Intensidade *
            </label>
            <select
              required
              value={intensidade}
              onChange={(e) => setIntensidade(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-white/30 cursor-pointer appearance-none"
            >
              <option value="" className="bg-[#074334] text-white/40">Selecione o nível...</option>
              <option value="Leve" className="bg-[#074334]">Leve (Recuperação / Cardiorrespiratório)</option>
              <option value="Moderada" className="bg-[#074334]">Moderada (Constância / Hipertrofia)</option>
              <option value="Alta" className="bg-[#074334]">Alta (Semanas de Choque / Força)</option>
            </select>
          </div>

          {/* Descrição dos Exercícios */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1 flex items-center gap-1">
              <AlignLeft size={10} /> Lista de Exercícios e Séries *
            </label>
            <textarea
              required
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex:&#10;- Supino Reto: 4x10 (30kg)&#10;- Desenvolvimento Halter: 3x12&#10;- Tríceps Pulley: 4x15"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs font-light text-white placeholder-white/20 outline-none focus:border-white/30 h-32 resize-none transition-all duration-300"
            />
          </div>

          {/* Botão de Enviar */}
          <button
            type="submit"
            className={`group cursor-pointer w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.99] shadow-lg ${
              isDarkMode 
                ? "bg-[#f27825] hover:bg-[#df6613] text-white shadow-[#f27825]/10" 
                : "bg-white hover:bg-white/90 text-[#074334] shadow-black/10"
            }`}
          >
            Salvar Novo Treino
          </button>
        </form>
      </div>
    </div>
  );
}