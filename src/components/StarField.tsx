import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    const starCount = 200;

    // Initialize static stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        speed: Math.random() * 0.05 + 0.01,
        twinkleSpeed: Math.random() * 0.02 + 0.01
      });
    }

    const createShootingStar = (): ShootingStar => {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * (canvas.height / 2); // Start mainly in upper half
      const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // Angle around 45 degrees
      const velocity = 15 + Math.random() * 10;

      return {
        x: startX,
        y: startY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        length: 100 + Math.random() * 100,
        life: 0,
        maxLife: 50,
        size: 2 + Math.random()
      };
    };

    let animationFrameId: number;

    const animate = () => {
      // Clear with slight fade for trails if desired, but here we just clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render static stars
      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        gradient.addColorStop(0, `rgba(192, 192, 192, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(192, 192, 192, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(star.x - star.size * 3, star.y - star.size * 3, star.size * 6, star.size * 6);
      });

      // Shooting stars logic
      if (Math.random() < 0.02) { // 2% chance per frame to spawn a shooting star
        shootingStars.push(createShootingStar());
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];

        // Update position
        star.x += star.vx;
        star.y += star.vy;
        star.life++;

        // Draw shooting star
        const tailX = star.x - star.vx * (star.length / 20); // Tail follows velocity
        const tailY = star.y - star.vy * (star.length / 20);

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glow head
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fill();

        // Remove dead stars
        if (star.life >= star.maxLife || star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
