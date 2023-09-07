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

export default function Home() {
  const { users, loading, addUser, editUser, deleteUser, fetchUsers } = useUsers();
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();
  const [dialog, setDialog] = React.useState<DialogType>();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleOpenDialog = (dialogType: DialogType, user?: User) => {
    setSelectedUser(user);
    setDialog(dialogType);
  };

  const handleOpenDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleSubmitAdd = async (newUser: NewUser) => {
    const response = await addUser(newUser);
    fetchUsers().then(() => {
      setDialog(undefined);
      setSelectedUser(undefined);
    });
  };

  const handleSubmitDelete = async (id: number) => {
    Promise.resolve(deleteUser(id)).then(() => {
      fetchUsers().then(() => {
        setDialog(undefined);
        setSelectedUser(undefined);
        setDeleteDialogOpen(false);
      });
    });
    setDialog(undefined);
    setSelectedUser(undefined);
  };

  const handleSubmitEdit = async (user: User) => {
    Promise.resolve(editUser(user)).then(() => {
      fetchUsers().then(() => {
        setDialog(undefined);
        setSelectedUser(undefined);
      });
    });
  };

  const handleCancel = () => {
    setDialog(undefined);
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
        dialogType={dialog}
        isOpen={!!dialog}
        handleSubmitAdd={handleSubmitAdd}
        handleSubmitEdit={handleSubmitEdit}
        handleCancel={handleCancel}
        user={selectedUser!}
      />
      <DeleteUserDialog
        isOpen={deleteDialogOpen}
        handleSubmit={handleSubmitDelete}
        handleCancel={handleCancel}
        userId={selectedUser?.id}
      />
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: "8px", right: "8px" }}
        onClick={() => handleOpenDialog(DialogType.Add)}
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
