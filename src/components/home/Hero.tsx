import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ isDarkMode }: { isDarkMode: boolean }) {
  
  const slides = [
    "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=2200&auto=format&fit=crop", 
    "https://i.pinimg.com/736x/c4/7f/93/c47f93f98ac6c8596bbba8127b813620.jpg", 
    "https://i1-e.pinimg.com/1200x/d2/1a/ab/d21aab65b9f6108b183250c995c053d8.jpg", 
    "https://i.pinimg.com/736x/8f/13/61/8f1361f15ad674af8ff49424452a2fa1.jpg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className={`relative h-screen w-full overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-[#074334]' : 'bg-[#f4f4f5]'
    }`}>
      
      <div className="absolute inset-0 z-0">
        {slides.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`VittaFit Banner ${index + 1}`}
              className={`h-full w-full object-cover mix-blend-luminosity scale-100 transition-all duration-500 ${
                isDarkMode 
                  ? 'brightness-[0.6] opacity-35' 
                  : 'brightness-[0.7] opacity-25'
              }`}
            />
          </div>
        ))}
        
        <div className={`absolute inset-0 z-1 transition-colors duration-500 ${
          isDarkMode ? 'bg-[#074334]/40' : 'bg-[#f4f4f5]/20'
        }`} />
        <div className={`absolute inset-0 z-2 transition-all duration-500 bg-linear-to-r ${
          isDarkMode ? 'from-[#074334]/90 via-[#074334]/40' : 'from-[#f4f4f5]/95 via-[#f4f4f5]/50'
        } to-transparent`} />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-center px-8 md:px-16 text-white">
        
        <div className="max-w-xl text-left animate-fade-in mt-12">
          
          <p className={`text-[11px] font-bold tracking-[0.25em] uppercase mb-3 transition-colors ${
            isDarkMode ? 'text-gray-400' : 'text-[#074334]'
          }`}>
            Sua saúde sob controle diário
          </p>

          <h1 className="font-kare text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.95] select-none">
          <span className={`transition-colors ${isDarkMode ? 'text-white' : 'text-[#074334]'}`}>
            BE PART <br />OF THE{' '}
            </span>
            <span className="text-[#f27825]">FIT</span>
            </h1>

<p className={`mt-5 text-xs font-light tracking-wide max-w-sm leading-relaxed transition-colors ${
  isDarkMode ? 'text-gray-200' : 'text-[#074334]'
}`}>
  Acompanhe sua evolução física, gerencie rotinas de treinos e consolide hábitos mais saudáveis com uma experiência digital de alta performance.
</p>

<button className="group mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
  <span className={`transition-colors ${isDarkMode ? 'text-white' : 'text-[#074334]'}`}>Começar Jornada</span>
  <ArrowRight size={14} className="text-[#f27825] transition-transform group-hover:translate-x-1.5" />
</button>

        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden flex-col items-end gap-6 text-[10px] font-bold tracking-widest md:flex pr-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`flex items-center transition-all duration-300 outline-none ${
                index === currentSlide 
                  ? `text-white border-r-2 ${isDarkMode ? 'border-[#f27825]' : 'border-[#074334]'} pr-3 scale-110` 
                  : `text-white/50 pr-3 hover:text-white`
              }`}
            >
              0{index + 1}
            </button>
          ))}
        </div>

      </div>

    </section>
  );
}