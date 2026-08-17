import React, { useState } from 'react';
import { Cpu, Zap, Wind, Shield, Activity, CheckCircle2 } from 'lucide-react';

export function TechLab() {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      id: 'carbon-plate',
      title: 'Full-Wave Carbon Propulsion Blade',
      subtitle: '99.4% Kinetic Energy Transfer',
      icon: Zap,
      description: 'A 1.8mm curved multi-axial carbon composite plate nestled between dual-density foam layers. It flexes under load and snaps forward at toe-off to reduce runner fatigue and amplify sprint speed.',
      metrics: [
        { label: 'Energy Return', value: '+14.2%' },
        { label: 'Torsional Rigidity', value: '45 Nm/deg' },
        { label: 'Plate Weight', value: '28 grams' }
      ],
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&q=80'
    },
    {
      id: 'supercritical-foam',
      title: 'SuperCritical Nitrogen Micro-Cell Foam',
      subtitle: 'Featherweight Shock Absorption',
      icon: Activity,
      description: 'Infused with supercritical nitrogen gas under 400 atmospheres of pressure. Creates billions of microscopic resilient air chambers that never bottom out or harden in sub-zero climates.',
      metrics: [
        { label: 'Impact Attenuation', value: '-38%' },
        { label: 'Durability', value: '800+ km' },
        { label: 'Rebound Speed', value: '8ms' }
      ],
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop&q=80'
    },
    {
      id: 'hyper-mesh',
      title: 'Hydro-Shield 3D Monofilament Knit',
      subtitle: 'Seamless Zero-Friction Lockdown',
      icon: Wind,
      description: 'Engineered with recycled ocean-recovered monofilament yarn. Single-piece anatomical wrap contours to your unique arch and instep, providing zero hotspot rubbing and continuous airflow.',
      metrics: [
        { label: 'Air Permeability', value: '92 CFM' },
        { label: 'Yarn Tensile Strength', value: '180 MPa' },
        { label: 'Water Contact Angle', value: '115°' }
      ],
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=800&fit=crop&q=80'
    },
    {
      id: 'vibram-outsole',
      title: 'Vibram Megagrip Wet-Trac Matrix',
      subtitle: 'F1 Grade Traction on Wet Asphalt',
      icon: Shield,
      description: 'Laser-siped hexagonal tread pattern inspired by motorsport rain tires. Provides instantaneous stop-and-go traction on polished marble, slick asphalt, and wet stone steps.',
      metrics: [
        { label: 'Wet Coefficient', value: '0.88 µ' },
        { label: 'Wear Resistance', value: 'DIN 60' },
        { label: 'Tread Depth', value: '3.5 mm' }
      ],
      image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&h=800&fit=crop&q=80'
    }
  ];

  const current = layers[activeLayer];
  const IconComponent = current.icon;

  return (
    <section id="tech-lab" className="py-20 md:py-28 bg-zinc-50 border-t border-zinc-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-zinc-200 text-xs font-bold uppercase tracking-wider text-black shadow-xs">
            <Cpu className="size-3.5 text-[#84cc16]" />
            <span>DENCLUB Biomechanical R&D</span>
          </div>

          <h2 
            className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            THE SOLE ARCHITECTURE
          </h2>

          <p className="text-zinc-600 text-sm sm:text-base">
            Every millimeter of a DENCLUB silhouette is sculpted to conquer urban gravity. Explore our four foundational engineering layers below.
          </p>
        </div>

        {/* Interactive Layer Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* Layer Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {layers.map((layer, index) => {
              const LIcon = layer.icon;
              const isActive = activeLayer === index;

              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(index)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg'
                      : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-black'
                  }`}
                >
                  <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 transition ${
                    isActive ? 'bg-[#ccff00] text-black font-bold' : 'bg-zinc-200 text-zinc-700'
                  }`}>
                    <LIcon className="size-5" />
                  </div>
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                      isActive ? 'text-[#a3e635]' : 'text-zinc-500'
                    }`}>
                      Layer 0{index + 1}
                    </span>
                    <h4 className={`text-base font-bold transition ${
                      isActive ? 'text-white' : 'text-black'
                    }`}>
                      {layer.title}
                    </h4>
                    <p className={`text-xs mt-0.5 line-clamp-1 ${
                      isActive ? 'text-zinc-300' : 'text-zinc-500'
                    }`}>
                      {layer.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Layer Display */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-black text-xs font-bold uppercase tracking-wider">
                  <IconComponent className="size-4 text-[#84cc16]" />
                  <span>Technical Specification</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white border border-zinc-200 text-zinc-700 font-mono font-bold shadow-xs">
                  PATENT PENDING
                </span>
              </div>

              <h3 className="text-2xl font-black text-black">
                {current.title}
              </h3>

              <p className="text-sm text-zinc-700 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Metrics Triad */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-zinc-200">
              {current.metrics.map(metric => (
                <div key={metric.label} className="bg-white p-3 rounded-xl border border-zinc-200 text-center shadow-xs">
                  <span className="block text-base sm:text-xl font-black text-black font-mono">
                    {metric.value}
                  </span>
                  <span className="block text-[11px] text-zinc-500 uppercase tracking-tight mt-0.5 font-bold">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Preview Sneaker Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-white border border-zinc-200">
              <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-xs text-white font-medium">
                  <CheckCircle2 className="size-4 text-[#ccff00]" />
                  <span>Lab Certified: Tested at 50,000 continuous impact cycles</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
