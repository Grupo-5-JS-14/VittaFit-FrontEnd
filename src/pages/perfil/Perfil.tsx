import { useEffect, useState } from "react";
import {
  buscarUsuario,
  atualizarUsuario,
  listarTreinos,
  listarDietas,
} from "../../services/Service";
import type { Usuario } from "../../models/Usuario";

interface PerfilProps {
  isDarkMode?: boolean;
  onAbrirCriarTreino: () => void;
  onAbrirMontarDieta: () => void;
}

function Perfil({ isDarkMode = true }: PerfilProps) {
  const [editando, setEditando] = useState(false);
  const [filtro, setFiltro] = useState("tudo");
  const [mostrarTabelaIMC, setMostrarTabelaIMC] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [treinosUsuario, setTreinosUsuario] = useState<any[]>([]);
  const [dietasUsuario, setDietasUsuario] = useState<any[]>([]);

  const [rascunho, setRascunho] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    altura: 0,
    peso: 0,
    imc: 0,
  });

  const usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "{}");

  const usuarioId = usuarioLogado.id;

  async function carregarUsuario() {
    try {
      setLoading(true);
      const data = await buscarUsuario(usuarioId);

      setRascunho({
        id: data.id,
        nome: data.nome,
        usuario: data.usuario,
        senha: data.senha,
        foto: data.foto || "",
        altura: Number(data.altura) || 0,
        peso: Number(data.peso) || 0,
        imc: Number(data.imc) || 0,
      });

      const todosTreinos = await listarTreinos();

      const meusTreinos = todosTreinos.filter(
        (treino: any) => treino.usuario?.id === usuarioId,
      );
      setTreinosUsuario(meusTreinos);

      const todasDietas = await listarDietas();

      const minhasDietas = todasDietas.filter(
        (dieta: any) => dieta.usuario?.id === usuarioId,
      );

      setDietasUsuario(minhasDietas);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      setMensagem("Erro ao carregar dados do perfil.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setRascunho((prev) => ({
      ...prev,
      [name]: name === "altura" || name === "peso" ? Number(value) : value,
    }));
  }

  async function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (rascunho.peso <= 0 || rascunho.altura <= 0) {
      setMensagem("Por favor, insira valores válidos de peso e altura.");
      return;
    }

    try {
      const dadosParaSalvar: Usuario = {
        id: rascunho.id,
        nome: rascunho.nome,
        usuario: rascunho.usuario,
        senha: rascunho.senha,
        foto: rascunho.foto,
        peso: Number(rascunho.peso),
        altura: Number(rascunho.altura),
      };

      const atualizado = await atualizarUsuario(rascunho.id!, dadosParaSalvar);

      setRascunho({
        id: atualizado.id,
        nome: atualizado.nome,
        usuario: atualizado.usuario,
        senha: atualizado.senha,
        foto: atualizado.foto || "",
        altura: Number(atualizado.altura),
        peso: Number(atualizado.peso),
        imc: Number(atualizado.imc),
      });

      setMensagem("Perfil atualizado com sucesso!");
      setEditando(false);

      setTimeout(() => setMensagem(""), 3000);
    } catch (error) {
      console.error("Erro ao atualizar usuário no back-end:", error);
      setMensagem("Erro ao atualizar dados. Verifique a API.");
    }
  }

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
          isDarkMode ? "bg-[#053227]" : "bg-[#f27825]"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-12 h-12 border-4 rounded-full animate-spin ${
              isDarkMode
                ? "border-[#f27825] border-t-transparent"
                : "border-[#074334] border-t-transparent"
            }`}
          ></div>
          <h1
            className={`text-xl font-bold font-kare tracking-widest uppercase ${isDarkMode ? "text-white" : "text-[#074334]"}`}
          >
            VittaFit
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden font-sans pb-20 ${
        isDarkMode ? "bg-[#053227] text-white" : "bg-[#f27825] text-white"
      }`}
    >
      {/* HEADER EDITORIAL */}
      <div
        className={`relative pt-16 pb-12 px-8 sm:px-12 border-b transition-colors duration-500 ${
          isDarkMode
            ? "from-black/40 via-transparent to-[#053227] bg-linear-to-b border-white/5"
            : "from-black/10 via-transparent to-[#f27825] bg-linear-to-b border-white/10"
        }`}
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-2 ${
                isDarkMode ? "text-[#f27825]" : "text-[#074334]"
              }`}
            >
              Performance Dashboard
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase">
              Meu Perfil
            </h1>
          </div>
          <button
            onClick={() => setEditando(true)}
            className={`backdrop-blur-xl transition-all duration-300 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg active:scale-[0.98] border cursor-pointer ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20 border-white/10 text-white"
                : "bg-black/10 hover:bg-black/20 border-white/20 text-white"
            }`}
          >
            Editar Perfil
          </button>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="px-6 max-w-6xl mx-auto mt-12 relative z-20 flex flex-col items-center justify-center gap-8">
        {/* CARD PRINCIPAL DO USUÁRIO */}
        <div
          className={`lg:col-span-3 w-full rounded-3xl p-8 shadow-2xl transition-all duration-300 border flex flex-col justify-between gap-8 backdrop-blur-xl ${
            isDarkMode
              ? "bg-white/3 border-white/10 shadow-black/40"
              : "bg-black/5 border-white/10 shadow-black/10"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {rascunho.foto ? (
              <img
                src={rascunho.foto}
                alt={rascunho.nome}
                className="w-28 h-28 rounded-2xl object-cover border border-white/20 shadow-2xl"
              />
            ) : (
              <div
                className={`w-28 h-28 min-w-28 min-h-28 rounded-2xl flex items-center justify-center text-4xl text-white font-black shadow-2xl bg-linear-to-br ${
                  isDarkMode
                    ? "from-[#f27825] to-orange-700"
                    : "from-[#074334] to-[#04241c]"
                }`}
              >
                {rascunho.nome?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div className="text-center sm:text-left flex-1">
              <h2 className="text-3xl font-bold tracking-tight uppercase mb-1">
                {rascunho.nome || "Usuario"}
              </h2>
              <p
                className={`text-sm font-light tracking-wide mb-4 ${isDarkMode ? "text-white/50" : "text-white/70"}`}
              >
                {rascunho.usuario}
              </p>

              {/* MÓDULO IMC */}
              <div
                onClick={() => setMostrarTabelaIMC(true)}
                className={`inline-flex items-center gap-3 border px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300 group ${
                  isDarkMode
                    ? "border-[#f27825]/20 bg-[#f27825]/5 hover:bg-[#f27825]/10"
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                <span
                  className={`font-bold text-xs uppercase tracking-widest ${isDarkMode ? "text-[#f27825]" : "text-[#074334]"}`}
                >
                  IMC
                </span>
                <span className="text-xl font-black">
                  {rascunho.imc ? rascunho.imc.toFixed(1) : "0.0"}
                </span>
                <span className="text-[10px] pl-2 border-l text-white/40 group-hover:text-white/70 border-white/10">
                  Tabela ↗
                </span>
              </div>
            </div>
          </div>

          {/* MÉTRICAS BIOMÉTRICAS */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
            <div
              className={`border rounded-2xl p-4 text-center backdrop-blur-md ${isDarkMode ? "bg-white/2 border-white/5" : "bg-black/10 border-white/15"}`}
            >
              <p className="text-[10px] uppercase tracking-widest mb-1 text-white/60">
                Peso Corporal
              </p>
              <h3 className="text-2xl font-bold ">
                {rascunho.peso}
                <span
                  className={`text-xs ml-1 ${isDarkMode ? "text-[#f27825]" : "text-[#074334]"}`}
                >
                  KG
                </span>
              </h3>
            </div>
            <div
              className={`border rounded-2xl p-4 text-center backdrop-blur-md ${isDarkMode ? "bg-white/2 border-white/5" : "bg-black/10 border-white/15"}`}
            >
              <p className="text-[10px] uppercase tracking-widest mb-1 text-white/60">
                Altura
              </p>
              <h3 className="text-2xl font-bold ">
                {rascunho.altura}
                <span
                  className={`text-xs ml-1 ${isDarkMode ? "text-[#f27825]" : "text-[#074334]"}`}
                >
                  M
                </span>
              </h3>
            </div>
          </div>
        </div>

        {/* SEÇÃO DE PUBLICAÇÕES */}
        <div className="lg:col-span-3 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold tracking-tight uppercase">
              Minhas Postagens
            </h2>
            <div className="border p-1.5 rounded-xl flex gap-1 w-fit bg-white/5 border-white/10">
              {["tudo", "treino", "dieta"].map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => setFiltro(tipo)}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    filtro === tipo
                      ? isDarkMode
                        ? "bg-[#f27825] text-white shadow-lg"
                        : "bg-[#074334] text-white shadow-lg"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tipo === "tudo"
                    ? "Tudo"
                    : tipo === "treino"
                      ? "Treinos"
                      : "Dietas"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {/* TREINOS */}
            {(filtro === "tudo" || filtro === "treino") &&
              treinosUsuario.map((treino) => (
                <div
                  key={treino.id}
                  className="border border-white/10 rounded-2xl p-5 bg-white/5"
                >
                  <span className="text-[10px] uppercase text-[#f27825] font-bold">
                    Treino
                  </span>

                  <h3 className="text-lg font-bold uppercase mt-2">
                    {treino.tipoTreino}
                  </h3>

                  <p className="text-sm text-white/70 mt-2">
                    {treino.descricao}
                  </p>

                  <div className="flex gap-4 mt-4 text-xs uppercase text-white/50">
                    <span>{treino.intensidade}</span>
                    <span>{treino.data}</span>
                  </div>
                </div>
              ))}

            {/* DIETAS */}
            {(filtro === "tudo" || filtro === "dieta") &&
              dietasUsuario.map((dieta) => (
                <div
                  key={dieta.id}
                  className="border border-white/10 rounded-2xl p-5 bg-white/5"
                >
                  <span className="text-[10px] uppercase text-green-400 font-bold">
                    Dieta
                  </span>

                  <h3 className="text-lg font-bold uppercase mt-2">
                    {dieta.nome || "Plano Alimentar"}
                  </h3>

                  <p className="text-sm text-white/70 mt-2">
                    {dieta.descricao}
                  </p>

                  <div className="flex gap-4 mt-4 text-xs uppercase text-white/50">
                    <span>{dieta.objetivo}</span>
                  </div>
                </div>
              ))}

            {/* VAZIO */}
            {treinosUsuario.length === 0 && dietasUsuario.length === 0 && (
              <div className="border border-dashed rounded-3xl p-12 text-center text-sm font-light border-white/20 text-white/40">
                Nenhuma publicação encontrada no filtro selecionado.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL PADRÃO DE EDIÇÃO DE PERFIL */}
      {editando && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <form
            onSubmit={salvar}
            className={`w-full max-w-2xl border rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5 ${
              isDarkMode
                ? "bg-[#053227] border-white/10 text-white"
                : "bg-[#074334] border-white/20 text-white"
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-2xl font-bold uppercase tracking-tight">
                Editar Dados
              </h2>
              <button
                type="button"
                onClick={() => setEditando(false)}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-xs bg-white/5 border-white/10 text-white cursor-pointer hover:bg-white/10"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/60">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="nome"
                  value={rascunho.nome}
                  onChange={atualizarEstado}
                  className="w-full border rounded-xl p-3.5 text-sm outline-none focus:border-[#f27825] bg-black/20 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/60">
                  E-mail de Acesso
                </label>
                <input
                  type="text"
                  name="usuario"
                  value={rascunho.usuario}
                  onChange={atualizarEstado}
                  className="w-full border rounded-xl p-3.5 text-sm outline-none focus:border-[#f27825] bg-black/20 border-white/10 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/60">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="peso"
                    value={rascunho.peso || ""}
                    onChange={atualizarEstado}
                    className="w-full border rounded-xl p-3.5 text-sm outline-none focus:border-[#f27825] bg-black/20 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/60">
                    Altura (m)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="altura"
                    value={rascunho.altura || ""}
                    onChange={atualizarEstado}
                    className="w-full border rounded-xl p-3.5 text-sm outline-none focus:border-[#f27825] bg-black/20 border-white/10 text-white"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 mt-6 cursor-pointer ${
                isDarkMode
                  ? "bg-[#f27825] hover:bg-[#d9651c] text-white"
                  : "bg-[#074334] hover:bg-[#052b21] border border-white/10 text-white"
              }`}
            >
              Confirmar e Salvar
            </button>
          </form>
        </div>
      )}

      {/* MODAL TABELA IMC */}
      {mostrarTabelaIMC && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setMostrarTabelaIMC(false)}
        >
          <div
            className={`border w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden ${
              isDarkMode
                ? "bg-[#053227] border-white/10 text-white"
                : "bg-[#074334] border-white/20 text-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex justify-between items-center border-b border-white/10 bg-white/5">
              <h2 className="text-xl font-bold uppercase tracking-tight">
                Tabela Oficial de Classificação IMC
              </h2>
              <button
                onClick={() => setMostrarTabelaIMC(false)}
                className="font-bold text-sm text-[#f27825] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4 text-xs font-light tracking-wide divide-y divide-white/5">
              <div className="grid grid-cols-3 p-3 font-bold text-[#f27825] uppercase tracking-wider">
                <span>Métrica</span>
                <span>Classificação</span>
                <span>Risco</span>
              </div>
              <div className="text-white/80">
                <div className="grid grid-cols-3 p-3">
                  <span>&lt; 18.5</span>
                  <span>Abaixo do peso</span>
                  <span>Baixo</span>
                </div>
                <div className="grid grid-cols-3 p-3 ">
                  <span>18.5 – 24.9</span>
                  <span>Peso ideal</span>
                  <span>Normal</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span>25.0 – 29.9</span>
                  <span>Sobrepeso</span>
                  <span>Moderado</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span>30.0 – 34.9</span>
                  <span>Obesidade grau I</span>
                  <span>Alto</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span>35.0 – 39.9</span>
                  <span>Obesidade grau II</span>
                  <span>Muito alto</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span>&ge; 40.0</span>
                  <span>Obesidade grau III</span>
                  <span>Extremo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SYSTEM NOTIFICATION */}
      {mensagem && (
        <div
          className={`fixed bottom-6 right-6 text-white px-6 py-4 rounded-xl shadow-2xl font-bold text-xs uppercase tracking-wider z-50 border border-white/10 ${
            isDarkMode ? "bg-[#f27825]" : "bg-[#074334]"
          }`}
        >
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default Perfil;
