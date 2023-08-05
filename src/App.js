import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Bloglist from "./pages/Bloglist";
import Sidenav from "./components/navcomponent/Sidebar";
import Header from "./components/navcomponent/Header";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import AddBlog from "./pages/AddBlog";

function App() {
  const { isLoggedIn } = useSelector(state => state.auth)
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {isLoggedIn && <>
              <Sidenav />

            </>}
            <div className="content">
              {isLoggedIn && <Header />}
              <Routes>
                <Route exact path="/admin" element={<Login />} />
                <Route exact path="/admin/blogs" element={<RestrictPage><Bloglist /></RestrictPage>} />
                <Route exact path="/admin/add-blogs" element={<RestrictPage><AddBlog /></RestrictPage>} />
              </Routes>
            </div>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>

    </>
  );
}

export default App;

function RestrictPage({ children }) {
  const { isLoggedIn } = useSelector(state => state.auth)
  return (isLoggedIn) ? children : <Navigate to="/admin" replace />;
}