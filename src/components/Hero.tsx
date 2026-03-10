import { motion } from 'framer-motion';
import StarField from './StarField';

interface HeroProps {
  onRSVPClick: () => void;
}

export default function Hero({ onRSVPClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#2D004F] to-[#000000]" style={{ zIndex: 0 }} />
      <StarField />

      {/* Butterflies Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0,
              scale: 0.3 + Math.random() * 0.4
            }}
            animate={{
              x: [null, Math.random() * 100 + "%"],
              y: [null, Math.random() * 100 + "%"],
              opacity: [0, 0.6, 0],
              scale: [0.3, 0.7, 0.3],
              rotate: [0, 360]
            }}
            transition={{
              duration: 15 + Math.random() * 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg width="30" height="30" viewBox="0 0 100 100" className="fill-[#8A2BE2] opacity-40">
              <path d="M50 50 C 70 20 90 20 90 50 C 90 80 70 80 50 50 C 30 80 10 80 10 50 C 10 20 30 20 50 50" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main Moon and Butterfly Graphic - Centered for Mobile Priority */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full pt-12 md:pt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mb-[-40px] md:mb-[-80px]"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_40px_rgba(192,192,192,0.4)]">
                <defs>
                  <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#C0C0C0" />
                    <stop offset="100%" stopColor="#A0A0A0" />
                  </linearGradient>
                  <filter id="moonGlow">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Detailed Crescent Moon - Premium Silver */}
                <path
                  d="M200 40 A 160 160 0 1 0 200 360 A 130 130 0 1 1 200 40"
                  fill="url(#silverGrad)"
                  filter="url(#moonGlow)"
                  className="drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                />

                {/* Detailed Butterfly over Moon - High Fidelity to Image */}
                <motion.g
                  animate={{ 
                    scale: [1, 1.03, 1],
                    rotateY: [0, 15, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <g transform="translate(140, 140) scale(1.3)" filter="url(#moonGlow)">
                    {/* Wings Outline - Black/Deep Violet */}
                    <path
                      d="M60 60 C 100 -10 170 10 160 70 C 150 130 100 110 60 60 C 20 110 -30 130 -40 70 C -50 10 20 -10 60 60"
                      fill="#000000"
                      stroke="#E5E5E5"
                      strokeWidth="0.8"
                    />
                    {/* Wings Main Panels - Vibrant Violet */}
                    <g fill="#4B0082" stroke="#000000" strokeWidth="1">
                      {/* Right Wing */}
                      <path d="M65 55 Q 110 10 145 35 Q 155 55 145 65 L 65 60 Z" />
                      <path d="M65 65 Q 110 110 145 90 Q 155 75 145 65 L 65 65 Z" />
                      
                      {/* Left Wing */}
                      <path d="M55 55 Q 10 10 -25 35 Q -35 55 -25 65 L 55 60 Z" />
                      <path d="M55 65 Q 10 110 -25 90 Q -35 75 -25 65 L 55 65 Z" />
                    </g>
                    
                    {/* Inner Wing Details - Lighter Violet */}
                    <g fill="#8A2BE2" opacity="0.6">
                      <path d="M75 45 Q 100 25 120 40 L 105 55 Z" />
                      <path d="M75 75 Q 100 95 120 80 L 105 65 Z" />
                      <path d="M45 45 Q 20 25 0 40 L 15 55 Z" />
                      <path d="M45 75 Q 20 95 0 80 L 15 65 Z" />
                    </g>

                    {/* Butterfly Body - Silver Highlight */}
                    <path
                      d="M57 40 Q 60 30 63 40 L 63 80 Q 60 90 57 80 Z"
                      fill="#E5E5E5"
                    />
                    
                    {/* Antennae */}
                    <path
                      d="M58 40 Q 54 25 44 20 M62 40 Q 66 25 76 20"
                      fill="none"
                      stroke="#E5E5E5"
                      strokeWidth="1.2"
                    />
                    
                    {/* Characteristic White/Silver dots on edges */}
                    <g fill="#FFFFFF">
                      <circle cx="145" cy="40" r="1.5" />
                      <circle cx="150" cy="55" r="1.5" />
                      <circle cx="145" cy="75" r="1.5" />
                      <circle cx="140" cy="90" r="1.5" />
                      
                      <circle cx="-25" cy="40" r="1.5" />
                      <circle cx="-30" cy="55" r="1.5" />
                      <circle cx="-25" cy="75" r="1.5" />
                      <circle cx="-20" cy="90" r="1.5" />

                      <circle cx="120" cy="20" r="1.2" />
                      <circle cx="0" cy="20" r="1.2" />
                    </g>
                  </g>
                </motion.g>
              </svg>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <motion.h1
            className="font-script text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-6 md:mb-12 leading-none"
            style={{
              textShadow: '0 0 20px rgba(192, 192, 192, 0.4), 0 0 40px rgba(75, 0, 130, 0.3)',
              fontFamily: "'Great Vibes', cursive",
              lineHeight: 1.2
            }}
            animate={{
              textShadow: [
                '0 0 20px rgba(192, 192, 192, 0.4), 0 0 40px rgba(75, 0, 130, 0.3)',
                '0 0 30px rgba(192, 192, 192, 0.6), 0 0 60px rgba(75, 0, 130, 0.5)',
                '0 0 20px rgba(192, 192, 192, 0.4), 0 0 40px rgba(75, 0, 130, 0.3)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Te invito a mis 15
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.h2
              className="font-script text-[6rem] xs:text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[13rem] text-silver-bright mb-8 leading-[0.8]"
              style={{
                textShadow: '0 0 15px #fff, 0 0 30px #8A2BE2, 0 0 45px #4B0082',
                fontFamily: "'Great Vibes', cursive"
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(138,43,226,0.6), 0 0 60px rgba(75,0,130,0.4)',
                  '0 0 40px rgba(255,255,255,1), 0 0 80px rgba(138,43,226,0.9), 0 0 120px rgba(75,0,130,0.7)',
                  '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(138,43,226,0.6), 0 0 60px rgba(75,0,130,0.4)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              Delfi
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-24 sm:mt-32 md:mt-48 relative z-10"
          >
            <motion.button
              onClick={onRSVPClick}
              className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-[#4B0082] to-[#2D004F] text-white font-bold text-lg sm:text-xl rounded-full overflow-hidden transition-all duration-300 border border-silver/30"
              style={{
                boxShadow: '0 0 30px rgba(75, 0, 130, 0.4), 0 10px 40px rgba(0, 0, 0, 0.5)',
                fontFamily: "'Poppins', sans-serif"
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(138, 43, 226, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Confirmar Asistencia</span>
              <motion.div
                className="absolute inset-0 bg-silver/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 sm:mt-20 md:mt-32 relative z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-8 h-8 mx-auto text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" style={{ zIndex: 2 }} />
    </section>
  );
}
