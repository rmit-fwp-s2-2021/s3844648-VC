import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import ImageAvatar from "./Avatar";
import {
  getEmail,
  getPassword,
  getJoinDate,
  setAvatar,
  getAvatar,
} from "../data/repository";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    setAvatar(props.user.username, value);
    const updatedUser = {
      username: props.user.username,
      email: getEmail(props.user.username),
      password: getPassword(props.user.username),
      avatar: getAvatar(props.user.username),
      joinDate: getJoinDate(props.user.username),
    };
    props.setUser(updatedUser);
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
        <ListItem button onClick={() => handleListItemClick(0)}>
          <ListItemAvatar>
            <ImageAvatar avatarImage={0} size="profile" />
          </ListItemAvatar>
        </ListItem>
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