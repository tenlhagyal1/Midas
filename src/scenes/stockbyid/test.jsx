import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { createStock, editStock, deleteStock, getStockData, getUserById } from '../../api/stocks';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import LineCharts from "../../components/LineCharts";

const Stock = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();

    let userBalance = localStorage.getItem('userBalance');    
    const [data, setData] = useState({});
    const [amount, setAmount] = useState(0);
    const [cost, setCost] = useState(0);
    const [userQuantity, setUserQuantity] = useState(0);
    const [userStock, setUserStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBuying, setIsBuying] = useState(true); // Toggle state

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
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const user = await getUserById(id);
                setUserStock(user);
                const matchingStock = user.stocks.find(stock => stock.symbol === id);
                if (matchingStock) {
                    setUserQuantity(matchingStock.quantity);
                } else {
                    console.log('Stock with the given symbol not found in user stocks.');
                }
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    useEffect(() => {
        if (data.c) {
            setCost(amount * data.c);
        }
    }, [amount, data.c]);

    async function handleBuySubmit(e) {
        e.preventDefault();
        if (userBalance - cost < 0) {
            console.log('Insufficient funds');
            return;
        }
        userBalance -= cost;
        localStorage.setItem('userBalance', userBalance);
        if (userQuantity === 0) {
            await createStock(id, amount, cost, userBalance, 1);
        } else {
            await editStock(id, amount, cost, userBalance, 1);
        }        
    }

    async function handleSellSubmit(e) {
        e.preventDefault();
        if (userQuantity - amount > 0) {
            await editStock(id, amount, cost, userBalance, 0);
        } else if (userQuantity - amount === 0) {
            await deleteStock(id, amount, cost, userBalance);
        } else {
            console.log('Insufficient owned stock amount');
        }
    }

    return (
        <Box sx={{ padding: theme.spacing(2) }}>
            <Typography variant="h4" gutterBottom>
                Stock Details
            </Typography>
            {data && Object.entries(data).map(([key, value]) => (
                <Box key={key} sx={{ marginBottom: theme.spacing(1) }}>
                    <Typography variant="body1">
                        {key}: {value}
                    </Typography>
                </Box>
            ))}
            <Button variant="contained" color="primary" onClick={() => setIsBuying(!isBuying)}>
                {isBuying ? "Switch to Sell" : "Switch to Buy"}
            </Button>
            <Box component="form" onSubmit={isBuying ? handleBuySubmit : handleSellSubmit} sx={{ marginTop: theme.spacing(2) }}>
                <Box sx={{ marginBottom: theme.spacing(2) }}>
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </Box>
                <Box sx={{ marginBottom: theme.spacing(2) }}>
                    <label>Cost</label>
                    <Typography variant="body1">{cost}</Typography>
                </Box>
                <Button type="submit" variant="contained" color="secondary">
                    {isBuying ? "Buy" : "Sell"}
                </Button>
            </Box>
        </Box>
    );
};

export default Stock;
