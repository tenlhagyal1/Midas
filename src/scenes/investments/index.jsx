import React, { useState, useEffect } from 'react';
import { getUserTrades } from '../../api/users';

const Investment = () => {
    const [userTrades, setUserTrades] = useState({});

    
    useEffect(() => {
        const fetchUserTrades = async () => {
            try {
              const fetchedTrades = await getUserTrades();
              setUserTrades(fetchedTrades);        
              console.log("WHAT IS THIS", fetchedTrades.userTrades)  
            } catch (error) {
                console.error("Error setting Trades in state:", error);
            }
        };
        fetchUserTrades();
      }, []);

    return (
        <div>
            {/* <h2>Total Portfolio Value: ${portfolio.totalValue}</h2>
            <h2>Cash Value: ${portfolio.cashValue}</h2>
            <div>
                <h2>Your Stocks:</h2>
                <ul>
                    {portfolio.stocks.map(stock => (
                        <li key={stock.symbol}>
                            <strong>Symbol:</strong> {stock.symbol} | 
                            <strong>Shares:</strong> {stock.shares} | 
                            <strong>Equity:</strong> ${stock.equity}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
}

export default Investment;

