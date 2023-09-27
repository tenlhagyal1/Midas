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
    const [quantity, setQuantity] = useState(0);
    const [stake, setStake] = useState(0);

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
            setStake(quantity * data.c);
        }
    }, [quantity, data.c]);

    async function handleSubmit(e) {
        console.log(e.target)
        e.preventDefault()
        await purchaseStock(id, quantity, stake)
    }

    return (
        <div>
            {data && Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <p>{key}: {value}</p>
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <div>
                    {/* Quantity */}
                    <div>
                        <label>Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>

                    {/* Stake */}
                    <div>
                        <label>Stake</label>
                        <p>{stake}</p>
                    </div>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
};

export default Stock;
