import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">User Management App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
