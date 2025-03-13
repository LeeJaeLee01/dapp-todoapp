"use client";

import { Button } from "@/components/ui/button";
import MetaMaskSDK from "@metamask/sdk";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { toDoListAbi, toDoListAddress } from "./constants";

export default function ToDoList() {
  const { address, isConnected } = useAccount();

  const handleClick = async () => {
    if (isConnected && address && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      console.log("Connected Account:", account);

      const toDoListContract = new ethers.Contract(
        toDoListAddress,
        toDoListAbi,
        signer
      );

      console.log(44, toDoListContract);

      const tx = await toDoListContract.createList("Xin chao");

      await tx.wait();
    } else {
      console.log("Please connect your wallet.");
    }
  };

  const handleGetTask = async () => {
    if(window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
    
        const toDoListContract = new ethers.Contract(
          toDoListAddress,
          toDoListAbi,
          signer
        );
        const addresses = await toDoListContract.getMessage();
        console.log("All creators:", addresses);
    }
   
  };

  return (
    <div>
      <Button onClick={() => handleClick()}>Create Task</Button>
      <Button onClick={() => handleGetTask()}>Get Task</Button>
    </div>
  );
}
