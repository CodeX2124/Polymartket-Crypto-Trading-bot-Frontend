"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { UserPositionInterface } from "@/app/Interface/User"

interface SellModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  position: UserPositionInterface | null
  onSell: (amount: number) => Promise<void>
}

export function SellModal({ open, onOpenChange, position, onSell }: SellModalProps) {
  const [amount, setAmount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (position) {
      setAmount(position.size)
    }
  }, [position])

  const handleSell = async () => {
    if (!position) return
    
    setIsProcessing(true)
    try {
      await onSell(amount)
      onOpenChange(false)
    } catch (error) {
      console.error("Sell failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!position) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Sell Position</DialogTitle>
          <DialogDescription>
            Sell your position in {position.title}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="current" className="text-right text-gray-300">
              Current Size
            </Label>
            <Input
              id="current"
              value={position.size.toFixed(2)}
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right text-gray-300">
              Amount to Sell
            </Label>
            <Input
              id="amount"
              type="number"
              min="0"
              max={position.size}
              step="0.01"
              value={amount.toFixed(2)}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="px-4">
            <Slider
              value={[amount]}
              max={position.size}
              step={0.01}
              onValueChange={(value) => setAmount(value[0])}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span>
              <span>{position.size.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            onClick={handleSell}
            disabled={isProcessing || amount <= 0}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isProcessing ? "Processing..." : "Confirm Sell"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}