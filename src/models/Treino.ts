import type { Usuario } from "./Usuario";

export default interface Treino {
    id: number;
    tipoTreino: string;
    descricao: string;
    data: string;
    intensidade: string;
    usuario: Usuario | null;
}