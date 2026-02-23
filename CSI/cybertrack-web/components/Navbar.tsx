"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#1e293b] border-b border-slate-700 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white tracking-tighter">
          CYBER<span className="text-blue-500">TRACK</span>
        </Link>
        
        <div className="flex gap-6">
          <Link href="/" className={`text-sm font-semibold transition-colors ${pathname === '/' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}>
            Accueil
          </Link>
          <Link href="/incidents" className={`text-sm font-semibold transition-colors ${pathname === '/incidents' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}>
            Gestion des Incidents
          </Link>
        </div>
      </div>
    </nav>
  );
}