import React, { useContext } from 'react'
import StockContext from "../context/StockContext"

const SearchResults = ({results}) => {
    const {setStockSymbol} = useContext(StockContext)
    return (
        <ul className="absolute top-12 w-full bg-white border-2 border-neutral-200 rounded-md h-64 overflow-y-scroll custom-scrollbar">
            {results.map((item) => {
                return (
                    <li key={item.symbol} className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200" onClick={() => {setStockSymbol(item.symbol)}}>
                        <span>{item.symbol}</span>
                        <span>{item.description}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default SearchResults