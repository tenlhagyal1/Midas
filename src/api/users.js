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