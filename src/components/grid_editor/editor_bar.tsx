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
  Slider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { UseGolReturnType } from "../../hooks/useGol";

interface Props {
  gol: UseGolReturnType;
}

export const CanvasToolbar = (props: Props) => {
  const grid = props.gol.grid;
  const gol = props.gol;
  const menuButton = useRef<HTMLButtonElement>(null);

  const [showMenu, setShowmenu] = useState<boolean>(false);

  const toggleShowMenu = () => {
    setShowmenu((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (gol.ctx.running) {
        gol.advanceGeneration();
      }
    }, 1000 / gol.ctx.simulationFramerate);

    return () => clearInterval(interval);
  }, [gol]);

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
          checked={gol.ctx.running}
          onClick={gol.toggleRunnngSim}
        />
        <Slider
          aria-label="Custom marks"
          defaultValue={5}
          step={5}
          max={90}
          min={5}
          valueLabelDisplay="auto"
          marks
          size="medium"
          sx={{ width: "250px", marginLeft: "1rem", marginRight: "1rem" }}
          onChange={(e, newValue) =>
            typeof newValue === "number" && gol.setSimulationFramerate(newValue)
          }
        />
        <IconButton onClick={gol.advanceGeneration}>
          <ChevronRight></ChevronRight>
        </IconButton>
        <Stack
          direction="row"
          spacing="2rem"
          marginLeft="auto"
          marginRight="auto"
        >
          <Tooltip title="clear">
            <IconButton onClick={() => grid.fill(false)}>
              <Refresh></Refresh>
            </IconButton>
          </Tooltip>
          <Tooltip title="randomize">
            <IconButton onClick={grid.randomize}>
              <Shuffle></Shuffle>
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
