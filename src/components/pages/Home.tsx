import React from "react";
import Box from "@mui/material/Box";
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
import { NewUser, useUsers } from "../../hooks/useUsers";
import { User } from "../../hooks/useUsers";
import AddEditUserDialog, { DialogType } from "../dialogs/AddEditUserDialog";
import DeleteUserDialog from "../dialogs/DeleteUserDialog";
import Fab from "@mui/material/Fab";
import { useUserDialog } from "../../hooks/useUserDialog";

export default function Home() {
  const { users, loading, addUser, editUser, deleteUser, fetchUsers } = useUsers();
  const { selectedUser, dialog, deleteDialogOpen, openDialog, openDeleteDialog, closeDialog } =
    useUserDialog();

  const handleSubmitAdd = async (newUser: NewUser) => {
    await addUser(newUser);
    fetchUsers().then(() => {
      closeDialog();
    });
  };

  const handleSubmitDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers().then(() => {
      closeDialog();
    });
  };

  const handleSubmitEdit = async (user: User) => {
    await editUser(user);
    fetchUsers().then(closeDialog);
  };

  return (
    <Box mt={2}>
      {loading ? null : (
        <UsersTable
          users={users}
          handleOpenDialog={openDialog}
          handleOpenDeleteDialog={openDeleteDialog}
        />
      )}
      <AddEditUserDialog
        dialogType={dialog}
        isOpen={!!dialog}
        handleSubmitAdd={handleSubmitAdd}
        handleSubmitEdit={handleSubmitEdit}
        handleCancel={closeDialog}
        user={selectedUser!}
      />
      <DeleteUserDialog
        isOpen={deleteDialogOpen}
        handleSubmit={handleSubmitDelete}
        handleCancel={closeDialog}
        userId={selectedUser?.id}
      />
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: "8px", right: "8px" }}
        onClick={() => openDialog(DialogType.Add)}
      >
        <EditIcon />
        Add User
      </Fab>
    </Box>
  );
}

const UsersTable: React.FC<{
  users: User[];
  handleOpenDialog: (dialogType: DialogType, user?: User) => void;
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
                  onClick={() => handleOpenDialog(DialogType.Edit, user)}
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
