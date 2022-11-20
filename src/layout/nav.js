import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function Nav() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const nav = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (_linkTo) => {
    nav(_linkTo)
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => {
            nav("/profile")
          }}>
            Into It
          </Typography>
          <div>
            <span>{currentUser?.name}</span>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                handleClose("/profile")
              }}>Profile</MenuItem>
              <MenuItem onClick={() => {
                handleClose("/logout")
              }}>Logout</MenuItem>
            </Menu>
          </div>

        </Toolbar>
      </AppBar>

    </Box>
  )
}
