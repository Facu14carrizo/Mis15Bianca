import { motion } from 'framer-motion';
import { MapPin, Clock, Gem, Timer } from 'lucide-react';

interface EventDetailsProps {
  id?: string;
}

export default function EventDetails({ id }: EventDetailsProps) {
  const details = [
    {
      icon: MapPin,
      title: 'Lugar',
      content: 'Espacio Yrigoyen',
      subtitle: 'Av. Hipólito Yrigoyen 858, Gral. Pacheco',
      hasMap: true,
      delay: 0.2
    },
    {
      icon: Clock,
      title: 'Horario y Fecha',
      content: '21 de marzo del 2026',
      subtitle: <span className="text-[#FFD700] font-bold text-xl tracking-wider drop-shadow-lg">21:00 hs</span>,
      delay: 0.4
    },
    {
      icon: Gem,
      title: 'Vestimenta',
      content: 'ELEGANTE',
      subtitle: 'Luce tu mejor outfit formal',
      delay: 0.6
    },
    {
      icon: Timer,
      title: 'Importante',
      content: '¡Ser puntual!',
      subtitle: 'La magia empieza a tiempo',
      delay: 0.8
    }
  ];

  return (
    <section id={id} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A23] via-[#1E1E4B] to-[#0A0A23]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              textShadow: '0 0 20px rgba(192, 192, 192, 0.5)'
            }}
          >
            Detalles del Evento
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                <svg className="w-4 h-4 text-[#C0C0C0]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: detail.delay }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(192, 192, 192, 0.4), 0 0 60px rgba(42, 42, 143, 0.6)'
              }}
              className="group relative flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#1E1E4B]/90 to-[#0A0A23]/90 backdrop-blur-xl rounded-3xl p-8 border border-[#C0C0C0]/20 transition-all duration-300 overflow-hidden"
              style={{
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(192, 192, 192, 0.05)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-radial from-[#C0C0C0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2A2A8F] rounded-full blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#C0C0C0] rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-300" />

              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
                className="mb-6 relative z-10"
              >
                <div className="p-4 bg-gradient-to-br from-[#E5E5E5] to-[#C0C0C0] rounded-full shadow-[0_0_20px_rgba(229,229,229,0.3)]">
                  <detail.icon className="w-8 h-8 text-[#0A0A23]" strokeWidth={2.5} />
                </div>
              </motion.div>

              <h3
                className="text-2xl font-bold text-[#E5E5E5] mb-3 tracking-wide"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {detail.title}
              </h3>

              <p
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E5E5E5] mb-3 max-w-[90%] leading-tight"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.4)'
                }}
              >
                {detail.content}
              </p>

              <p className="text-[#C0C0C0]/90 text-lg font-medium tracking-wide uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {detail.subtitle}
              </p>

              {detail.hasMap && (
                <div className="mt-6 w-full h-48 rounded-2xl overflow-hidden shadow-2xl border border-[#C0C0C0]/20 relative z-20 group-hover:border-[#C0C0C0]/40 transition-colors duration-300">
                  <iframe
                    src="https://maps.google.com/maps?q=Espacio+Yrigoyen+Av.+Hip%C3%B3lito+Yrigoyen+858+Gral.+Pacheco&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>
              )}

              {detail.hasMap && (
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Espacio+Yrigoyen+Av.+Hipólito+Yrigoyen+858+Gral.+Pacheco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-2 bg-[#C0C0C0] text-[#1E1E4B] font-bold rounded-full hover:bg-white transition-colors duration-300 transform hover:scale-105"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: '0 0 15px rgba(192, 192, 192, 0.4)'
                  }}
                >
                  Abrir en el mapa
                </a>
              )}
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
