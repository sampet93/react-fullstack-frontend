import React from "react";
import Box from "@mui/material/Box/Box";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableRow from "@mui/material/TableRow/TableRow";
import TableHead from "@mui/material/TableHead/TableHead";
import TableCell from "@mui/material/TableCell/TableCell";
import Paper from "@mui/material/Paper/Paper";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUsers } from "../../hooks/useUsers";
import { User } from "../../hooks/useUsers";
import AddEditUserDialog, { DialogType } from "../dialogs/AddEditUserDialog";
import DeleteUserDialog from "../dialogs/DeleteUserDialog";

export default function Home() {
  const { users, loading } = useUsers();
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleOpenDialog = (user: User, dialogType: DialogType) => {
    setSelectedUser(user);
    switch (dialogType) {
      case DialogType.Add:
        setAddDialogOpen(true);
        break;
      case DialogType.Edit:
        setEditDialogOpen(true);
        break;
      default:
        break;
    }
  };

  const handleOpenDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = () => {
    setEditDialogOpen(false);
    setSelectedUser(undefined);
  };

  const handleCancel = () => {
    setEditDialogOpen(false);
    setAddDialogOpen(false);
    setDeleteDialogOpen(false);
    setSelectedUser(undefined);
  };

  return (
    <Box mt={2}>
      {loading ? null : (
        <UsersTable
          users={users}
          handleOpenDialog={handleOpenDialog}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
        />
      )}
      <AddEditUserDialog
        dialogType={DialogType.Edit}
        isOpen={editDialogOpen}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        user={selectedUser!}
      />
      <AddEditUserDialog
        dialogType={DialogType.Add}
        isOpen={addDialogOpen}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        user={selectedUser!}
      />
      <DeleteUserDialog
        isOpen={deleteDialogOpen}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        user={selectedUser}
      />
    </Box>
  );
}

const UsersTable: React.FC<{
  users: User[];
  handleOpenDialog: (user: User, dialogType: DialogType) => void;
  handleOpenDeleteDialog: (user: User) => void;
}> = (props) => {
  const { users, handleOpenDialog, handleOpenDeleteDialog } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id} hover>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() => handleOpenDialog(user, DialogType.Edit)}
                  aria-label="Edit"
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleOpenDeleteDialog(user)} aria-label="Edit">
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
