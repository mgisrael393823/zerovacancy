'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type WavesProps = {
  className?: string;
  lineColor?: string;
  backgroundColor?: string;
  xGap?: number;
  yGap?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  waveSpeedX?: number;
  waveSpeedY?: number;
  static?: boolean;
};

export function Waves({
  className,
  lineColor = 'rgba(0, 0, 0, 0.1)',
  backgroundColor = '#ffffff',
  xGap = 20,
  yGap = 30,
  waveAmpX = 20,
  waveAmpY = 15,
  waveSpeedX = 0.012,
  waveSpeedY = 0.01,
  static: isStatic = false
}: WavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, {
      threshold: 0.1
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isVisible) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawWave = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Draw horizontal waves
      for (let y = yGap; y < canvas.height; y += yGap) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 1) {
          const angle = x * waveSpeedX + time;
          const yOffset = isStatic ? 0 : Math.sin(angle) * waveAmpY;
          if (x === 0) {
            ctx.moveTo(x, y + yOffset);
          } else {
            ctx.lineTo(x, y + yOffset);
          }
        }
        ctx.stroke();
      }

      // Draw vertical waves
      for (let x = xGap; x < canvas.width; x += xGap) {
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 1) {
          const angle = y * waveSpeedY + time;
          const xOffset = isStatic ? 0 : Math.sin(angle) * waveAmpX;
          if (y === 0) {
            ctx.moveTo(x + xOffset, y);
          } else {
            ctx.lineTo(x + xOffset, y);
          }
        }
        ctx.stroke();
      }

      if (!isStatic) {
        time += 0.01;
        if (isVisible) {
          animationFrameId = requestAnimationFrame(drawWave);
        }
      }
    };

    drawWave();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lineColor, backgroundColor, xGap, yGap, waveAmpX, waveAmpY, waveSpeedX, waveSpeedY, isVisible, isStatic]);

  return <section ref={containerRef} className={cn('absolute inset-0 overflow-hidden', className)}>
    {isVisible && <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full bg-transparent" />}
  </section>;
}