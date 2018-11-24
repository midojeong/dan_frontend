import * as React from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from "@material-ui/core";

export const AddButton = (props: any) => {
  return (
    <IconButton {...props}>
      <AddIcon fontSize="small" />
    </IconButton>
  );
}

export const DeleteButton = (props: any) => {
  return (
    <IconButton {...props}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}

export const EditButton = (props: any) => {
  return (
    <IconButton {...props}>
      <EditIcon fontSize="small" />
    </IconButton>
  );
}
