import React, { useEffect, useRef } from 'react';
import { RiskLevel } from '../types';
import { CloudRain, CloudLightning, Sun, AlertTriangle } from 'lucide-react';

interface Props {
  riskLevel: RiskLevel;
  locationName: string;
  rainfallMm: number;
}

export const WeatherRainEffect: React.FC<Props> = ({ riskLevel, locationName, rainfallMm }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isRainActive = riskLevel === 'Critical' || riskLevel === 'High' || riskLevel === 'Moderate';
  const isCritical = riskLevel === 'Critical';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isRainActive) return;

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

    const dropCount = riskLevel === 'Critical' ? 180 : riskLevel === 'High' ? 110 : 45;
    const drops: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 10,
        speed: (Math.random() * 8 + 12) * (riskLevel === 'Critical' ? 1.5 : 1),
        opacity: Math.random() * 0.4 + 0.2
      });
    }

    let lightningTimer = 0;
    let isLightning = false;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle lightning flash for critical risk
      if (isCritical) {
        lightningTimer++;
        if (lightningTimer % 240 === 0 && Math.random() > 0.4) {
          isLightning = true;
          setTimeout(() => { isLightning = false; }, 80);
        }

        if (isLightning) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.fillRect(0, 0, width, height);
        }
      }

      ctx.strokeStyle = riskLevel === 'Critical' ? 'rgba(147, 197, 253, 0.65)' : 'rgba(186, 230, 253, 0.45)';
      ctx.lineWidth = riskLevel === 'Critical' ? 1.6 : 1.1;
      ctx.beginPath();

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.length);

        d.y += d.speed;
        d.x -= 0.8; // Wind slant

        if (d.y > height) {
          d.y = -20;
          d.x = Math.random() * width;
        }
      }

      ctx.stroke();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [riskLevel, isRainActive, isCritical]);

  return (
    <>
      {/* Background Rain Canvas (pointer-events-none) */}
      {isRainActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-700"
          style={{ opacity: isRainActive ? 1 : 0 }}
        />
      )}

      {/* Floating Weather Indicator Badge */}
      <div className="fixed bottom-20 left-4 z-40 max-w-xs transition-all animate-slideUp pointer-events-auto">
        <div className={`p-3 rounded-2xl shadow-xl backdrop-blur-md border flex items-center space-x-3 text-xs ${
          riskLevel === 'Critical'
            ? 'bg-red-950/90 text-red-100 border-red-500/80 shadow-red-900/30'
            : riskLevel === 'High'
            ? 'bg-amber-950/90 text-amber-100 border-amber-500/80 shadow-amber-900/30'
            : riskLevel === 'Moderate'
            ? 'bg-yellow-950/90 text-yellow-100 border-yellow-500/80 shadow-yellow-900/30'
            : 'bg-emerald-950/90 text-emerald-100 border-emerald-500/80 shadow-emerald-900/30'
        }`}>
          <div className="p-2 rounded-xl bg-white/10 shrink-0">
            {riskLevel === 'Critical' ? (
              <CloudLightning className="w-5 h-5 text-red-400 animate-pulse" />
            ) : riskLevel === 'High' || riskLevel === 'Moderate' ? (
              <CloudRain className="w-5 h-5 text-cyan-300 animate-bounce" />
            ) : (
              <Sun className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div>
            <div className="font-bold flex items-center space-x-1.5">
              <span className="truncate max-w-[140px]">{locationName}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full uppercase font-black bg-white/20">
                {riskLevel}
              </span>
            </div>
            <p className="text-[11px] opacity-90 mt-0.5">
              {riskLevel === 'Critical'
                ? `⛈️ Torrential Rain (${rainfallMm} mm) • Surge Risk`
                : riskLevel === 'High'
                ? `🌧️ Heavy Rainfall (${rainfallMm} mm) • Flood Warning`
                : riskLevel === 'Moderate'
                ? `🌦️ Light Drizzle (${rainfallMm} mm) • Watch Tier`
                : `☀️ Safe / No Significant Rain Detected`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
