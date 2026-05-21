import type { Usuario } from "./Usuario";

export default interface Dieta {
id: number;
imc: number;
tipo: string;
descricao: string;
data: string;
usuario: Usuario | null;
}