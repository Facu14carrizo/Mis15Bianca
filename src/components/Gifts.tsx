import { motion } from 'framer-motion';
import { Gift, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function Gifts() {
  const [copied, setCopied] = useState(false);
  const [cvuCopied, setCvuCopied] = useState(false);
  const alias = 'biancu.105';
  const cvu = '0000003100018609278335';

  const handleCopy = () => {
    navigator.clipboard.writeText(alias);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCVU = () => {
    navigator.clipboard.writeText(cvu);
    setCvuCopied(true);
    setTimeout(() => setCvuCopied(false), 2000);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A23] to-[#1E1E4B] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 0.8
            }}
            animate={{
              y: window.innerHeight + 20,
              opacity: [0.8, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <svg className="w-4 h-4 text-[#C0C0C0]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
            className="inline-block mb-6"
          >
            <div className="p-6 bg-gradient-to-br from-[#C0C0C0] to-[#E5E5E5] rounded-full shadow-2xl">
              <Gift className="w-16 h-16 text-[#1E1E4B]" strokeWidth={2} />
            </div>
          </motion.div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              textShadow: '0 0 20px rgba(192, 192, 192, 0.5)'
            }}
          >
            Regalos
          </h2>

          <p
            className="text-xl sm:text-2xl text-[#E5E5E5] mb-8"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Tu presencia es el mejor regalo, pero si deseas obsequiarme algo:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-[#1E1E4B]/90 to-[#2A2A8F]/70 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-[#C0C0C0]/40 relative overflow-hidden"
          style={{
            boxShadow: '0 0 40px rgba(192, 192, 192, 0.4), 0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="bg-[#0A0A23]/60 rounded-2xl p-6 mb-6 border border-[#E5E5E5]/30 text-center">
              <p
                className="text-[#C0C0C0] text-lg sm:text-xl mb-2 text-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Alias para transferencias:
              </p>
              <p
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wider mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  textShadow: '0 0 20px rgba(192, 192, 192, 0.6)'
                }}
              >
                {alias}
              </p>

              <div className="border-t border-[#E5E5E5]/20 pt-4 space-y-4">
                <div>
                  <p className="text-[#C0C0C0] text-sm mb-1 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>CVU</p>
                  <p className="text-white text-lg sm:text-xl font-medium break-all" style={{ fontFamily: "'Poppins', sans-serif" }}>{cvu}</p>
                </div>
                <div>
                  <p className="text-[#C0C0C0] text-sm mb-1 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>Titular</p>
                  <p className="text-white text-lg font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Bianca Angelina Paniagua Loa</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C0C0C0] to-[#E5E5E5] text-[#1E1E4B] font-bold text-lg rounded-full transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(192, 192, 192, 0.5)',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-6 h-6" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-6 h-6" />
                    Copiar Alias
                  </>
                )}
              </motion.button>

              <motion.button
                onClick={handleCopyCVU}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#C0C0C0] text-[#E5E5E5] font-bold text-lg rounded-full transition-all duration-300 hover:bg-[#C0C0C0]/10"
                style={{
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                {cvuCopied ? (
                  <>
                    <Check className="w-6 h-6" />
                    ¡CVU Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-6 h-6" />
                    Copiar CVU
                  </>
                )}
              </motion.button>
            </div>


          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p
            className="text-[#C0C0C0] text-lg italic"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Cada gesto es apreciado y hará esta noche aún más especial ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}
