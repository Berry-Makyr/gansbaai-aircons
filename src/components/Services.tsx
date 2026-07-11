import Image from "next/image";
import { Wrench, Snowflake, Fan, ThermometerSnowflake } from "lucide-react";

// Using Lucide icons as fallback placeholders since we don't have Sanity data yet
const defaultServices = [
  {
    title: "Aircon Installation",
    description: "Professional installation of split, multi-split, and ducted air conditioning systems for residential and commercial properties.",
    icon: <Snowflake className="w-8 h-8 text-sky-500" />,
    image: null,
  },
  {
    title: "Repairs & Servicing",
    description: "Fast and reliable repair services for all major air conditioning brands. We diagnose and fix issues quickly to restore your comfort.",
    icon: <Wrench className="w-8 h-8 text-sky-500" />,
    image: null,
  },
  {
    title: "Routine Maintenance",
    description: "Preventative maintenance to ensure your system runs efficiently, prolongs its lifespan, and maintains healthy indoor air quality.",
    icon: <Fan className="w-8 h-8 text-sky-500" />,
    image: null,
  },
  {
    title: "Commercial Refrigeration",
    description: "Expert installation, repair, and maintenance for commercial refrigeration units, cold rooms, and freezer rooms.",
    icon: <ThermometerSnowflake className="w-8 h-8 text-sky-500" />,
    image: null,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-sky-600 tracking-wider uppercase mb-2">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Professional Aircon & Refrigeration Services</h3>
          <p className="text-lg text-slate-600">
            With over 20 years of experience, we provide top-tier climate control solutions across the Overstrand and Overberg regions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {defaultServices.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-sky-100 transition-all duration-300 hover:-translate-y-2 group border border-slate-100"
            >
              <div className="w-16 h-16 rounded-xl bg-sky-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-100 transition-all duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
