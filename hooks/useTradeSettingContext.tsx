"use client";

import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

// Define types
type TradeSettingFields = 'byOrderSize' | 'byPrice' | 'bySports' | 'byDaysTillEvent' | 'byMinMaxAmount';

interface RangeValues {
  min: string;
  max: string;
}

interface OrderLimitationSettings {
  size: string;
  type: string;
}

interface FilterSettings {
  byOrderSize: {
    isActive: boolean;
    size: RangeValues;
  };
  byPrice: {
    isActive: boolean;
    size: RangeValues;
  };
  bySports: boolean;
  byDaysTillEvent: boolean;
  byMinMaxAmount: {
    isActive: boolean;
    size: RangeValues;
  };
}

interface TradeSettings {
  Filter: FilterSettings;
  OrderSize: OrderLimitationSettings;
  Limitation: OrderLimitationSettings;
}

interface TradeSettingsState {
  proxyAddress: string;
  buy: TradeSettings;
  sell: TradeSettings;
  maxAmount: {
    isActive: boolean;
    amount: string;
  };
}

interface TradeSettingsContextType {
  settings: TradeSettingsState;
  toggleSetting: (type: 'buy' | 'sell', field: TradeSettingFields) => void;
  updateRangeValues: (type: 'buy' | 'sell', field: 'byOrderSize' | 'byPrice' | 'byMinMaxAmount', value: string, isMin: boolean) => void;
  OrderSettings: (type: 'buy' | 'sell', field: 'OrderSize' | 'Limitation', value: Partial<OrderLimitationSettings>) => void;
  setSettings: Dispatch<SetStateAction<TradeSettingsState>>;
}

interface TradeSettingsProviderProps {
  children: ReactNode;
}

// Create context with default values
const TradeSettingsContext = createContext<TradeSettingsContextType | undefined>(undefined);

// Default settings
const defaultTradeSettings: TradeSettings = {
  Filter: {
    byOrderSize: {
      isActive: false,
      size: { min: '', max: '' }
    },
    byPrice: {
      isActive: false,
      size: { min: '', max: '' }
    },
    bySports: false,
    byDaysTillEvent: false,
    byMinMaxAmount: {
      isActive: false,
      size: { min: '', max: '' }
    }
  },
  OrderSize: {
    size: '',
    type: 'percentage'
  },
  Limitation: {
    size: '',
    type: 'specific'
  }
};

export const defaultSettings: TradeSettingsState = {
  proxyAddress: '',
  buy: { ...defaultTradeSettings },
  sell: { ...defaultTradeSettings },
  maxAmount: {
    isActive: false,
    amount: ''
  }
};

// Provider component
export const TradeSettingsProvider = ({ children }: TradeSettingsProviderProps) => {
  const [settings, setSettings] = useState<TradeSettingsState>(defaultSettings);

  const OrderSettings = (
    type: 'buy' | 'sell',
    field: 'OrderSize' | 'Limitation',
    value: Partial<OrderLimitationSettings>
  ) => {
    setSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: {
          ...prev[type][field],
          ...value
        }
      }
    }));
  };

  const toggleSetting = (type: 'buy' | 'sell', field: TradeSettingFields) => {
      setSettings(prev => {
          const currentTypeSettings = prev[type];
          
          if (field === 'bySports' || field === 'byDaysTillEvent') {
              return {
                  ...prev,
                  [type]: {
                      ...currentTypeSettings,
                      Filter: {
                          ...currentTypeSettings.Filter,
                          [field]: !currentTypeSettings.Filter[field]
                      }
                  }
              };
          } else {
              return {
                  ...prev,
                  [type]: {
                      ...currentTypeSettings,
                      Filter: {
                          ...currentTypeSettings.Filter,
                          [field]: {
                              ...currentTypeSettings.Filter[field],
                              isActive: !currentTypeSettings.Filter[field].isActive
                          }
                      }
                  }
              };
          }
      });
  };

  const updateRangeValues = (
    type: 'buy' | 'sell',
    field: 'byOrderSize' | 'byPrice' | 'byMinMaxAmount',
    value: string,
    isMin: boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        Filter: {
          ...prev[type].Filter,
          [field]: {
            ...prev[type].Filter[field],
            size: {
              ...prev[type].Filter[field].size,
              [isMin ? 'min' : 'max']: value
            }
          }
        }
      }
    }));
  };

  useEffect(() => {
    console.log({settings})
  }, [settings])

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