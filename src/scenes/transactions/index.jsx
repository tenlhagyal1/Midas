// import React, { useState, useEffect } from 'react';
// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import Header from "../../components/Header";

// const Transactions = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
  
//   const [transactions, setTransactions] = useState([]);

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     try {
//   //       const response = await fetch('/path-to-your-endpoint', {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           // Add any other headers like authentication tokens if needed
//   //         },
//   //         body: JSON.stringify({ user: { id: 'your-user-id' } }) // Replace 'your-user-id' with the actual user ID
//   //       });

//   //       const result = await response.json();

//   //       if (result.tradeHistory) {
//   //         setTransactions(result.tradeHistory);
//   //       }
//   //     } catch (err) {
//   //       console.error("Error fetching data:", err);
//   //     }
//   //   }

//   //   fetchData();
//   // }, []);

//   setTransactions()

//   const columns = [
//     {
//       field: "symbol",
//       headerName: "Symbol",
//       flex: 1,
//     },
//     {
//       field: "quantity",
//       headerName: "Shares",
//       flex: 1,
//     },
//     {
//       field: "cost",
//       headerName: "Amount ($)",
//       flex: 1,
//       renderCell: (params) => {
//         const isBuy = params.row.type === 'buy'; 
//         const color = isBuy ? colors.redAccent[500] : colors.greenAccent[500];
    
//         return (
//           <Typography color={color}>
//             ${params.value}
//           </Typography>
//         );
//       },
//     },
//     {
//       field: "type",
//       headerName: "Transaction Type",
//       flex: 1,
//     },
//     {
//       field: "createdAt",
//       headerName: "Date",
//       flex: 1,
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header title="Transactions History" subtitle="List of Transactions" />
//       <Box>
//         <DataGrid rows={transactions} columns={columns} />
//       </Box>
//     </Box>
//   );
// };

// export default Transactions;
