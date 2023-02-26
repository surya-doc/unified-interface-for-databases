import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from'./components/global/Topbar';
import SideBar from './components/global/SideBar';
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Language from "./components/SelectLanguage/Language";
import ShowOp from "./components/SelectLanguage/ShowOp/ShowOp";
import Connect from "./components/MYSQL/Connect";
import Getdbdatas from "./components/MYSQL/Getdbdatas";
import Connectpost from "./components/Postgres/Connectpost";
import ShowTables from "./components/ShowTables";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          {/* <SideBar/> */}
          <main className="content">
            {/* <Topbar/> */}
            <Routes>
              <Route path="/" element={<Language />} />
              <Route path="/options" element={<ShowOp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/connectinfo" element={<Connect />} />
              <Route path="/connectinfopost" element={<Connectpost />} />
              <Route path="/getdbs" element={<Getdbdatas />} />
              <Route path="/tables" element={<ShowTables />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </colorModeContext.Provider>
  );
}

export default App;
