import { Box, Typography, useTheme, Button, Paper, Grid } from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import LineCharts from "../../components/LineCharts";
import { createStock, editStock, deleteStock, getStockData, getUserById } from '../../api/stocks';

const Stock = () => {
    const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const { id } = useParams();

    let userBalance = localStorage.getItem('userBalance');    
    const [data, setData] = useState({});
    const [amount, setAmount] = useState(0);
    const [cost, setCost] = useState(0);
    const [balance, setBalance] = useState(userBalance);
    const [userQuantity, setUserQuantity] = useState(0);
    const [userStock, setUserStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const stockData = await getStockData(id);
                console.log(stockData)
                setData(stockData);
            } catch (error) {
                console.error("Error setting stock data in state:", error);
            }
        };
        fetchStock();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const user = await getUserById(id);
                setUserStock(user);
                setBalance(user.balance);
                console.log(user)
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
        console.log(e)
        if (userBalance - cost < 0) {
            console.log('Insufficient funds');
            return;
        } 
        const newBalance = userBalance - cost; 
        localStorage.setItem('userBalance', newBalance);
        if (userQuantity === 0) {
          const response = await createStock(id, amount, cost, newBalance, 1);
          console.log(response);
          setBalance(response.balance)
        } else {
            const res = await editStock(id, amount, cost, userBalance, 1);
            console.log(res)
        }        
    }

    async function handleSellSubmit(e) {
        e.preventDefault();
        if (userQuantity - amount > 0) {
            await editStock(id, amount, cost, userBalance, 0);
        } else if (userQuantity - amount === 0) {
            await deleteStock(id, amount, cost, userBalance);
        } else {
            console.log('Insufficient owned stock amount')
        }
    }

    return (
        <Box p={3}>
          <h1>
            {balance}
          </h1>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h5" gutterBottom>
                    Stock Details
                </Typography>
                <LineCharts data={data} />
                <Box mt={2} maxWidth="95%" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Typography variant="h6">{id}</Typography>
                    <Typography noWrap>Latest Price: {data.c}</Typography>
                </Box>
            </Paper>

            <Box mt={3}>
                <form className="buy-form" onSubmit={handleBuySubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <label>Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => {setAmount(Number(e.target.value)); console.log(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">Cost: {cost}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Buy
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

            <Box mt={3}>
                <form className="sell-form" onSubmit={handleSellSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <label>Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">Cost: {cost}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="secondary" type="submit">
                                Sell
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default Stock;