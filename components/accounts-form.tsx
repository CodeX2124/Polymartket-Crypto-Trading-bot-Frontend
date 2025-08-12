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
import { saveAccount, deleteAccount, getAccounts } from '@/app/api';


export default function AccountsForm() {
    const [inputShowKey, setInputShowKey] = useState(false); // For the input field
    const [isLoading, setIsLoading] = useState(false); // For the input field
    const [privateKey, setPrivateKey] = useState('sk_live_••••••••••••••••');
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [proxyWallet, setProxyWallet] = useState(process.env.NEXT_PUBLIC_PROXY_WALLET || '');
    const [isInitializing, setIsInitializing] = useState(true);

    // Add useEffect for initialization
    useEffect(() => {
      const init = async () => {
          try {
              const loadedAccounts = await getAccounts();
              setAccounts(loadedAccounts.map(account => ({
                  ...account,
                  showKey: false // Ensure keys are hidden by default
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
        
            const savedAccount: Account = await saveAccount(newAccount);
            setAccounts([...accounts, savedAccount]);
            setPrivateKey('sk_live_••••••••••••••••');
            toast.success('Account added successfully');
        } catch (error) {
            toast.error('Failed to add account');
        } finally {
            setIsLoading(false);
        }
    };

  const deleteAcc = async (proxyWallet: string, privateKey: string) => {
    try {
      const response = await deleteAccount(proxyWallet, privateKey);
    
    // Only proceed if the API deletion was successful
    if (response.success) {
      // Optimistically update UI      
      setAccounts(accounts.filter(account => account.proxyWallet !== proxyWallet && account.privateKey !== privateKey));
      toast.success('Account deleted successfully');
    } else {
      // Handle cases where API returns success: false
      toast.error(response.error || 'Failed to delete account');
    }
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  const toggleAccountStatus = (id: string) => {
    setAccounts(accounts.map(account => 
      account.id === id 
        ? { ...account, isActive: !account.isActive } 
        : account
    ));
  };

  const toggleKeyVisibility = (id: string) => {
    setAccounts(accounts.map(account => 
      account.id === id 
        ? { ...account, showKey: !account.showKey } 
        : account
    ));
  };

  if (isInitializing) {
    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white">Slave Account information</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-64">
                <div className="text-gray-300">Loading accounts...</div>
            </CardContent>
        </Card>
      );
  }
  
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Slave Account information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-10 items-center">
          <div className='w-3/4'>
            <div>
              <Label className="text-gray-300">Proxy Wallet Address</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="text"
                  value={proxyWallet}
                  onChange={(e) => setProxyWallet(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Wallet Private Key</Label>
              <div className="relative mt-1">
                <Input
                  type={inputShowKey ? 'text' : 'password'}
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setInputShowKey(!inputShowKey)}
                >
                  {inputShowKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700 mt-8"
            onClick={addAccount}
          >
            Add new account
          </Button>
        </div>

        {accounts.length > 0 && (
          <div className="mt-6">
            <Table className="border border-gray-700 rounded-lg">
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-transparent">
                  <TableHead className="text-gray-300">ID</TableHead>
                  <TableHead className="text-gray-300">Proxy Wallet</TableHead>
                  <TableHead className="text-gray-300">Private Key</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account, index) => (
                  <TableRow key={account.id} className="border-gray-700 hover:bg-transparent">
                    <TableCell className="text-gray-300">User{index + 1}</TableCell>
                    <TableCell className="text-gray-300">{account.proxyWallet}</TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center">
                        <span className="mr-2">
                          {account.showKey ? account.privateKey : '••••••••••••••••'}
                        </span>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-300"
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
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`hover:bg-transparent ${account.isActive ? "text-red-500" : "text-green-500"}`}
                          onClick={() => toggleAccountStatus(account.id)}
                        >
                          {account.isActive ? (
                            <>
                              <StopCircle className="h-4 w-4 mr-1" />
                              Stop
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-1" />
                              Start
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:bg-transparent text-red-500"
                          onClick={() => deleteAcc(account.proxyWallet, account.privateKey)}
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
        )}
      </CardContent>
    </Card>
  );
}