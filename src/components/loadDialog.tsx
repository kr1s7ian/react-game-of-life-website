import { Cancel, ContentCopy, CopyAll, Download } from "@mui/icons-material";
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
import { useGolEditor, UseGolEditorReturnType } from "../hooks/useGolEditor";

interface Props {
  golEditor: UseGolEditorReturnType;
}

export const LoadDialog = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  return (
    <div>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(true)}>
          <ListItemIcon>{<Download></Download>}</ListItemIcon>
          <ListItemText primary={"Load"}></ListItemText>
        </ListItemButton>
      </ListItem>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle>Loading</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Paste code from save dialog to load canvas
          </DialogContentText>
          <Paper sx={{ display: "flex", marginTop: "2rem" }}>
            <InputBase
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              sx={{ paddingLeft: "1rem" }}
            ></InputBase>
          </Paper>

          <DialogActions sx={{ marginTop: "1rem" }}>
            <Button onClick={() => setOpen(false)}>cancel</Button>
            <Button
              onClick={() => {
                setOpen(false);
                props.golEditor.load(input);
              }}
            >
              load
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
