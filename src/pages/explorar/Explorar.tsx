import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Activity,
  Apple,
  Heart,
  MessageCircle,
  Loader2,
  Plus,
  X,
  Send,
  Trash2,
} from "lucide-react";
import { buscar } from "../../services/Service";

type Filtro = "TODOS" | "TREINO" | "DIETA";
type TipoPublicacao = "TREINO" | "DIETA";

interface Usuario {
  id?: number;
  nome?: string;
  usuario?: string;
  foto?: string;
  imc?: number | string;
}

interface Treino {
  id?: number;
  tipoTreino: string;
  descricao: string;
  data: string;
  intensidade: string;
  usuario?: Usuario;
}

interface Dieta {
  id?: number;
  tipo: string;
  descricao: string;
  data: string;
  usuario?: Usuario;
}

interface Comentario {
  id: number;
  usuario: string;
  texto: string;
}

interface PublicacaoExplorar {
  id: number;
  categoria: "TREINO" | "DIETA";
  usuario?: Usuario;
  comentarioPublicacao: string;
  titulo: string;
  descricao: string;
  data: string;
  detalhePrincipal: string;
  detalheSecundario: string;
  curtidas: number;
  comentarios: Comentario[];
  itemOriginalId?: number;
}

interface ExplorarProps {
  isDarkMode?: boolean; 
}

