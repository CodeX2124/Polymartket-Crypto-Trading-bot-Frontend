"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Trash2, Play, StopCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from 'react-toastify';
import { Account } from '@/app/Interface/account';
import { saveAccount, deleteAccount, getAccounts, updateAccountStatus } from '@/app/api';
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

export default function AccountsForm() {
    const [inputShowKey, setInputShowKey] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [privateKey, setPrivateKey] = useState('sk_live_••••••••••••••••');
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [proxyWallet, setProxyWallet] = useState(process.env.NEXT_PUBLIC_PROXY_WALLET || '');
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const loadedAccounts = await getAccounts();
                setAccounts(loadedAccounts.map(account => ({
                    ...account,
                    showKey: false
                })));
            } catch (error) {
                toast.error('Failed to load accounts');
            } finally {
                setIsInitializing(false);
            }
        };
        init();
    }, []);

    const addAccount = async () => {
        if (!proxyWallet || !privateKey) {
            toast.error('Please fill all fields');
            return;
        }

        setIsLoading(true);
        try {
            const newAccount = {
                id: Date.now().toString(),
                proxyWallet,
                privateKey,
                isActive: false,
                showKey: false
            };       
            
            const savedAccount = await saveAccount(newAccount);
            setAccounts([...accounts, savedAccount]);
            setPrivateKey('sk_live_••••••••••••••••');
            toast.success('Account added successfully');
        } catch (error: any) {
            toast.error(`Failed to add account: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteAcc = async (id: string) => {
        try {
            const accountToDelete = accounts.find(acc => acc.id === id);
            if (!accountToDelete) return;

            const response = await deleteAccount(
                accountToDelete.id, 
                accountToDelete.proxyWallet, 
                accountToDelete.privateKey
            );

            if (response.success) {
                setAccounts(prev => prev.filter(account => account.id !== id));
                toast.success('Account deleted successfully');
            } else {
                toast.error(response.error || 'Failed to delete account');
            }
        } catch (error) {
            toast.error('Failed to delete account');
        }
    };

    const toggleAccountStatus = async (id: string) => {
        try {
            const account = accounts.find(acc => acc.id === id);
            if (!account) return;

            const newStatus = !account.isActive;
            
            // Optimistic update
            setAccounts(prev => prev.map(acc => 
                acc.id === id ? { ...acc, isActive: newStatus } : acc
            ));

            // Update database
            await updateAccountStatus(id, newStatus);
            
            toast.success(`Account ${newStatus ? 'started' : 'stopped'} successfully`);
        } catch (error) {
            // Revert on error
            setAccounts(prev => prev.map(acc => 
                acc.id === id ? { ...acc, isActive: !acc.isActive } : acc
            ));
            toast.error('Failed to update account status');
        }
    };

    const toggleKeyVisibility = (id: string) => {
        setAccounts(prev => prev.map(account => 
            account.id === id 
                ? { ...account, showKey: !account.showKey } 
                : account
        ));
    };

    if (isInitializing) {
        return (
            <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-white">Account Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full bg-gray-800" />
                        <Skeleton className="h-10 w-full bg-gray-800" />
                    </div>
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full bg-gray-800" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white">Account Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                        <div>
                            <Label className="text-gray-300 mb-2 block">Proxy Wallet Address</Label>
                            <Input
                                type="text"
                                value={proxyWallet}
                                onChange={(e) => setProxyWallet(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white hover:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
                                placeholder="0x..."
                            />
                        </div>
                        <div>
                            <Label className="text-gray-300 mb-2 block">Wallet Private Key</Label>
                            <div className="relative">
                                <Input
                                    type={inputShowKey ? 'text' : 'password'}
                                    value={privateKey}
                                    onChange={(e) => setPrivateKey(e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white hover:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 pr-10"
                                    placeholder="Enter private key"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                                    onClick={() => setInputShowKey(!inputShowKey)}
                                >
                                    {inputShowKey ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <Button 
                            className="bg-blue-600 hover:bg-blue-700 h-11 w-full md:w-auto"
                            onClick={addAccount}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Add New Account'}
                        </Button>
                    </div>
                </div>

                {accounts.length > 0 ? (
                    <div className="border border-gray-800 rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-800">
                                <TableRow>
                                    <TableHead className="text-gray-300">User</TableHead>
                                    <TableHead className="text-gray-300">Wallet Address</TableHead>
                                    <TableHead className="text-gray-300">Private Key</TableHead>
                                    <TableHead className="text-gray-300">Status</TableHead>
                                    <TableHead className="text-gray-300 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {accounts.map((account, index) => (
                                    <TableRow key={account.id} className="border-gray-800 hover:bg-gray-800/50">
                                        <TableCell className="font-medium text-gray-300">
                                            User {index + 1}
                                        </TableCell>
                                        <TableCell className="text-gray-400">
                                            <span className="font-mono">
                                                {account.proxyWallet.substring(0, 6)}...{account.proxyWallet.slice(-4)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-gray-400">
                                                    {account.showKey ? account.privateKey : '••••••••••••••••'}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="text-gray-400 hover:text-blue-400 transition-colors"
                                                    onClick={() => toggleKeyVisibility(account.id)}
                                                >
                                                    {account.showKey ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge 
                                                variant={account.isActive ? "default" : "secondary"}
                                                className={account.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}
                                            >
                                                {account.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className={`hover:bg-gray-700 ${account.isActive ? "text-red-400 hover:text-red-300" : "text-blue-400 hover:text-blue-300"}`}
                                                    onClick={() => toggleAccountStatus(account.id)}
                                                >
                                                    {account.isActive ? (
                                                        <>
                                                            <StopCircle className="h-4 w-4 mr-2" />
                                                            Stop
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Play className="h-4 w-4 mr-2" />
                                                            Start
                                                        </>
                                                    )}
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                                                    onClick={() => deleteAcc(account.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 border border-gray-800 rounded-lg">
                        <div className="text-gray-400 mb-4">No accounts added yet</div>
                        <Button 
                            variant="outline" 
                            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                            onClick={addAccount}
                        >
                            Add Your First Account
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}