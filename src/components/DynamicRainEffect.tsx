import React, { useEffect, useRef } from 'react';
import { RiskLevel } from '../types';

interface Props {
  riskLevel?: RiskLevel;
  locationName?: string;
  active?: boolean;
}

export const DynamicRainEffect: React.FC<Props> = ({
  riskLevel = 'Safe',
  locationName = 'Selected Region',
  active = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isRainActive = active && (riskLevel === 'High' || riskLevel === 'Critical');
  const intensity = riskLevel === 'Critical' ? 'heavy' : 'moderate';

  useEffect(() => {
    if (!isRainActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const dropCount = intensity === 'heavy' ? 250 : 120;
    const drops = Array.from({ length: dropCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 12 + 10,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rain color
      ctx.strokeStyle = intensity === 'heavy' ? 'rgba(56, 189, 248, 0.6)' : 'rgba(125, 211, 252, 0.4)';
      ctx.lineWidth = intensity === 'heavy' ? 2 : 1;
      ctx.lineCap = 'round';

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.speed * 0.2, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= drop.speed * 0.2;

        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRainActive, intensity]);

  if (!isRainActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Weather Toast Banner */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2 rounded-full border border-sky-500/40 shadow-2xl flex items-center space-x-3 text-xs sm:text-sm font-semibold animate-bounce pointer-events-auto">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span>
          🌧️ {intensity === 'heavy' ? 'Extreme' : 'Heavy'} Rain Effect Active — Location: <b>{locationName}</b> ({riskLevel} Risk)
        </span>
      </div>
    </div>
  );
};
