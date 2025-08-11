"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@radix-ui/react-checkbox"
import { useState } from "react"
import { useTradeSettings } from "@/hooks/useTradeSettingContext"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function FilterForm() {

  const { settings, toggleSetting, updateRangeValues, OrderSettings, setSettings } = useTradeSettings();

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Filter Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center items-center">
          <div className="w-1/2 pl-20">
            <div className="text-white text-[20px] mb-6 ml-[calc(20px+2.5rem)]">Buy Filter</div>
            <div className="space-y-2">
              <div className="flex flex-col space-x-2">
                <div className="flex flex-row space-x-2 items-center">
                  <Input type="checkbox" className="w-[20px]" 
                    checked={settings.buy.byOrder}
                    onChange={() => toggleSetting('buy', 'byOrder')}>  
                  </Input>
                  <Label>By Order Size</Label>
                </div>
                {settings.buy.byOrder && (
                  <div className="flex flex-row space-x-2 items-center">
                    <Label>Min : </Label>
                    <Input className="w-[100px]" 
                      value={settings.buy.orderSize.min}
                      onChange={(e) => updateRangeValues('buy', 'orderSize', e.target.value, true)}></Input>

                    <Label>Max : </Label>
                    <Input className="w-[100px]" 
                      value={settings.buy.orderSize.max}
                      onChange={(e) => updateRangeValues('buy', 'orderSize', e.target.value, false)}></Input>
                  </div>
                )}              
              </div>
              <div className="flex flex-col space-x-2">
                <div className="flex flex-row space-x-2 items-center">
                  <Input type="checkbox" className="w-[20px]"
                    checked={settings.buy.byPrice}
                    onChange={() => toggleSetting('buy', 'byPrice')}>                  
                  </Input>
                  <Label>By Price</Label>
                </div>
                {settings.buy.byPrice && (
                  <div className="flex flex-row space-x-2 items-center">
                    <Label>Min : </Label>
                    <Input 
                      className="w-[100px]" 
                      value={settings.buy.price.min}
                      onChange={(e) => updateRangeValues('buy', 'price', e.target.value, true)}
                    />
                    <Label>Max : </Label>
                    <Input 
                      className="w-[100px]" 
                      value={settings.buy.price.max}
                      onChange={(e) => updateRangeValues('buy', 'price', e.target.value, false)}
                    />
                  </div>
                )}             
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <Input type="checkbox" className="w-[20px]" 
                  checked={settings.buy.byCategory}
                  onChange={() => toggleSetting('buy', 'byCategory')}>
                </Input>
                <Label>By Sport</Label>
              </div>

              <div className="flex flex-row space-x-2 items-center">
                <Input type="checkbox" className="w-[20px]" 
                  checked={settings.buy.byTillDayEvent}
                  onChange={() => toggleSetting('buy', 'byTillDayEvent')}>
                </Input>
                <Label>By Days till the Event</Label>
              </div>

              <div className="flex flex-col space-x-2">
                <div className="flex items-center space-x-2">
                  <Input type="checkbox" className="w-[20px]"
                    checked={settings.buy.byAmount}
                    onChange={() => toggleSetting('buy', 'byAmount')}>
                  </Input>
                  <Label>By Min/Max Trigger Amount</Label>
                </div>
                {settings.buy.byAmount && (
                  <div className="flex items-center space-x-2">
                    <Label>Min:</Label>
                    <Input 
                      className="w-[100px]" 
                      value={settings.buy.amount.min}
                      onChange={(e) => updateRangeValues('buy', 'amount', e.target.value, true)}
                    />
                    <Label>Max:</Label>
                    <Input 
                      className="w-[100px]" 
                      value={settings.buy.amount.max}
                      onChange={(e) => updateRangeValues('buy', 'amount', e.target.value, false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-20">
            <div className="text-white text-[20px] mb-6 ml-[calc(20px+2.5rem)]">Sell Filter</div>
            <div className="space-y-2">
              <div className="flex flex-col space-x-2">
                <div className="flex flex-row space-x-2 items-center">
                  <Input type="checkbox" className="w-[20px]" 
                    checked={settings.sell.byOrder}
                    onChange={() => toggleSetting('sell', 'byOrder')}>  
                  </Input>
                  <Label>By Order Size</Label>
                </div>
                {settings.sell.byOrder && (
                  <div className="flex flex-row space-x-2 items-center">
                    <Label>Min : </Label>
                    <Input className="w-[100px]" 
                      value={settings.sell.orderSize.min}
                      onChange={(e) => updateRangeValues('sell', 'orderSize', e.target.value, true)}></Input>

                    <Label>Max : </Label>
                    <Input className="w-[100px]" 
                      value={settings.sell.orderSize.max}
                      onChange={(e) => updateRangeValues('sell', 'orderSize', e.target.value, false)}></Input>
                  </div>
                )}              
              </div>
              <div className="flex flex-col space-x-2">
                <div className="flex flex-row space-x-2 items-center">
                  <Input type="checkbox" className="w-[20px]"
                    checked={settings.sell.byPrice}
                    onChange={() => toggleSetting('sell', 'byPrice')}>                  
                  </Input>
                  <Label>By Price</Label>
                </div>
                {settings.sell.byPrice && (
                  <div className="flex flex-row space-x-2 items-center">
                    <Label>Min : </Label>
                    <Input 
                      className="w-[100px]" 
                      value={settings.sell.price.min}
                      onChange={(e) => updateRangeValues('sell', 'price', e.target.value, true)}
                    />
                    <Label>Max : </Label>
                    <Input 
                      className="w-[100px]" 
                      value={settings.sell.price.max}
                      onChange={(e) => updateRangeValues('sell', 'price', e.target.value, false)}
                    />
                  </div>
                )}             
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <Input type="checkbox" className="w-[20px]" 
                  checked={settings.sell.byCategory}
                  onChange={() => toggleSetting('sell', 'byCategory')}>
                </Input>
                <Label>By Sport</Label>
              </div>

              <div className="flex flex-row space-x-2 items-center">
                <Input type="checkbox" className="w-[20px]" 
                  checked={settings.sell.byTillDayEvent}
                  onChange={() => toggleSetting('sell', 'byTillDayEvent')}>
                </Input>
                <Label>By Days till the Event</Label>
              </div>

              <div className="flex flex-col space-x-2">
                <div className="flex items-center space-x-2">
                  <Input type="checkbox" className="w-[20px]"
                    checked={settings.sell.byAmount}
                    onChange={() => toggleSetting('sell', 'byAmount')}>
                  </Input>
                  <Label>By Min/Max Trigger Amount</Label>
                </div>
                {settings.sell.byAmount && (
                  <div className="flex items-center space-x-2">
                    <Label>Min:</Label>
                    <Input 
                      className="w-[100px]" 
                      value={settings.sell.amount.min}
                      onChange={(e) => updateRangeValues('sell', 'amount', e.target.value, true)}
                    />
                    <Label>Max:</Label>
                    <Input 
                      className="w-[100px]" 
                      value={settings.sell.amount.max}
                      onChange={(e) => updateRangeValues('sell', 'amount', e.target.value, false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <CardTitle className="text-white">My Order Size Settings</CardTitle> 
          <div className="flex justify-center items-center">
            <div className="w-1/2 space-y-4 pl-20">
              <div className="flex items-center space-x-2">
                <div className="text-white text-[20px]">Buy Order Size : </div>
                <Input className="w-[150px]"
                  value={settings.buy.copyOrderSize.size}
                  onChange={(e) => OrderSettings('buy', 'copyOrderSize', {size: e.target.value})}
                ></Input>
              </div>
                <RadioGroup 
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="buy-percentage"
                      checked={settings.buy.copyOrderSize.type == 'percentage'} 
                      onClick={() => OrderSettings('buy', 'copyOrderSize', {type: 'percentage'})} />
                    <Label htmlFor="buy-percentage">Copying Trade by Percentage(%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="buy-fixed"
                      checked={settings.buy.copyOrderSize.type == 'amount'}  
                      onClick={() => OrderSettings('buy', 'copyOrderSize', {type: 'amount'})}
                    />
                    <Label htmlFor="buy-fixed">Copying Trade with fixed amount($)</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="w-1/2 space-y-4 pl-20">
                <div className="flex items-center space-x-2">
                  <div className="text-white text-[20px]">Sell Order Size : </div>
                  <Input className="w-[150px]"
                    value={settings.sell.copyOrderSize.size}
                    onChange={(e) => OrderSettings('sell', 'copyOrderSize', {size: e.target.value})}
                  ></Input>
                </div>
                <RadioGroup 
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="sell-percentage"
                      checked={settings.sell.copyOrderSize.type == 'percentage'}  
                      onClick={() => OrderSettings('sell', 'copyOrderSize', {type: 'percentage'})} />
                    <Label htmlFor="sell-percentage">Copying Trade by Percentage(%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="sell-fixed"
                      checked={settings.sell.copyOrderSize.type == 'amount'}  
                      onClick={() => OrderSettings('sell', 'copyOrderSize', {type: 'amount'})}
                    />
                    <Label htmlFor="sell-fixed">Copying Trade with fixed amount(share)</Label>
                  </div>
                </RadioGroup>
              </div>
          </div>
          
        </div>

        <div className="space-y-4">
          <CardTitle className="text-white">Limitation Settings</CardTitle>
          <div className="flex justify-center items-center">
            <div className="w-1/2 space-y-4 pl-20">
              <div className="flex items-center space-x-2">
                <div className="text-white text-[20px]">Buy Order: </div>
                <Input className="w-[150px]"
                  value={settings.buy.limitOrderSize.size}
                  onChange={(e) => OrderSettings('buy', 'limitOrderSize', {size: e.target.value})}
                ></Input>
              </div>
              <RadioGroup 
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific" id="buy-specific"
                    checked={settings.buy.limitOrderSize.type == 'specific'} 
                    onClick={() => OrderSettings('buy', 'limitOrderSize', {type: 'specific'})} />
                  <Label htmlFor="buy-specific">Not higher than specific price</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="original" id="buy-original"
                    checked={settings.buy.limitOrderSize.type == 'original'} 
                    onClick={() => OrderSettings('buy', 'limitOrderSize', {type: 'original'})}
                  />
                  <Label htmlFor="buy-original">Allow it to be 2-3% higher than original trade price</Label>
                </div>
              </RadioGroup>                  
            </div>
            <div className="w-1/2 space-y-4 pl-20">
              <div className="flex items-center space-x-2">
                <div className="text-white text-[20px]">Sell Order: </div>
                <Input className="w-[150px]"
                  value={settings.sell.limitOrderSize.size}
                  onChange={(e) => OrderSettings('sell', 'limitOrderSize', {size: e.target.value})}
                ></Input>
              </div>
              <RadioGroup 
                className="space-y-2"                    
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific" id="sell-specific"
                    checked={settings.sell.limitOrderSize.type == 'specific'}
                    onClick={() => OrderSettings('sell', 'limitOrderSize', {type: 'specific'})} />
                  <Label htmlFor="sell-specific">Not lower than specific price</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="original" id="sell-original"
                    checked={settings.sell.limitOrderSize.type == 'original'}
                    onClick={() => OrderSettings('sell', 'limitOrderSize', {type: 'original'})}
                  />
                  <Label htmlFor="sell-original">Allow it to be 2-3% lower than original trade price</Label>
                </div>
              </RadioGroup>                  
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Input type="checkbox" className="w-[20px]"
                checked={settings.byMaxAmount}
                onChange={(e) => setSettings(prev => ({...prev, byMaxAmount: e.target.checked}))}
              ></Input>
              <div className="text-white text-[20px]">Max Amount per Market : </div>
              <Input className="w-[150px]"
                value={settings.maxAmount}
                onChange={(e) => setSettings(prev => ({...prev, maxAmount: e.target.value}))}
              ></Input> 
            </div>               
          </div>
        </div>       
      </CardContent>
    </Card>
  )
}
