import axios from 'axios'
import type { Usuario } from '../models/Usuario'
import type Dieta from '../models/Dieta'
import type Treino from '../models/Treino'

export const api = axios.create({
  baseURL: 'https://backend-fitness-o7sf.onrender.com/' 
})


export async function buscarUsuario(id: number) {
  const resposta = await api.get<Usuario>(`/usuarios/${id}`)
  return resposta.data
}

export async function atualizarUsuario(id: number, dados: Usuario) {
  const resposta = await api.put<Usuario>(`/usuarios/${id}`, dados)
  return resposta.data
}

//treinos
export async function listarTreinos() {
  const resposta = await api.get<Treino[]>('/treinos')
  return resposta.data
}

export async function buscarTreinoPorId(id: number) {
  const resposta = await api.get<Treino>(`/treinos/${id}`)
  return resposta.data
}

export async function criarTreino(dados: Treino) {
  const resposta = await api.post<Treino>('/treinos', dados)
  return resposta.data
}

export async function atualizarTreino(id: number, dados: Partial<Treino>) {
  const resposta = await api.put<Treino>(`/treinos/${id}`, dados)
  return resposta.data
}

export async function eliminarTreino(id: number) {
  await api.delete(`/treinos/${id}`)
}

//dietas
export async function listarDietas() {
  const resposta = await api.get<Dieta[]>('/dietas')
  return resposta.data
}

export async function buscarDietaPorId(id: number) {
  const resposta = await api.get<Dieta>(`/dietas/${id}`)
  return resposta.data
}

export async function buscarDietaPorDescricao(descricao: string) {
  const resposta = await api.get<Dieta[]>(`/dietas/descricao/${descricao}`)
  return resposta.data
}

export async function criarDieta(dados: Dieta) {
  const resposta = await api.post<Dieta>('/dietas', dados)
  return resposta.data
}

export async function atualizarDieta(id: number, dados: Partial<Dieta>) {
  const resposta = await api.put<Dieta>(`/dietas/${id}`, dados)
  return resposta.data
}

export async function eliminarDieta(id: number) {
  await api.delete(`/dietas/${id}`)
}

//generico p n quebrar
export const buscar = async (url: string, setDados: Function) => {
  const resposta = await api.get(url);
  setDados(resposta.data);
};

export const cadastrar = async <T = any>(url: string, dados: Object): Promise<T> => {
  const resposta = await api.post<T>(url, dados);
  return resposta.data;
};

export const atualizar = async <T = any>(url: string, dados: Object): Promise<T> => {
  const resposta = await api.put<T>(url, dados);
  return resposta.data;
};

export const deletar = async (url: string): Promise<void> => {
  await api.delete(url);
};

