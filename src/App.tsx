import { useEffect, useRef, useState, useCallback } from 'react';

import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import Gifts from './components/Gifts';
import RSVPForm from './components/RSVPForm';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'auto';
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const userInteracted = useRef(false);

  // Función para obtener o crear el audio
  const getAudio = () => {
    if (!audioRef.current) {
      // Si no existe, buscar el elemento en el DOM
      const audioElement = document.querySelector('audio[src="/love..mp3"]') as HTMLAudioElement;
      if (audioElement) {
        audioRef.current = audioElement;
      }
    }
    return audioRef.current;
  };

  // Configurar el audio cuando el componente se monta
  useEffect(() => {
    // Esperar un momento para que el DOM esté listo
    const timer = setTimeout(() => {
      const audio = getAudio();
      if (audio) {
        audio.volume = 0.7;
        audio.loop = true;
        
        // Intentar reproducir automáticamente
        audio.play().catch(() => {
          // El navegador bloqueó el autoplay, se activará con interacción
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Reproducir música cuando el usuario interactúa con la página (excepto en el botón)
  useEffect(() => {
    const handleUserInteraction = async (e: Event) => {
      // Ignorar clicks en el botón de música - verificar por clase o atributo específico
      const target = e.target as HTMLElement;
      const button = target.closest('button[type="button"]');
      if (button && button.textContent?.includes('música')) {
        return;
      }

      const audio = getAudio();
      if (!userInteracted.current && audio) {
        userInteracted.current = true;
        if (audio.paused) {
          try {
            await audio.play();
            setIsPlaying(true);
          } catch (error) {
            // Error al reproducir
          }
        }
      }
    };

    // Escuchar eventos de interacción
    const events = ['click', 'touchstart', 'scroll', 'keydown'];
    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  // Limpiar el audio al desmontar
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const scrollToDetails = () => {
    const element = document.getElementById('event-details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const togglePlayback = async (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Pequeño delay para asegurar que el evento se procese correctamente
    await new Promise(resolve => setTimeout(resolve, 0));
    
    const audio = getAudio();
    if (!audio) {
      return;
    }

    // Verificar el estado real del audio directamente
    const currentlyPlaying = !audio.paused;
    
    if (currentlyPlaying) {
      // Si está reproduciéndose, pausar
      audio.pause();
      setIsPlaying(false);
    } else {
      // Si está pausado, reproducir
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error al reproducir:', error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A23]">
      {/* Elemento audio HTML con autoplay para mejor compatibilidad */}
      <audio
        ref={(el) => {
          audioRef.current = el;
          if (el) {
            el.volume = 0.7;
            el.loop = true;
            // Intentar reproducir automáticamente cuando el elemento esté listo
            el.play().catch(() => {
              // El navegador bloqueó el autoplay
            });
          }
        }}
        src="/love..mp3"
        loop
        preload="auto"
        playsInline
        style={{ display: 'none' }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlayback}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="fixed top-4 right-4 z-50 rounded-full bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-md hover:bg-white/20 transition"
        style={{ pointerEvents: 'auto' }}
      >
        {isPlaying ? 'Pausar música' : 'Reproducir música'}
      </button>
      <div className="relative" style={{ zIndex: 10 }}>
        <Hero onRSVPClick={scrollToDetails} />
        <EventDetails id="event-details" />
        <Gifts />
        <RSVPForm id="rsvp-form" />
        <Footer />
      </div>
    </div>
  );
}

export default App;
