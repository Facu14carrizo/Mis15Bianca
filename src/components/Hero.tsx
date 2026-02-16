import { motion } from 'framer-motion';
import StarField from './StarField';

interface HeroProps {
  onRSVPClick: () => void;
}

export default function Hero({ onRSVPClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A23] via-[#1E1E4B] to-[#2A2A8F]" style={{ zIndex: 0 }} />
      <StarField />

      <motion.div
        className="absolute top-20 right-10 md:right-20 lg:right-32"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ zIndex: 2 }}
      >
        <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: '#F0F0F0', stopOpacity: 1 }} />
                <stop offset="70%" style={{ stopColor: '#E5E5E5', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#C0C0C0', stopOpacity: 0.3 }} />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#moonGlow)" filter="url(#glow)" />
            <ellipse cx="120" cy="70" rx="15" ry="18" fill="#1E1E4B" opacity="0.3" />
            <ellipse cx="80" cy="110" rx="12" ry="15" fill="#1E1E4B" opacity="0.25" />
            <ellipse cx="105" cy="130" rx="18" ry="20" fill="#1E1E4B" opacity="0.2" />
          </svg>
          <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent rounded-full blur-2xl" />
        </div>
      </motion.div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1
            className="font-script text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-8 sm:mb-12 leading-none"
            style={{
              textShadow: '0 0 20px rgba(192, 192, 192, 0.8), 0 0 40px rgba(192, 192, 192, 0.5), 0 0 60px rgba(192, 192, 192, 0.3)',
              fontFamily: "'Great Vibes', cursive",
              lineHeight: 1.2
            }}
            animate={{
              textShadow: [
                '0 0 20px rgba(192, 192, 192, 0.8), 0 0 40px rgba(192, 192, 192, 0.5)',
                '0 0 30px rgba(192, 192, 192, 1), 0 0 60px rgba(192, 192, 192, 0.7)',
                '0 0 20px rgba(192, 192, 192, 0.8), 0 0 40px rgba(192, 192, 192, 0.5)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Te invito a mis 15
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.h2
            className="font-script text-[6rem] xs:text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[13rem] text-[#E5E5E5] mb-8 leading-[0.9]"
            style={{
              textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073',
              fontFamily: "'Great Vibes', cursive"
            }}
            animate={{
              textShadow: [
                '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,105,180,0.6), 0 0 60px rgba(255,20,147,0.4)',
                '0 0 40px rgba(255,255,255,1), 0 0 80px rgba(255,105,180,0.9), 0 0 120px rgba(255,20,147,0.7)',
                '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,105,180,0.6), 0 0 60px rgba(255,20,147,0.4)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            Bianca
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-48 sm:mt-64 relative z-10"
        >
          <motion.button
            onClick={onRSVPClick}
            className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-[#C0C0C0] to-[#E5E5E5] text-[#1E1E4B] font-bold text-lg sm:text-xl rounded-full overflow-hidden transition-all duration-300"
            style={{
              boxShadow: '0 0 30px rgba(192, 192, 192, 0.6), 0 10px 40px rgba(0, 0, 0, 0.3)',
              fontFamily: "'Poppins', sans-serif"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Confirmar Asistencia</span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 2, opacity: 0.3 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 sm:mt-32 relative z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-8 h-8 mx-auto text-[#C0C0C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A23] to-transparent" style={{ zIndex: 2 }} />
    </section>
  );
}
