import axios from 'axios'
import type { Usuario } from '../models/Usuario'

const api = axios.create({
  baseURL: 'http://localhost:4000'
})

export async function buscarUsuario(id: number) {
  const response = await api.get<Usuario>(
    `/usuarios/${id}`
  )

  return response.data
}

export async function atualizarUsuario(
  id: number,
  dados: Usuario
) {
  const response = await api.put<Usuario>(
    `/usuarios/${id}`,
    dados
  )

  return response.data
}