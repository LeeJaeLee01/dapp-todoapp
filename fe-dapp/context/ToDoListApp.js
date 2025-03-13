"use client"

import React from 'react'
import { ethers } from 'ethers'
import {toDoListAbi, toDoListAddress} from './constants'

const fetchContract = (signerOrProvider) => {
    new ethers.Contract(toDoListAddress, toDoListAbi, signerOrProvider)
}

export default function ToDoListApp() {
  return (
    <div>ToDoListApp</div>
  )
}
