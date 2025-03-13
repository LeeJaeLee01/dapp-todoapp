'use client'

import Image from 'next/image'
import React from 'react'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { formatAddress } from '@/lib/utils';

export default function Navbar() {
    const { address, isConnected, chain } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { switchChain, chains } = useSwitchChain();

  return (
    <nav className="flex w-full px-3 md:px-0 h-fit py-10 justify-between items-center">
    <Image
      src="/metamask-logo.svg"
      alt="Metamask Logo"
      width={180}
      height={180}
    />

    {isConnected ? (
      <div className="flex-col md:flex-row flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-white h-fit md:px-3 py-2 rounded-2xl font-semibold flex justify-center  items-center gap-1">
            {chain?.name.split(" ").slice(0, 2).join(" ")} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full justify-center rounded-2xl">
            {chains.map(
              (c) =>
                c.id !== chain?.id && (
                  <DropdownMenuItem
                    key={c.id}
                    onClick={() => switchChain({ chainId: c.id })}
                    className="cursor-pointer w-full flex justify-center rounded-2xl font-semibold"
                  >
                    {c.name}
                  </DropdownMenuItem>
                )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-white h-fit px-7 py-2 rounded-2xl font-semibold flex items-center gap-1">
            {formatAddress(address)} <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full flex justify-center rounded-2xl">
            <DropdownMenuItem
              onClick={() => disconnect()}
              className="text-red-400 cursor-pointer w-full flex justify-center rounded-2xl font-semibold"
            >
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ) : (
        <DropdownMenu>
        <DropdownMenuTrigger className="bg-blue-500 rounded-xl hover:bg-blue-600 shadow-xl md:px-10 font-semibold px-4 py-2">
          Connect Wallet
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full flex flex-col justify-center rounded-2xl">
          {connectors.map((connector) => (
            <DropdownMenuItem
              key={connector.id}
              onClick={() => connect({ connector })}
              className="cursor-pointer w-full flex justify-center rounded-2xl font-semibold py-2"
            >
              {connector.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </nav>
  )
}
