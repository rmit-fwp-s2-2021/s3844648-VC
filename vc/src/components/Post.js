import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../App.css";
import Comment from "./Comment";
import PostMenu from "./PostMenu";
import { getAvatar, createComment, getComments } from "../data/repository";
import ImageAvatar from "./Avatar";
import { SystemUpdateTwoTone } from "@material-ui/icons";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const uploadStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function UploadButton({ setCommentImage }) {
  const classes = uploadStyles();

  // convertToBase64 function source: https://medium.com/nerd-for-tech/how-to-store-an-image-to-a-database-with-react-using-base-64-9d53147f6c4f
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const fileSelectHandler = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setCommentImage(base64);
  };

  return (
    <span className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={fileSelectHandler}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </span>
  );
}

export default function Post({ post, username, setPosts, isFiltered }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("");

  async function loadComments() {
    const currentComments = await getComments(post.post_id);

    setComments(currentComments.reverse());
  }

  async function loadAvatar() {
    const userAvatar = await getAvatar(post.username);
    console.log("avatar: " + userAvatar);
    setAvatar(userAvatar);
  }

  useEffect(() => {
    loadComments();
    loadAvatar();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    setNewComment(value);
  };

  const validate = () => {
    if (newComment !== "") {
      setError("");
      return true;
    } else {
      setError("Comment may not be empty");
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //validate fields
    if (validate()) {
      //save to db
      const comment = {
        username: username,
        post_id: post.post_id,
        text: newComment,
        image: commentImage,
      };
      await createComment(comment);
      loadComments();

      //reset field to blank
      setNewComment("");
    }
  };

  return (
    <Card className="post-card">
      <CardHeader
        avatar={<ImageAvatar avatarImage={avatar} />}
        action={
          username === post.username && (
            <PostMenu
              post={post}
              currentPost={post.text}
              setPosts={setPosts}
              isComment={false}
              isFiltered={isFiltered}
            />
          )
        }
        title={post.username}
        subheader={post.createdAt}
      />
      <CardContent>
        <Typography paragraph component="p">
          {post.text}
        </Typography>
        <img src={post.image} />
        <form onSubmit={handleSubmit}>
          <TextField
            id="newComment"
            label="Reply to this post..."
            placeholder=""
            multiline
            fullWidth
            onChange={handleInputChange}
            helperText={error}
            value={newComment}
          />
          <Button type="submit" variant="contained" color="primary">
            Post
          </Button>
          <UploadButton setCommentImage={setCommentImage} />
          <img src={commentImage} />
          <p>yo?</p>
        </form>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="body1" color="textSecondary" component="p">
          {comments.length} comment(s)
        </Typography>
        {comments.length > 0 && (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments.map((comment) => (
            <Comment
              key={"comment" + comment.comment_id}
              post={post}
              comment={comment}
              username={username}
              setPosts={setPosts} //add setComments
              isFiltered={isFiltered}
            />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
