import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ImageAvatar from "./Avatar";
import { updateUser } from "../data/repository";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = async (value) => {
    const updatedUserInfo = {
      username: props.user.username,
      avatar: value,
    };
    const newUser = await updateUser(updatedUserInfo);
    props.setUser(newUser);
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Choose your new profile picture
      </DialogTitle>
      <List>
        <ListItem button onClick={() => handleListItemClick(1)}>
          <ListItemAvatar>
            <ImageAvatar avatarImage={1} size="profile" />
          </ListItemAvatar>
        </ListItem>
        <ListItem button onClick={() => handleListItemClick(2)}>
          <ListItemAvatar>
            <ImageAvatar avatarImage={2} size="profile" />
          </ListItemAvatar>
        </ListItem>
        <ListItem button onClick={() => handleListItemClick(3)}>
          <ListItemAvatar>
            <ImageAvatar avatarImage={3} size="profile" />
          </ListItemAvatar>
        </ListItem>
        <ListItem button onClick={() => handleListItemClick(4)}>
          <ListItemAvatar>
            <ImageAvatar avatarImage={4} size="profile" />
          </ListItemAvatar>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function AvatarSelection({ user, setUser }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Avatar
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        user={user}
        setUser={setUser}
      />
    </div>
  );
}
