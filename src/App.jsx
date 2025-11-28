import React, { useState, useMemo, useEffect } from 'react';
import {
  Cpu,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Monitor,
  Box,
  Zap,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  X,
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  Save,
  RotateCcw,
  Fan,
  Snowflake,
  ExternalLink,
  Printer
} from 'lucide-react';

// --- MOCK DATA ---
const PRODUCTS = {
  cpu: [
    { id: 'c1', name: 'Intel Core i3-12100F', price: 8200, brand: 'Intel', socket: 'LGA1700', cores: 4, tdp: 58, image: 'cpu-intel' },
    { id: 'c14', name: 'Intel Core i3-13100F', price: 9800, brand: 'Intel', socket: 'LGA1700', cores: 4, tdp: 58, image: 'cpu-intel' },
    { id: 'c10', name: 'Intel Core i5-12400F', price: 9200, brand: 'Intel', socket: 'LGA1700', cores: 6, tdp: 65, image: 'cpu-intel' },
    { id: 'c2', name: 'Intel Core i5-13400F', price: 18500, brand: 'Intel', socket: 'LGA1700', cores: 10, tdp: 65, image: 'cpu-intel' },
    { id: 'c3', name: 'Intel Core i5-13600K', price: 27500, brand: 'Intel', socket: 'LGA1700', cores: 14, tdp: 125, image: 'cpu-intel' },
    { id: 'c7', name: 'Intel Core i7-13700K', price: 36500, brand: 'Intel', socket: 'LGA1700', cores: 16, tdp: 125, image: 'cpu-intel' },
    { id: 'c8', name: 'Intel Core i9-13900K', price: 51000, brand: 'Intel', socket: 'LGA1700', cores: 24, tdp: 125, image: 'cpu-intel' },
    { id: 'c15', name: 'AMD Ryzen 5 5500', price: 8800, brand: 'AMD', socket: 'AM4', cores: 6, tdp: 65, image: 'cpu-amd' },
    { id: 'c4', name: 'AMD Ryzen 5 5600X', price: 13500, brand: 'AMD', socket: 'AM4', cores: 6, tdp: 65, image: 'cpu-amd' },
    { id: 'c12', name: 'AMD Ryzen 7 5800X3D', price: 31000, brand: 'AMD', socket: 'AM4', cores: 8, tdp: 105, image: 'cpu-amd' },
    { id: 'c5', name: 'AMD Ryzen 5 7600X', price: 19500, brand: 'AMD', socket: 'AM5', cores: 6, tdp: 105, image: 'cpu-amd' },
    { id: 'c13', name: 'AMD Ryzen 7 7700X', price: 28500, brand: 'AMD', socket: 'AM5', cores: 8, tdp: 105, image: 'cpu-amd' },
    { id: 'c6', name: 'AMD Ryzen 7 7800X3D', price: 35500, brand: 'AMD', socket: 'AM5', cores: 8, tdp: 120, image: 'cpu-amd' },
    { id: 'c9', name: 'AMD Ryzen 9 7950X3D', price: 61000, brand: 'AMD', socket: 'AM5', cores: 16, tdp: 120, image: 'cpu-amd' },
  ],
  cooler: [
    { id: 'co1', name: 'Cooler Master Hyper 212 Halo', price: 3200, socket: 'LGA1700', type: 'Air', image: 'cooler-air' },
    { id: 'co2', name: 'Deepcool AK400 Digital', price: 4500, socket: 'LGA1700', type: 'Air', image: 'cooler-air' },
    { id: 'co3', name: 'NZXT Kraken 240 RGB', price: 12000, socket: 'LGA1700', type: 'AIO', image: 'cooler-aio' },
    { id: 'co4', name: 'Corsair iCUE H150i Elite', price: 18500, socket: 'LGA1700', type: 'AIO', image: 'cooler-aio' },
    { id: 'co5', name: 'Deepcool AG400 LED', price: 2100, socket: 'AM5', type: 'Air', image: 'cooler-air' },
    { id: 'co8', name: 'Deepcool Gammaxx 400 V2', price: 1400, socket: 'AM4', type: 'Air', image: 'cooler-air' },
    { id: 'co6', name: 'Noctua NH-D15 chromax.black', price: 9500, socket: 'AM5', type: 'Air', image: 'cooler-air' },
    { id: 'co7', name: 'Lian Li Galahad II Trinity', price: 13500, socket: 'AM5', type: 'AIO', image: 'cooler-aio' },
  ],
  motherboard: [
    { id: 'm1', name: 'MSI PRO B660M-E DDR4', price: 9500, socket: 'LGA1700', memory: 'DDR4', size: 'mATX', image: 'mobo-matx' },
    { id: 'm7', name: 'MSI MAG B760M Mortar WiFi', price: 16500, socket: 'LGA1700', memory: 'DDR4', size: 'mATX', image: 'mobo-matx' },
    { id: 'm12', name: 'Gigabyte B760M DS3H AX', price: 14500, socket: 'LGA1700', memory: 'DDR5', size: 'mATX', image: 'mobo-matx' },
    { id: 'm2', name: 'Gigabyte B760 Gaming X AX', price: 18000, socket: 'LGA1700', memory: 'DDR5', size: 'ATX', image: 'mobo-atx' },
    { id: 'm5', name: 'ASUS ROG Strix Z790-F Gaming WiFi', price: 42000, socket: 'LGA1700', memory: 'DDR5', size: 'ATX', image: 'mobo-atx' },
    { id: 'm3', name: 'ASUS Prime B550M-K', price: 7800, socket: 'AM4', memory: 'DDR4', size: 'mATX', image: 'mobo-matx' },
    { id: 'm10', name: 'MSI MAG B550 Tomahawk', price: 15500, socket: 'AM4', memory: 'DDR4', size: 'ATX', image: 'mobo-atx' },
    { id: 'm8', name: 'ASRock B650M-HDV/M.2', price: 11500, socket: 'AM5', memory: 'DDR5', size: 'mATX', image: 'mobo-matx' },
    { id: 'm4', name: 'MSI MAG B650 Tomahawk WiFi', price: 21500, socket: 'AM5', memory: 'DDR5', size: 'ATX', image: 'mobo-atx' },
    { id: 'm6', name: 'Gigabyte X670 AORUS Elite AX', price: 27500, socket: 'AM5', memory: 'DDR5', size: 'ATX', image: 'mobo-atx' },
  ],
  memory: [
    { id: 'r5', name: 'XPG ADATA GAMMIX D30 8GB 3200MHz', price: 2100, type: 'DDR4', capacity: 8, image: 'ram-stick' },
    { id: 'r1', name: 'Corsair Vengeance LPX 16GB (8x2) 3200MHz', price: 3900, type: 'DDR4', capacity: 16, image: 'ram-stick' },
    { id: 'r2', name: 'G.Skill Ripjaws V 32GB (16x2) 3600MHz', price: 7200, type: 'DDR4', capacity: 32, image: 'ram-stick' },
    { id: 'r8', name: 'Corsair Vengeance RGB RS 32GB (16x2) 3600MHz', price: 8200, type: 'DDR4', capacity: 32, image: 'ram-stick' },
    { id: 'r3', name: 'Kingston Fury Beast 16GB (8x2) 5200MHz', price: 6200, type: 'DDR5', capacity: 16, image: 'ram-stick' },
    { id: 'r9', name: 'XPG Lancer RGB 32GB (16x2) 6000MHz', price: 10200, type: 'DDR5', capacity: 32, image: 'ram-stick' },
    { id: 'r4', name: 'G.Skill Trident Z5 RGB 32GB (16x2) 6000MHz', price: 11200, type: 'DDR5', capacity: 32, image: 'ram-stick' },
    { id: 'r6', name: 'Corsair Dominator Platinum RGB 32GB (16x2) 6200MHz', price: 18000, type: 'DDR5', capacity: 32, image: 'ram-stick' },
  ],
  gpu: [
    { id: 'g9', name: 'ASUS Dual Radeon RX 6600 8GB', price: 19500, tdp: 132, length: 243, image: 'gpu-mid' },
    { id: 'g11', name: 'ASRock Radeon RX 7600 Challenger 8GB', price: 24500, tdp: 165, length: 269, image: 'gpu-mid' },
    { id: 'g1', name: 'Zotac Gaming GeForce RTX 3060 12GB', price: 25500, tdp: 170, length: 224, image: 'gpu-mid' },
    { id: 'g2', name: 'Gigabyte GeForce RTX 4060 Ti 8GB', price: 37500, tdp: 160, length: 281, image: 'gpu-mid' },
    { id: 'g5', name: 'ASRock RX 7800 XT Challenger 16GB', price: 51000, tdp: 263, length: 280, image: 'gpu-high' },
    { id: 'g3', name: 'ASUS TUF Gaming RTX 4070 12GB', price: 56000, tdp: 200, length: 301, image: 'gpu-high' },
    { id: 'g12', name: 'Zotac Gaming RTX 4070 Super Twin Edge', price: 63000, tdp: 220, length: 234, image: 'gpu-high' },
    { id: 'g10', name: 'Zotac GeForce RTX 4070 Ti Super 16GB', price: 81000, tdp: 285, length: 307, image: 'gpu-high' },
    { id: 'g8', name: 'AMD Radeon RX 7900 XTX 24GB', price: 96000, tdp: 355, length: 287, image: 'gpu-high' },
    { id: 'g5080', name: 'NVIDIA GeForce RTX 5080 16GB', price: 135000, tdp: 350, length: 310, image: 'gpu-high' },
    { id: 'g9800', name: 'AMD Radeon RX 9800 XT 20GB', price: 105000, tdp: 330, length: 300, image: 'gpu-high' },
    { id: 'g6', name: 'MSI GeForce RTX 4080 Super 16GB', price: 102000, tdp: 320, length: 322, image: 'gpu-high' },
    { id: 'g9900', name: 'AMD Radeon RX 9900 XTX 24GB', price: 145000, tdp: 400, length: 320, image: 'gpu-high' },
    { id: 'g5090', name: 'NVIDIA GeForce RTX 5090 32GB', price: 215000, tdp: 500, length: 340, image: 'gpu-high' },
    { id: 'g7', name: 'NVIDIA GeForce RTX 4090 24GB', price: 182000, tdp: 450, length: 336, image: 'gpu-high' },
  ],
  storage: [
    { id: 's1', name: 'Crucial P3 500GB NVMe M.2', price: 3200, type: 'NVMe', size: 'M.2', image: 'ssd-m2' },
    { id: 's3', name: 'WD Blue 1TB SATA SSD', price: 6200, type: 'SATA', size: '2.5', image: 'ssd-sata' },
    { id: 's7', name: 'WD Blue SN580 1TB NVMe Gen4', price: 5800, type: 'NVMe', size: 'M.2', image: 'ssd-m2' },
    { id: 's2', name: 'Samsung 980 Pro 1TB NVMe Gen4', price: 8200, type: 'NVMe', size: 'M.2', image: 'ssd-m2' },
    { id: 's4', name: 'WD Black SN850X 2TB NVMe Gen4', price: 14500, type: 'NVMe', size: 'M.2', image: 'ssd-m2' },
    { id: 's5', name: 'Samsung 990 Pro 2TB NVMe Gen4', price: 16800, type: 'NVMe', size: 'M.2', image: 'ssd-m2' },
  ],
  psu: [
    { id: 'p1', name: 'Deepcool PK550D 550W Bronze', price: 3600, wattage: 550, modular: 'Non', image: 'psu' },
    { id: 'p2', name: 'Corsair CV650 650W Bronze', price: 4800, wattage: 650, modular: 'Non', image: 'psu' },
    { id: 'p3', name: 'MSI MPG A750GF 750W Gold', price: 8200, wattage: 750, modular: 'Full', image: 'psu' },
    { id: 'p4', name: 'Corsair RM850e 850W Gold', price: 10200, wattage: 850, modular: 'Full', image: 'psu' },
    { id: 'p5', name: 'Corsair RM1000e 1000W Gold', price: 14800, wattage: 1000, modular: 'Full', image: 'psu' },
    { id: 'p6', name: 'ASUS ROG Thor 1200W Platinum II', price: 27500, wattage: 1200, modular: 'Full', image: 'psu' },
  ],
  case: [
    { id: 'ca1', name: 'Ant Esports ICE-100 Air Mini', price: 3300, form: 'mATX', image: 'case-tower' },
    { id: 'ca8', name: 'Deepcool CH370', price: 4200, form: 'mATX', image: 'case-tower' },
    { id: 'ca5', name: 'Corsair 4000D Airflow', price: 6200, form: 'ATX', image: 'case-tower' },
    { id: 'ca2', name: 'NZXT H5 Flow', price: 7600, form: 'ATX', image: 'case-tower' },
    { id: 'ca4', name: 'Cooler Master MasterBox TD500 Mesh', price: 8200, form: 'ATX', image: 'case-tower' },
    { id: 'ca9', name: 'Fractal Design North', price: 13000, form: 'ATX', image: 'case-tower' },
    { id: 'ca6', name: 'Lian Li O11 Dynamic Evo', price: 13500, form: 'ATX', image: 'case-tower' },
    { id: 'ca7', name: 'Hyte Y60', price: 17500, form: 'ATX', image: 'case-tower' },
  ]
};

