import api from './apiConfig'

export async function getUserStocks() {
    console.log('GETTING USER STOCKS ON THE DASHBOARD')
    try {
        const userId = localStorage.getItem('user');
        const response = await api.get('/dashboard', {userId});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
}

export async function getUserTrades() {
    console.log('GETTING USER Trades ON THE INVESTMENTS PAGE')
    try {
        const userId = localStorage.getItem('user');
        const response = await api.get('/investments', {userId});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching stock trades:", error);
        return null;
    }
}