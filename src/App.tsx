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
  const hasStartedRef = useRef(false);

  // Función simple y directa para reproducir el audio
  const startAudio = useCallback(async () => {
    if (hasStartedRef.current) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    // Si ya está reproduciéndose, no hacer nada
    if (!audio.paused) {
      hasStartedRef.current = true;
      return;
    }

    // Asegurar que el audio esté cargado
    if (audio.readyState === 0) {
      audio.load();
    }

    try {
      // Intentar reproducir directamente
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        hasStartedRef.current = true;
      }
    } catch (error) {
      // Si falla, intentar de nuevo inmediatamente sin await
      try {
        audio.play().catch(() => {
          // Silenciar errores adicionales
        });
        hasStartedRef.current = true;
      } catch (e) {
        // Ignorar errores
      }
    }
  }, []);

  // Configurar el audio cuando el componente se monta
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.7;
      audio.loop = true;
      audio.preload = 'auto';
      
      // Precargar inmediatamente
      audio.load();
    }
  }, []);

  // Función para manejar cualquier interacción del usuario
  const handleInteraction = useCallback(() => {
    startAudio();
  }, [startAudio]);

  // Agregar listeners globales de forma más simple y directa
  useEffect(() => {
    // Función que se ejecuta en cualquier interacción
    const globalHandler = () => {
      if (!hasStartedRef.current) {
        startAudio();
      }
    };

    // Eventos más importantes para móviles - usar passive: true para mejor rendimiento
    const touchEvents = ['touchstart', 'touchend'];
    const otherEvents = ['click', 'pointerdown', 'mousedown', 'keydown'];
    
    // Agregar listeners en fase de captura para capturarlos primero
    touchEvents.forEach((event) => {
      document.addEventListener(event, globalHandler, { capture: true, passive: true });
      window.addEventListener(event, globalHandler, { capture: true, passive: true });
      document.body.addEventListener(event, globalHandler, { capture: true, passive: true });
    });

    otherEvents.forEach((event) => {
      document.addEventListener(event, globalHandler, { capture: true, passive: true });
      window.addEventListener(event, globalHandler, { capture: true, passive: true });
    });

    // También escuchar scroll
    const scrollHandler = () => {
      if (!hasStartedRef.current) {
        startAudio();
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    document.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      touchEvents.forEach((event) => {
        document.removeEventListener(event, globalHandler, { capture: true });
        window.removeEventListener(event, globalHandler, { capture: true });
        document.body.removeEventListener(event, globalHandler, { capture: true });
      });
      otherEvents.forEach((event) => {
        document.removeEventListener(event, globalHandler, { capture: true });
        window.removeEventListener(event, globalHandler, { capture: true });
      });
      window.removeEventListener('scroll', scrollHandler);
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [startAudio]);

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

  const togglePlayback = async (e?: React.MouseEvent) => {
    // Si es el primer click, activar el audio
    if (!hasStartedRef.current) {
      e?.preventDefault();
      e?.stopPropagation();
      await startAudio();
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await startAudio();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen bg-[#0A0A23]"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      onPointerDown={handleInteraction}
      style={{ touchAction: 'manipulation', WebkitTouchCallout: 'none' }}
    >
      {/* Elemento audio HTML con todas las optimizaciones para móviles */}
      <audio
        ref={audioRef}
        src="/love..mp3"
        loop
        preload="auto"
        playsInline
        autoPlay
        muted={false}
        style={{ display: 'none' }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlayback}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-md hover:bg-white/20 transition"
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
