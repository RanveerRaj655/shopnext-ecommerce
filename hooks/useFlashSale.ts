// hooks/useFlashSale.ts
import { useState, useEffect } from 'react';

interface FlashSaleReturn {
  timeLeft:     string;
  isActive:     boolean;
  isLastHour:   boolean;
  discountRate: number;
  hours:        number;
  minutes:      number;
  seconds:      number;
}

export function useFlashSale(endsAt: string | Date | null): FlashSaleReturn {
  const [timeLeft,   setTimeLeft]   = useState('');
  const [isActive,   setIsActive]   = useState(false);
  const [isLastHour, setIsLastHour] = useState(false);
  const [hours,      setHours]      = useState(0);
  const [minutes,    setMinutes]    = useState(0);
  const [seconds,    setSeconds]    = useState(0);

  useEffect(() => {
    if (!endsAt) return;

    const tick = () => {
      const now  = Date.now();
      const end  = new Date(endsAt).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setIsActive(false);
        setIsLastHour(false);
        setTimeLeft('Expired');
        return;
      }

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      setHours(h);
      setMinutes(m);
      setSeconds(s);
      setIsActive(true);

      // Apply 10% discount in last hour
      setIsLastHour(diff <= 3600000);

      setTimeLeft(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  return {
    timeLeft,
    isActive,
    isLastHour,
    discountRate: isLastHour ? 0.10 : 0,
    hours,
    minutes,
    seconds,
  };
}