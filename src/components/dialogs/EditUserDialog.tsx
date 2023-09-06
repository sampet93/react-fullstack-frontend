import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { User } from "../../hooks/useUsers";

interface OwnProps {
  user?: User;
  isOpen: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}

export default function EditUserDialog(props: OwnProps) {
  const { isOpen, handleSubmit, handleCancel, user } = props;

  return (
    <div>
      <Dialog open={isOpen} onClose={handleCancel}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit user credentials</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={user?.email}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.name}
          />
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.username}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
