import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningIcon from "@mui/icons-material/Warning";
import { User } from "../../hooks/useUsers";

interface OwnProps {
  user?: User;
  isOpen: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}

export default function DeleteUserDialog(props: OwnProps) {
  const { isOpen, handleSubmit, handleCancel, user } = props;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: "flex", alignItems: "center" }}>
          <WarningIcon
            color="error"
            sx={{
              marginRight: "8px",
            }}
          ></WarningIcon>
          Delete User?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} autoFocus>
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={handleSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
