"use client";
import { Account } from '@/app/Interface/account';

const startCopyTrading = async (settings: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/trade-monitor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving settings:', error);
    }
}


const stopCopyTrading = async (proxyAddress: string) => {
    try {
        console.log(proxyAddress);
        const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/trade-stop`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({proxyAddress}),
        });

        if (!response.ok) {
        throw new Error('Failed to stop');
        }

        console.log(response);
        return await response.json();
    } catch (error) {
        console.error('Error stop:', error);
    }
}

const redeemPositions = async (position: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/trade-redeem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(position),
      });

      if (!response.ok) {
        throw new Error('Failed to redeem position');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to redeem position:', error);
    }
}

// Save to MongoDB
const saveAccount = async (newAccount: Account) => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAccount),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  };
  
  return data;
}

const deleteAccount = async (id: string, proxyWallet: string, privateKey: string) => {
  try {
    // Encode parameters for URL safety
    const encodedProxyWallet = encodeURIComponent(proxyWallet);
    const encodedPrivateKey = encodeURIComponent(privateKey);
    const encodedId = encodeURIComponent(id);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/accounts/${encodedId}/${encodedProxyWallet}/${encodedPrivateKey}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete account');
    }

    return await response.json();
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

const getAccounts = async (): Promise<Account[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/accounts`);
  console.log(response);
  if (!response.ok) {
      throw new Error('Failed to fetch accounts');
  }
  return response.json();
};

const updateAccountStatus = async (id: string, isActive: boolean): Promise<Account> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/accounts/${id}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isActive }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update account status');
  }
  return response.json();
};

const saveSettings = async (settings: any) => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/accounts/settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  };
  
  return data;
}

const getSettings = async (proxyAddress: string): Promise<any> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/accounts/settings/${proxyAddress}`);
  if (!response.ok) {
      throw new Error('Failed to fetch accounts');
  }
  return response.json();
};

const sellPositions = async (position: any, amount: number, filterData: any) => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/trade-sell`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({position: position, amount: amount, filterData: filterData}),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  };
  
  return data;
}

export {
    startCopyTrading,
    stopCopyTrading,
    redeemPositions,
    saveAccount,
    deleteAccount,
    getAccounts,
    updateAccountStatus,
    saveSettings,
    getSettings,
    sellPositions
}