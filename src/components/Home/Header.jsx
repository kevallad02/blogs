import { Box, Container, IconButton, InputBase, Menu, MenuItem, Typography, useTheme } from '@mui/material'
import React, { useContext, useState } from 'react'
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { ColorModeContext, tokens } from '../../theme';
import SearchIcon from "@mui/icons-material/Search";
import logo from '../../assest/images/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    return (
        <>
            <div className='sticky-header' style={{ backgroundColor: colors.primary[400] }} >
                <Container maxWidth="lg">
                    <Box display="flex" position="sticky" justifyContent="space-between" p={2}>
                        {/* SEARCH BAR */}
                        <div className='cyber-logo'>
                            <Link to="/">
                                <img className='cyber-logo-img' src={logo} />
                            </Link>
                        </div>
                        <div className='global-search'>
                            <Box
                                display="flex"
                                backgroundColor={colors.primary[400]}
                                borderRadius="3px"
                            >
                                <InputBase
                                    sx={{ ml: 2, flex: 1 }}
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyUp={(e) => {
                                        console.log(e.key)
                                        if (e.key === "Enter") {
                                            navigate(`/?search=${search}`)
                                        }
                                    }}
                                />
                                <IconButton type="button" sx={{ p: 1 }}>
                                    <SearchIcon />
                                </IconButton>
                            </Box>
                        </div>
                        <div className='cyber-nav-menu'>

                            <ul>
                                <li className='list-item'>
                                    <NavLink to='/favourite' className="cyber-nav-links">
                                        Favourite
                                    </NavLink>
                                    <NavLink to='/trending' className="cyber-nav-links">
                                        trending
                                    </NavLink>
                                </li>
                            </ul>

                        </div>
                        <Box display="flex">
                            <IconButton onClick={colorMode.toggleColorMode}>
                                {theme.palette.mode === "dark" ? (
                                    <DarkModeOutlinedIcon />
                                ) : (
                                    <LightModeOutlinedIcon />
                                )}
                            </IconButton>
                            <IconButton>
                                <PersonOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default Header