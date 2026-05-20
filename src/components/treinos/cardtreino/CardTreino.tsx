import { Clock3, Dumbbell, Activity, CalendarDays } from "lucide-react";

function CardTreino() {
    return (

        <>
            <div
                className="group relative w-full max-w-4xl overflow-hidden rounded-3xl border border-violet-500/20 bg-zinc-950/90 p-6
        shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/40
        hover:shadow-[0_0_60px_rgba(139,92,246,0.25)]">
                <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div
                        className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl animate-pulse" />
                    <div
                        className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
                </div>

                <div className="relative z-10">

                    <div className="flex items-start justify-between gap-4">

                        <div className="flex gap-4">

                            <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Foto do usuário" className="h-20 w-20 rounded-full border-2 border-violet-500
                object-cover shadow-[0_0_20px_rgba(139,92,246,0.6)]"/>

                            <div className="flex flex-col justify-center">
                                <h2 className="text-2xl font-bold text-zinc-100">
                                    Treino de Peito e Tríceps
                                </h2>

                                <span className="mt-2 w-fit rounded-full bg-violet-500/15 px-4 py-1 text-sm font-medium text-violet-300 backdrop-blur-md hover: cursor-pointer hover:bg-violet-300/50 transition-all duration-500">
                                    🏋️ Treino
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-zinc-400">
                            <CalendarDays size={18} />
                            <span className="text-sm md:text-base">
                                20/05/2026
                            </span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="text-lg leading-relaxed text-zinc-300">
                            Treino focado em desenvolvimento de peito e tríceps.
                            Execuções controladas e muita intensidade do início ao fim.
                            Meu ombro doi pra kct acabei de tomar um antinflamatorio.
                            Vou largar essa vida de fitness porque isso nao é pra mim, é so pra gente DOIDA!
                        </p>
                    </div>

                    <div className="my-8 h-px w-full bg-zinc-800" />

                    <div
                        className="grid grid-cols-1 gap-6 md:grid-cols-3">

                        <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all
              duration-300 hover:border-violet-500/40 hover:bg-zinc-900">
                            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
                                <Clock3 size={28} />
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wide text-zinc-500">
                                    Duração
                                </p>

                                <h3 className="text-2xl font-bold text-white">
                                    13:00
                                </h3>
                            </div>
                        </div>

                        {/* volume */}
                        <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-300
              hover:border-blue-500/40 hover:bg-zinc-900">
                            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                                <Dumbbell size={28} />
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wide text-zinc-500">
                                    Volume
                                </p>

                                <h3 className="text-2xl font-bold text-white">
                                    8.450 kg
                                </h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-300
              hover:border-emerald-500/40 hover:bg-zinc-900">
                            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                                <Activity size={28} />
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wide text-zinc-500">
                                    Séries
                                </p>

                                <h3 className="text-2xl font-bold text-white">
                                    10
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default CardTreino;
