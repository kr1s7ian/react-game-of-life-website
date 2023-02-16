import {
  Cancel,
  ContentCopy,
  CopyAll,
  Download,
  Save,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  IconButton,
  Input,
  InputBase,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { UseGolEditorReturnType } from "../hooks/useGolEditor";

interface Props {
  golEditor: UseGolEditorReturnType;
}

export const SaveDialog = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            setOpen(true);
            props.golEditor.save();
          }}
        >
          <ListItemIcon>{<Save></Save>}</ListItemIcon>
          <ListItemText primary={"Save"}></ListItemText>
        </ListItemButton>
      </ListItem>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle>Saved</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy this and use it to share the canvas
          </DialogContentText>
          <Paper sx={{ display: "flex", marginTop: "2rem" }}>
            <InputBase
              value={props.golEditor.getSave()}
              fullWidth
              sx={{ paddingLeft: "1rem" }}
            ></InputBase>
            <IconButton>
              <CopyAll></CopyAll>
            </IconButton>
          </Paper>

          <DialogActions sx={{ marginTop: "1rem" }}>
            <Button onClick={() => setOpen(false)}>cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
