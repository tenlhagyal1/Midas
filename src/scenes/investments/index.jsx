import React from 'react';

const Investment = () => {
    const portfolio = 
    {
        totalValue: 100000,
        cashValue: 20000,
        stocks: [
            { symbol: "AAPL", shares: 10, equity: 1500 },
            { symbol: "GOOGL", shares: 5, equity: 3500 },
            { symbol: "MSFT", shares: 8, equity: 2400 },
            { symbol: "AMZN", shares: 3, equity: 9000 },
            { symbol: "FB", shares: 15, equity: 4500 },
            { symbol: "TSLA", shares: 12, equity: 7200 },
            { symbol: "NFLX", shares: 10, equity: 5000 },
            { symbol: "NVDA", shares: 7, equity: 2100 },
            { symbol: "BRK.A", shares: 1, equity: 350000 },
            { symbol: "JPM", shares: 20, equity: 2800 },
            { symbol: "V", shares: 25, equity: 5000 },
            { symbol: "BABA", shares: 10, equity: 2500 }
        ]
    }
    


    return (
        <div>
            <h2>Total Portfolio Value: ${portfolio.totalValue}</h2>
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
            </div>
        </div>
    );
}

export default Investment;

