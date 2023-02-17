import { Grid, grid2Classes } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { UseGolReturnType } from "../../hooks/useGol";
import { UseGolEditorReturnType } from "../../hooks/useGolEditor";
import { CanvasToolbar } from "./editor_bar";
import GridCanvas from "./editor_grid";
import { EditorSidebar } from "./editor_sidebar";

interface Props {
  golEditor: UseGolEditorReturnType;
}

const Editor = (props: Props) => {
  return (
    <Grid spacing={0} container width="100%" height="90vh">
      <Grid item xs={1}>
        <EditorSidebar golEditor={props.golEditor}></EditorSidebar>
      </Grid>
      <Grid item xs={11}>
        <Box>
          <CanvasToolbar golEditor={props.golEditor}></CanvasToolbar>
          <GridCanvas golEditor={props.golEditor} />
        </Box>
      </Grid>
    </Grid>
  );
};
export default Editor;
