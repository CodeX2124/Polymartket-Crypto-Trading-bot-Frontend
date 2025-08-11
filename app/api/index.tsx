"use client";

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

export {
    startCopyTrading,
    stopCopyTrading,
    redeemPositions
}