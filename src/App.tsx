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
  const [hasStarted, setHasStarted] = useState(false);
  const hasStartedRef = useRef(false);
  const audioInitializedRef = useRef(false);

  // Función ultra-robusta para reproducir el audio
  const startAudio = useCallback(async () => {
    if (hasStartedRef.current) return;
    
    const audio = audioRef.current;
    if (!audio) {
      // Si el audio aún no existe, esperar un momento y reintentar
      setTimeout(() => startAudio(), 50);
      return;
    }

    // Si ya está reproduciéndose, no hacer nada
    if (!audio.paused) {
      hasStartedRef.current = true;
      return;
    }

    // Asegurar que el audio esté completamente cargado
    if (audio.readyState < 2) {
      audio.load();
      // Esperar a que esté listo
      await new Promise<void>((resolve) => {
        const checkReady = () => {
          if (audio.readyState >= 2) {
            audio.removeEventListener('canplay', checkReady);
            audio.removeEventListener('loadeddata', checkReady);
            resolve();
          }
        };
        audio.addEventListener('canplay', checkReady);
        audio.addEventListener('loadeddata', checkReady);
        // Timeout de seguridad
        setTimeout(resolve, 500);
      });
    }

    // Múltiples intentos de reproducción
    try {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        hasStartedRef.current = true;
        setHasStarted(true);
        return;
      }
    } catch (error) {
      // Intentar de nuevo inmediatamente
      try {
        audio.play().then(() => {
          hasStartedRef.current = true;
          setHasStarted(true);
        }).catch(() => {
          // Último intento después de un breve delay
          setTimeout(() => {
            audio.play().catch(() => {});
            hasStartedRef.current = true;
            setHasStarted(true);
          }, 100);
        });
      } catch (e) {
        // Ignorar errores finales
      }
    }
  }, []);

  // Configurar el audio cuando el componente se monta
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !audioInitializedRef.current) {
      audioInitializedRef.current = true;
      audio.volume = 0.7;
      audio.loop = true;
      audio.preload = 'auto';
      
      // Precargar inmediatamente y asegurar que esté listo
      audio.load();
      
      // Intentar reproducir automáticamente si es posible
      setTimeout(() => {
        if (!hasStartedRef.current) {
          audio.play().catch(() => {
            // El autoplay fue bloqueado, esperar interacción del usuario
          });
        }
      }, 200);
    }
  }, []);

  // Handler ultra-agresivo que captura TODOS los eventos posibles
  const handleAnyInteraction = useCallback(() => {
    if (!hasStartedRef.current) {
      startAudio();
    }
  }, [startAudio]);

  // Agregar listeners en TODOS los niveles posibles
  useEffect(() => {
    // Todos los eventos posibles de interacción
    const allEvents = [
      'touchstart', 'touchend', 'touchmove', 'touchcancel',
      'pointerdown', 'pointerup', 'pointermove',
      'mousedown', 'mouseup', 'mousemove',
      'click', 'dblclick',
      'keydown', 'keyup', 'keypress',
      'scroll', 'wheel', 'touch',
      'gesturestart', 'gesturechange', 'gestureend'
    ];

    // Agregar listeners en TODOS los niveles
    const targets = [document, window, document.body, document.documentElement];
    
    allEvents.forEach((eventName) => {
      targets.forEach((target) => {
        try {
          target.addEventListener(eventName, handleAnyInteraction, { 
            capture: true, 
            passive: true 
          });
        } catch (e) {
          // Ignorar errores de eventos no soportados
        }
      });
    });

    return () => {
      allEvents.forEach((eventName) => {
        targets.forEach((target) => {
          try {
            target.removeEventListener(eventName, handleAnyInteraction, { capture: true });
          } catch (e) {
            // Ignorar errores
          }
        });
      });
    };
  }, [handleAnyInteraction]);

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
      onClick={handleAnyInteraction}
      onTouchStart={handleAnyInteraction}
      onTouchEnd={handleAnyInteraction}
      onPointerDown={handleAnyInteraction}
      onPointerUp={handleAnyInteraction}
      onMouseDown={handleAnyInteraction}
      onMouseUp={handleAnyInteraction}
      onKeyDown={handleAnyInteraction}
      style={{ touchAction: 'manipulation', WebkitTouchCallout: 'none' }}
    >
      {/* Wrapper invisible que captura absolutamente todos los eventos */}
      {!hasStarted && (
        <div
          className="fixed inset-0 z-[99999]"
          onClick={handleAnyInteraction}
          onTouchStart={handleAnyInteraction}
          onTouchEnd={handleAnyInteraction}
          onPointerDown={handleAnyInteraction}
          onPointerUp={handleAnyInteraction}
          onMouseDown={handleAnyInteraction}
          style={{ 
            touchAction: 'manipulation',
            pointerEvents: 'auto',
            WebkitTapHighlightColor: 'transparent'
          }}
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
        onPlay={() => {
          setIsPlaying(true);
          hasStartedRef.current = true;
          setHasStarted(true);
        }}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => {
          // Cuando el audio está listo, intentar reproducir si aún no se ha iniciado
          if (!hasStartedRef.current && audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
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
