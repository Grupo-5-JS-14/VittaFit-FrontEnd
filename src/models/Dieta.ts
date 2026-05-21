import type { Usuario } from "./Usuario";

export default interface Dieta {
id?: number;
imc: number;
tipoDieta: string;
descricao: string;
data: string;
usuario?: Usuario | null;
}