import "../App.css";
import React, { useState, useEffect } from "react";
import {
  findUser,
  getFilteredPosts,
  updateUser,
  deleteUser,
} from "../data/repository";
import ImageAvatar from "../components/Avatar";
import Post from "../components/Post";
//import AvatarSelection from "../components/AvatarSelection";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DOMPurify from "dompurify";
import { useHistory } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

function AvatarSelection({ user, setUser }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleListItemClick = async (value) => {
    const updatedUserInfo = {
      username: user.username,
      avatar: value,
    };
    const newUser = await updateUser(updatedUserInfo);
    setUser(newUser);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Avatar
      </Button>
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
    </div>
  );
}

//Edit account form
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteAlert(props) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log(props.username);
    await deleteUser(props.username);
    props.logoutUser();

    history.push("/signin");
    //setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="secondary">
        Delete Account
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure you want to delete your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This will permanently remove your account. All your posts and
            replies will also be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function FormDialog({ user, setUser, logoutUser }) {
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

    const value = DOMPurify.sanitize(event.target.value);

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

//main page
const Profile = (props) => {
  const [user, setUser] = useState("");
  const [followedUsers, setFollowedUsers] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);

  async function loadUser() {
    const currentUser = await findUser(props.username);

    setUser(currentUser);

    const followed = [];
    currentUser.follows.forEach((follow) => followed.push(follow.followee));

    setFollowedUsers(followed);
  }

  async function loadUserPosts() {
    const posts = await getFilteredPosts(props.username);
    setUsersPosts(posts);
  }

  useEffect(() => {
    loadUser();
    loadUserPosts();
  }, []);

  return (
    <div>
      <main className="profile-container">
        <div>
          <h2>Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Joined: {user.createdAt} </p>
          <FormDialog
            user={user}
            setUser={setUser}
            logoutUser={props.logoutUser}
            loadUser={loadUser}
          />
        </div>
        <div>
          <ImageAvatar avatarImage={user.avatar} size="profile" />
          <AvatarSelection user={user} setUser={setUser} />
        </div>
      </main>
      <main>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{followedUsers.length} Following</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {followedUsers.map((followee) => (
              <Typography>{followee}</Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      </main>

      <h1>Your Posts</h1>
      {usersPosts.map((post) => (
        <Post
          key={"post" + post.post_id}
          post={post}
          username={props.username}
        />
      ))}
    </div>
  );
};

export default Profile;
