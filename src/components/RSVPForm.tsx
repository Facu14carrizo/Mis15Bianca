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
    const phoneNumber = '5491100000000';
    const message = attending
      ? '¡Hola! Quiero confirmar mi asistencia a los 15 de Bianca'
      : 'Hola, lamentablemente no podré asistir a los 15 de Bianca.';

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id={id} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1E1E4B] to-[#0A0A23]">
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
          className="bg-gradient-to-br from-[#1E1E4B]/90 to-[#2A2A8F]/70 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-[#C0C0C0]/40"
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
                    ? 'bg-gradient-to-r from-[#C0C0C0] to-[#E5E5E5] text-[#1E1E4B] shadow-lg shadow-[#C0C0C0]/50'
                    : 'bg-[#0A0A23]/60 text-[#C0C0C0] border-2 border-[#C0C0C0]/30'
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
                    ? 'bg-gradient-to-r from-[#C0C0C0] to-[#E5E5E5] text-[#1E1E4B] shadow-lg shadow-[#C0C0C0]/50'
                    : 'bg-[#0A0A23]/60 text-[#C0C0C0] border-2 border-[#C0C0C0]/30'
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
