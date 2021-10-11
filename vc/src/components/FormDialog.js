import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteAlert from "./DeleteAlert";
import { updateUser } from "../data/repository";

export default function FormDialog({ user, setUser, logoutUser }) {
  const [open, setOpen] = React.useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    console.log(event.target.id + ": " + event.target.value);
    const name = event.target.id;
    const value = event.target.value;

    const temp = { ...fields };
    temp[name] = value;
    setFields(temp);
  };

  const handleEmail = async () => {
    const updatedUserInfo = {
      username: user.username,
      email: fields.email,
    };
    const newUser = await updateUser(updatedUserInfo);
    setUser(newUser);
    handleClose();
  };

  const handlePassword = async () => {
    const updatedUserInfo = {
      username: user.username,
      password: fields.password,
    };
    const newUser = await updateUser(updatedUserInfo);
    setUser(newUser);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Manage Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change your email address and password here or delete your account.
          </DialogContentText>
          <TextField
            id="username"
            label="username"
            fullWidth
            defaultValue={user.username}
            disabled
          />
          <Button color="primary" disabled>
            Update Username
          </Button>
          <TextField
            id="email"
            label="Email"
            fullWidth
            defaultValue={user.email}
            onChange={handleInputChange}
          />
          <Button onClick={handleEmail} color="primary">
            Update Email
          </Button>
          <TextField
            id="password"
            label="Password"
            fullWidth
            defaultValue={user.password}
            onChange={handleInputChange}
          />
          <Button onClick={handlePassword} color="primary">
            Update Password
          </Button>
        </DialogContent>
        <Button color="primary">
          <DeleteAlert username={user.username} logoutUser={logoutUser} />
        </Button>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
