import axios from 'axios'
import type { Usuario } from '../models/Usuario'

export const api = axios.create({
  baseURL: 'http://localhost:4000'
})

export async function buscarUsuario(id: number) {
  const resposta = await api.get<Usuario>(
    `/usuarios/${id}`
  )

  return resposta.data
}

export async function atualizarUsuario(
  id: number,
  dados: Usuario
) {
  const resposta = await api.put<Usuario>(
    `/usuarios/${id}`,
    dados
  )

  return resposta.data
}

export const buscar = async (url: string, setDados: Function) => {
  const resposta = await api.get(url);
  setDados(resposta.data);
};

export const cadastrar = async (url: string, dados: Object) => {
  const resposta = await api.post(url, dados);
  return resposta.data;
};

export const atualizar = async (url: string, dados: Object) => {
  const resposta = await api.put(url, dados);
  return resposta.data;
};

export const deletar = async (url: string) => {
  await api.delete(url);
};
