import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A23] to-black">
      <div className="max-w-4xl mx-auto">
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="mb-8 relative z-20">
              <h3
                className="text-3xl sm:text-4xl font-script text-white mb-[-10px] sm:mb-[-20px] relative z-20"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  textShadow: '0 0 25px rgba(192, 192, 192, 0.6)'
                }}
              >
                Mis 15
              </h3>
              <h3
                className="text-[6rem] xs:text-[7rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] font-script text-white leading-[0.8]"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  textShadow: '0 0 40px rgba(192, 192, 192, 0.6)'
                }}
              >
                Bianca
              </h3>
            </div>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  <svg className="w-5 h-5 text-[#C0C0C0]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>



          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-t border-[#C0C0C0]/20 pt-8"
          >
            <p
              className="text-[#C0C0C0] flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Hecho con
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                <Heart className="w-4 h-4 text-red-400" fill="#f87171" />
              </motion.span>
              por
              <a
                href="https://waveframe.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#e60073] transition-colors duration-300 font-medium relative group"
              >
                WaveFrame Studio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e60073] transition-all duration-300 group-hover:w-full"></span>
              </a>
              para Bianca 🌟
            </p>
            <p className="text-[#C0C0C0]/60 text-sm mt-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Una noche bajo las estrellas
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
