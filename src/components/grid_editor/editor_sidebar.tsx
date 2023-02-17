import { Air, AirlineStops, Build, Refresh, Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useGolEditor, UseGolEditorReturnType } from "../../hooks/useGolEditor";

interface Props {
  golEditor: UseGolEditorReturnType;
}

export const EditorSidebar = (props: Props) => {
  const grid = props.golEditor.gol.grid;
  const gol = props.golEditor.gol;
  return (
    <AppBar position="relative">
      <Box sx={{ marginBottom: "4rem" }}></Box>
      <Tooltip placement="right" title="clear">
        <IconButton
          onClick={() => grid.fill(false)}
          sx={{ margin: "auto", width: "4rem", height: "4rem" }}
        >
          <Refresh></Refresh>
        </IconButton>
      </Tooltip>
      <Tooltip placement="right" title="randomize">
        <IconButton
          onClick={() => grid.randomize()}
          sx={{ margin: "auto", width: "4rem", height: "4rem" }}
        >
          <Air></Air>
        </IconButton>
      </Tooltip>
      <Tooltip placement="right" title="step simulation">
        <IconButton
          onClick={() => gol.advanceGeneration()}
          sx={{ margin: "auto", width: "4rem", height: "4rem" }}
        >
          <AirlineStops></AirlineStops>
        </IconButton>
      </Tooltip>
    </AppBar>
  );
};
