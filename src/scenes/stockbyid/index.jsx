import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { createStock, editStock, deleteStock, getStockData, getUserById } from '../../api/stocks';
import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';

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
