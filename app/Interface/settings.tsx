import { ChangeEvent } from "react";

export interface FilterToggleProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    children?: React.ReactNode;
}
  
export interface SimpleToggleProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export interface RangeInputsProps {
    minValue: string;
    maxValue: string;
    onMinChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onMaxChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface OrderSizeSectionProps {
    type: 'buy' | 'sell';
    size: string;
    sizeType: string;
    onSizeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onTypeChange: (type: string) => void;
}

export interface LimitationSectionProps {
    type: 'buy' | 'sell';
    size: string;
    limitType: string;
    onSizeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onTypeChange: (type: string) => void;
}