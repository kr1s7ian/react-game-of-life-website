import { grid2Classes } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { CanvasToolbar } from "./editor_bar";
import GridCanvas from "./editor_grid";
import { UseGridReturnType } from "./editor_grid";

interface Props {
  grid: UseGridReturnType;
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
      <CanvasToolbar grid={props.grid}></CanvasToolbar>
      <GridCanvas grid={props.grid} />
    </Box>
  );
};

export default Editor;
