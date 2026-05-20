import { useEffect, useState } from 'react'
import type { Usuario } from '../../models/Usuario'
import {
  buscarUsuario,
  atualizarUsuario
} from '../../services/Service'

function Perfil() {

  const [editando, setEditando] = useState(false)

  const [filtro, setFiltro] = useState('tudo')

  const [rascunho, setRascunho] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    altura: 0,
    peso: 0,
    imc: 0
  })

  const [loading, setLoading] = useState(true)
  const [mensagem, setMensagem] = useState('')

  const usuarioId = 3

  async function carregarUsuario() {

    try {

      setLoading(true)

      const data = await buscarUsuario(usuarioId)

      setRascunho({
        id: data.id,
        nome: data.nome,
        usuario: data.usuario,
        senha: data.senha,
        foto: data.foto || '',
        altura: Number(data.altura),
        peso: Number(data.peso),
        imc: Number(data.imc)
      })

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    carregarUsuario()
  }, [])

  function atualizarEstado(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const { name, value } = e.target

    setRascunho({
      ...rascunho,
      [name]:
        name === 'altura' || name === 'peso'
          ? Number(value)
          : value
    })
  }

  async function salvar(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault()

    try {

      const atualizado = await atualizarUsuario(
        usuarioId,
        rascunho
      )

      setRascunho({
        ...atualizado,
        altura: Number(atualizado.altura),
        peso: Number(atualizado.peso),
        imc: Number(atualizado.imc)
      })

      setMensagem('Perfil atualizado!')

      setEditando(false)

      setTimeout(() => {
        setMensagem('')
      }, 3000)

    } catch (error) {

      console.error(error)
      setMensagem('Erro ao atualizar')

    }
  }

  if (loading) {

    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <h1 className="text-3xl font-black">
          Carregando...
        </h1>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-[#F8F8F8] overflow-hidden">

      {/* HEADER */}
      <div className="relative h-80 bg-linear-to-r from-orange-600/80 via-green-800/60 to-green-900/80">

        <div className="absolute left-0 top-10 w-56 h-56 rounded-full bg-black/5 blur-sm" />

        {/* TITULO */}
        <div className="absolute top-6 left-6">

          <p className="text-sm font-semibold text-white/70 uppercase">
            Perfil VittaFit
          </p>

          <h1 className="text-4xl font-black mt-1 text-white">
            Meu Perfil
          </h1>

        </div>

        {/* EDITAR */}
        <button
          onClick={() => setEditando(true)}
          className="
            absolute
            top-5
            right-6
            bg-white/20
            hover:bg-white/30
            transition-all
            px-6
            py-3
            rounded-2xl
            font-bold
            shadow-lg
            text-white
            backdrop-blur-md
          "
        >
          Editar Perfil
        </button>

        {/* CARD */}
        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            -bottom-22.5
            w-[90%]
            max-w-5xl
            bg-white
            border
            border-black/5
            rounded-[35px]
            p-10
            shadow-2xl
          "
        >

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            {/* PERFIL */}
            <div className="flex items-center gap-6">

              {rascunho.foto ? (

                <img
                  src={rascunho.foto}
                  alt="Foto"
                  className="
                    w-28
                    h-28
                    rounded-full
                    object-cover
                    border-4
                    border-black/5
                    shadow-xl
                  "
                />

              ) : (

                <div
                  className="
                    w-28
                    h-28
                    rounded-full
                    bg-linear-to-br
                    from-orange-600
                    to-green-600
                    flex
                    items-center
                    justify-center
                    text-4xl
                    text-white
                    font-black
                    shadow-xl
                  "
                >
                  {rascunho.nome?.charAt(0)}
                </div>

              )}

              <div>

                <h2 className="text-5xl font-black text-black">
                  {rascunho.nome}
                </h2>

                <p className="text-orange-700 font-bold mt-1">
                  Email: {rascunho.usuario}
                </p>

                {/* IMC */}
                <div
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-3
                    border
                    border-orange-500/10
                    bg-orange-500/5
                    px-5
                    py-2
                    rounded-full
                  "
                >

                  <span className="font-bold text-black/60">
                    IMC
                  </span>

                  <span className="text-2xl font-black text-black">
                    {rascunho.imc}
                  </span>

                </div>

              </div>

            </div>

            {/* STATS */}
            <div className="flex gap-8 flex-wrap">

              <div>

                <h3 className="text-3xl font-black text-center text-black">
                  {rascunho.peso}kg
                </h3>

                <p className="text-black/40 text-sm mt-1 uppercase">
                  Peso
                </p>

              </div>

              <div>

                <h3 className="text-3xl font-black text-center text-black">
                  {rascunho.altura}m
                </h3>

                <p className="text-black/40 text-sm mt-1 uppercase">
                  Altura
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CONTEUDO */}
      <div className="pt-36 px-6 max-w-6xl mx-auto">

        {/* BOTOES */}
        <div className="flex gap-4 flex-wrap justify-center">

          <button
            className="
              bg-linear-to-r
              from-orange-500
              to-orange-400
              hover:scale-105
              transition-all
              px-6
              py-3
              rounded-2xl
              font-bold
              shadow-lg
              text-white
              text-sm
            "
          >
            Criar treino
          </button>

          <button
            className="
              bg-linear-to-r
              from-green-500
              to-green-400
              hover:scale-105
              transition-all
              px-6
              py-3
              rounded-2xl
              font-bold
              shadow-lg
              text-white
              text-sm
            "
          >
            Criar dieta
          </button>

        </div>

        {/* POSTAGENS */}
        <div className="mt-14">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <h2 className="text-3xl font-black text-black">
              Minhas postagens
            </h2>

            <div
              className="
                bg-white
                border
                border-black/5
                rounded-2xl
                p-2
                flex
                gap-2
                w-fit
                shadow-md
              "
            >

              <button
                onClick={() => setFiltro('tudo')}
                className={`
                  px-6
                  py-2
                  rounded-xl
                  font-semibold
                  transition-all
                  ${
                    filtro === 'tudo'
                      ? 'bg-linear-to-r from-orange-500/80 to-green-400/80 text-white'
                      : 'text-black/60 hover:bg-black/5'
                  }
                `}
              >
                Tudo
              </button>

              <button
                onClick={() => setFiltro('treino')}
                className={`
                  px-6
                  py-2
                  rounded-xl
                  font-semibold
                  transition-all
                  ${
                    filtro === 'treino'
                      ? 'bg-orange-500 text-white'
                      : 'text-black/60 hover:bg-black/5'
                  }
                `}
              >
                Treinos
              </button>

              <button
                onClick={() => setFiltro('dieta')}
                className={`
                  px-6
                  py-2
                  rounded-xl
                  font-semibold
                  transition-all
                  ${
                    filtro === 'dieta'
                      ? 'bg-green-500 text-white'
                      : 'text-black/60 hover:bg-black/5'
                  }
                `}
              >
                Dietas
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* MODAL EDITAR */}
      {editando && (

        <div
          className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            p-6
          "
        >

          <form
            onSubmit={salvar}
            className="
              w-full
              max-w-2xl
              bg-white
              rounded-[35px]
              p-8
              shadow-2xl
              space-y-5
            "
          >

            <div className="flex items-center justify-between">

              <h2 className="text-3xl font-black text-black">
                Editar Perfil
              </h2>

              <button
                type="button"
                onClick={() => setEditando(false)}
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-black/5
                  hover:bg-black/10
                  transition-all
                  font-bold
                "
              >
                X
              </button>

            </div>

            <div>

              <label className="block mb-2 font-semibold text-black/70">
                Nome
              </label>

              <input
                type="text"
                name="nome"
                value={rascunho.nome}
                onChange={atualizarEstado}
                className="
                  w-full
                  bg-[#F8F8F8]
                  border
                  border-black/10
                  rounded-2xl
                  p-4
                  outline-none
                  focus:border-green-500
                "
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-black/70">
                Usuário
              </label>

              <input
                type="text"
                name="usuario"
                value={rascunho.usuario}
                onChange={atualizarEstado}
                className="
                  w-full
                  bg-[#F8F8F8]
                  border
                  border-black/10
                  rounded-2xl
                  p-4
                  outline-none
                  focus:border-orange-500
                "
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-black/70">
                Senha
              </label>

              <input
                type="password"
                name="senha"
                value={rascunho.senha}
                onChange={atualizarEstado}
                className="
                  w-full
                  bg-[#F8F8F8]
                  border
                  border-black/10
                  rounded-2xl
                  p-4
                  outline-none
                  focus:border-green-500
                "
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-black/70">
                Foto URL
              </label>

              <input
                type="text"
                name="foto"
                value={rascunho.foto}
                onChange={atualizarEstado}
                className="
                  w-full
                  bg-[#F8F8F8]
                  border
                  border-black/10
                  rounded-2xl
                  p-4
                  outline-none
                  focus:border-orange-500
                "
              />

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>

                <label className="block mb-2 font-semibold text-black/70">
                  Peso
                </label>

                <input
                  type="number"
                  step="0.01"
                  name="peso"
                  value={rascunho.peso}
                  onChange={atualizarEstado}
                  className="
                    w-full
                    bg-[#F8F8F8]
                    border
                    border-black/10
                    rounded-2xl
                    p-4
                    outline-none
                    focus:border-orange-500
                  "
                />

              </div>

              <div>

                <label className="block mb-2 font-semibold text-black/70">
                  Altura
                </label>

                <input
                  type="number"
                  step="0.01"
                  name="altura"
                  value={rascunho.altura}
                  onChange={atualizarEstado}
                  className="
                    w-full
                    bg-[#F8F8F8]
                    border
                    border-black/10
                    rounded-2xl
                    p-4
                    outline-none
                    focus:border-green-500
                  "
                />

              </div>

            </div>

            <button
              type="submit"
              className="
                w-full
                mt-4
                bg-linear-to-r
                from-green-600/80
                to-orange-600/80
                py-4
                rounded-2xl
                font-black
                text-lg
                text-white
                hover:scale-[1.01]
                transition-all
              "
            >
              Salvar Alterações
            </button>

          </form>

        </div>

      )}

      {/* ALERTA */}
      {mensagem && (

        <div
          className="
            fixed
            bottom-6
            right-6
            bg-green-500
            text-white
            px-6
            py-4
            rounded-2xl
            shadow-2xl
            font-bold
          "
        >
          {mensagem}
        </div>

      )}

    </div>
  )
}

export default Perfil