import React from "react";
import { User } from "./useUsers";
import { DialogType } from "../components/dialogs/AddEditUserDialog";

export function useUserDialog() {
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();
  const [dialog, setDialog] = React.useState<DialogType>();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const openDialog = (dialogType: DialogType, user?: User) => {
    setSelectedUser(user);
    setDialog(dialogType);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const closeDialog = () => {
    setDialog(undefined);
    setDeleteDialogOpen(false);
    setSelectedUser(undefined);
  };

  return {
    selectedUser,
    dialog,
    deleteDialogOpen,
    openDialog,
    openDeleteDialog,
    closeDialog,
  };
}
