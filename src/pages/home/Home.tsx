import CardDieta from "../../components/dietas/carddieta/CardDieta";
import GaleriaInspiracao from "../../components/extras/Galeria";
import Hero from "../../components/home/Hero";
import CardTreino from "../../components/treinos/cardtreino/CardTreino";

function Home({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <>
      <Hero isDarkMode={isDarkMode} />
      <CardDieta/>
      <CardTreino/>
      <GaleriaInspiracao isDarkMode={isDarkMode} />
    </>
  );
}

export default Home;