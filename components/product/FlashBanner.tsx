// components/product/FlashSaleBanner.tsx
'use client';
import { useFlashSale } from '@/hooks/useFlashSale';
import { Zap } from 'lucide-react';

interface Props {
  endsAt: string | Date;
  productName?: string;
}

export function FlashSaleBanner({ endsAt, productName }: Props) {
  const { timeLeft, isActive, isLastHour, discountRate } = useFlashSale(endsAt);

  if (!isActive) return null;

  return (
    <div className={`rounded-2xl p-4 ${isLastHour ? 'bg-red-500' : 'bg-orange-400'} text-white`}>
      <div className="flex items-center justify-between flex-wrap gap-3">

        {/* Left — Label */}
        <div className="flex items-center gap-2">
          <Zap size={20} className="fill-white" />
          <div>
            <p className="font-bold text-sm uppercase tracking-wide">
              Flash Sale
            </p>
            {isLastHour && discountRate > 0 && (
              <p className="text-xs opacity-90">
                🔥 Extra {Math.round(discountRate * 100)}% off — Last hour!
              </p>
            )}
          </div>
        </div>

        {/* Right — Countdown */}
        <div className="flex items-center gap-2">
          <p className="text-xs opacity-80 mr-1">Ends in:</p>
          <div className="flex items-center gap-1">
            {timeLeft.split(':').map((unit, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[44px] text-center">
                  <p className="text-xl font-bold leading-none">{unit}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {i === 0 ? 'HRS' : i === 1 ? 'MIN' : 'SEC'}
                  </p>
                </div>
                {i < 2 && (
                  <span className="text-xl font-bold opacity-75">:</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}