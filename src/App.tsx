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

  // Función para inicializar el audio con event listeners
  const initializeAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio('/love..mp3');
      audio.loop = true;
      audio.volume = 0.7; // Volumen moderado
      
      // Agregar event listeners para sincronizar el estado
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', () => setIsPlaying(false));
      
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  // Función para intentar reproducir el audio
  const tryPlayAudio = useCallback(async () => {
    const audio = initializeAudio();

    // Verificar si ya está reproduciéndose usando la propiedad del audio
    if (audio && !audio.paused) {
      return true;
    }

    if (audio) {
      try {
        await audio.play();
        return true;
      } catch (error) {
        // El navegador bloqueó el autoplay
        return false;
      }
    }
    return false;
  }, [initializeAudio]);

  // Intentar reproducir automáticamente al cargar
  useEffect(() => {
    if (!hasTriedAutoplay.current) {
      hasTriedAutoplay.current = true;
      tryPlayAudio();
    }
  }, [tryPlayAudio]);

  // Intentar reproducir cuando el usuario interactúa con la página
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted.current) {
        userInteracted.current = true;
        if (!audioRef.current?.paused) return;
        tryPlayAudio();
      }
    };

    // Escuchar múltiples eventos de interacción
    const events = ['click', 'scroll', 'touchstart', 'keydown', 'mousemove'];
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
    const audio = initializeAudio();

    if (audio.paused) {
      await tryPlayAudio();
    } else {
      audio.pause();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A23]">
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
