// import { Box, Button, Typography, useTheme, TextField, Paper, Grid } from "@mui/material";
// import { tokens } from "../../theme";
// import { purchaseStock, sellSomeStocks, sellAllStocks, getStockData, getHistoricalStockData, getUserStockById } from '../../api/stocks';
// import { useState, useEffect, useContext } from "react";
// import { useParams } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContextComponent'
// import LineCharts from "../../components/LineCharts";

// const Stock = () => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const { id } = useParams();

//     const [data, setData] = useState({});
//     const [amount, setAmount] = useState(0);
//     const [cost, setCost] = useState(0);
//     const [activeForm, setActiveForm] = useState('buy'); // 'buy' or 'sell'

//     useEffect(() => {
//         const fetchStock = async () => {
//             try {
//                 const stockData = await getHistoricalStockData(id);
//                 setData(stockData);
//             } catch (error) {
//                 console.error("Error setting stock data in state:", error);
//             }
//         };
//         fetchStock();
//     }, []);

//     useEffect(() => {
//         if (data.c) {
//             setCost(amount * data.c);
//         }
//     }, [amount, data.c]);

//     async function handleBuySubmit(e) {
//         e.preventDefault();
//         await purchaseStock(id, amount, cost);
//     }

//     async function handleSellSubmit(e) {
//         e.preventDefault();
//         // Handle sell logic here
//     }

//     const toggleForm = () => {
//         setActiveForm(prev => prev === 'buy' ? 'sell' : 'buy');
//     };

//     return (
//         <Box p={3}>
//             <Paper elevation={3} style={{ padding: '16px' }}>
//                 <Typography variant="h5" gutterBottom>
//                     Stock Details
//                 </Typography>
//                 <LineCharts data={data} />
//                 <Box mt={2} maxWidth="95%" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//     <Typography variant="h6">{id}</Typography>
//     <Typography noWrap>Latest Price: {data.c}</Typography>
// </Box>

//             </Paper>

//             <Box mt={3}>
//                 <Button variant="outlined" onClick={toggleForm}>
//                     Toggle to {activeForm === 'buy' ? 'Sell' : 'Buy'}
//                 </Button>
//             </Box>

//             <Box mt={3}>
//                 {activeForm === 'buy' ? (
//                     <Paper elevation={3} style={{ padding: '16px' }}>
//                         <Typography variant="h6" gutterBottom>
//                             Buy Stocks
//                         </Typography>
//                         <form onSubmit={handleBuySubmit}>
//                             <Grid container spacing={3}>
//                                 <Grid item xs={6}>
//                                     <TextField
//                                         fullWidth
//                                         label="Amount"
//                                         type="number"
//                                         value={amount}
//                                         onChange={(e) => setAmount(Number(e.target.value))}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Typography variant="subtitle1">Cost: {cost}</Typography>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Button variant="contained" color="primary" type="submit">
//                                         Buy
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         </form>
//                     </Paper>
//                 ) : (
//                     <Paper elevation={3} style={{ padding: '16px' }}>
//                         <Typography variant="h6" gutterBottom>
//                             Sell Stocks
//                         </Typography>
//                         <form onSubmit={handleSellSubmit}>
//                             <Grid container spacing={3}>
//                                 <Grid item xs={6}>
//                                     <TextField
//                                         fullWidth
//                                         label="Amount"
//                                         type="number"
//                                         value={amount}
//                                         onChange={(e) => setAmount(Number(e.target.value))}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Typography variant="subtitle1">Cost: {cost}</Typography>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Button variant="contained" color="secondary" type="submit">
//                                         Sell
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                         </form>
//                     </Paper>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default Stock;


import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { createStock, editStock, deleteStock, getStockData, getUserById } from '../../api/stocks';
import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import  LineCharts  from "../../components/LineCharts";

const Stock = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    // console.log('ID', id);

    // const { user } = useContext(AuthContext) 

    // console.log(localStorage.getItem('user'));

    let userBalance = localStorage.getItem('userBalance');    
    const [data, setData] = useState({});
    const [amount, setAmount] = useState(0);
    const [cost, setCost] = useState(0);
    const [userQuantity, setUserQuantity] = useState(0);
    const [userStock, setUserStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // If a user's stock array has this stock's ID, then render the user's stock data using getUserStockById

    // STOCK DATA FROM API
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

    // GET USER'S DATA FROM BACKEND
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const user = await getUserById(id);
                setUserStock(user);
                const matchingStock = user.stocks.find(stock => stock.symbol === id);

                if (matchingStock) {
                    console.log('THIS IS THE SPECIFIC STOCK', matchingStock)
                    setUserQuantity(matchingStock.quantity);
                    console.log('??????', matchingStock.quantity);
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
        console.log('BUY BUTTON WAS CLICKED')
        e.preventDefault()
        if (userBalance - cost < 0) {
            console.log('Insufficient funds');
            return;
        }
        userBalance -= cost;
        localStorage.setItem('userBalance', userBalance);
        if (userQuantity === 0) {
            console.log('call create');
            await createStock(id, amount, cost, userBalance, 1);
        } else {
            console.log('call edit');
            await editStock(id, amount, cost, userBalance, 1);
        }        
    }

    async function handleSellSubmit(e) {
        console.log('SELL BUTTON WAS CLICKED')
        e.preventDefault()
        console.log('call edit');
        if (userQuantity - amount > 0) {
            console.log('EIDT STOCK BY SELLING')
           await editStock(id, amount, cost, userBalance, 0);
        } else if (userQuantity - amount === 0) {
            console.log('DELET STOCK BY SELIng')
            await deleteStock(id, amount, cost, userBalance);
        } else {
            console.log('Insufficient owned stock amount')
        }
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