import api from './apiConfig'

const ROOT = process.env.REACT_APP_STOCK_API_ROOT;
const token = process.env.REACT_APP_API_KEY;

// Get Stock Data

export async function getStockData(id) {
    try {
        const response = await fetch(`${ROOT}quote?symbol=${id}&token=${token}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
}

// Search Stocks

// searchStock

// Buy Stock

export async function purchaseStock(id, formData) {
    const stockId = id;
    const stockData = await getStockData(stockId);
    if (!stockData) {
        throw new Error("Failed to fetch stock data");
    }
    
    const data = {
        stockId: stockId,
        ...formData
    };

    const response = await api.post(`/stocks/${id}`)
    return response.data;
}

// Sell Stock

export async function sellSomeStocks(id, formData) {
    const stockId = id;
    const data = {
        stockId: stockId,
        ...formData
    };
    // Put or Delete
    const response = await api.put(`/stocks/${stockId}`, data);

    return response.data;
}

// Sell All Stocks

export async function sellAlStocks(id, formData) {
    const stockId = id;
    const data = {
        stockId: stockId,
        ...formData
    };
    const response = await api.put(`/stocks/${stockId}`, data);

    return response.data;
}

// Get a specific UserStock by ID

export async function getUserStockById(id) {
    
}