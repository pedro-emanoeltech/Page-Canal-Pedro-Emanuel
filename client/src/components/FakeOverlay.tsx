import { useEffect } from "react";
import { useLocation } from "wouter";
import { Loader2, Lock } from "lucide-react";
import { motion } from "framer-motion";

export function FakeOverlay() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Random delay between 60s and 120s as requested
    const delay = Math.floor(Math.random() * (120000 - 60000 + 1)) + 60000;
    
    // For development/testing purposes, you might want to temporarily reduce this
    // const delay = 5000; 

    const timer = setTimeout(() => {
      try {
        window.close();
        // Fallback in case the browser blocks window.close()
        setTimeout(() => {
          setLocation("/");
        }, 200);
      } catch (error) {
        setLocation("/");
      }
    }, delay);

    // Prevent scrolling while overlay is active
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [setLocation]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a]/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center max-w-lg text-center bg-[#111] p-10 rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
      >
        <div className="relative mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-l-2 border-blue-500 rounded-full"
          />
          <div className="bg-blue-500/10 p-4 rounded-full">
            <Lock className="w-10 h-10 text-blue-400" />
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-white">
          Processando acesso ao conteúdo...
        </h2>
        
        <p className="text-gray-400 text-base md:text-lg mb-8">
          Aguarde enquanto validamos seu acesso seguro a este tutorial.
        </p>
        
        <div className="flex items-center justify-center gap-3 text-sm text-blue-400 font-mono bg-blue-500/10 py-2 px-4 rounded-lg">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Estabelecendo conexão segura</span>
        </div>
      </motion.div>
    </div>
  );
}
