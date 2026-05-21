export interface Usuario {
  id?: number;
  nome: string;
  usuario: string;
  senha: string;
  foto?: string;
  altura: number;
  peso: number;
  imc?: number;
}