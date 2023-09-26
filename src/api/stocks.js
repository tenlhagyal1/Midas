const ROOT = process.env.REACT_APP_STOCK_API_ROOT;
const token = process.env.REACT_APP_API_KEY;

export const getStock = async (symbol) => {
    try {
        const response = await fetch(`${ROOT}quote?symbol=${symbol}&token=${token}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
}

export const purchaseStock = async (stockId, stockData) => {
    try {
        const response = await fetch(`http://localhost:8080/api/stocks/${stockId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stockData)
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to purchase stock. Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error("Error purchasing stock:", error);
        return null;
    }
}
