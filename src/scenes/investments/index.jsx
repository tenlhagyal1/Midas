import React, { useState, useEffect } from 'react';
import { getUserTrades } from '../../api/users';

const Investment = () => {
    const [userTrades, setUserTrades] = useState({});
    const [userBalance, setUserBalance] = useState(parseFloat(localStorage.getItem('userBalance')) || 0);

    useEffect(() => {
        const fetchUserTrades = async () => {
            try {
                const fetchedTrades = await getUserTrades();
                const processedTrades = processTrades(fetchedTrades.userTrades);
                setUserTrades({ ...fetchedTrades, userTrades: processedTrades });
            } catch (error) {
                console.error("Error setting Trades in state:", error);
            }
        };
        fetchUserTrades();
    }, []);

    const processTrades = (trades) => {
        const groupedTrades = {};
    
        trades.forEach(trade => {
            if (groupedTrades[trade.symbol]) {
                // Adjust quantity based on trade type (buy or sell)
                if (trade.type) { // Buy
                    groupedTrades[trade.symbol].quantity += trade.quantity;
                    groupedTrades[trade.symbol].stake += trade.stake;
                } else { // Sell
                    groupedTrades[trade.symbol].quantity -= trade.quantity;
                    groupedTrades[trade.symbol].stake -= trade.stake;
                }
            } else {
                groupedTrades[trade.symbol] = { ...trade };
            }
        });
    
        return Object.values(groupedTrades);
    };
    
 // Calculate the total stake from all trades
 const totalStake = userTrades.userTrades ? userTrades.userTrades.reduce((acc, trade) => acc + trade.stake, 0) : 0;

 // Calculate cash value
 const cashValue = userBalance - totalStake;

 return (
     <div>
         <h2>Total portfolio value: ${userBalance.toFixed(2)}</h2>
         <h2>Brokerage Cash: ${cashValue.toFixed(2)}</h2>
         <h2>Stocks:</h2>
         <ul>
             {userTrades.userTrades && userTrades.userTrades.map(trade => (
                 <li key={trade.symbol}>
                     <strong>Symbol:</strong> {trade.symbol} | 
                     <strong>Quantity:</strong> {trade.quantity} | 
                     <strong>Equity:</strong> ${trade.stake.toFixed(2)}
                 </li>
             ))}
         </ul>
     </div>
 );
}

export default Investment;

