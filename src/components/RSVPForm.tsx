import { motion } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface RSVPFormProps {
  id: string;
}

export default function RSVPForm({ id }: RSVPFormProps) {
  const [attending, setAttending] = useState(true);

  const handleWhatsAppClick = () => {
    // Placeholder number, waiting for user input
    const phoneNumber = '5491121543734';
    const message = attending
      ? '¡Hola! Quiero confirmar mi asistencia a los 15 de Delfi'
      : 'Hola, lamentablemente no podré asistir a los 15 de Delfi.';

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id={id} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#2D004F] to-black">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              textShadow: '0 0 20px rgba(192, 192, 192, 0.5)'
            }}
          >
            Confirmá tu Asistencia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-[#2D004F]/90 to-black/70 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-silver/40"
          style={{
            boxShadow: '0 0 40px rgba(192, 192, 192, 0.4), 0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="space-y-8">
            <div className="text-center">
              <label className="block text-[#E5E5E5] font-semibold mb-6 text-2xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
                ¿Vas a asistir?
              </label>
              <div className="flex gap-4 justify-center">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAttending(true)}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all min-w-[140px] whitespace-nowrap ${attending
                    ? 'bg-gradient-to-r from-[#4B0082] to-[#2D004F] text-white shadow-lg shadow-[#4B0082]/50'
                    : 'bg-black/60 text-silver border-2 border-silver/30'
                    }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  ✨ Sí, voy!
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAttending(false)}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all min-w-[140px] whitespace-nowrap ${!attending
                    ? 'bg-gradient-to-r from-[#4B0082] to-[#2D004F] text-white shadow-lg shadow-[#4B0082]/50'
                    : 'bg-black/60 text-silver border-2 border-silver/30'
                    }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  No puedo
                </motion.button>
              </div>
            </div>

            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#25D366] text-white font-bold text-xl rounded-xl hover:bg-[#20bd5a] transition-all"
              style={{
                boxShadow: '0 0 30px rgba(37, 211, 102, 0.4)',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              <MessageCircle className="w-6 h-6" />
              Confirmar Asistencia
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
