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
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasTriedAutoplay = useRef(false);
  const userInteracted = useRef(false);
  const audioReady = useRef(false);

  // Función robusta para reproducir el audio
  const tryPlayAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    // Si ya está reproduciéndose, no hacer nada
    if (!audio.paused) {
      return true;
    }

    // Asegurar que el audio esté listo
    if (audio.readyState < 2) {
      // Si no está cargado, esperar a que se cargue
      await new Promise<void>((resolve) => {
        const handleCanPlay = () => {
          audio.removeEventListener('canplay', handleCanPlay);
          resolve();
        };
        audio.addEventListener('canplay', handleCanPlay);
        audio.load(); // Forzar carga
      });
    }

    try {
      // Múltiples intentos con diferentes estrategias
      await audio.play();
      audioReady.current = true;
      return true;
    } catch (error) {
      // Si falla, intentar con play() sin await
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          audioReady.current = true;
          return true;
        }
      } catch (e) {
        // El navegador bloqueó el autoplay
        return false;
      }
      return false;
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
      
      // Marcar como listo cuando pueda reproducirse
      const handleCanPlay = () => {
        audioReady.current = true;
      };
      audio.addEventListener('canplay', handleCanPlay);
      
      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  // Intentar reproducir automáticamente al cargar
  useEffect(() => {
    if (!hasTriedAutoplay.current) {
      hasTriedAutoplay.current = true;
      // Esperar un poco para que el audio se inicialice
      setTimeout(() => {
        tryPlayAudio();
      }, 100);
    }
  }, [tryPlayAudio]);

  // Función agresiva para manejar interacciones del usuario
  const handleUserInteraction = useCallback(async (e?: Event) => {
    if (!userInteracted.current) {
      userInteracted.current = true;
      setHasInteracted(true);
      
      // Intentar reproducir inmediatamente sin bloquear otros eventos
      if (audioRef.current && audioRef.current.paused) {
        // Intentar reproducir inmediatamente
        try {
          await tryPlayAudio();
        } catch (error) {
          // Si falla, intentar de nuevo en el siguiente frame
          requestAnimationFrame(async () => {
            await tryPlayAudio();
          });
        }
      }
    }
  }, [tryPlayAudio]);

  // Agregar listeners de interacción de forma más agresiva
  useEffect(() => {
    // Eventos de puntero y touch (más específicos para móviles)
    const touchEvents = ['touchstart', 'touchend', 'touchmove'];
    const pointerEvents = ['pointerdown', 'pointerup'];
    const mouseEvents = ['click', 'mousedown', 'mouseup'];
    const otherEvents = ['keydown', 'keyup', 'scroll', 'wheel', 'mousemove'];

    // Para eventos touch, usar capture phase sin passive para poder controlar mejor
    touchEvents.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { capture: true, passive: true });
      window.addEventListener(event, handleUserInteraction, { capture: true, passive: true });
      document.body.addEventListener(event, handleUserInteraction, { capture: true, passive: true });
    });

    // Para otros eventos, usar passive
    [...pointerEvents, ...mouseEvents, ...otherEvents].forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { capture: true, passive: true });
      window.addEventListener(event, handleUserInteraction, { capture: true, passive: true });
      document.body.addEventListener(event, handleUserInteraction, { capture: true, passive: true });
    });

    return () => {
      [...touchEvents, ...pointerEvents, ...mouseEvents, ...otherEvents].forEach((event) => {
        document.removeEventListener(event, handleUserInteraction, { capture: true } as EventListenerOptions);
        window.removeEventListener(event, handleUserInteraction, { capture: true } as EventListenerOptions);
        document.body.removeEventListener(event, handleUserInteraction, { capture: true } as EventListenerOptions);
      });
    };
  }, [handleUserInteraction]);

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

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await tryPlayAudio();
    } else {
      audio.pause();
    }
  };

  return (
    <div 
      className="relative min-h-screen bg-[#0A0A23]"
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      style={{ touchAction: 'manipulation' }}
    >
      {/* Wrapper invisible que captura todos los eventos de interacción */}
      {!hasInteracted && (
        <div
          className="fixed inset-0 z-[9999]"
          onClick={handleUserInteraction}
          onTouchStart={handleUserInteraction}
          onPointerDown={handleUserInteraction}
          style={{ touchAction: 'manipulation' }}
        />
      )}

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
        onLoadedData={() => {
          audioReady.current = true;
        }}
        onCanPlay={() => {
          audioReady.current = true;
        }}
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
