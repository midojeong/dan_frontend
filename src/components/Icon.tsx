import * as React from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
import ViewListIcon from '@material-ui/icons/ViewList';
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

export const CheckButton = (props: any) => {
  return (
    <IconButton {...props}>
      <CheckIcon fontSize="small" />
    </IconButton>
  )
}

export const SendButton = (props: any) => {
  return (
    <IconButton {...props}>
      <SendIcon fontSize="small" />
    </IconButton>
  )
}

export const ViewListButton = (props: any) => {
  return (
    <IconButton {...props}>
      <ViewListIcon fontSize="small" />
    </IconButton>
  )
}
