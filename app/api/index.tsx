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


const stopCopyTrading = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/trade-stop`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
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
        throw new Error('Failed to save settings');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving settings:', error);
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
  
  if (!response.ok) throw new Error('Failed to save account');
  
  return await response.json();
}

const deleteAccount = async (proxyWallet: string, privateKey: string) => {
  try {
    // Encode parameters for URL safety
    const encodedProxyWallet = encodeURIComponent(proxyWallet);
    const encodedPrivateKey = encodeURIComponent(privateKey);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URI}/api/accounts/${encodedProxyWallet}/${encodedPrivateKey}`, {
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
  if (!response.ok) {
      throw new Error('Failed to fetch accounts');
  }
  return response.json();
};

export {
    startCopyTrading,
    stopCopyTrading,
    redeemPositions,
    saveAccount,
    deleteAccount,
    getAccounts
}