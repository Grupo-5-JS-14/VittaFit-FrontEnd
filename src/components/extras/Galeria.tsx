interface GaleriaProps {
  isDarkMode: boolean;
}

export default function GaleriaInspiracao({ isDarkMode }: GaleriaProps) {
  const fotos = [
    {
      url: "https://i.pinimg.com/736x/8f/13/61/8f1361f15ad674af8ff49424452a2fa1.jpg",
      alt: "Foco no treino",
      gridClass: "md:col-span-2 md:row-span-2 h-[420px]", 
    },
    {
      url: "https://i1-e.pinimg.com/webp85/736x/2d/2d/bc/2d2dbce80ea0060c008a046a8bc8395b.webp",
      alt: "Alimentação limpa",
      gridClass: "md:col-span-1 md:row-span-1 h-[200px]",
    },
    {
      url: "https://i.pinimg.com/736x/8e/fd/29/8efd296e70ce3c6c2f01da52cc172b82.jpg",
      alt: "Corrida e performance",
      gridClass: "md:col-span-1 md:row-span-2 h-[420px] md:h-auto", 
    },
    {
      url: "https://i1-e.pinimg.com/webp85/1200x/65/1e/ab/651eabe69d4f0ba9a072f801641b35eb.webp",
      alt: "Corrida e performance",
      gridClass: "md:col-span-1 md:row-span-3 h-[200px] md:h-auto", 
    },
    {
      url: "https://i1-e.pinimg.com/webp85/736x/2a/02/bd/2a02bd90ebfbe3edc4e30f800f188b21.webp",
      alt: "A",
      gridClass: "md:col-span-1 md:row-span-1 h-[200px]", 
    },
    {
      url: "https://i.pinimg.com/736x/fb/c0/7b/fbc07b2a3f09fa886b49a79888ba9cc3.jpg",
      alt: "B",
      gridClass: "md:col-span-1 md:row-span-2 h-[200px] md:h-auto", 
    },
    {
      url: "https://i1-e.pinimg.com/webp85/1200x/73/5d/11/735d114df0b6d7c135d49832afb41efb.webp",
      alt: "Consistência nos hábitos",
      gridClass: "md:col-span-1 md:row-span-2 h-[200px] md:h-auto",
    },
    {
      url: "https://i.pinimg.com/736x/38/9f/5d/389f5db5456eb72b8355d0a478dd0fdc.jpg",
      alt: "Bcc",
      gridClass: "md:col-span-1 md:row-span-1 h-[240px]", 
    },
  ];

  return (
    <section
      className={`w-full py-20 px-6 md:px-12 transition-colors duration-500 ${
        isDarkMode ? "bg-[#074334]" : "bg-[#f4f4f5]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p
              className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2 ${
                isDarkMode ? "text-gray-400" : "text-[#f27825]"
              }`}
            >
              Movimento & Consistência
            </p>
            <h2 className={`font-black text-4xl md:text-5xl uppercase tracking-tight leading-none ${
              isDarkMode ? "text-white" : "text-[#074334]"
            }`}>
              Nossa{" "}
              <span className={isDarkMode ? "text-[#f27825]" : "text-[#f27825]"}>
                Estética
              </span>{" "}
              É O Foco
            </h2>
          </div>
          <p className={`text-xs max-w-xs font-light leading-relaxed ${
            isDarkMode ? "text-white/80" : "text-[#074334]"
          }`}>
            Mais do que um gerenciador, um estilo de vida focado em evolução
            constante. Registre sua rotina e faça parte do clube.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
          {fotos.map((foto, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl group border border-white/10 shadow-xl shadow-black/5 ${foto.gridClass}`}
            >
              <div
                className={`absolute inset-0 z-10 transition-colors duration-500 pointer-events-none mix-blend-multiply opacity-20 ${
                  isDarkMode ? "bg-[#074334]" : "bg-[#f4f4f5]"
                }`}
              />

              <img
                src={foto.url}
                alt={foto.alt}
                className="w-full h-full object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-105 mix-blend-luminosity hover:mix-blend-normal grayscale group-hover:grayscale-0 brightness-[0.85] group-hover:brightness-100"
              />

              <div className="absolute bottom-4 left-4 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-md">
                  {foto.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}