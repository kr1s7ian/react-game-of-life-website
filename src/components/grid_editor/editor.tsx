import { grid2Classes } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { UseGolReturnType } from "../../hooks/useGol";
import { CanvasToolbar } from "./editor_bar";
import GridCanvas from "./editor_grid";

interface Props {
  gol: UseGolReturnType;
}

const Editor = (props: Props) => {
  return (
    <Box
      width="90vw"
      height="80vh"
      sx={{
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <CanvasToolbar gol={props.gol}></CanvasToolbar>
      <GridCanvas grid={props.gol.grid} />
    </Box>
  );
};

export default Editor;
export {};
