import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getUser } from "../data/repository";
import {
  setPost,
  getPosts,
  deletePost,
  setComment,
  deleteComment,
  getFilteredPosts,
} from "../data/repository";

export default function PostMenu({
  post,
  comment,
  currentPost,
  setPosts,
  isComment,
  isFiltered,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [newPost, setNewPost] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenEdit(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    setNewPost(value);
  };

  const handleSaveEdit = () => {
    if (isComment) {
      setComment(post.id, comment.id, newPost);
    } else {
      setPost(post.id, newPost);
    }

    if (isFiltered) {
      setPosts(getFilteredPosts(getUser()).reverse());
    } else {
      setPosts(getPosts().reverse());
    }
    handleClose();
  };

  const handleDeletePost = () => {
    if (isComment) {
      deleteComment(post.id, comment.id);
    } else {
      deletePost(post.id);
    }

    if (isFiltered) {
      setPosts(getFilteredPosts(getUser()).reverse());
    } else {
      setPosts(getPosts().reverse());
    }

    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClickOpenEdit}>Edit</MenuItem>
        <Dialog
          open={openEdit}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You may edit your post here and hit save to update your post.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="post"
              label="Your post"
              fullWidth
              defaultValue={currentPost}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveEdit} color="primary">
              Save
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
