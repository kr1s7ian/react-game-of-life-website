import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Home } from "@mui/icons-material";
import { Stack } from "@mui/system";

export const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Tooltip title="Home">
            <IconButton href="/react-game-of-life-website/">
              <Home></Home>
            </IconButton>
          </Tooltip>
          <Button
            href="/react-game-of-life-website/editor/"
            sx={{
              my: 2,
              color: "white",
              display: "block",
            }}
          >
            {"Editor"}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
