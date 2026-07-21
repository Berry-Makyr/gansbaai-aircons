import {
  Snowflake,
  ThermometerSnowflake,
  Warehouse,
  Wine,
  Car,
  Shield,
  Wind,
  Flame,
  Milk,
  type LucideIcon,
} from "lucide-react";
import type { ServiceContent } from "@/lib/cms/types";
import SectionHeading from "@/components/SectionHeading";

const iconMap: Record<ServiceContent["iconName"], LucideIcon> = {
  snowflake: Snowflake,
  "thermometer-snowflake": ThermometerSnowflake,
  warehouse: Warehouse,
  wine: Wine,
  car: Car,
  shield: Shield,
  wind: Wind,
  flame: Flame,
  milk: Milk,
};

type ServicesProps = {
  services: ServiceContent[];
};

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-slate-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Expertise"
          title="Professional Aircon & Refrigeration Services"
          description="From home aircons to cold rooms and agricultural refrigeration, our team handles installations, servicing and repairs across the Overberg."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.iconName];
            return (
              <article
                key={service.id}
                className="section-card p-6 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-xl bg-sky-50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-sky-100 transition-all duration-300">
                  <Icon className="w-7 h-7 text-sky-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
