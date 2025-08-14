export interface Account {
    id: string;
    proxyWallet: string;
    targetWallet: string;
    privateKey: string;
    isActive: boolean;
    showKey: boolean;
}