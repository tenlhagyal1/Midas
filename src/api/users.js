import api from './apiConfig'

// export async function getUserStocks() {
//     console.log('test')
//     try {
//         const userId = localStorage.getItem('user');
//         const sendId = await api.post('/dashboard');
//         const response = await api.get('/dashboard');
//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.error("Error fetching stock data:", error);
//         return null;
//     }
// }