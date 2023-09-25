import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Transactions from "./scenes/transactions";
// import Stocks from "./scenes/stocks";
// import Portfolio from "./scenes/portfolio";
import Bar from "./scenes/bar";
// import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
               <Route path="/bar" element={<Bar />} />
               <Route path="/pie" element={<Pie />} />
               <Route path="/line" element={<Line />} />
               <Route path="/geography" element={<Geography />} />
               <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} /> 
               {/* <Route path="/calendar" element={<Calendar />} /> */}
              {/* <Route path="/transactions" element={<Transactions />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/form" element={<Form />} />
             
  */}
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;