"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect, ChangeEvent } from "react";
import { getAccounts, saveSettings } from "@/app/api";
import { Account } from "@/app/Interface/account";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTradeSettings, defaultSettings } from "@/hooks/useTradeSettingContext";
import { FilterToggleProps, SimpleToggleProps, RangeInputsProps, OrderSizeSectionProps, LimitationSectionProps, SportsToggleProps } from "@/app/Interface/settings";
import { toast } from "react-toastify";
import { getSettings } from "@/app/api";

const sportsList = ["MLB", "NBA", "NHL", "NFL", "Soccer", "Tennis", "UFC", "Boxing"];

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
        if(loadedAccounts.length > 0){
          setAccounts(loadedAccounts);
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

  useEffect(() => {
    if (accounts.length > 0) {
      onChangeHandler(accounts[0].id);
    }
  }, [accounts])

  const onChangeHandler = async (userId: string) => {
    setSelectedUser(userId);
    const selectedAccount = accounts.find(account => account.id === userId);
    if (selectedAccount) {
      const usersettings = await getSettings(selectedAccount.proxyWallet);
      
      if (usersettings) {
        setSettings({
          ...usersettings,  
          proxyAddress: selectedAccount.proxyWallet  
        });
      } else {
        setSettings({
          ...defaultSettings,  
          proxyAddress: selectedAccount.proxyWallet
        });
      }
    }
  }

  const handleSportToggle = (side: 'buy' | 'sell', sport: string) => {
    const currentSports = settings[side].Filter.bySports.sportsList;
    const newSports = currentSports.includes(sport)
      ? currentSports.filter(s => s !== sport)
      : [...currentSports, sport];
    
    setSettings(prev => ({
      ...prev,
      [side]: {
        ...prev[side],
        Filter: {
          ...prev[side].Filter,
          bySports: {
            ...prev[side].Filter.bySports,
            sportsList: newSports
          }
        }
      }
    }));
  };

  const handleSaveSettings = async () => {
    try {      
      console.log("settings:", settings);
      await saveSettings(settings);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error(`Failed to save settings`);
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-700 rounded-xl shadow-lg">
      <CardHeader className="flex flex-row justify-between items-center pb-4">
        <div>
          <CardTitle className="text-white text-2xl font-bold">Filter Settings</CardTitle>
          <p className="text-gray-400 text-sm">Configure your trading preferences</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-64">
            <Select 
              value={selectedUser}
              onValueChange={onChangeHandler}
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
          <Button 
            variant="outline" 
            className="bg-blue-600 hover:bg-blue-700 text-white border-none"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
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
                label="By OrderSize($)"
                checked={settings.buy.Filter.byOrderSize.isActive}
                onChange={() => toggleSetting('buy', 'byOrderSize')}
              >
                {settings.buy.Filter.byOrderSize.isActive && (
                  <RangeInputs
                    minValue={settings.buy.Filter.byOrderSize.size.min}
                    maxValue={settings.buy.Filter.byOrderSize.size.max}
                    onMinChange={(e) => updateRangeValues('buy', 'byOrderSize', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('buy', 'byOrderSize', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              <FilterToggle 
                label="By Price($)"
                checked={settings.buy.Filter.byPrice.isActive}
                onChange={() => toggleSetting('buy', 'byPrice')}
              >
                {settings.buy.Filter.byPrice.isActive && (
                  <RangeInputs
                    minValue={settings.buy.Filter.byPrice.size.min}
                    maxValue={settings.buy.Filter.byPrice.size.max}
                    onMinChange={(e) => updateRangeValues('buy', 'byPrice', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('buy', 'byPrice', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              <SportsToggle 
                label="By Sports"
                checked={settings.buy.Filter.bySports.isActive}
                onChange={() => toggleSetting('buy', 'bySports')}
                sports={sportsList}
                selectedSports={settings.buy.Filter.bySports.sportsList}
                onSportToggle={(sport) => handleSportToggle('buy', sport)}
              />

              <FilterToggle 
                label="By Days till the Event"
                checked={settings.buy.Filter.byDaysTillEvent.isActive}
                onChange={() => toggleSetting('buy', 'byDaysTillEvent')}
              >
                {settings.buy.Filter.byDaysTillEvent.isActive && (
                  <RangeInputs
                    minValue={settings.buy.Filter.byDaysTillEvent.size.min}
                    maxValue={settings.buy.Filter.byDaysTillEvent.size.max}
                    onMinChange={(e) => updateRangeValues('buy', 'byDaysTillEvent', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('buy', 'byDaysTillEvent', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              <FilterToggle 
                label="By Min/Max Trigger Amount($)"
                checked={settings.buy.Filter.byMinMaxAmount.isActive}
                onChange={() => toggleSetting('buy', 'byMinMaxAmount')}
              >
                {settings.buy.Filter.byMinMaxAmount.isActive && (
                  <RangeInputs
                    minValue={settings.buy.Filter.byMinMaxAmount.size.min}
                    maxValue={settings.buy.Filter.byMinMaxAmount.size.max}
                    onMinChange={(e) => updateRangeValues('buy', 'byMinMaxAmount', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('buy', 'byMinMaxAmount', e.target.value, false)}
                  />
                )}
              </FilterToggle>
            </div>
          </div>

          {/* Sell Filter Section */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Sell
              </Badge>
              <h3 className="text-white text-lg font-semibold">Sell Filter Settings</h3>
            </div>
            
            <div className="space-y-5">
              <FilterToggle 
                label="By OrderSize($)"
                checked={settings.sell.Filter.byOrderSize.isActive}
                onChange={() => toggleSetting('sell', 'byOrderSize')}
              >
                {settings.sell.Filter.byOrderSize.isActive && (
                  <RangeInputs
                    minValue={settings.sell.Filter.byOrderSize.size.min}
                    maxValue={settings.sell.Filter.byOrderSize.size.max}
                    onMinChange={(e) => updateRangeValues('sell', 'byOrderSize', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('sell', 'byOrderSize', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              <FilterToggle 
                label="By Price($)"
                checked={settings.sell.Filter.byPrice.isActive}
                onChange={() => toggleSetting('sell', 'byPrice')}
              >
                {settings.sell.Filter.byPrice.isActive && (
                  <RangeInputs
                    minValue={settings.sell.Filter.byPrice.size.min}
                    maxValue={settings.sell.Filter.byPrice.size.max}
                    onMinChange={(e) => updateRangeValues('sell', 'byPrice', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('sell', 'byPrice', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              <SportsToggle 
                label="By Sports"
                checked={settings.sell.Filter.bySports.isActive}
                onChange={() => toggleSetting('sell', 'bySports')}
                sports={sportsList}
                selectedSports={settings.sell.Filter.bySports.sportsList}
                onSportToggle={(sport) => handleSportToggle('sell', sport)}
              />

              <FilterToggle 
                label="By Days till the Event"
                checked={settings.sell.Filter.byDaysTillEvent.isActive}
                onChange={() => toggleSetting('sell', 'byDaysTillEvent')}
              >
                {settings.sell.Filter.byDaysTillEvent.isActive && (
                  <RangeInputs
                    minValue={settings.sell.Filter.byDaysTillEvent.size.min}
                    maxValue={settings.sell.Filter.byDaysTillEvent.size.max}
                    onMinChange={(e) => updateRangeValues('sell', 'byDaysTillEvent', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('sell', 'byDaysTillEvent', e.target.value, false)}
                  />
                )}
              </FilterToggle>

              <FilterToggle 
                label="By Min/Max Trigger Amount($)"
                checked={settings.sell.Filter.byMinMaxAmount.isActive}
                onChange={() => toggleSetting('sell', 'byMinMaxAmount')}
              >
                {settings.sell.Filter.byMinMaxAmount.isActive && (
                  <RangeInputs
                    minValue={settings.sell.Filter.byMinMaxAmount.size.min}
                    maxValue={settings.sell.Filter.byMinMaxAmount.size.max}
                    onMinChange={(e) => updateRangeValues('sell', 'byMinMaxAmount', e.target.value, true)}
                    onMaxChange={(e) => updateRangeValues('sell', 'byMinMaxAmount', e.target.value, false)}
                  />
                )}
              </FilterToggle>
            </div>
          </div>
        </div>

        {/* Order Size Settings */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <h3 className="text-white text-lg font-semibold mb-6">Order Size Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <OrderSizeSection 
              type="buy"
              size={settings.buy.OrderSize.size}
              sizeType={settings.buy.OrderSize.type}
              onSizeChange={(e) => OrderSettings('buy', 'OrderSize', {size: e.target.value})}
              onTypeChange={(type) => OrderSettings('buy', 'OrderSize', {type})}
            />
            
            <OrderSizeSection 
              type="sell"
              size={settings.sell.OrderSize.size}
              sizeType={settings.sell.OrderSize.type}
              onSizeChange={(e) => OrderSettings('sell', 'OrderSize', {size: e.target.value})}
              onTypeChange={(type) => OrderSettings('sell', 'OrderSize', {type})}
            />
          </div>
        </div>

        {/* Limitation Settings */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <h3 className="text-white text-lg font-semibold mb-6">Limitation Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LimitationSection 
              type="buy"
              size={settings.buy.Limitation.size}
              limitType={settings.buy.Limitation.type}
              onSizeChange={(e) => OrderSettings('buy', 'Limitation', {size: e.target.value})}
              onTypeChange={(type) => OrderSettings('buy', 'Limitation', {type})}
            />
            
            <LimitationSection 
              type="sell"
              size={settings.sell.Limitation.size}
              limitType={settings.sell.Limitation.type}
              onSizeChange={(e) => OrderSettings('sell', 'Limitation', {size: e.target.value})}
              onTypeChange={(type) => OrderSettings('sell', 'Limitation', {type})}
            />
          </div>
          
          <div className="mt-6 flex items-center gap-4">
            <Switch
              checked={settings.maxAmount.isActive}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                maxAmount: {
                  ...prev.maxAmount,
                  isActive: checked
                }
              }))}
              className="
                data-[state=unchecked]:bg-gray-500 
                data-[state=checked]:bg-yellow-200
                transition-colors duration-200
              "
            />
            <div className="flex items-center gap-3">
              <Label className="text-white">Max Amount per Market:</Label>
              <Input 
                className="w-40 bg-gray-700 border-gray-600 text-white"
                value={settings.maxAmount.amount}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  maxAmount: {
                    ...prev.maxAmount,
                    amount: e.target.value
                  }
                }))}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const FilterToggle = ({ label, checked, onChange, children }: FilterToggleProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3">
    <Switch 
      checked={checked} 
      onCheckedChange={onChange}
      className="
        data-[state=unchecked]:bg-gray-500 
        data-[state=checked]:bg-yellow-200
        transition-colors duration-200
      "
    />
      <Label className="text-gray-300">{label}</Label>
    </div>
    {children}
  </div>
);

// const SimpleToggle = ({ label, checked, onChange }: SimpleToggleProps) => (
//   <div className="flex items-center gap-3">
//     <Switch 
//       checked={checked} 
//       onCheckedChange={onChange}
//       className="data-[state=checked]:bg-blue-500"
//     />
//     <Label className="text-gray-300">{label}</Label>
//   </div>
// );

const SportsToggle = ({ 
  label, 
  checked, 
  onChange, 
  sports, 
  selectedSports, 
  onSportToggle 
}: SportsToggleProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3">
    <Switch 
      checked={checked} 
      onCheckedChange={onChange}
      className="
        data-[state=unchecked]:bg-gray-500 
        data-[state=checked]:bg-yellow-200
        transition-colors duration-200
      "
    />
      <Label className="text-gray-300">{label}</Label>
    </div>
    
    {checked && (
      <div className="grid grid-cols-2 gap-2 pl-10">
        {sports.map((sport) => (
          <div key={sport} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`sport-${sport}`}
              checked={selectedSports.includes(sport)}
              onChange={() => onSportToggle(sport)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor={`sport-${sport}`} className="text-gray-300">
              {sport}
            </Label>
          </div>
        ))}
      </div>
    )}
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
      <Label className="text-white">OrderSize:</Label>
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
          Copying Trade with fixed amount($)
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
      <Label className="text-white">Limit($):</Label>
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
          Not higher than specific price($)
          {/* {type === 'buy' ? 'Not higher than specific price' : 'Not lower than specific price'} */}
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem 
          value="original" 
          id={`${type}-original`}
          className="text-blue-500 border-gray-500"
        />
        <Label htmlFor={`${type}-original`} className="text-gray-300">
          {/* {type === 'buy' 
            ? 'Allow 2-3% higher than original' 
            : 'Allow 2-3% lower than original'} */}
            Allow 2-3% higher than original($)
        </Label>
      </div>
    </RadioGroup>
  </div>
);