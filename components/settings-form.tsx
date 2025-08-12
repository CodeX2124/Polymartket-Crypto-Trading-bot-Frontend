"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect, ChangeEvent } from "react";
import { getAccounts } from "@/app/api";
import { Account } from "@/app/Interface/account";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTradeSettings } from "@/hooks/useTradeSettingContext";
import  {FilterToggleProps, SimpleToggleProps, RangeInputsProps, OrderSizeSectionProps, LimitationSectionProps } from "@/app/Interface/settings";

export function FilterForm() {
  const { settings, toggleSetting, updateRangeValues, OrderSettings, setSettings } = useTradeSettings();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const loadedAccounts = await getAccounts();
        setAccounts(loadedAccounts);
        if (loadedAccounts.length > 0) {
          setSelectedUser(loadedAccounts[0].id);
        }
      } catch (error) {
        console.error("Failed to load accounts:", error);
        setError("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <Card className="bg-gray-900 border-gray-700 rounded-xl shadow-lg">
      <CardHeader className="flex flex-row justify-between items-center pb-4">
        <div>
          <CardTitle className="text-white text-2xl font-bold">Filter Settings</CardTitle>
          <p className="text-gray-400 text-sm">Configure your trading preferences</p>
        </div>
        <div className="w-64">
          <Select 
            value={selectedUser}
            onValueChange={setSelectedUser}
            disabled={isLoading || accounts.length === 0}
          >
            {isLoading ? (
              <SelectTrigger className="bg-gray-800 text-gray-400 border-gray-700">
                <SelectValue placeholder="Loading users..." />
              </SelectTrigger>
            ) : error ? (
              <SelectTrigger className="bg-gray-800 text-red-400 border-gray-700">
                <SelectValue placeholder={error} />
              </SelectTrigger>
            ) : accounts.length === 0 ? (
              <SelectTrigger className="bg-gray-800 text-gray-400 border-gray-700">
                <SelectValue placeholder="No users available" />
              </SelectTrigger>
            ) : (
              <>
                <SelectTrigger className="bg-gray-800 text-white border-gray-700 hover:bg-gray-750 focus:ring-0 focus:ring-offset-0 focus:outline-none">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {accounts.map((account) => (
                    <SelectItem 
                      key={account.id} 
                      value={account.id}
                      className="hover:bg-gray-700 focus:bg-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span>User {account.proxyWallet.substring(0, 6)}...{account.proxyWallet.slice(-4)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </>
            )}
          </Select>
        </div>
      </CardHeader>

      <Separator className="bg-gray-700" />

      <CardContent className="space-y-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buy Filter Section */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Buy
              </Badge>
              <h3 className="text-white text-lg font-semibold">Buy Filter Settings</h3>
            </div>
            
            <div className="space-y-5">
              <FilterToggle 
                label="By Order Size"
                checked={settings.buy.byOrder}
                onChange={() => toggleSetting('buy', 'byOrder')}
              >
                {settings.buy.byOrder && (
                  <RangeInputs
                    minValue={settings.buy.orderSize.min || ""}
                    maxValue={settings.buy.orderSize.max || ""}
                    onMinChange={(e) => updateRangeValues('buy', 'orderSize', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('buy', 'orderSize', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              <FilterToggle 
                label="By Price"
                checked={settings.buy.byPrice}
                onChange={() => toggleSetting('buy', 'byPrice')}
              >
                {settings.buy.byPrice && (
                  <RangeInputs
                    minValue={settings.buy.price.min || ""}
                    maxValue={settings.buy.price.max || ""}
                    onMinChange={(e) => updateRangeValues('buy', 'price', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('buy', 'price', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              <SimpleToggle 
                label="By Sport"
                checked={settings.buy.byCategory}
                onChange={() => toggleSetting('buy', 'byCategory')}
              />

              <SimpleToggle 
                label="By Days till the Event"
                checked={settings.buy.byTillDayEvent}
                onChange={() => toggleSetting('buy', 'byTillDayEvent')}
              />

              <FilterToggle 
                label="By Min/Max Trigger Amount"
                checked={settings.buy.byAmount}
                onChange={() => toggleSetting('buy', 'byAmount')}
              >
                {settings.buy.byAmount && (
                  <RangeInputs
                    minValue={settings.buy.amount.min || ""}
                    maxValue={settings.buy.amount.max || ""}
                    onMinChange={(e) => updateRangeValues('buy', 'amount', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('buy', 'amount', e.target.value, false)}
                  />
                )}
              </FilterToggle>
            </div>
          </div>

          {/* Sell Filter Section */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                Sell
              </Badge>
              <h3 className="text-white text-lg font-semibold">Sell Filter Settings</h3>
            </div>
            
            <div className="space-y-5">
              
              <FilterToggle 
                label="By Order Size"
                checked={settings.sell.byOrder}
                onChange={() => toggleSetting('sell', 'byOrder')}
              >
                {settings.sell.byOrder && (
                  <RangeInputs
                    minValue={settings.sell.orderSize.min || ""}
                    maxValue={settings.sell.orderSize.max || ""}
                    onMinChange={(e) => updateRangeValues('sell', 'orderSize', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('sell', 'orderSize', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              <FilterToggle 
                label="By Price"
                checked={settings.sell.byPrice}
                onChange={() => toggleSetting('sell', 'byPrice')}
              >
                {settings.sell.byPrice && (
                  <RangeInputs
                    minValue={settings.sell.price.min || ""}
                    maxValue={settings.sell.price.max || ""}
                    onMinChange={(e) => updateRangeValues('sell', 'price', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('sell', 'price', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              <SimpleToggle 
                label="By Sport"
                checked={settings.sell.byCategory}
                onChange={() => toggleSetting('sell', 'byCategory')}
              />

              <SimpleToggle 
                label="By Days till the Event"
                checked={settings.sell.byTillDayEvent}
                onChange={() => toggleSetting('sell', 'byTillDayEvent')}
              />

              <FilterToggle 
                label="By Min/Max Trigger Amount"
                checked={settings.sell.byAmount}
                onChange={() => toggleSetting('sell', 'byAmount')}
              >
                {settings.sell.byAmount && (
                  <RangeInputs
                    minValue={settings.sell.amount.min || ""}
                    maxValue={settings.sell.amount.max || ""}
                    onMinChange={(e) => updateRangeValues('sell', 'amount', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('sell', 'amount', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              {/* ... other sell filter toggles ... */}
            </div>
          </div>
        </div>

        {/* Order Size Settings */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <h3 className="text-white text-lg font-semibold mb-6">Order Size Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <OrderSizeSection 
              type="buy"
              size={settings.buy.copyOrderSize.size || ""}
              sizeType={settings.buy.copyOrderSize.type || ""}
              onSizeChange={(e) => OrderSettings('buy', 'copyOrderSize', {size: e.target.value})}
              onTypeChange={(type) => OrderSettings('buy', 'copyOrderSize', {type})}
            />
            
            <OrderSizeSection 
              type="sell"
              size={settings.sell.copyOrderSize.size || ""}
              sizeType={settings.sell.copyOrderSize.type || ""}
              onSizeChange={(e) => OrderSettings('sell', 'copyOrderSize', {size: e.target.value})}
              onTypeChange={(type) => OrderSettings('sell', 'copyOrderSize', {type})}
            />
          </div>
        </div>

        {/* Limitation Settings */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <h3 className="text-white text-lg font-semibold mb-6">Limitation Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LimitationSection 
              type="buy"
              size={settings.buy.limitOrderSize.size || ""}
              limitType={settings.buy.limitOrderSize.type || ""}
              onSizeChange={(e) => OrderSettings('buy', 'limitOrderSize', {size: e.target.value})}
              onTypeChange={(type) => OrderSettings('buy', 'limitOrderSize', {type})}
            />
            
            <LimitationSection 
              type="sell"
              size={settings.sell.limitOrderSize.size || ""}
              limitType={settings.sell.limitOrderSize.type || ""}
              onSizeChange={(e) => OrderSettings('sell', 'limitOrderSize', {size: e.target.value})}
              onTypeChange={(type) => OrderSettings('sell', 'limitOrderSize', {type})}
            />
          </div>
          
          <div className="mt-6 flex items-center gap-4">
            <Switch
              checked={settings.byMaxAmount}
              onCheckedChange={(checked) => setSettings(prev => ({...prev, byMaxAmount: checked}))}
              className="data-[state=checked]:bg-blue-500"
            />
            <div className="flex items-center gap-3">
              <Label className="text-white">Max Amount per Market:</Label>
              <Input 
                className="w-40 bg-gray-700 border-gray-600 text-white"
                value={settings.maxAmount}
                onChange={(e) => setSettings(prev => ({...prev, maxAmount: e.target.value}))}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



// Update the component implementations with proper typing
const FilterToggle = ({ label, checked, onChange, children }: FilterToggleProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3">
      <Switch 
        checked={checked} 
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-blue-500"
      />
      <Label className="text-gray-300">{label}</Label>
    </div>
    {children}
  </div>
);

const SimpleToggle = ({ label, checked, onChange }: SimpleToggleProps) => (
  <div className="flex items-center gap-3">
    <Switch 
      checked={checked} 
      onCheckedChange={onChange}
      className="data-[state=checked]:bg-blue-500"
    />
    <Label className="text-gray-300">{label}</Label>
  </div>
);

const RangeInputs = ({ minValue, maxValue, onMinChange, onMaxChange }: RangeInputsProps) => (
  <div className="flex items-center gap-3 pl-10">
    <div className="flex items-center gap-2">
      <Label className="text-gray-400">Min:</Label>
      <Input 
        className="w-24 bg-gray-700 border-gray-600 text-white"
        value={minValue}
        onChange={onMinChange}
      />
    </div>
    <div className="flex items-center gap-2">
      <Label className="text-gray-400">Max:</Label>
      <Input 
        className="w-24 bg-gray-700 border-gray-600 text-white"
        value={maxValue}
        onChange={onMaxChange}
      />
    </div>
  </div>
);

const OrderSizeSection = ({ type, size, sizeType, onSizeChange, onTypeChange }: OrderSizeSectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Badge variant="secondary" className={type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
        {type === 'buy' ? 'Buy' : 'Sell'}
      </Badge>
      <Label className="text-white">Order Size:</Label>
      <Input 
        className="w-32 bg-gray-700 border-gray-600 text-white"
        value={size}
        onChange={onSizeChange}
      />
    </div>
    
    <RadioGroup 
      value={sizeType}
      onValueChange={onTypeChange}
      className="space-y-3 pl-4"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem 
          value="percentage" 
          id={`${type}-percentage`}
          className="text-blue-500 border-gray-500"
        />
        <Label htmlFor={`${type}-percentage`} className="text-gray-300">
          Copying Trade by Percentage(%)
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem 
          value="amount" 
          id={`${type}-fixed`}
          className="text-blue-500 border-gray-500"
        />
        <Label htmlFor={`${type}-fixed`} className="text-gray-300">
          Copying Trade with fixed amount({type === 'buy' ? '$' : 'shares'})
        </Label>
      </div>
    </RadioGroup>
  </div>
);

const LimitationSection = ({ type, size, limitType, onSizeChange, onTypeChange }: LimitationSectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Badge variant="secondary" className={type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
        {type === 'buy' ? 'Buy' : 'Sell'}
      </Badge>
      <Label className="text-white">Limit:</Label>
      <Input 
        className="w-32 bg-gray-700 border-gray-600 text-white"
        value={size}
        onChange={onSizeChange}
      />
    </div>
    
    <RadioGroup 
      value={limitType}
      onValueChange={onTypeChange}
      className="space-y-3 pl-4"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem 
          value="specific" 
          id={`${type}-specific`}
          className="text-blue-500 border-gray-500"
        />
        <Label htmlFor={`${type}-specific`} className="text-gray-300">
          {type === 'buy' ? 'Not higher than specific price' : 'Not lower than specific price'}
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem 
          value="original" 
          id={`${type}-original`}
          className="text-blue-500 border-gray-500"
        />
        <Label htmlFor={`${type}-original`} className="text-gray-300">
          {type === 'buy' 
            ? 'Allow 2-3% higher than original' 
            : 'Allow 2-3% lower than original'}
        </Label>
      </div>
    </RadioGroup>
  </div>
);