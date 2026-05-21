import { useState, type FormEvent } from "react";
import { X, Apple, Calendar, AlignLeft, Activity } from "lucide-react";

interface ModalMontarDietaProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onMontarDieta: (dieta: {
    tipo: string;
    imc: number;
    descricao: string;
    data: string;
  }) => void;
}

export default function ModalMontarDieta({ isOpen, onClose, isDarkMode, onMontarDieta }: ModalMontarDietaProps) {
  const [tipo, setTipo] = useState("");         
  const [imc, setImc] = useState("");           
  const [descricao, setDescricao] = useState(""); 
  const [data, setData] = useState("");        

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!tipo.trim() || !imc || !descricao.trim() || !data) return;

    onMontarDieta({
      tipo: tipo.trim(),
      imc: Number(imc), 
      descricao: descricao.trim(),
      data,
    });

    
    setTipo("");
    setImc("");
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
            <Apple size={18} className={isDarkMode ? "text-[#f27825]" : "text-white"} />
            <h3 className="font-kare text-lg font-black uppercase tracking-tight">
              Montar Nova Dieta
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
          
          {/* Objetivo da Dieta e Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1 flex items-center gap-1">
                <Apple size={10} /> Objetivo Estratégico *
              </label>
              <input
                type="text"
                required
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                placeholder="Ex: Cutting, Recomposição"
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

          {/* IMC Atual */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1 flex items-center gap-1">
              <Activity size={10} /> IMC de Referência Atual *
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={imc}
              onChange={(e) => setImc(e.target.value)}
              placeholder="Ex: 24.5"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-white/30"
            />
          </div>

          {/* Estrutura das Refeições */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1 flex items-center gap-1">
              <AlignLeft size={10} /> Divisão das Refeições e Alimentos *
            </label>
            <textarea
              required
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex:&#10;08:00 - Refeição 1: 30g Whey, 40g Aveia, 1 Banana&#10;12:00 - Refeição 2: 150g Frango, 200g Arroz, Salada&#10;19:00 - Refeição 3: 4 Ovos Cozidos"
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
            Salvar Novo Plano Alimentar
          </button>
        </form>
      </div>
    </div>
  );
}