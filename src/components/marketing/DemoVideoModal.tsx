import { motion, AnimatePresence } from "framer-motion";
import { X, MousePointer2, Mail, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function DemoVideoModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [sequence, setSequence] = useState(0);

  // Play the "video" sequence
  useEffect(() => {
    if (!isOpen) {
      setSequence(0);
      return;
    }
    
    // Timeline of events
    const timer1 = setTimeout(() => setSequence(1), 1500); // Cursor moves to "Scope Creep Detected" card
    const timer2 = setTimeout(() => setSequence(2), 2500); // Card clicked, switch to Scope Monitor Image
    const timer3 = setTimeout(() => setSequence(3), 4500); // Cursor moves to "Draft Change Order"
    const timer4 = setTimeout(() => setSequence(4), 5500); // Button clicked, show Email Modal
    const timer5 = setTimeout(() => setSequence(5), 7500); // Email sent, success

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/50 hover:text-white"
          >
            <X className="w-8 h-8" />
          </button>

          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl aspect-video bg-[#0a0a0a] rounded-2xl md:rounded-[32px] border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Fake Video Player Header */}
            <div className="absolute top-0 w-full h-2 bg-white/5 z-50">
              <motion.div 
                className="h-full bg-[#F5F5F0]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 9, ease: "linear" }}
              />
            </div>

            {/* Simulated UI using high-fidelity screenshots */}
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                {sequence < 2 ? (
                  <motion.img 
                    key="dashboard"
                    src="/dashboard-screen.png" 
                    alt="Dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <motion.img 
                    key="scope-monitor"
                    src="/scope-monitor-screen.png" 
                    alt="Scope Monitor"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>

              {/* Email Draft Modal Overlay (Seq 4+) */}
              {sequence >= 4 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-12 z-40"
                >
                  {sequence === 4 ? (
                    <div className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                        <Mail className="w-5 h-5 text-white/50" />
                        <span className="font-medium text-white">Draft Change Order</span>
                      </div>
                      <div className="space-y-4">
                        <div className="h-4 w-1/3 bg-white/10 rounded" />
                        <div className="h-4 w-full bg-white/5 rounded" />
                        <div className="h-4 w-full bg-white/5 rounded" />
                        <div className="h-4 w-3/4 bg-white/5 rounded" />
                      </div>
                      <div className="mt-8 flex justify-end">
                        <div className="px-6 py-2 bg-[#F5F5F0] text-white rounded-lg font-medium text-sm flex items-center gap-2">
                          Send Email
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-medium text-white">Scope Protected</h3>
                      <p className="text-white/50 mt-2">Email sent. $1,800 - $2,400 saved from scope creep.</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Animated Cursor */}
            <motion.div
              initial={{ x: 600, y: 400 }}
              animate={
                sequence === 0 ? { x: 800, y: 400 } :
                sequence === 1 ? { x: 300, y: 250 } : // Move to "Needs Attention" card
                sequence === 2 ? { x: 300, y: 250 } : // Stay after click
                sequence === 3 ? { x: 220, y: 450 } : // Move to "Draft Change Order"
                sequence === 4 ? { x: 780, y: 480 } : // Move to "Send Email"
                { x: 780, y: 480 }
              }
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute z-50 pointer-events-none top-0 left-0"
            >
              <MousePointer2 className="w-8 h-8 text-white drop-shadow-lg" fill="black" />
              
              {/* Click ripples */}
              <AnimatePresence>
                {(sequence === 1 || sequence === 3 || sequence === 4) && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-1 left-1 w-6 h-6 border-2 border-white rounded-full bg-white/20"
                  />
                )}
              </AnimatePresence>
            </motion.div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
