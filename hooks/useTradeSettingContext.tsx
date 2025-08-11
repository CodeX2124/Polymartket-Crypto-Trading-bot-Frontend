"use client";

import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

// Define types
type TradeSettingFields = 'byOrder' | 'byPrice' | 'byCategory' | 'byTillDayEvent' | 'byAmount';

interface RangeValues {
  min?: string;
  max?: string;
}

interface OrderFilterValues {
  size?: string;
  type?: string;
}

interface TradeSettings {
  byOrder: boolean;
  byPrice: boolean;
  byCategory: boolean;
  byTillDayEvent: boolean;
  byAmount: boolean;
  orderSize: RangeValues;
  price: RangeValues;
  amount: RangeValues;
  copyOrderSize: OrderFilterValues,
  limitOrderSize: OrderFilterValues,
}

interface TradeSettingsState {
  buy: TradeSettings;
  sell: TradeSettings;
  byMaxAmount: boolean;
  maxAmount: string
}

interface TradeSettingsContextType {
  settings: TradeSettingsState;
  toggleSetting: (type: 'buy' | 'sell', field: TradeSettingFields) => void;
  updateRangeValues: (type: 'buy' | 'sell', field: 'orderSize' | 'price' | 'amount', value: string, isMin: boolean) => void;
  OrderSettings: (type: 'buy' | 'sell', field: 'copyOrderSize' | 'limitOrderSize', value: {size?: string, type?: string}) => void;
  setSettings: Dispatch<SetStateAction<TradeSettingsState>>
}

interface TradeSettingsProviderProps {
  children: ReactNode;
}

// Create context with default values
const TradeSettingsContext = createContext<TradeSettingsContextType | undefined>(undefined);

// Default settings
const defaultSettings: TradeSettings = {
  byOrder: false,
  byPrice: false,
  byCategory: false,
  byTillDayEvent: false,
  byAmount: false,
  orderSize: { min: '', max: '' },
  price: { min: '', max: '' },
  amount: { min: '', max: '' },
  copyOrderSize: { size: '', type: ''},
  limitOrderSize: { size: '', type: ''},
};

// Provider component
export const TradeSettingsProvider = ({ children }: TradeSettingsProviderProps) => {
  const [settings, setSettings] = useState<TradeSettingsState>({
    buy: { ...defaultSettings },
    sell: { ...defaultSettings },    
    byMaxAmount: false,
    maxAmount: ''
  });

  const OrderSettings = (type: 'buy' | 'sell', field: 'copyOrderSize' | 'limitOrderSize', value: {size?: string, type?: string}) => {
    setSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: {
            ...prev[type][field],
            ...value
        }
      },
    }));
  };

  const toggleSetting = (type: 'buy' | 'sell', field: TradeSettingFields) => {
    setSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: !prev[type][field],
      },
    }));
  };

  const updateRangeValues = (type: 'buy' | 'sell', field: 'orderSize' | 'price' | 'amount', value: string, isMin: boolean) => {
    setSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: {
          ...prev[type][field],
          [isMin ? 'min' : 'max']: value,
        },
      },
    }));
  };

  


  return (
    <TradeSettingsContext.Provider 
      value={{ 
        settings,
        setSettings, 
        OrderSettings, 
        toggleSetting,
        updateRangeValues
      }}
    >
      {children}
    </TradeSettingsContext.Provider>
  );
};

// Custom hook for easier consumption
export const useTradeSettings = () => {
  const context = useContext(TradeSettingsContext);
  if (context === undefined) {
    throw new Error('useTradeSettings must be used within a TradeSettingsProvider');
  }
  return context;
};