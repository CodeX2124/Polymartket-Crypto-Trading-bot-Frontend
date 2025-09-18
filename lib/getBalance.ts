import { ethers } from 'ethers';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
const USDC_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS || '';

const USDC_ABI = [
  'function decimals() view returns (uint8)',
  'function balanceOf(address owner) view returns (uint256)',
];

const getMyBalance = async (address: string): Promise<number> => {
  const rpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, rpcProvider);

  const decimals = await usdcContract.decimals();
  const balanceRaw = await usdcContract.balanceOf(address);

  console.log("Raw balance:", balanceRaw.toString());

  const balanceFormatted = ethers.utils.formatUnits(balanceRaw, decimals);
  console.log("Balance (formatted):", balanceFormatted);

  return parseFloat(balanceFormatted);
};

export { getMyBalance };