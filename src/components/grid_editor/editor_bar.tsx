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

const sliderMarks = [
  { value: 10, label: "10 fps" },
  { value: 15, label: "" },
  { value: 20, label: "" },
  { value: 25, label: "" },
  { value: 30, label: "" },
  { value: 35, label: "" },
  { value: 40, label: "" },
  { value: 45, label: "" },
  { value: 50, label: "" },
  { value: 55, label: "" },
  { value: 60, label: "60 fps" },
];

export const CanvasToolbar = (props: Props) => {
  const grid = props.gol.grid;
  const gol = props.gol;

  const [showMenu, setShowmenu] = useState<boolean>(false);
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
        <Input placeholder="new project"></Input>
        <Checkbox
          icon={<PlayArrow />}
          checkedIcon={<Pause />}
          checked={gol.ctx.running}
          onClick={gol.toggleRunnngSim}
          sx={{
            marginRight: "auto",
            marginLeft: "auto",
          }}
        />
        <Slider
          aria-label="Custom marks"
          defaultValue={5}
          step={5}
          max={60}
          min={5}
          valueLabelDisplay="auto"
          marks={sliderMarks}
          size="medium"
          sx={{ width: "250px", marginLeft: "1rem", marginRight: "1rem" }}
          onChange={(e, newValue) =>
            typeof newValue === "number" && gol.setSimulationFramerate(newValue)
          }
        />
      </Toolbar>
    </AppBar>
  );
};
