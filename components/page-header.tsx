"use client";

import { Button } from "@/components/ui/button"
import {useTradeSettings} from "@/hooks/useTradeSettingContext"
import { toast } from 'react-toastify';

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {

  const { startCopyTrading, settings, stopCopyTrading } = useTradeSettings();

  const CopyhandleClick = async () => 
  {
    try {
      
      console.log(settings);
      if((!settings.buy.byAmount && !settings.buy.byCategory && !settings.buy.byOrder && !settings.buy.byPrice && !settings.buy.byTillDayEvent)
        && (!settings.sell.byAmount && !settings.sell.byCategory && !settings.sell.byOrder && !settings.sell.byPrice && !settings.sell.byTillDayEvent)
        || (((!settings.buy.copyOrderSize.size && !settings.buy.copyOrderSize.type) && (!settings.sell.copyOrderSize.size && !settings.sell.copyOrderSize.type))
        && ((!settings.buy.limitOrderSize.size && !settings.buy.limitOrderSize.type) && (!settings.sell.limitOrderSize.size && !settings.sell.limitOrderSize.type)))
      ){
        toast.error("Add conditions");
      } else{
        await startCopyTrading();
        toast.success("Monitoring successfully");
      }
    } catch (error) {
      console.log(error);
    }
  } 
  
  const StophandleClick = async () => 
  {
    try {     
      
      await stopCopyTrading();
      toast.success("Stop Monitoring successfully");
      
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className="flex space-x-4">
        <Button className="flex border border-1 w-[100px] h-[40px] rounded-md text-center text-[20px] text-white items-center justify-center bg-white/[20%] hover:bg-green-600"
          onClick = {CopyhandleClick} >Start
        </Button> 

        <Button className="flex border border-1 w-[100px] h-[40px] rounded-md text-center text-[20px] text-white items-center justify-center bg-white/[20%] hover:bg-green-600"
          onClick = {StophandleClick} >Stop
        </Button>    
      </div>
    </div>
  )
}
