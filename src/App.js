import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Bloglist from "./pages/Bloglist";
import Sidenav from "./components/navcomponent/Sidebar";
import Header from "./components/navcomponent/Header";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import AddBlog from "./pages/AddBlog";
import Comingsoon from "./components/Comingsoon";
import { useEffect, useState } from "react";

function App() {
  const { isLoggedIn } = useSelector(state => state.auth)
  const [adminNav, setAdminNav] = useState(false)
  const [theme, colorMode] = useMode();
  const { pathname,hostname } = window.location
  console.log('hostname', hostname)
  useEffect(() => {
    { pathname.includes("admin") ? setAdminNav(true) : setAdminNav(false) }
  })

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {isLoggedIn && adminNav && <>
              <Sidenav />

            </>}
            <div className="content">
              {isLoggedIn && adminNav && <Header />}
              <Routes>
                <Route exact path='/' element={<Comingsoon />} />
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
