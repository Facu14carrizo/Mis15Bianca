import { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    const audio = new Audio('/love..mp3');
    audio.loop = true;
    audioRef.current = audio;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const scrollToDetails = () => {
    const element = document.getElementById('event-details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const togglePlayback = async () => {
    if (!audioRef.current) {
      const audio = new Audio('/love..mp3');
      audio.loop = true;
      audioRef.current = audio;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Silenciar errores de autoplay bloqueado por el navegador
      }
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
