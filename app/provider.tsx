'use client';

import { TradeSettingsProvider } from '@/hooks/useTradeSettingContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TradeSettingsProvider>
      {children}
    </TradeSettingsProvider>
  );
}