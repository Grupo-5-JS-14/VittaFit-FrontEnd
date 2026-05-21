import { useState, type FormEvent } from "react";
import { Send, X, Calendar, Apple, Activity } from "lucide-react";
import type Dieta from "../../../models/Dieta";
import { criarDieta } from "../../../services/Service";

interface FormDietaProps {
  isDarkMode: boolean;
  onAdicionar: (dieta: Omit<Dieta, "id" | "usuario">) => void;
  onFechar: () => void;
}

function FormDieta({ isDarkMode, onAdicionar, onFechar }: FormDietaProps) {
  const [tipo, setTipo] = useState("");
  const [imc, setImc] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!tipo.trim() || !descricao.trim() || !data || !imc) {
      alert("Por favor, preencha todos os campos operacionais.");
      return;
    }
    
    try {
  
      const usuarioLogado = JSON.parse(
        localStorage.getItem("usuario") || "{}"
      );
  
      const novaDieta = {
        tipo,
        imc: Number(imc),
        data,
        descricao,
        usuario: {
          id: usuarioLogado.id,
        },
      };
  
      const DietaCriada =
        await criarDieta(
          novaDieta as Dieta
        );
  
      onAdicionar(DietaCriada);
  
      alert(
        "Treino salvo com sucesso!"
      );
  
      onFechar();
  
    } catch (error) {
  
      console.log(error);
  
      alert(
        "Erro ao salvar treino."
      );
    }
  }




  const inputClass = `w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold tracking-wider uppercase text-white placeholder-white/30 outline-none focus:border-white/30 transition-all duration-300`;

  return (
    <div className={`border rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-500 backdrop-blur-md ${
      isDarkMode ? "bg-black/30 border-white/10" : "bg-white/10 border-white/20"
    }`}>
      
      <div className="flex justify-between items-start gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <h3 className="font-kare text-xl font-black uppercase tracking-tight text-white">
            NOVO PLANO DIETETICO
          </h3>
          <p className="text-[11px] font-light text-white/60 mt-1">
            Insira o objetivo calórico e macronutrientes da janela atual
          </p>
        </div>
        <button
          type="button"
          onClick={onFechar}
          className="cursor-pointer p-2 rounded-xl border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-red-500/20 transition-all duration-300"
        >
          <X size={14} className="stroke-[2.5]" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-1 text-white/70 flex items-center gap-1.5">
              <Apple size={12} className="text-white/40" /> Objetivo da Dieta
            </label>
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="EX: BULKING LIMPO"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-1 text-white/70 flex items-center gap-1.5">
              <Activity size={12} className="text-white/40" /> Métrica IMC Inicial
            </label>
            <input
              type="number"
              step="0.1"
              value={imc}
              onChange={(e) => setImc(e.target.value)}
              placeholder="EX: 24.8"
              className={inputClass}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-1 text-white/70 flex items-center gap-1.5">
              <Calendar size={12} className="text-white/40" /> Início do Protocolo
            </label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-1 text-white/70">
            Estrutura de Macros e Alimentos
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="DESCREVA A DISTRIBUIÇÃO DAS REFEIÇÕES DIÁRIAS..."
            className={`${inputClass} min-h-25 resize-none`}
            required
          />
        </div>

        <button
          type="submit"
          className={`group cursor-pointer w-full flex items-center justify-center gap-2 rounded-xl py-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.99] shadow-lg ${
            isDarkMode 
              ? "bg-[#f27825] hover:bg-[#df6613] text-white shadow-[#f27825]/10" 
              : "bg-[#074334] hover:bg-[#053227] text-white shadow-[#074334]/10"
          }`}
        >
          <Send size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          Salvar Planejamento
        </button>
      </form>
    </div>
  );
}

export default FormDieta;