const STEPS = [
  { key: 'cpu', label: 'CPU', icon: Cpu },
  { key: 'motherboard', label: 'Motherboard', icon: CircuitBoard },
  { key: 'cooler', label: 'Cooler', icon: Snowflake },
  { key: 'memory', label: 'Memory', icon: MemoryStick },
  { key: 'storage', label: 'Storage', icon: HardDrive },
  { key: 'gpu', label: 'Video Card', icon: Monitor },
  { key: 'case', label: 'Case', icon: Box },
  { key: 'psu', label: 'Power Supply', icon: Zap },
];

// --- HELPERS ---
const generateAmazonLink = (productName) => {
  // Clean up product name for better search results (remove "Gaming", "Dual Fan", etc)
  const cleanName = productName
    .replace(/\b(Gaming|Dual|Fan|OC|Edition|Twin|Edge|Pro|Elite|WiFi|AX)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return `https://www.amazon.in/s?k=${encodeURIComponent(cleanName)}`;
};

// --- COMPONENTS ---

const Header = () => (
  <header className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 shrink-0 no-print">
    <div className="flex items-center gap-3">
      {/* Code-Generated Anvil & Hammer Logo */}
      <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-950 rounded-lg border border-slate-700/50 shadow-inner flex items-center justify-center relative overflow-hidden group">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-purple-500/20 transition-all duration-500"></div>

        <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
          {/* Anvil Base */}
          <path
            d="M20 80 L80 80 L75 70 Q70 65 65 65 L35 65 Q30 65 25 70 Z"
            fill="#475569"
            stroke="#1e293b"
            strokeWidth="2"
          />
          {/* Anvil Body */}
          <path
            d="M35 65 L65 65 L60 45 L85 45 Q90 45 90 40 L90 35 L40 35 L10 35 L10 40 Q10 45 15 45 L40 45 Z"
            fill="#64748b"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Hammer Handle */}
          <rect
            x="45" y="10" width="8" height="40"
            transform="rotate(45 49 30)"
            fill="#a16207"
            stroke="#451a03"
            strokeWidth="1.5"
            className="origin-center group-hover:rotate-[60deg] transition-all duration-300"
          />

          {/* Hammer Head */}
          <rect
            x="30" y="5" width="38" height="18"
            transform="rotate(45 49 14)"
            rx="2"
            fill="#94a3b8"
            stroke="#475569"
            strokeWidth="2"
            className="origin-center group-hover:rotate-[60deg] transition-all duration-300"
          />

          {/* Impact Spark */}
          <circle cx="50" cy="35" r="0" fill="white" className="group-hover:animate-ping opacity-0 group-hover:opacity-100" />
        </svg>
      </div>

      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
        PCForge
      </h1>
    </div>

    <div className="flex items-center gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search parts..."
          className="bg-slate-800 text-sm text-slate-200 pl-10 pr-4 py-2 rounded-full border border-slate-700 focus:outline-none focus:border-purple-500 w-64 transition-all"
        />
      </div>
      <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 hover:bg-slate-700">
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
      </button>
    </div>
  </header>
);

