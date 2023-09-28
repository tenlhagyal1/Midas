import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Transactions from "./scenes/transactions";
import Portfolio from "./components/Portfolio";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/index";
import Form from "./scenes/form";
import List from "./scenes/list"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthContext } from "./context/AuthContextComponent";
import { useContext } from "react";
import Login from "./scenes/loginPage";
import Signup from "./scenes/signup";
import ProtectecRoute from "./components/ProtectedRoute";
import StockContext from "./context/StockContext";
import AuthContextComponent from "./context/AuthContextComponent";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [stockSymbol, setStockSymbol] = useState("FB");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar
              setIsSidebar={setIsSidebar}
              // isLoggedIn={isLoggedIn}
              // setIsLoggedIn={setIsLoggedIn}
            />
            <Routes>
              <Route path="/auth/signin" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectecRoute>
                    <Dashboard />
                  </ProtectecRoute>
                }
              />
              <Route
                path="/bar"
                element={
                  <ProtectecRoute>
                    <Bar />
                  </ProtectecRoute>
                }
              />
              <Route
                path="/pie"
                element={
                  <ProtectecRoute>
                    <Pie />
                  </ProtectecRoute>
                }
              />
              <Route
                path="/line"
                element={
                  <ProtectecRoute>
                    <Line />
                  </ProtectecRoute>
                }
              />
              <Route
                path="/geography"
                element={
                  <ProtectecRoute>
                    <Geography />
                  </ProtectecRoute>
                }
              />
              <Route
                path="/faq"
                element={
                  <ProtectecRoute>
                    <FAQ />
                  </ProtectecRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <ProtectecRoute>
                    <Calendar />
                  </ProtectecRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectecRoute>
                    <Transactions />
                  </ProtectecRoute>
                }
              />
              <Route
                path="/form"
                element={
                  <ProtectecRoute>
                    <Form />
                  </ProtectecRoute>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <ProtectecRoute>
                    <Portfolio />
                  </ProtectecRoute>
                }
              />
              <Route path="/auth/signup" element={<Signup />} />
              {/* Other routes can be added similarly */}

            </Routes>
  
          </main>
        </div>
        </StockContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
