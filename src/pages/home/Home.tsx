import GaleriaInspiracao from "../../components/extras/Galeria";
import Hero from "../../components/home/Hero";

function Home({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <>
      <Hero isDarkMode={isDarkMode} />
      <GaleriaInspiracao isDarkMode={isDarkMode} />
    </>
  );
}

export default Home;