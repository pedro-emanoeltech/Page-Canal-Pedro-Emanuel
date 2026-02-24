import { Link } from "wouter";
import { Terminal } from "lucide-react";

export function Header() {
  return (
    <header className="bg-[#111] text-[#fafafa] py-4 sticky top-0 z-40 shadow-md shadow-black/10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <Terminal className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors" />
          <span className="font-display font-bold text-xl tracking-tight group-hover:text-white transition-colors">
            Pedro Emanuel
          </span>
        </Link>
        
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-blue-400 transition-colors cursor-pointer">
            Início
          </Link>
          <Link href="/tutorial/tutorial-1" className="hover:text-blue-400 transition-colors cursor-pointer">
            Tutorial 1
          </Link>
          <Link href="/tutorial/tutorial-2" className="hover:text-blue-400 transition-colors cursor-pointer">
            Tutorial 2
          </Link>
        </nav>
      </div>
    </header>
  );
}
