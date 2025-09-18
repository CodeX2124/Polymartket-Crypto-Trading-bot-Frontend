"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
import axios from 'axios';
import { getMyBalance } from "@/lib/getBalance";
import { useWallet } from "@/hooks/useWalletContext";

interface MetricCardProps {
  title: string;
  value: number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

interface Volumes {  
  proxyWallet: string;
  pseudonym: string;
  amount: number;
  name: string;
  bio: string;
  profileImage: string;
  profileImageOptimized: string;
}

interface PNL {
  t: number;
  p: number;
}

function MetricCard({ title, value, change, changeType, icon }: MetricCardProps) {
  const changeColor = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-gray-400",
  }[changeType];
  
  const ChangeIcon = changeType === "positive" ? TrendingUp : TrendingDown;
  
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        <div className="text-gray-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">${value.toFixed(2).toLocaleString()}</div>
      </CardContent>
    </Card>
  );
}

export function AccountOverview() {
  const { walletAddress } = useWallet();
  const [data, setData] = useState({
    totalPnl: 0,
    totalVolume: 0,
    balance: 0,
    loading: true,
    error: null
  });

  const fetchData = async <T,>(url: string): Promise<T> => {
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const fetchAccountData = async () => {
    if (!walletAddress) {
      setData(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      
      const [pnls, volume, totalBalance] = await Promise.all([
        fetchData<PNL[]>(`https://user-pnl-api.polymarket.com/user-pnl?user_address=${walletAddress}&interval=all&fidelity=1d`),
        fetchData<Volumes[]>(`https://lb-api.polymarket.com/volume?window=all&limit=1&address=${walletAddress}`),
        getMyBalance(walletAddress)
      ]);
      
      setData({
        totalPnl: pnls.length > 0 ? pnls[pnls.length - 1].p : 0,
        totalVolume: volume[0]?.amount || 0,
        balance: totalBalance || 0,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error in AccountOverview:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: null,  // Enforce null to match initial type definition
      }));
    }
  };

  useEffect(() => {
    fetchAccountData();
    const interval2 = setInterval(fetchAccountData, 60000); // Refresh every 60 seconds
    
    return () => {
      clearInterval(interval2);
    }
  }, [walletAddress]);

  if (data.loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
              </CardTitle>
              <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Balance"
          value={0}
          change=""
          changeType="positive"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Total PnL"
          value={0}
          change=""
          changeType="positive"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Volume"
          value={0}
          change=""
          changeType="positive"
          icon={<BarChart3 className="h-4 w-4" />}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Balance"
        value={data.balance}
        change=""
        changeType="positive"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <MetricCard
        title="Total PnL"
        value={data.totalPnl}
        change=""
        changeType={data.totalPnl >= 0 ? "positive" : "negative"}
        icon={data.totalPnl >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
      />
      <MetricCard
        title="Total Volume"
        value={data.totalVolume}
        change=""
        changeType="positive"
        icon={<BarChart3 className="h-4 w-4" />}
      />
    </div>
  );
}