const PrintableInvoice = ({ build, totalPrice }) => (
  <div className="hidden print-only p-8 bg-white text-black font-sans">
    <div className="flex justify-between items-center mb-8 border-b-2 border-black pb-4">
      <div>
        <h1 className="text-3xl font-bold uppercase tracking-widest">PCForge Build Invoice</h1>
        <p className="text-sm text-gray-500 mt-1">Generated on {new Date().toLocaleDateString()}</p>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold text-purple-600">INVOICE</div>
      </div>
    </div>

    <table className="w-full mb-8 border-collapse">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="text-left py-2 font-bold uppercase text-xs text-gray-600">Component</th>
          <th className="text-left py-2 font-bold uppercase text-xs text-gray-600">Product Name</th>
          <th className="text-right py-2 font-bold uppercase text-xs text-gray-600">Price (INR)</th>
        </tr>
      </thead>
      <tbody>
        {STEPS.map(step => {
          const part = build[step.key];
          if (!part) return null;
          return (
            <tr key={step.key} className="border-b border-gray-100">
              <td className="py-3 text-sm font-medium text-gray-500">{step.label}</td>
              <td className="py-3 text-sm text-gray-800">{part.name}</td>
              <td className="py-3 text-right text-sm font-mono font-bold">₹{part.price.toLocaleString('en-IN')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <div className="flex justify-end border-t-2 border-black pt-4">
      <div className="text-right">
        <span className="text-gray-600 mr-8 text-lg">Total Estimated Cost:</span>
        <span className="text-2xl font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
      </div>
    </div>

    <div className="mt-12 text-center text-xs text-gray-400">
      * Prices are estimates based on market data. Actual prices on Amazon.in may vary.
    </div>
  </div>
);

const PartCard = ({ part, isSelected, onClick, compatible = true }) => (
  <div
    onClick={compatible ? onClick : undefined}
    className={`
      relative group p-3 rounded-xl border transition-all duration-200 flex flex-col gap-2 cursor-pointer
      ${isSelected
        ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
        : compatible
          ? 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-750'
          : 'bg-slate-900 border-slate-800 opacity-50 cursor-not-allowed'}
    `}
  >
    <div className="flex justify-between items-start">
      <h3 className="font-semibold text-slate-100 text-sm leading-tight pr-6">{part.name}</h3>
      {isSelected && <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 absolute top-3 right-3" />}
    </div>

    <div className="mt-auto">
      <div className="text-xs text-slate-400 mb-1 flex flex-wrap gap-2">
        {part.socket && <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px]">{part.socket}</span>}
        {part.memory && <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px]">{part.memory}</span>}
        {part.type && <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px]">{part.type}</span>}
        {part.wattage && <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px]">{part.wattage}W</span>}
      </div>
      <div className="font-bold text-white">₹{part.price.toLocaleString('en-IN')}</div>
    </div>
  </div>
);

const Visualizer = ({ build, onPrev, onNext, canPrev, canNext }) => {
  // Logic to determine what parts of the SVG are "active" based on selection
  const activeCpu = !!build.cpu;
  const activeCooler = !!build.cooler;
  const activeGpu = !!build.gpu;
  const activeRam = !!build.memory;
  const activeMobo = !!build.motherboard;
  const activePsu = !!build.psu;
  const activeCase = !!build.case;
  const activeStorage = !!build.storage;

  // Helper to extract clean GPU model name
  const getGpuLabel = (name) => {
    if (!name) return '';
    const match = name.match(/(RTX|RX|GTX)\s\d+(?:\s(?:Ti|Super|XT|XTX))?/i);
    return match ? match[0].toUpperCase() : name.split(' ').slice(0, 3).join(' ');
  };

  return (
    <div className="h-full w-full bg-slate-950 rounded-2xl border border-slate-800 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-sm z-10">
        <h2 className="text-sm font-semibold text-slate-400 tracking-wider">PC BUILDER VISUALIZER</h2>
        <div className="flex gap-2 text-[10px]">
          <span className="flex items-center gap-1 text-green-400"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> COMPATIBLE</span>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-8 perspective-1000">

        {/* Abstract Schematic Representation */}
        <div className={`
            relative w-[340px] h-[500px] border-4 rounded-3xl transition-all duration-700
            ${activeCase ? 'border-slate-600 bg-slate-900/80 shadow-2xl' : 'border-slate-800 bg-slate-900/30 border-dashed'}
          `}>

          {/* LEFT HANDLE (Previous) */}
          <button
            onClick={onPrev}
            disabled={!canPrev}
            className={`
                absolute -left-12 top-1/2 -translate-y-1/2 h-64 w-12 
                flex items-center justify-end
                group transition-all duration-300 z-50
                ${!canPrev ? 'opacity-30 cursor-not-allowed grayscale' : 'cursor-pointer'}
              `}
            title="Previous Component"
          >
            {/* Handle Structure */}
            <div className="relative w-4 h-48 bg-slate-800 rounded-l-2xl border-l border-y border-slate-700 shadow-xl group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
              {/* Grip Texture */}
              <div className="absolute top-4 bottom-4 left-1.5 w-1 bg-slate-900/50 rounded-full"></div>

              {/* Mounts connecting to case */}
              <div className="absolute top-2 -right-4 w-4 h-6 bg-slate-800 border-y border-l border-slate-700 -z-10"></div>
              <div className="absolute bottom-2 -right-4 w-4 h-6 bg-slate-800 border-y border-l border-slate-700 -z-10"></div>

              {/* Arrow Icon */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-slate-900 rounded-full border border-slate-600 flex items-center justify-center group-hover:border-purple-500 group-hover:scale-110 transition-all shadow-lg">
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
              </div>
            </div>
          </button>

          {/* RIGHT HANDLE (Next) */}
          <button
            onClick={onNext}
            disabled={!canNext}
            className={`
                absolute -right-12 top-1/2 -translate-y-1/2 h-64 w-12 
                flex items-center justify-start
                group transition-all duration-300 z-50
                ${!canNext ? 'opacity-30 cursor-not-allowed grayscale' : 'cursor-pointer'}
              `}
            title="Next Component"
          >
            {/* Handle Structure */}
            <div className="relative w-4 h-48 bg-slate-800 rounded-r-2xl border-r border-y border-slate-700 shadow-xl group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
              {/* Grip Texture */}
              <div className="absolute top-4 bottom-4 right-1.5 w-1 bg-slate-900/50 rounded-full"></div>

              {/* Mounts connecting to case */}
              <div className="absolute top-2 -left-4 w-4 h-6 bg-slate-800 border-y border-r border-slate-700 -z-10"></div>
              <div className="absolute bottom-2 -left-4 w-4 h-6 bg-slate-800 border-y border-r border-slate-700 -z-10"></div>

              {/* Arrow Icon */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-slate-900 rounded-full border border-slate-600 flex items-center justify-center group-hover:border-purple-500 group-hover:scale-110 transition-all shadow-lg">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
              </div>
            </div>
          </button>

          {/* Case Feet */}
          <div className="absolute -bottom-4 left-8 w-12 h-4 bg-slate-800 rounded-b-lg"></div>
          <div className="absolute -bottom-4 right-8 w-12 h-4 bg-slate-800 rounded-b-lg"></div>

          {/* Motherboard Tray */}
          <div className={`
              absolute top-6 left-6 right-6 bottom-24 rounded-lg border-2 transition-all duration-500
              ${activeMobo
              ? 'bg-slate-800 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]'
              : 'bg-slate-800/20 border-slate-800 border-dashed'}
            `}>
            {/* CPU Socket / Cooler */}
            <div className={`
                absolute top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-2xl border flex items-center justify-center transition-all duration-500 z-20
                ${activeCpu
                ? 'bg-slate-800 border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.3)]'
                : 'bg-slate-900 border-slate-700'}
                group cursor-help
              `}>
              {/* CPU Tooltip */}
              {activeCpu && (
                <div className="absolute bottom-full mb-2 w-48 bg-slate-900/95 backdrop-blur border border-blue-500/50 p-2 rounded shadow-[0_0_15px_rgba(59,130,246,0.2)] opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none left-1/2 -translate-x-1/2 text-center">
                  <div className="text-[9px] text-blue-500 font-bold uppercase tracking-wider mb-0.5">Processor</div>
                  <div className="text-[10px] text-white leading-snug font-medium">
                    {build.cpu.name}
                  </div>
                </div>
              )}

              {activeCooler ? (
                // Cooler Animation active only when Cooler is selected
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Heat sink base */}
                  <div className="absolute inset-0 bg-slate-900 rounded-full border border-slate-600"></div>

                  {/* RGB Ring Effect */}
                  <div className="absolute inset-[-4px] rounded-full border-[3px] border-transparent border-t-cyan-500 border-r-blue-600 border-b-purple-500 animate-[spin_3s_linear_infinite] opacity-80 blur-[1px]"></div>

                  {/* The Spinning Fan Blades */}
                  <div className="relative w-20 h-20 animate-[spin_0.6s_linear_infinite]">
                    <Fan className="w-full h-full text-slate-400 opacity-90" />
                  </div>

                  {/* Center Hub Logo */}
                  <div className="absolute w-8 h-8 bg-gradient-to-br from-slate-800 to-black rounded-full border border-slate-500 z-10 flex items-center justify-center shadow-lg">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 opacity-80"></div>
                  </div>
                </div>
              ) : activeCpu ? (
                // Just show CPU chip if CPU is selected but no cooler yet
                <div className="flex flex-col items-center gap-1 opacity-50">
                  <div className="w-12 h-12 border-2 border-dashed border-slate-600 rounded flex items-center justify-center bg-slate-800/50">
                    <Cpu className="text-blue-400 w-6 h-6" />
                  </div>
                  <div className="text-[9px] text-blue-400 font-mono mt-1 font-bold">{build.cpu.name.split(' ')[0]}</div>
                </div>
              ) : (
                // Empty Socket
                <div className="flex flex-col items-center gap-1 opacity-30">
                  <Cpu className="text-slate-600 w-6 h-6" />
                  <div className="text-[9px] text-slate-500 font-mono mt-1">SOCKET</div>
                </div>
              )}
            </div>

            {/* RAM Slots */}
            <div className="absolute top-12 right-6 w-12 h-32 flex gap-1 group cursor-help">
              {/* RAM Tooltip */}
              {activeRam && (
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-32 bg-slate-900/95 backdrop-blur border border-yellow-500/50 p-2 rounded shadow-[0_0_15px_rgba(234,179,8,0.2)] opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none">
                  <div className="text-[9px] text-yellow-500 font-bold uppercase tracking-wider mb-0.5">Memory</div>
                  <div className="text-[10px] text-white leading-snug font-medium">
                    {build.memory.name}
                  </div>
                </div>
              )}

              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`
                    w-2 h-full rounded-sm border transition-all duration-300
                    ${activeRam
                    ? 'bg-yellow-500 border-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.5)]'
                    : 'bg-slate-900 border-slate-700'}
                  `}></div>
              ))}
            </div>

            {/* PCIe Slots / GPU */}
            <div className={`
                absolute top-48 left-4 right-4 h-16 rounded border flex items-center justify-center transition-all duration-500 z-30 overflow-hidden
                ${activeGpu
                ? 'bg-slate-800 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/50 border-slate-700 border-dashed'}
              `}>
              {activeGpu ? (
                <div className="w-full h-full relative flex items-center justify-between px-3 bg-gradient-to-b from-slate-800 to-slate-900">
                  {/* Decorative shroud lines */}
                  <div className="absolute inset-x-0 top-1 h-[1px] bg-slate-600/50"></div>
                  <div className="absolute inset-x-0 bottom-1 h-[1px] bg-slate-600/50"></div>

                  {/* The Fans */}
                  <div className="flex gap-2 h-full items-center shrink-0">
                    {/* Fan 1 */}
                    <div className="relative w-12 h-12 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center shadow-inner">
                      <div className="w-10 h-10 animate-[spin_0.2s_linear_infinite]">
                        <Fan className="w-full h-full text-slate-400 opacity-80" />
                      </div>
                    </div>

                    {/* Fan 2 */}
                    <div className="relative w-12 h-12 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center shadow-inner">
                      <div className="w-10 h-10 animate-[spin_0.2s_linear_infinite]">
                        <Fan className="w-full h-full text-slate-400 opacity-80" />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Branding Badge - Flex positioned right to avoid overlap */}
                  <div className="z-10 bg-black/80 px-2 py-1 rounded border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)] backdrop-blur-md ml-2 shrink min-w-0">
                    <span className="text-[9px] font-black text-emerald-400 tracking-widest uppercase truncate block">
                      {getGpuLabel(build.gpu.name)}
                    </span>
                  </div>

                  {/* RGB Underglow */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent blur-[2px] opacity-80"></div>
                </div>
              ) : (
                <span className="text-[10px] text-slate-600">GPU SLOT</span>
              )}
            </div>

            {/* Storage / M.2 Slot - MOVED BELOW GPU */}
            <div className={`
                absolute top-72 left-1/2 -translate-x-1/2 w-40 h-8 rounded border flex items-center justify-center transition-all duration-500 z-25
                ${activeStorage
                ? 'bg-slate-800 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900/50 border-slate-700 border-dashed'}
              `}>
              {activeStorage ? (
                <div className="flex items-center gap-2 w-full px-2 animate-pulse-slow">
                  <div className="w-1 h-4 bg-yellow-600 rounded-sm"></div> {/* Connector Gold Pins */}
                  <div className="flex-1 h-5 bg-slate-900 rounded border border-slate-600 flex items-center px-2 relative overflow-hidden">
                    <span className="text-[8px] text-cyan-400 font-mono z-10 truncate w-28 uppercase tracking-tighter">
                      {build.storage.name.replace('NVMe M.2', '').replace('SSD', '')}
                    </span>
                    {/* Decorative Chip */}
                    <div className="absolute right-6 w-3 h-3 bg-slate-800 border border-slate-700"></div>

                    {/* Activity Light */}
                    <div className="absolute right-1.5 w-1 h-1 bg-green-500 rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  </div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full shadow-inner"></div> {/* Screw */}
                </div>
              ) : (
                <span className="text-[9px] text-slate-600 tracking-wider">M.2 STORAGE</span>
              )}
            </div>
          </div>

          {/* Bottom Section: PSU + Cooler Placeholder */}
          <div className="absolute bottom-0 left-0 w-full h-20 flex">

            {/* PSU Shroud (Left Side - 50%) */}
            <div className={`
                  relative w-1/2 h-full rounded-bl-2xl border-t border-r border-slate-700 transition-all duration-500
                  ${activePsu ? 'bg-slate-800' : 'bg-slate-900/50'}
                  group cursor-help
                `}>

              {/* Animation Container (Clipped independently so Tooltip can overflow) */}
              <div className="absolute inset-0 overflow-hidden rounded-bl-2xl pointer-events-none">
                {/* Lightning Sparks Animation - Visible on Hover ONLY if PSU is active */}
                {activePsu && (
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Subtle pulsing bolts */}
                    <Zap className="absolute top-1/2 left-1/4 w-8 h-8 text-yellow-500/80 animate-pulse-slow" style={{ animationDuration: '2.5s' }} />
                    <Zap className="absolute bottom-1/4 right-1/3 w-6 h-6 text-orange-400/60 animate-pulse-slow" style={{ animationDelay: '0.8s', animationDuration: '3s' }} />

                    {/* Soft vibey electric glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent blur-[2px]"></div>
                  </div>
                )}
              </div>

              {/* PSU Tooltip - Now visible because parent is NOT overflow-hidden */}
              {activePsu && (
                <div className="absolute left-8 bottom-full mb-2 w-48 bg-slate-900/95 backdrop-blur border border-orange-500/50 p-2 rounded shadow-[0_0_15px_rgba(249,115,22,0.2)] opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none">
                  <div className="text-[9px] text-orange-500 font-bold uppercase tracking-wider mb-0.5">Power Supply</div>
                  <div className="text-[10px] text-white leading-snug font-medium">
                    {build.psu.name}
                  </div>
                </div>
              )}

              <div className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-10 rounded border flex items-center justify-center z-10
                    ${activePsu
                  ? 'bg-orange-900/50 border-orange-500 text-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.2)]'
                  : 'border-slate-700 border-dashed text-slate-700'}
                  `}>
                <Zap className="w-4 h-4 mr-2" /> PSU
              </div>
            </div>

            {/* Cooler System Slot (Right Side - 50%) - NEW */}
            <div className={`
                  relative w-1/2 h-full rounded-br-2xl border-t border-slate-700 transition-all duration-500 flex items-center justify-center
                  ${activeCooler ? 'bg-slate-800/80' : 'bg-slate-900/50'}
                  group cursor-help
                `}>

              {/* Animation Container (Clipped independently) */}
              <div className="absolute inset-0 overflow-hidden rounded-br-2xl pointer-events-none">
                {/* Snow Animation - Visible on Hover ONLY if Cooler is active */}
                {activeCooler && (
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Generating multiple snowflakes with random positions and delays */}
                    {[...Array(8)].map((_, i) => (
                      <Snowflake
                        key={i}
                        className="absolute text-cyan-200/60 w-2.5 h-2.5"
                        style={{
                          top: `${Math.random() * -20}%`,
                          left: `${10 + Math.random() * 80}%`,
                          animation: `snow-fall ${1.5 + Math.random()}s linear infinite`,
                          animationDelay: `${Math.random()}s`
                        }}
                      />
                    ))}
                    {/* Cold mist effect */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
                  </div>
                )}
              </div>

              {activeCooler ? (
                <div className="flex flex-col items-center animate-pulse-slow z-10 relative">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500/50 flex items-center justify-center bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <Snowflake className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-[8px] text-blue-400 mt-1 font-bold tracking-wider uppercase">Cooling System</div>

                  {/* Cooler Tooltip - Now visible */}
                  <div className="absolute right-4 bottom-full mb-2 w-48 bg-slate-900/95 backdrop-blur border border-blue-500/50 p-2 rounded shadow-[0_0_15px_rgba(59,130,246,0.2)] opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 pointer-events-none">
                    <div className="text-[9px] text-blue-500 font-bold uppercase tracking-wider mb-0.5">CPU Cooler</div>
                    <div className="text-[10px] text-white leading-snug font-medium">
                      {build.cooler.name}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center opacity-30 z-10 relative">
                  <div className="w-8 h-8 rounded border border-slate-700 flex items-center justify-center border-dashed">
                    <Fan className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="text-[8px] text-slate-600 mt-1 font-mono">COOLING</div>
                </div>
              )}
            </div>
          </div>

          {/* Cable Decor */}
          {activeMobo && activePsu && (
            <svg className="absolute inset-0 pointer-events-none opacity-40">
              <path d="M 60 420 C 60 380, 40 380, 40 300" stroke="#64748b" strokeWidth="2" fill="none" />
              <path d="M 280 420 C 280 300, 260 200, 260 150" stroke="#64748b" strokeWidth="2" fill="none" />
            </svg>
          )}

        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedStep, setSelectedStep] = useState(0);
  const [build, setBuild] = useState({
    cpu: null,
    motherboard: null,
    cooler: null,
    memory: null,
    storage: null,
    gpu: null,
    case: null,
    psu: null,
  });

  const handleSelect = (category, product) => {
    setBuild(prev => {
      // Logic for resetting downstream dependent parts if upstream part changes
      const newBuild = { ...prev, [category]: product };

      if (category === 'cpu') {
        if (prev.motherboard && prev.motherboard.socket !== product.socket) {
          newBuild.motherboard = null;
          newBuild.cooler = null;
          newBuild.memory = null;
        }
      } else if (category === 'motherboard') {
        if (prev.memory && prev.memory.type !== product.memory) {
          newBuild.memory = null;
        }
      }
      return newBuild;
    });
  };

  const getCompatibleProducts = (category) => {
    const allProducts = PRODUCTS[category] || [];

    if (category === 'motherboard' && build.cpu) {
      return allProducts.map(p => ({ ...p, compatible: p.socket === build.cpu.socket }));
    }

    if (category === 'cooler' && build.cpu) {
      return allProducts.map(p => ({ ...p, compatible: p.socket === build.cpu.socket }));
    }

    if (category === 'memory' && build.motherboard) {
      return allProducts.map(p => ({ ...p, compatible: p.type === build.motherboard.memory }));
    }

    if (category === 'case' && build.motherboard) {
      return allProducts.map(p => {
        const isCompatible = !(p.form === 'mATX' && build.motherboard.size === 'ATX');
        return { ...p, compatible: isCompatible };
      });
    }

    return allProducts.map(p => ({ ...p, compatible: true }));
  };

  const currentCategory = STEPS[selectedStep].key;
  const displayedProducts = getCompatibleProducts(currentCategory);

  // Sorting compatible first
  displayedProducts.sort((a, b) => b.compatible - a.compatible);

  const totalPrice = Object.values(build).reduce((acc, part) => acc + (part ? part.price : 0), 0);
  const estimatedWattage = (build.cpu?.tdp || 0) + (build.gpu?.tdp || 0) + 100; // +100W buffer

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
        
        /* New Animations */
        @keyframes spark-flash {
            0%, 100% { opacity: 0; transform: scale(0.8) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.2) rotate(10deg); }
        }
        .animate-spark-flash {
            animation: spark-flash 0.1s linear infinite;
        }
        
        @keyframes snow-fall {
            0% { opacity: 0; transform: translateY(-10px) translateX(0px) rotate(0deg); }
            20% { opacity: 1; }
            100% { opacity: 0; transform: translateY(40px) translateX(5px) rotate(180deg); }
        }
        
        /* Print Styles */
        @media print {
          body * {
            visibility: hidden;
          }
          .print-only, .print-only * {
            visibility: visible;
          }
          .print-only {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: block !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Invoice Component - Visible only on Print */}
      <PrintableInvoice build={build} totalPrice={totalPrice} />

      <Header />

      <main className="flex-1 flex overflow-hidden no-print">
        {/* LEFT COLUMN: WIZARD */}
        <div className="w-72 flex flex-col border-r border-slate-800 bg-slate-900/50 h-full">
          {/* Top Half: Component Categories */}
          <div className="h-1/2 flex flex-col border-b border-slate-800">
            <div className="p-4 border-b border-slate-800 shrink-0">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Component Selection</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
              {STEPS.map((step, index) => {
                const isCompleted = !!build[step.key];
                const isActive = index === selectedStep;

                return (
                  <button
                    key={step.key}
                    onClick={() => setSelectedStep(index)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all
                      ${isActive
                        ? 'bg-slate-800 text-white shadow-lg shadow-purple-900/20 ring-1 ring-slate-700'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <step.icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                      <span>{step.label}</span>
                    </div>
                    {isCompleted && <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Half: Products List */}
          <div className="h-1/2 flex flex-col bg-slate-900/30">
            <div className="p-3 border-b border-slate-800/50 bg-slate-900/95 sticky top-0 z-10 backdrop-blur">
              <h3 className="text-sm font-semibold text-white">
                Select {STEPS[selectedStep].label}
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {displayedProducts.map(product => (
                <PartCard
                  key={product.id}
                  part={product}
                  isSelected={build[currentCategory]?.id === product.id}
                  compatible={product.compatible}
                  onClick={() => handleSelect(currentCategory, product)}
                />
              ))}
              {displayedProducts.length === 0 && (
                <div className="text-center py-10 text-slate-500 text-sm">
                  No parts found in this category.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: VISUALIZER */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center bg-radial-gradient from-slate-900 to-slate-950 relative">
          {/* Background Grid Decoration */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}>
          </div>

          <div className="w-full max-w-4xl h-[600px] z-10">
            <Visualizer
              build={build}
              onPrev={() => setSelectedStep(p => p - 1)}
              onNext={() => setSelectedStep(p => p + 1)}
              canPrev={selectedStep > 0}
              canNext={selectedStep < STEPS.length - 1}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="w-72 bg-slate-900 border-l border-slate-800 flex flex-col">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-1">Build Summary</h2>
            <p className="text-xs text-slate-500">Estimated compatibility check: <span className="text-green-400 font-bold">PASS</span></p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {/* Tech Specs Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800 p-3 rounded-lg">
                <div className="text-xs text-slate-400 mb-1">Platform</div>
                <div className="font-mono text-sm text-white">{build.cpu ? build.cpu.socket : '-'}</div>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg">
                <div className="text-xs text-slate-400 mb-1">Power Draw</div>
                <div className={`font-mono text-sm ${estimatedWattage > (build.psu?.wattage || 0) && build.psu ? 'text-red-400' : 'text-blue-400'}`}>
                  ~{estimatedWattage}W
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              {STEPS.map(step => {
                const part = build[step.key];
                if (!part) return null;
                return (
                  <div key={step.key} className="flex justify-between items-start text-sm group">
                    <div className="flex flex-col flex-1">
                      <span className="text-slate-400 text-xs">{step.label}</span>
                      <span className="text-slate-200 line-clamp-1">{part.name}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-slate-300 font-mono">₹{part.price.toLocaleString('en-IN')}</span>
                      {/* Individual Buy Button */}
                      <button
                        onClick={() => window.open(generateAmazonLink(part.name), '_blank')}
                        className="text-[10px] bg-slate-800 hover:bg-yellow-600 hover:text-black text-slate-400 px-2 py-0.5 rounded border border-slate-700 transition-colors flex items-center gap-1"
                        title="View on Amazon"
                      >
                        Buy <ExternalLink className="w-2 h-2" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="p-6 bg-slate-900 border-t border-slate-800 shadow-xl z-20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400">Total (INR)</span>
              <span className="text-2xl font-bold text-white">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm transition-colors border border-slate-700"
              >
                <Printer className="w-4 h-4" /> Save
              </button>
              <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm transition-colors border border-slate-700">
                <AlertCircle className="w-4 h-4" /> Share
              </button>
            </div>

            <button
              onClick={() => {
                // Construct a search for all parts - simplified keywords
                const keywords = Object.values(build)
                  .filter(p => p)
                  .map(p => p.name.split(' ').slice(0, 2).join(' ')) // Take first 2 words of each part
                  .join(' ');

                if (!keywords) return;
                window.open(`https://www.amazon.in/s?k=${encodeURIComponent(keywords + " pc parts")}`, '_blank');
              }}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <ShoppingCart className="w-5 h-5" />
              BUY
            </button>
            <p className="text-[10px] text-center text-slate-600 mt-2">Prices are estimates. Amazon check required.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

