
import React,{ useReducer } from 'react';
import { createContext, useContext, useEffect, useState } from "react";

import useCounterSync from '../hooks/useCounterSync';


export const TransactionContext = createContext({});

export const useTransaction = () => useContext(TransactionContext);

function countReducer(state, action) {
    switch (action.type) {
      case 'increment': {
        return {count: state.count + 25}
      }
      case 'decrement': {
        return {count: 0}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }

export default function TransactionProvider({ children }) {
  const [TransactionStatus, setTransactionStatus] = useState("0");
  const [IsProcessing, setIsProcessing] = useState(false);
  const [Message, setMessage] = useState("Message");
  const [state, dispatch] = useReducer(countReducer, {count: 0})


  const value = {
    IsProcessing, 
    setIsProcessing,
    setTransactionStatus,
    TransactionStatus,
    state,
    dispatch,
    setMessage,
    Message
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}
