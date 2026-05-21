import { useState, type FormEvent } from "react";
import { Send, X, Calendar, Apple, Activity } from "lucide-react";
import type Dieta from "../../../models/Dieta";
import { criarDieta } from "../../../services/Service";

interface FormDietaProps {
  isDarkMode: boolean;
  onAdicionar: (dieta: Dieta) => void;
  onFechar: () => void;
}


function FormDieta({
  isDarkMode,
  onAdicionar,
  onFechar,
}: FormDietaProps) {

  const [tipo, setTipoDieta] = useState("");
  const [imc, setImc] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleSubmit(e: FormEvent) {

    e.preventDefault();

    if (
      !tipo.trim() ||
      !descricao.trim() ||
      !data ||
      !imc
    ) {

      alert(
        "Preencha todos os campos."
      );

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

      const dietaCriada =
        await criarDieta(
          novaDieta as Dieta
        );

      onAdicionar(dietaCriada);

      alert(
        "Dieta salva com sucesso!"
      );

      onFechar();

    } catch (error) {

      console.log(error);

      alert(
        "Erro ao salvar dieta."
      );
    }
  }

  return (
    <div
      className={`border rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-500 backdrop-blur-md ${
        isDarkMode
          ? "bg-black/30 border-white/10"
          : "bg-white/10 border-white/20"
      }`}
    >

      {/* CABEÇALHO */}
      <div className="flex justify-between items-start gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <h3 className=" text-lg md:text-xl font-black uppercase tracking-tight text-white">
            REGISTRAR NOVA DIETA
          </h3>

          <p className="text-[11px] font-light text-white/60 mt-1">
            Preencha os dados nutricionais para salvar no feed
          </p>
        </div>

        <button
          type="button"
          onClick={onFechar}
          className={`cursor-pointer p-2 rounded-xl border transition-all duration-300 ${
            isDarkMode
              ? "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-red-500/20 hover:border-red-500/30"
              : "bg-black/10 border-white/10 text-white/70 hover:text-white hover:bg-red-600/30 hover:border-red-600/40"
          }`}
        >
          <X size={14} className="stroke-[2.5]" />
        </button>
      </div>

      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* OBJETIVO */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-1 text-white/70 flex items-center gap-1.5">
              <Apple size={12} className="text-white/40" />
              Objetivo da Dieta
            </label>

            <input
              type="text"
              value={tipo}
              onChange={(e) =>
                setTipoDieta(e.target.value)
              }
              placeholder="EX: HIPERTROFIA"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold tracking-wider uppercase text-white placeholder-white/30 outline-none focus:border-white/30 transition-all duration-300"
              required
            />
          </div>

          {/* IMC */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-1 text-white/70 flex items-center gap-1.5">
              <Activity size={12} className="text-white/40" />
              IMC Atual
            </label>

            <input
              type="number"
              step="0.1"
              value={imc}
              onChange={(e) =>
                setImc(e.target.value)
              }
              placeholder="EX: 24.5"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold tracking-wider uppercase text-white placeholder-white/30 outline-none focus:border-white/30 transition-all duration-300"
              required
            />
          </div>

          {/* DATA */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-1 text-white/70 flex items-center gap-1.5">
              <Calendar size={12} className="text-white/40" />
              Data da Dieta
            </label>

            <input
              type="date"
              value={data}
              onChange={(e) =>
                setData(e.target.value)
              }
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold tracking-wider uppercase text-white outline-none focus:border-white/30 transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-1 text-white/70">
            Plano Alimentar
          </label>

          <textarea
            value={descricao}
            onChange={(e) =>
              setDescricao(e.target.value)
            }
            placeholder="DESCREVA AS REFEIÇÕES, MACROS E ESTRATÉGIA NUTRICIONAL..."
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-medium text-white placeholder-white/30 outline-none focus:border-white/30 min-h-25 resize-none transition-all duration-300"
            required
          />
        </div>

        {/* BOTÃO */}
        <button
          type="submit"
          className={`group cursor-pointer w-full flex items-center justify-center gap-2 rounded-xl py-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.99] shadow-lg ${
            isDarkMode
              ? "bg-[#f27825] hover:bg-[#df6613] text-white shadow-[#f27825]/10"
              : "bg-[#074334] hover:bg-[#053227] text-white shadow-[#074334]/10"
          }`}
        >
          <Send
            size={12}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300"
          />

          Salvar Dieta
        </button>
      </form>
    </div>
  );
}

export default FormDieta;