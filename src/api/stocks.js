import api from './apiConfig';

const ROOT = process.env.REACT_APP_STOCK_API_ROOT;
const token = process.env.REACT_APP_API_KEY;

// Get Stock Data HELPER FUNCTION
export async function getStockData(id) {
    try {
        const response = await fetch(`${ROOT}quote?symbol=${id}&token=${token}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
}

export async function getUserById(id) {
    const data = {
        symbol: id,
        id: localStorage.getItem('user')
    }
    const response = await api.get(`/stocks/${id}`, {params: data});
    return response.data;
}

// Buy Stock
export async function createStock(id, amount, cost, userBalance) {
    const data = {
        symbol: id,
        quantity: amount,
        stake: cost,
        id: localStorage.getItem('user'),
        balance: userBalance
    };
    const response = await api.post(`/stocks/${id}`, data);
    return response.data;
}

export async function getHistoricalStockData(id) {
    try {
        const response = await fetch(`${ROOT}stock/candle?symbol=${id}&resolution=1&from=1693493346&to=1693752546&token=${token}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
}

// Sell Stock
export async function editStock(id, amount, cost, userBalance, type) {
    let data = {
        symbol: id,
        quantity: amount,
        stake: cost,
        id: localStorage.getItem('user'),
        balance: userBalance,
        type
    };
    const response = await api.put(`/stocks/${id}`, data);
    return response.data;
}

// Sell All Stocks
export async function deleteStock(id, amount, cost, userBalance) {
    const data = {
        symbol: id,
        quantity: amount,
        stake: cost,
        id: localStorage.getItem('user'),
        balance: userBalance
    };
    const response = await api.delete(`/stocks/${id}`, {data});
    return response.data;
}

// Get all user stocks
export async function getAllUserStocks() {
    const data = {
        id: localStorage.getItem('user')
    }
    const response = await api.get('/dashboard', {params: data});
    return response.data;
}
