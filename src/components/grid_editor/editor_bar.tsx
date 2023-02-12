import {
  ChevronRight,
  Pause,
  PlayArrow,
  Refresh,
  Shuffle,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Checkbox,
  Fab,
  Grow,
  IconButton,
  Input,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { CalculateNextGen } from "../../game_of_life";
import { UseGridReturnType } from "./editor_grid";

interface Props {
  grid: UseGridReturnType;
}

export const CanvasToolbar = (props: Props) => {
  const grid = props.grid;
  const menuButton = useRef<HTMLButtonElement>(null);

  const [showMenu, setShowmenu] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);

  const toggleShowMenu = () => {
    setShowmenu((prev) => !prev);
  };

  const toggleRunning = () => {
    setRunning((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        grid.advanceGeneration();
        console.log("tick");
      }
    }, 1000 / 10);

    return () => clearInterval(interval);
  }, [running, grid.ctx.state]);

  return (
    <AppBar position="relative">
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <IconButton
          onClick={toggleShowMenu}
          ref={menuButton}
          sx={{ marginRight: "1.0rem" }}
        >
          <MenuIcon />
        </IconButton>
        <Popper
          anchorEl={menuButton.current}
          open={showMenu}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper sx={{ width: "200px" }}>
                <MenuList>
                  <MenuItem>save</MenuItem>
                  <MenuItem>load</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Input placeholder="new project" sx={{ marginRight: "auto" }}></Input>
        <Checkbox
          icon={<PlayArrow />}
          checkedIcon={<Pause />}
          checked={running}
          onClick={toggleRunning}
        />
        <IconButton onClick={grid.advanceGeneration}>
          <ChevronRight></ChevronRight>
        </IconButton>
        <Stack
          direction="row"
          spacing="2rem"
          marginLeft="auto"
          marginRight="auto"
        >
          <Tooltip title="clear">
            <IconButton onClick={() => grid.fillCells(false)}>
              <Refresh></Refresh>
            </IconButton>
          </Tooltip>
          <Tooltip title="randomize">
            <IconButton onClick={grid.randomizeCells}>
              <Shuffle></Shuffle>
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
