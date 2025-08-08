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

export function FilterForm() {

  const { settings, toggleSetting, updateRangeValues } = useTradeSettings();

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Filter Settings</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">        
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
                    value={settings.buy.byAmount.min}
                    onChange={(e) => updateRangeValues('buy', 'amount', e.target.value, true)}
                  />
                  <Label>Max:</Label>
                  <Input 
                    className="w-[100px]" 
                    value={settings.buy.byAmount.max}
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
                    value={settings.sell.byPrice.min}
                    onChange={(e) => updateRangeValues('sell', 'price', e.target.value, true)}
                  />
                  <Label>Max : </Label>
                  <Input 
                    className="w-[100px]" 
                    value={settings.sell.byPrice.max}
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
                    value={settings.sell.byAmount.min}
                    onChange={(e) => updateRangeValues('sell', 'amount', e.target.value, true)}
                  />
                  <Label>Max:</Label>
                  <Input 
                    className="w-[100px]" 
                    value={settings.sell.byAmount.max}
                    onChange={(e) => updateRangeValues('sell', 'amount', e.target.value, false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
