import { useTheme } from '@emotion/react';
import { AppBar, Toolbar, Typography, makeStyles } from '@mui/material';
import React, { useContext } from 'react'
import { ColorModeContext, tokens } from '../../theme';

const StickyHeader = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (
        <>
            <AppBar position="sticky" backgroundColor={colors.primary[400]}>
                <Toolbar>
                    <Typography variant="h6">Admin Panel</Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default StickyHeader