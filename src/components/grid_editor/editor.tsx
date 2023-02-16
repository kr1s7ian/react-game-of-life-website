import { grid2Classes } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { UseGolReturnType } from "../../hooks/useGol";
import { UseGolEditorReturnType } from "../../hooks/useGolEditor";
import { CanvasToolbar } from "./editor_bar";
import GridCanvas from "./editor_grid";

interface Props {
  golEditor: UseGolEditorReturnType;
}

const Editor = (props: Props) => {
  return (
    <Box width="100%" height="90vh">
      <CanvasToolbar golEditor={props.golEditor}></CanvasToolbar>
      <GridCanvas golEditor={props.golEditor} />
    </Box>
  );
};
export default Editor;
