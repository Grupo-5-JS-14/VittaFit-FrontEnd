import { useState, type FormEvent } from "react";
import { X, Send, Dumbbell, Apple, Image as ImageIcon } from "lucide-react";

interface ModalPostarProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onPostar: (post: {
    texto: string;
    imagemUrl?: string;
    tipo: "TREINO" | "DIETA";
   
    detalhesEspecificos: {
      tipoCategoria: string; 
      atributoExtra: string;  
    };
  }) => void;
}

export default function ModalPostar({ isOpen, onClose, isDarkMode, onPostar }: ModalPostarProps) {
  const [texto, setTexto] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [tipo, setTipo] = useState<"TREINO" | "DIETA">("TREINO");

  const [tipoCategoria, setTipoCategoria] = useState(""); 
  const [atributoExtra, setAtributoExtra] = useState("");  

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!texto.trim() || !tipoCategoria.trim() || !atributoExtra.trim()) return;

    onPostar({
      texto,
      imagemUrl: imagemUrl.trim() || undefined,
      tipo,
      detalhesEspecificos: {
        tipoCategoria: tipoCategoria.trim(),
        atributoExtra: atributoExtra.trim(),
      },
    });

    setTexto("");
    setImagemUrl("");
    setTipoCategoria("");
    setAtributoExtra("");
    setTipo("TREINO");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Caixa do Modal */}
      <div className={`relative w-full max-w-xl overflow-hidden rounded-2xl border p-6 shadow-2xl transition-all duration-500 backdrop-blur-md ${
        isDarkMode 
          ? "bg-black/80 border-white/10 text-white shadow-black/50" 
          : "bg-[#074334]/95 border-white/20 text-white shadow-black/30"
      }`}>
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-5">
          <h3 className="font-kare text-lg font-black uppercase tracking-tight">
            Compartilhar Registro
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-red-500/20 transition-all duration-300"
          >
            <X size={14} />
          </button>
        </div>

        {/* Abas Alternadoras */}
        <div className="mb-5 space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1">
            Escolha o tipo de registro obrigatório
          </label>
          <div className="grid grid-cols-2 gap-2 bg-black/20 p-1 rounded-xl border border-white/5">
            <button
              type="button"
              onClick={() => { setTipo("TREINO"); setTipoCategoria(""); setAtributoExtra(""); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                tipo === "TREINO"
                  ? isDarkMode ? "bg-[#f27825] text-white" : "bg-[#074334] text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Dumbbell size={14} /> Treino
            </button>
            <button
              type="button"
              onClick={() => { setTipo("DIETA"); setTipoCategoria(""); setAtributoExtra(""); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                tipo === "DIETA"
                  ? isDarkMode ? "bg-[#f27825] text-white" : "bg-[#074334] text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Apple size={14} /> Dieta
            </button>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Inputs Dinâmicos Baseados nos Seus Modelos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1">
                {tipo === "TREINO" ? "Tipo de Treino *" : "Tipo de Dieta *"}
              </label>
              <input
                type="text"
                required
                value={tipoCategoria}
                onChange={(e) => setTipoCategoria(e.target.value)}
                placeholder={tipo === "TREINO" ? "Ex: Hipertrofia, Cardio" : "Ex: Bulking, Cutting"}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-white/30"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1">
                {tipo === "TREINO" ? "Intensidade *" : "Valor do IMC *"}
              </label>
              <input
                type="text"
                required
                value={atributoExtra}
                onChange={(e) => setAtributoExtra(e.target.value)}
                placeholder={tipo === "TREINO" ? "Ex: Alta, Moderada" : "Ex: 24.2"}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* Descrição / Texto do Post */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1">
              Descrição do Registro *
            </label>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Descreva os detalhes da sua rotina de hoje..."
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs font-light text-white placeholder-white/30 outline-none focus:border-white/30 h-24 resize-none"
              maxLength={280}
              required
            />
            <div className="text-right text-[9px] text-white/40 font-bold">
              {texto.length}/280
            </div>
          </div>

          {/* Imagem Opcional */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 pl-1 flex items-center gap-1.5">
              <ImageIcon size={12} className="text-white/30" /> Link da Foto (Opcional)
            </label>
            <input
              type="url"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              placeholder="https://exemplo.com/foto.jpg"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 outline-none focus:border-white/30"
            />
          </div>

          {/* Botão de Enviar */}
          <button
            type="submit"
            className={`group cursor-pointer w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 shadow-lg ${
              isDarkMode 
                ? "bg-[#f27825] hover:bg-[#df6613] text-white shadow-[#f27825]/10" 
                : "bg-white hover:bg-white/90 text-[#074334]"
            }`}
          >
            <Send size={12} />
            Publicar Registro
          </button>
        </form>
      </div>
    </div>
  );
}