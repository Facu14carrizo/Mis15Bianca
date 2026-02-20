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
  const hasTriedAutoplay = useRef(false);
  const userInteracted = useRef(false);

  // Configurar el audio cuando el componente se monta
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.loop = true;
    }
  }, []);

  // Función para intentar reproducir el audio
  const tryPlayAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) return false;

    // Verificar si ya está reproduciéndose
    if (!audio.paused) {
      return true;
    }

    try {
      await audio.play();
      return true;
    } catch (error) {
      // El navegador bloqueó el autoplay
      return false;
    }
  }, []);

  // Intentar reproducir automáticamente al cargar
  useEffect(() => {
    if (!hasTriedAutoplay.current && audioRef.current) {
      hasTriedAutoplay.current = true;
      tryPlayAudio();
    }
  }, [tryPlayAudio]);

  // Reproducir música cuando el usuario interactúa con la página
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted.current) {
        userInteracted.current = true;
        if (!audioRef.current?.paused) return;
        tryPlayAudio();
      }
    };

    // Escuchar múltiples eventos de interacción (click, touch, scroll, etc.)
    const events = ['click', 'touchstart', 'scroll', 'keydown', 'mousemove'];
    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [tryPlayAudio]);

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
    <div className="relative min-h-screen bg-[#0A0A23]">
      {/* Elemento audio HTML con autoplay para mejor compatibilidad */}
      <audio
        ref={audioRef}
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
