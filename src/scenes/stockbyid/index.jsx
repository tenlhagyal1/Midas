import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { purchaseStock, sellSomeStocks, sellAllStocks, getStockData, getUserStockById } from '../../api/stocks';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Stock = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    // console.log('ID', id);

    const [data, setData] = useState({});
    const [amount, setAmount] = useState(0);
    const [cost, setCost] = useState(0);

    // If a user's stock array has this stock's ID, then render the user's stock data using getUserStockById

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const stockData = await getStockData(id);
                setData(stockData);
            } catch (error) {
                console.error("Error setting stock data in state:", error);
            }
        };
        fetchStock();
    }, []);

    useEffect(() => {
        if (data.c) {
            setCost(amount * data.c);
        }
    }, [amount, data.c]);

    async function handleBuySubmit(e) {
        e.preventDefault()
        await purchaseStock(id, amount, cost)
    }

    async function handleSellSubmit(e) {
        e.preventDefault()
        /* if (user.balance -= cost < 0) {
            Insufficient amount of stocks
        } else if (user.balance -= cost > 0) {
            sellSomeStocks
        } else {
            sellAllStocks
        }
        } */
    }

    return (
        <div>
            {data && Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <p>{key}: {value}</p>
                </div>
            ))}
            <form className="buy-form" onSubmit={handleBuySubmit}>
                <div>
                    {/* Amount */}
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>

                    {/* Cost */}
                    <div>
                        <label>Cost</label>
                        <p>{cost}</p>
                    </div>
                </div>

                <button>Submit</button>
            </form>
            <form className="sell-form" onSubmit={handleSellSubmit}>
                <div>
                    {/* Amount */}
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>

                    {/* Cost */}
                    <div>
                        <label>Cost</label>
                        <p>{cost}</p>
                    </div>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
};

export default Stock;