function Explorar({ isDarkMode = true }: ExplorarProps) {
  const usuarioSalvo = localStorage.getItem("usuario");

  const usuarioLogado: Usuario = usuarioSalvo
    ? JSON.parse(usuarioSalvo)
    : {
        id: 1,
        nome: "Usuário Vitta Fit",
        usuario: "usuario",
        imc: 0,
      };

  const [filtro, setFiltro] = useState<Filtro>("TODOS");
  const [isLoading, setIsLoading] = useState(false);

  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [publicacoes, setPublicacoes] = useState<PublicacaoExplorar[]>([]);

  const [abrirForm, setAbrirForm] = useState(false);
  const [tipoPublicacao, setTipoPublicacao] = useState<TipoPublicacao>("TREINO");

  const [treinoSelecionadoId, setTreinoSelecionadoId] = useState("");
  const [dietaSelecionadaId, setDietaSelecionadaId] = useState("");
  const [comentarioPublicacao, setComentarioPublicacao] = useState("");

  const [curtidasUsuario, setCurtidasUsuario] = useState<number[]>([]);
  const [comentariosAbertos, setComentariosAbertos] = useState<number[]>([]);
  const [comentariosDigitados, setComentariosDigitados] = useState<{
    [key: number]: string;
  }>({});

  async function carregarDados() {
  setIsLoading(true);

  try {
    let treinosApi: Treino[] = [];
    let dietasApi: Dieta[] = [];

    try {
      await buscar("/treinos", (dados: Treino[]) => {
        treinosApi = Array.isArray(dados) ? dados : [];
      });
    } catch (error) {
      console.error("Erro ao buscar treinos no backend:", error);
    }

    try {
      await buscar("/dietas", (dados: Dieta[]) => {
        dietasApi = Array.isArray(dados) ? dados : [];
      });
    } catch (error) {
      console.error("Erro ao buscar dietas no backend:", error);
    }

    const treinosCache = localStorage.getItem("treinosCache");
    const dietasCache = localStorage.getItem("dietasCache");

    const treinosLocais: Treino[] = treinosCache ? JSON.parse(treinosCache) : [];
    const dietasLocais: Dieta[] = dietasCache ? JSON.parse(dietasCache) : [];

    const treinosUnificados = [...treinosApi];

    treinosLocais.forEach((treinoLocal) => {
      const jaExiste = treinosUnificados.some(
        (treinoApi) => treinoApi.id === treinoLocal.id
      );

      if (!jaExiste) {
        treinosUnificados.push(treinoLocal);
      }
    });

    const dietasUnificadas = [...dietasApi];

    dietasLocais.forEach((dietaLocal) => {
      const jaExiste = dietasUnificadas.some(
        (dietaApi) => dietaApi.id === dietaLocal.id
      );

      if (!jaExiste) {
        dietasUnificadas.push(dietaLocal);
      }
    });

    setTreinos(treinosUnificados);
    setDietas(dietasUnificadas);

    const publicacoesSalvas = localStorage.getItem("publicacoesExplorar");

    const publicacoesLocalStorage: PublicacaoExplorar[] = publicacoesSalvas
      ? JSON.parse(publicacoesSalvas)
      : [];

    const publicacoesAtualizadas = criarPublicacoesAutomaticas(
      treinosUnificados,
      dietasUnificadas,
      publicacoesLocalStorage
    );

    setPublicacoes(publicacoesAtualizadas);
  } catch (error) {
    console.error("Erro ao carregar dados do Explorar:", error);
  } finally {
    setIsLoading(false);
  }
}

  useEffect(() => {
    carregarDados();
  }, []);

  function salvarPublicacoesLocalStorage(novasPublicacoes: PublicacaoExplorar[]) {
    setPublicacoes(novasPublicacoes);
    localStorage.setItem("publicacoesExplorar", JSON.stringify(novasPublicacoes));
  }

  function formatarData(data: string) {
    if (!data) return "Agora";
    const dataFormatada = new Date(data);
    if (Number.isNaN(dataFormatada.getTime())) return data;

    return dataFormatada.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function limparFormulario() {
    setAbrirForm(false);
    setTreinoSelecionadoId("");
    setDietaSelecionadaId("");
    setComentarioPublicacao("");
  }

  function criarPublicacoesAutomaticas(
  treinosApi: Treino[],
  dietasApi: Dieta[],
  publicacoesSalvas: PublicacaoExplorar[]
) {
  const idsPublicados = publicacoesSalvas.map(
    (publicacao) => `${publicacao.categoria}-${publicacao.itemOriginalId}`
  );

  const publicacoesTreinos: PublicacaoExplorar[] = treinosApi
    .filter(
      (treino) =>
        treino.id && !idsPublicados.includes(`TREINO-${treino.id}`)
    )
    .map((treino) => ({
      id: Number(`1${treino.id}`),
      categoria: "TREINO",
      usuario: treino.usuario || usuarioLogado,
      comentarioPublicacao: "Compartilhou um treino cadastrado.",
      titulo: treino.tipoTreino || "Treino registrado",
      descricao: treino.descricao || "Compartilhou um treino de performance.",
      data: treino.data,
      detalhePrincipal: treino.intensidade
        ? `Intensidade ${treino.intensidade}`
        : "Intensidade Geral",
      detalheSecundario: "Treino",
      curtidas: 0,
      comentarios: [],
      itemOriginalId: treino.id,
    }));

  const publicacoesDietas: PublicacaoExplorar[] = dietasApi
    .filter(
      (dieta) =>
        dieta.id && !idsPublicados.includes(`DIETA-${dieta.id}`)
    )
    .map((dieta) => ({
      id: Number(`2${dieta.id}`),
      categoria: "DIETA",
      usuario: dieta.usuario || usuarioLogado,
      comentarioPublicacao: "Compartilhou uma dieta cadastrada.",
      titulo: dieta.tipo || "Dieta registrada",
      descricao: dieta.descricao || "Compartilhou uma rotina nutricional.",
      data: dieta.data,
      detalhePrincipal: dieta.usuario?.imc
        ? `IMC ${dieta.usuario.imc}`
        : usuarioLogado.imc
        ? `IMC ${usuarioLogado.imc}`
        : "Métrica Geral",
      detalheSecundario: "Dieta",
      curtidas: 0,
      comentarios: [],
      itemOriginalId: dieta.id,
    }));

  return [...publicacoesTreinos, ...publicacoesDietas, ...publicacoesSalvas];
}

  function publicarNoExplorar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!comentarioPublicacao.trim()) {
      alert("Escreva um comentário sobre sua publicação.");
      return;
    }

    if (tipoPublicacao === "TREINO") {
      const treinoSelecionado = treinos.find(
        (treino) => String(treino.id) === treinoSelecionadoId
      );

      if (!treinoSelecionado) {
        alert("Selecione um treino para publicar.");
        return;
      }

      const novaPublicacao: PublicacaoExplorar = {
        id: Date.now(),
        categoria: "TREINO",
        usuario: treinoSelecionado.usuario || usuarioLogado,
        comentarioPublicacao,
        titulo: treinoSelecionado.tipoTreino || "Treino registrado",
        descricao: treinoSelecionado.descricao || "Compartilhou um treino de performance.",
        data: treinoSelecionado.data,
        detalhePrincipal: treinoSelecionado.intensidade
          ? `Intensidade ${treinoSelecionado.intensidade}`
          : "Intensidade Geral",
        detalheSecundario: "Treino",
        curtidas: 0,
        comentarios: [],
        itemOriginalId: treinoSelecionado.id,
      };

      salvarPublicacoesLocalStorage([novaPublicacao, ...publicacoes]);
    } else {
      const dietaSelecionada = dietas.find(
        (dieta) => String(dieta.id) === dietaSelecionadaId
      );

      if (!dietaSelecionada) {
        alert("Selecione uma dieta para publicar.");
        return;
      }

      const novaPublicacao: PublicacaoExplorar = {
        id: Date.now(),
        categoria: "DIETA",
        usuario: dietaSelecionada.usuario || usuarioLogado,
        comentarioPublicacao,
        titulo: dietaSelecionada.tipo || "Dieta registrada",
        descricao: dietaSelecionada.descricao || "Compartilhou uma rotina nutricional.",
        data: dietaSelecionada.data,
        detalhePrincipal: dietaSelecionada.usuario?.imc
          ? `IMC ${dietaSelecionada.usuario.imc}`
          : usuarioLogado.imc
          ? `IMC ${usuarioLogado.imc}`
          : "Métrica Geral",
        detalheSecundario: "Dieta",
        curtidas: 0,
        comentarios: [],
        itemOriginalId: dietaSelecionada.id,
      };

      salvarPublicacoesLocalStorage([novaPublicacao, ...publicacoes]);
    }

    limparFormulario();
  }

  function curtirPublicacao(id: number) {
    if (curtidasUsuario.includes(id)) {
      setCurtidasUsuario(curtidasUsuario.filter((cId) => cId !== id));
    } else {
      setCurtidasUsuario([...curtidasUsuario, id]);
    }
  }

  function alternarComentarios(id: number) {
    if (comentariosAbertos.includes(id)) {
      setComentariosAbertos(comentariosAbertos.filter((cId) => cId !== id));
    } else {
      setComentariosAbertos([...comentariosAbertos, id]);
    }
  }

  function rascunharComentario(id: number, valor: string) {
    setComentariosDigitados(prev => ({ ...prev, [id]: valor }));
  }

  function comentarPublicacao(publicacao: PublicacaoExplorar) {
    const texto = comentariosDigitados[publicacao.id];
    if (!texto || texto.trim() === "") return;

    const novoComentario: Comentario = {
      id: Date.now(),
      usuario: usuarioLogado.nome || usuarioLogado.usuario || "Você",
      texto,
    };

    const novasPublicacoes = publicacoes.map((item) =>
      item.id === publicacao.id
        ? { ...item, comentarios: [...item.comentarios, novoComentario] }
        : item
    );

    salvarPublicacoesLocalStorage(novasPublicacoes);
    rascunharComentario(publicacao.id, "");
  }

  function apagarPublicacao(publicacao: PublicacaoExplorar) {
    const donoDaPublicacao = publicacao.usuario?.id === usuarioLogado.id;
    if (!donoDaPublicacao) {
      alert("Você só pode apagar publicações criadas por você.");
      return;
    }

    const confirmar = confirm("Deseja apagar essa publicação?");
    if (!confirmar) return;

    const novasPublicacoes = publicacoes.filter((item) => item.id !== publicacao.id);
    salvarPublicacoesLocalStorage(novasPublicacoes);
  }

  function atualizarTipoPublicacao(e: ChangeEvent<HTMLSelectElement>) {
    setTipoPublicacao(e.target.value as TipoPublicacao);
    setTreinoSelecionadoId("");
    setDietaSelecionadaId("");
  }

  const publicacoesFiltradas = publicacoes.filter((publicacao) => {
    if (filtro === "TODOS") return true;
    return publicacao.categoria === filtro;
  });

  return (
    <main className={`min-h-screen transition-colors duration-300 px-4 md:px-8 py-28 selection:bg-[#f27825]/20 selection:text-[#f27825] ${
      isDarkMode ? "bg-[#053227] text-white" : "bg-[#F8F9FA] text-zinc-900"
    }`}>
      <section className="max-w-5xl mx-auto space-y-10">
        
        {/* HEADER HERO */}
        <div className={`relative overflow-hidden rounded-3xl p-8 md:p-14 border transition-colors duration-300 ${
          isDarkMode 
            ? "bg-linear-to-br from-black/40 via-[#053227] to-[#053227] border-white/10 shadow-2xl shadow-black/40" 
            : "bg-linear-to-br from-zinc-900 via-zinc-900 to-black text-white border-zinc-800 shadow-2xl shadow-zinc-200/50"
        }`}>
          <div className="absolute -right-12 -top-12 w-80 h-80 bg-[#f27825]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-bold text-[#f27825] uppercase tracking-widest mb-3">
              Comunidade Vitta Fit
            </p>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Explorar
            </h1>
            <p className={`mt-4 text-sm md:text-base leading-relaxed font-light ${isDarkMode ? "text-white/70" : "text-zinc-600"}`}>
              Compartilhe sua rotina operacional de treinos e planejamentos dietéticos. Inspire e receba feedback direto da comunidade ativa.
            </p>
          </div>
        </div>

        {/* BARRA DE FILTROS E AÇÕES */}
        <div className={`rounded-3xl p-6 border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-all duration-300 ${
          isDarkMode 
            ? "bg-white/3 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/20" 
            : "bg-white border-zinc-200/60 shadow-xl shadow-zinc-200/40"
        }`}>
          <div className="space-y-1">
            <h2 className="text-lg font-bold uppercase tracking-tight">Mural de Atividades</h2>
            <p className={`text-xs ${isDarkMode ? "text-white/40" : "text-zinc-400"}`}>Filtre ou interaja com novas publicações vinculadas</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className={`border rounded-xl p-1 flex gap-1 ${isDarkMode ? "bg-white/5 border-white/5" : "bg-zinc-50 border-zinc-200/60"}`}>
              {["TODOS", "TREINO", "DIETA"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFiltro(item as Filtro)}
                  className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    filtro === item
                      ? "bg-[#f27825] text-white shadow-lg shadow-[#f27825]/20"
                      : isDarkMode ? "text-white/40 hover:text-white" : "text-zinc-400 hover:text-zinc-800"
                  }`}
                >
                  {item === "TODOS" ? "Tudo" : item === "TREINO" ? "Treinos" : "Dietas"}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setAbrirForm(true)}
              className={`cursor-pointer flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-lg active:scale-[0.98] ${
                isDarkMode 
                  ? "bg-white text-zinc-950 hover:bg-zinc-200 shadow-white/5" 
                  : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-900/15"
              }`}
            >
              <Plus size={14} className="stroke-3" />
              Nova Publicação
            </button>
          </div>
        </div>

        {/* FORMULÁRIO DE NOVA POSTAGEM */}
        {abrirForm && (
          <div className={`border rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300 ${
            isDarkMode ? "bg-white/3 backdrop-blur-xl border-white/10" : "bg-white border-zinc-200/80"
          }`}>
            <div className={`flex justify-between items-start gap-4 mb-6 pb-4 border-b ${isDarkMode ? "border-white/5" : "border-zinc-100"}`}>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight">Criar Nova Postagem</h3>
                <p className={`text-xs ${isDarkMode ? "text-white/40" : "text-zinc-400"}`}>Selecione o registro prévio para criar o comentário</p>
              </div>
              <button
                type="button"
                onClick={limparFormulario}
                className={`cursor-pointer p-1.5 rounded-full border transition ${
                  isDarkMode 
                    ? "bg-white/5 border-white/10 text-white/40 hover:text-red-400 hover:bg-red-500/10" 
                    : "bg-zinc-50 border-zinc-100 text-zinc-400 hover:text-red-500 hover:bg-red-5"
                }`}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={publicarNoExplorar} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={`text-[10px] font-bold uppercase tracking-wider pl-1 ${isDarkMode ? "text-white/40" : "text-zinc-400"}`}>Categoria</label>
                  <select
                    value={tipoPublicacao}
                    onChange={atualizarTipoPublicacao}
                    className={`w-full border rounded-xl px-4 py-3 text-xs font-medium outline-none cursor-pointer focus:border-[#f27825] transition ${
                      isDarkMode ? "bg-zinc-900 border-white/10 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                    }`}
                  >
                    <option value="TREINO">Treino Cadastrado</option>
                    <option value="DIETA">Dieta Cadastrada</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={`text-[10px] font-bold uppercase tracking-wider pl-1 ${isDarkMode ? "text-white/40" : "text-zinc-400"}`}>Vincular Registro</label>
                  {tipoPublicacao === "TREINO" ? (
                    <select
                      value={treinoSelecionadoId}
                      onChange={(e) => setTreinoSelecionadoId(e.target.value)}
                      className={`w-full border rounded-xl px-4 py-3 text-xs font-medium outline-none cursor-pointer focus:border-[#f27825] transition ${
                        isDarkMode ? "bg-zinc-900 border-white/10 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                      }`}
                      required
                    >
                      <option value="">Selecione um treino disponível</option>
                      {treinos.map((treino) => (
                        <option key={treino.id} value={treino.id}>
                          {treino.tipoTreino} — {treino.intensidade}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={dietaSelecionadaId}
                      onChange={(e) => setDietaSelecionadaId(e.target.value)}
                      className={`w-full border rounded-xl px-4 py-3 text-xs font-medium outline-none cursor-pointer focus:border-[#f27825] transition ${
                        isDarkMode ? "bg-zinc-900 border-white/10 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                      }`}
                      required
                    >
                      <option value="">Selecione uma dieta disponível</option>
                      {dietas.map((dieta) => (
                        <option key={dieta.id} value={dieta.id}>
                          {dieta.tipo}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={`text-[10px] font-bold uppercase tracking-wider pl-1 ${isDarkMode ? "text-white/40" : "text-zinc-400"}`}>Seu Feedback / Legenda</label>
                <textarea
                  value={comentarioPublicacao}
                  onChange={(e) => setComentarioPublicacao(e.target.value)}
                  placeholder="Descreva sua experiência ou insights sobre esse dia..."
                  className={`w-full border rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-[#f27825] min-h-22.5 resize-none transition ${
                    isDarkMode ? "bg-zinc-900 border-white/10 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                  }`}
                  required
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full flex items-center justify-center gap-2 bg-[#f27825] hover:bg-[#d9651c] text-white rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-[#f27825]/10"
              >
                <Send size={12} />
                Publicar no Feed
              </button>
            </form>
          </div>
        )}

        {/* FEED LOADER */}
        {isLoading && (
          <div className={`border rounded-3xl p-12 flex flex-col items-center justify-center gap-3 shadow-sm ${
            isDarkMode ? "bg-white/2 border-white/5 text-white/40" : "bg-white border-zinc-100 text-zinc-400"
          }`}>
            <Loader2 className="animate-spin text-[#f27825]" size={28} />
            <span className="text-xs font-bold uppercase tracking-widest">Sincronizando Banco...</span>
          </div>
        )}

        {/* LISTAGEM DE POSTAGENS */}
        {!isLoading && (
          <div className="space-y-6">
            {publicacoesFiltradas.map((publicacao) => {
              const isTreino = publicacao.categoria === "TREINO";
              const jaCurtiu = curtidasUsuario.includes(publicacao.id);
              const comentariosVisiveis = comentariosAbertos.includes(publicacao.id);
              const donoDaPublicacao = publicacao.usuario?.id === usuarioLogado.id;

              return (
                <article
                  key={publicacao.id}
                  className={`border rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-xl ${
                    isDarkMode 
                      ? "bg-white/3 border-white/10 shadow-black/30 hover:bg-white/4" 
                      : "bg-white border-zinc-100 shadow-zinc-200/30 hover:shadow-zinc-200/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* AVATAR */}
                    <div className={`w-11 h-11 rounded-xl overflow-hidden shrink-0 border flex items-center justify-center shadow-inner ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-zinc-100 border-zinc-200/60"
                    }`}>
                      {publicacao.usuario?.foto ? (
                        <img
                          src={publicacao.usuario.foto}
                          alt={publicacao.usuario.nome || "Usuário"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-sm font-black text-white">
                          {publicacao.usuario?.nome?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </div>

                    {/* METADADOS */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        <span className={`font-bold truncate ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                          {publicacao.usuario?.nome || publicacao.usuario?.usuario || "User"}
                        </span>
                        <span className={isDarkMode ? "text-white/20" : "text-zinc-300"} >•</span>
                        <span className={isDarkMode ? "text-white/40 font-light" : "text-zinc-500 font-light"}>
                          {isTreino ? "compartilhou um treino" : "compartilhou uma dieta"}
                        </span>
                        <span className={isDarkMode ? "text-white/20" : "text-zinc-300"}>•</span>
                        <span className={isDarkMode ? "text-white/50" : "text-zinc-400 font-medium"}>
                          {formatarData(publicacao.data)}
                        </span>
                      </div>

                      {/* COMENTÁRIO PRINCIPAL */}
                      <p className={`mt-3 text-sm md:text-base font-medium leading-relaxed italic pr-2 ${isDarkMode ? "text-white/90" : "text-zinc-800"}`}>
                        “{publicacao.comentarioPublicacao}”
                      </p>

                      {/* CARD ANEXADO (TREINO OU DIETA) */}
                      <div
                        className={`mt-4 rounded-2xl border p-5 relative overflow-hidden transition-all shadow-inner ${
                          isTreino
                            ? isDarkMode ? "bg-orange-500/3 border-orange-500/20" : "bg-linear-to-r from-orange-50/50 to-transparent border-orange-100"
                            : isDarkMode ? "bg-emerald-500/3 border-emerald-500/20" : "bg-linear-to-r from-emerald-50/50 to-transparent border-emerald-100"
                        }`}
                      >
                        <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
                          {isTreino ? <Activity size={40} className="text-orange-500" /> : <Apple size={40} className="text-emerald-500" />}
                        </div>

                        <p className={`text-[9px] uppercase tracking-widest font-black ${isTreino ? "text-orange-500" : "text-emerald-500"}`}>
                          {isTreino ? "Cardio & Weight" : "Macro Nutritional Plan"}
                        </p>

                        <h4 className={`text-lg font-bold uppercase tracking-tight mt-1 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                          {publicacao.titulo}
                        </h4>

                        <p className={`text-xs mt-1 leading-relaxed max-w-xl ${isDarkMode ? "text-white/50" : "text-zinc-500"}`}>
                          {publicacao.descricao}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <span
                            className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                              isTreino
                                ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            }`}
                          >
                            {publicacao.detalhePrincipal}
                          </span>
                          <span className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border shadow-sm ${
                            isDarkMode ? "bg-white/5 border-white/10 text-white/60" : "bg-white border-zinc-200 text-zinc-500"
                          }`}>
                            {publicacao.detalheSecundario}
                          </span>
                        </div>
                      </div>

                      {/* FOOTER DO POST CONTROLES */}
                      <div className={`flex items-center justify-between gap-4 mt-5 pt-4 border-t ${isDarkMode ? "border-white/5" : "border-zinc-100"}`}>
                        <div className="flex items-center gap-6">
                          <button
                            type="button"
                            onClick={() => curtirPublicacao(publicacao.id)}
                            className={`cursor-pointer flex items-center gap-1.5 text-xs font-bold transition-all ${
                              jaCurtiu ? "text-red-500" : isDarkMode ? "text-white/40 hover:text-red-400" : "text-zinc-400 hover:text-red-500"
                            }`}
                          >
                            <Heart
                              size={16}
                              className="transition-transform duration-200 active:scale-125"
                              fill={jaCurtiu ? "currentColor" : "none"}
                            />
                            {publicacao.curtidas + (jaCurtiu ? 1 : 0)}
                          </button>

                          <button
                            type="button"
                            onClick={() => alternarComentarios(publicacao.id)}
                            className={`cursor-pointer flex items-center gap-1.5 text-xs font-bold transition-all ${
                              comentariosVisiveis ? "text-[#f27825]" : isDarkMode ? "text-white/40 hover:text-[#f27825]" : "text-zinc-400 hover:text-[#f27825]"
                            }`}
                          >
                            <MessageCircle size={16} />
                            {publicacao.comentarios.length}
                          </button>
                        </div>

                        {donoDaPublicacao && (
                          <button
                            type="button"
                            onClick={() => apagarPublicacao(publicacao)}
                            className={`cursor-pointer flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider transition ${
                              isDarkMode ? "text-white/30 hover:text-red-400" : "text-zinc-400 hover:text-red-600"
                            }`}
                          >
                            <Trash2 size={13} />
                            Remover
                          </button>
                        )}
                      </div>

                      {/* SECTION COMENTÁRIOS COM ACCORDION */}
                      {comentariosVisiveis && (
                        <div className={`mt-5 pt-4 border-t space-y-4 ${isDarkMode ? "border-white/5" : "border-zinc-100/60"}`}>
                          {publicacao.comentarios.length > 0 && (
                            <div className="space-y-2 max-h-55 overflow-y-auto pr-2">
                              {publicacao.comentarios.map((comentario) => (
                                <div
                                  key={comentario.id}
                                  className={`border rounded-xl px-4 py-2.5 text-xs ${
                                    isDarkMode ? "bg-black/20 border-white/5" : "bg-zinc-50 border-zinc-200/50"
                                  }`}
                                >
                                  <span className={`font-bold block mb-0.5 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                                    {comentario.usuario}
                                  </span>
                                  <span className={isDarkMode ? "text-white/70" : "text-zinc-600"}>
                                    {comentario.texto}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={comentariosDigitados[publicacao.id] || ""}
                              onChange={(e) => rascunharComentario(publicacao.id, e.target.value)}
                              placeholder="Adicione um comentário cooperativo..."
                              className={`flex-1 border rounded-xl px-4 py-2.5 text-xs font-medium outline-none focus:border-[#f27825] transition ${
                                isDarkMode ? "bg-zinc-900 border-white/10 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-900"
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => comentarPublicacao(publicacao)}
                              className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm ${
                                isDarkMode ? "bg-white text-zinc-950 hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-zinc-800"
                              }`}
                            >
                              Enviar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && publicacoesFiltradas.length === 0 && (
          <div className={`text-center border rounded-3xl p-12 shadow-sm ${
            isDarkMode ? "bg-white/2 border-white/5" : "bg-white border-zinc-200/60"
          }`}>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Nenhuma postagem encontrada
            </p>
            <p className="text-xs text-zinc-400 mt-1">Seja o pioneiro da lista criando um registro acima.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Explorar;