import type Treino from "../../../models/Treino";
import CardTreino from "../cardtreino/CardTreino";

interface ListaTreinosProps {
  treinos: Treino[];
  isDarkMode: boolean;
  onDeletar: (id: number) => void;
}

function ListaTreinos({ treinos, isDarkMode, onDeletar }: ListaTreinosProps) {
  if (treinos.length === 0) {
    return (
      <div className={`text-center border rounded-3xl p-12 shadow-sm ${
        isDarkMode ? "bg-zinc-900/40 border-white/5" : "bg-white border-zinc-200/60"
      }`}>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Nenhum treino listado com este filtro
        </p>
        <p className="text-xs text-zinc-500 mt-1">Crie um registro usando o botão de nova publicação acima.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      {treinos.map((treino) => (
        <CardTreino
          key={treino.id}
          treino={treino}
          isDarkMode={isDarkMode}
          onDeletar={onDeletar}
        />
      ))}
    </div>
  );
}

export default ListaTreinos;