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

function Explorar() {
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
  const [tipoPublicacao, setTipoPublicacao] =
    useState<TipoPublicacao>("TREINO");

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

      await buscar("/treinos", (dados: Treino[]) => {
        treinosApi = dados;
      });

      await buscar("/dietas", (dados: Dieta[]) => {
        dietasApi = dados;
      });

      setTreinos(treinosApi);
      setDietas(dietasApi);

      const publicacoesSalvas = localStorage.getItem("publicacoesExplorar");

      if (publicacoesSalvas) {
        setPublicacoes(JSON.parse(publicacoesSalvas));
      }
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
    localStorage.setItem(
      "publicacoesExplorar",
      JSON.stringify(novasPublicacoes)
    );
  }

  function formatarData(data: string) {
    if (!data) return "Agora";

    const dataFormatada = new Date(data);

    if (Number.isNaN(dataFormatada.getTime())) {
      return data;
    }

    return dataFormatada.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
        descricao:
          treinoSelecionado.descricao || "Usuário compartilhou um treino.",
        data: treinoSelecionado.data,
        detalhePrincipal: treinoSelecionado.intensidade
          ? `Intensidade ${treinoSelecionado.intensidade}`
          : "Intensidade não informada",
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
        descricao:
          dietaSelecionada.descricao || "Usuário compartilhou uma dieta.",
        data: dietaSelecionada.data,
        detalhePrincipal: dietaSelecionada.usuario?.imc
          ? `IMC ${dietaSelecionada.usuario.imc}`
          : usuarioLogado.imc
          ? `IMC ${usuarioLogado.imc}`
          : "IMC não informado",
        detalheSecundario: "Dieta",
        curtidas: 0,
        comentarios: [],
        itemOriginalId: dietaSelecionada.id,
      };

      salvarPublicacoesLocalStorage([novaPublicacao, ...publicacoes]);
    }

    limparFormulario();
  }

  function limparFormulario() {
    setAbrirForm(false);
    setTipoPublicacao("TREINO");
    setTreinoSelecionadoId("");
    setDietaSelecionadaId("");
    setComentarioPublicacao("");
  }

  function curtirPublicacao(publicacaoId: number) {
    const jaCurtiu = curtidasUsuario.includes(publicacaoId);

    if (jaCurtiu) {
      setCurtidasUsuario(
        curtidasUsuario.filter((curtidaId) => curtidaId !== publicacaoId)
      );
    } else {
      setCurtidasUsuario([...curtidasUsuario, publicacaoId]);
    }
  }

  function alternarComentarios(publicacaoId: number) {
    const comentariosEstaoAbertos = comentariosAbertos.includes(publicacaoId);

    if (comentariosEstaoAbertos) {
      setComentariosAbertos(
        comentariosAbertos.filter((id) => id !== publicacaoId)
      );
    } else {
      setComentariosAbertos([...comentariosAbertos, publicacaoId]);
    }
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
        ? {
            ...item,
            comentarios: [...item.comentarios, novoComentario],
          }
        : item
    );

    salvarPublicacoesLocalStorage(novasPublicacoes);

    setComentariosDigitados({
      ...comentariosDigitados,
      [publicacao.id]: "",
    });
  }

  function apagarPublicacao(publicacao: PublicacaoExplorar) {
    const donoDaPublicacao = publicacao.usuario?.id === usuarioLogado.id;

    if (!donoDaPublicacao) {
      alert("Você só pode apagar publicações criadas por você.");
      return;
    }

    const confirmar = confirm("Deseja apagar essa publicação?");
    if (!confirmar) return;

    const novasPublicacoes = publicacoes.filter(
      (item) => item.id !== publicacao.id
    );

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
    <main className="min-h-screen bg-[#f4efe4] text-zinc-900 px-4 py-24">
      <section className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden bg-linear-to-br from-[#0d6b72] via-[#074b52] to-[#052f35] rounded-[2.5rem] p-8 md:p-12 text-white mb-8 shadow-xl">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl"></div>

          <div className="relative">
            <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-emerald-200 font-semibold">
              Comunidade Vitta Fit
            </p>

            <h1 className="text-4xl md:text-6xl font-black mt-4">Explorar</h1>

            <p className="text-white/75 max-w-2xl mt-4 text-base md:text-lg">
              Publique treinos e dietas já cadastrados, compartilhe sua
              experiência e interaja com a comunidade.
            </p>
          </div>
        </div>

        <div className="bg-[#fffaf0] rounded-4xl p-5 md:p-7 shadow-sm border border-black/5 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h2 className="text-2xl font-black">Publicações da comunidade</h2>

              <p className="text-zinc-500 mt-1">
                Escolha um treino ou dieta já cadastrado e conte como foi.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-white border border-black/10 rounded-full p-1 w-fit">
                {["TODOS", "TREINO", "DIETA"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFiltro(item as Filtro)}
                    className={`cursor-pointer px-5 py-2 rounded-full text-sm font-bold transition ${
                      filtro === item
                        ? item === "TREINO"
                          ? "bg-orange-500 text-white shadow"
                          : item === "DIETA"
                          ? "bg-emerald-500 text-white shadow"
                          : "bg-zinc-900 text-white shadow"
                        : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    {item === "TODOS"
                      ? "Tudo"
                      : item === "TREINO"
                      ? "Treinos"
                      : "Dietas"}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setAbrirForm(true)}
                className="cursor-pointer flex items-center gap-2 bg-zinc-900 text-white px-5 py-3 rounded-full font-bold hover:bg-zinc-700 transition shadow-sm"
              >
                <Plus size={18} />
                Nova publicação
              </button>
            </div>
          </div>
        </div>

        {abrirForm && (
          <form
            onSubmit={publicarNoExplorar}
            className="bg-[#fffaf0] border border-black/5 rounded-4xl p-6 md:p-8 shadow-sm mb-8"
          >
            <div className="flex justify-between items-start gap-4 mb-5">
              <div>
                <h2 className="text-2xl font-black">Nova publicação</h2>

                <p className="text-zinc-500 text-sm mt-1">
                  O treino ou dieta escolhido não será alterado. Você só vai
                  publicar um comentário sobre ele.
                </p>
              </div>

              <button
                type="button"
                onClick={limparFormulario}
                className="cursor-pointer text-zinc-500 hover:text-red-500 transition"
              >
                <X />
              </button>
            </div>

            <div className="grid gap-4">
              <select
                value={tipoPublicacao}
                onChange={atualizarTipoPublicacao}
                className="bg-white border border-black/10 rounded-2xl px-5 py-3 outline-none cursor-pointer focus:border-emerald-500"
              >
                <option value="TREINO">Publicar treino cadastrado</option>
                <option value="DIETA">Publicar dieta cadastrada</option>
              </select>

              {tipoPublicacao === "TREINO" ? (
                <select
                  value={treinoSelecionadoId}
                  onChange={(e) => setTreinoSelecionadoId(e.target.value)}
                  className="bg-white border border-black/10 rounded-2xl px-5 py-3 outline-none cursor-pointer focus:border-orange-500"
                  required
                >
                  <option value="">Selecione um treino</option>

                  {treinos.map((treino) => (
                    <option key={treino.id} value={treino.id}>
                      {treino.tipoTreino} - {treino.intensidade}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  value={dietaSelecionadaId}
                  onChange={(e) => setDietaSelecionadaId(e.target.value)}
                  className="bg-white border border-black/10 rounded-2xl px-5 py-3 outline-none cursor-pointer focus:border-emerald-500"
                  required
                >
                  <option value="">Selecione uma dieta</option>

                  {dietas.map((dieta) => (
                    <option key={dieta.id} value={dieta.id}>
                      {dieta.tipo}
                    </option>
                  ))}
                </select>
              )}

              <textarea
                value={comentarioPublicacao}
                onChange={(e) => setComentarioPublicacao(e.target.value)}
                placeholder="Comente sobre essa atividade. Ex: hoje foi difícil, mas consegui concluir!"
                className="bg-white border border-black/10 rounded-2xl px-5 py-3 outline-none focus:border-emerald-500 min-h-32 resize-none"
                required
              />

              <button
                type="submit"
                className="cursor-pointer flex items-center justify-center gap-2 bg-zinc-900 text-white rounded-full px-6 py-3 font-bold hover:bg-zinc-700 transition"
              >
                <Send size={18} />
                Publicar no Explorar
              </button>
            </div>
          </form>
        )}

        {isLoading && (
          <div className="bg-[#fffaf0] border border-black/5 rounded-4xl p-10 flex items-center justify-center gap-3 text-zinc-500">
            <Loader2 className="animate-spin" />
            Carregando treinos e dietas...
          </div>
        )}

        {!isLoading && (
          <div className="grid gap-5">
            {publicacoesFiltradas.map((publicacao) => {
              const isTreino = publicacao.categoria === "TREINO";
              const jaCurtiu = curtidasUsuario.includes(publicacao.id);
              const comentariosVisiveis = comentariosAbertos.includes(
                publicacao.id
              );
              const donoDaPublicacao =
                publicacao.usuario?.id === usuarioLogado.id;

              return (
                <article
                  key={publicacao.id}
                  className="bg-[#fffaf0] border border-black/5 rounded-4xl p-6 md:p-7 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                        isTreino
                          ? "bg-orange-100 text-orange-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {publicacao.usuario?.foto ? (
                        <img
                          src={publicacao.usuario.foto}
                          alt={publicacao.usuario.nome || "Usuário"}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : isTreino ? (
                        <Activity size={28} />
                      ) : (
                        <Apple size={28} />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black">
                          {publicacao.usuario?.nome ||
                            publicacao.usuario?.usuario ||
                            "Usuário Vitta Fit"}
                        </h3>

                        <span className="text-zinc-400">•</span>

                        <span className="text-zinc-500">
                          {isTreino
                            ? "publicou um treino cadastrado"
                            : "publicou uma dieta cadastrada"}
                        </span>

                        <span className="text-zinc-400">•</span>

                        <span className="text-zinc-400 text-sm">
                          {formatarData(publicacao.data)}
                        </span>
                      </div>

                      <p className="text-zinc-700 mt-4 text-lg leading-relaxed">
                        “{publicacao.comentarioPublicacao}”
                      </p>

                      <div
                        className={`mt-5 rounded-3xl border p-5 ${
                          isTreino
                            ? "bg-orange-50 border-orange-100"
                            : "bg-emerald-50 border-emerald-100"
                        }`}
                      >
                        <p
                          className={`text-xs uppercase tracking-[0.25em] font-black ${
                            isTreino ? "text-orange-600" : "text-emerald-600"
                          }`}
                        >
                          {isTreino ? "Treino vinculado" : "Dieta vinculada"}
                        </p>

                        <h2 className="text-2xl font-black mt-2">
                          {publicacao.titulo}
                        </h2>

                        <p className="text-zinc-600 mt-2 leading-relaxed">
                          {publicacao.descricao}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-5">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-bold ${
                              isTreino
                                ? "bg-orange-100 text-orange-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {publicacao.detalhePrincipal}
                          </span>

                          <span className="px-4 py-2 rounded-full text-sm font-bold bg-white border border-black/10 text-zinc-600">
                            {publicacao.detalheSecundario}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-black/10">
                        <div className="flex items-center gap-8">
                          <button
                            type="button"
                            onClick={() => curtirPublicacao(publicacao.id)}
                            className={`cursor-pointer flex items-center gap-2 transition ${
                              jaCurtiu
                                ? "text-red-500"
                                : "text-zinc-500 hover:text-red-500"
                            }`}
                          >
                            <Heart
                              size={19}
                              fill={jaCurtiu ? "currentColor" : "none"}
                            />
                            {publicacao.curtidas + (jaCurtiu ? 1 : 0)}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              alternarComentarios(publicacao.id)
                            }
                            className={`cursor-pointer flex items-center gap-2 transition ${
                              comentariosVisiveis
                                ? "text-emerald-600"
                                : "text-zinc-500 hover:text-emerald-600"
                            }`}
                          >
                            <MessageCircle size={19} />
                            {publicacao.comentarios.length}
                          </button>
                        </div>

                        {donoDaPublicacao && (
                          <button
                            type="button"
                            onClick={() => apagarPublicacao(publicacao)}
                            className="cursor-pointer flex items-center gap-2 text-zinc-500 hover:text-red-600 transition"
                          >
                            <Trash2 size={18} />
                            Apagar publicação
                          </button>
                        )}
                      </div>

                      {comentariosVisiveis && (
                        <div className="mt-5">
                          {publicacao.comentarios.length > 0 && (
                            <div className="space-y-2 mb-4">
                              {publicacao.comentarios.map((comentario) => (
                                <div
                                  key={comentario.id}
                                  className="bg-white border border-black/10 rounded-2xl px-4 py-3"
                                >
                                  <p className="font-bold text-sm">
                                    {comentario.usuario}
                                  </p>

                                  <p className="text-zinc-600 text-sm">
                                    {comentario.texto}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row gap-3">
                            <input
                              type="text"
                              value={
                                comentariosDigitados[publicacao.id] || ""
                              }
                              onChange={(e) =>
                                setComentariosDigitados({
                                  ...comentariosDigitados,
                                  [publicacao.id]: e.target.value,
                                })
                              }
                              placeholder="Escreva um comentário..."
                              className="flex-1 bg-white border border-black/10 rounded-full px-5 py-3 outline-none focus:border-emerald-500"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                comentarPublicacao(publicacao)
                              }
                              className="cursor-pointer bg-zinc-900 text-white px-5 py-3 rounded-full font-bold hover:bg-zinc-700 transition"
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

        {!isLoading && publicacoesFiltradas.length === 0 && (
          <div className="text-center bg-[#fffaf0] border border-black/5 rounded-3xl p-10 mt-6">
            <p className="text-zinc-500">
              Nenhuma publicação encontrada. Publique um treino ou dieta já
              cadastrado para começar.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Explorar;