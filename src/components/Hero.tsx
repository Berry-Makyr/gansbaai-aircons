import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/60 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-sky-500/10 z-10" />
        {/* We use a placeholder local image if Sanity data is absent */}
        <div className="w-full h-full bg-slate-800 absolute inset-0" />
        {/* Example static background if we want to add an image later:
        <Image
          src="/hero-bg-placeholder.jpg"
          alt="Gansbaai Aircon Background"
          fill
          className="object-cover"
          priority
        />
        */}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-block animate-slide-up [animation-delay:200ms] opacity-0">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Serving Overstrand & Overberg
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl animate-slide-up [animation-delay:400ms] opacity-0">
          Gansbaai <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Aircon</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 animate-slide-up [animation-delay:600ms] opacity-0">
          Regulating the temperature since 2005. Professional air conditioning and refrigeration services.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up [animation-delay:800ms] opacity-0">
          <Link
            href="#contact"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-1"
          >
            Get a Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <a
            href="tel:+27000000000"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:-translate-y-1"
          >
            <Phone className="w-5 h-5 text-sky-400" />
            Call +27 00 000 0000
          </a>
        </div>
      </div>

      {/* Decorative Particles (CSS only via absolute positioning) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-sky-500/20 rounded-full blur-[64px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-cyan-500/20 rounded-full blur-[64px] animate-pulse-slow [animation-delay:1s]" />
      </div>
    </section>
  );
}
