import type Dieta from "../../../models/Dieta";
import CardDieta from "../carddieta/CardDieta";

interface ListaDietaProps {
  dietas: Dieta[];
  isDarkMode: boolean;
  onDeletar: (id: number) => void;
}

function ListaDieta({ dietas, isDarkMode, onDeletar }: ListaDietaProps) {
  if (dietas.length === 0) {
    return (
      <div className="text-center py-20 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
        Nenhum planejamento dietético registrado no feed
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 items-center w-full">
      {dietas.map((dieta) => (
        <CardDieta 
          key={dieta.id} 
          dieta={dieta} 
          isDarkMode={isDarkMode} 
          onDeletar={onDeletar} 
        />
      ))}
    </div>
  );
}

export default ListaDieta;