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
import {
  getAvatar,
  createComment,
  getComments,
  findUser,
} from "../data/repository";
import ImageAvatar from "./Avatar";
import { SystemUpdateTwoTone } from "@material-ui/icons";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DOMPurify from "dompurify";

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

export default function Post({ post, username, setPosts, isFiltered }) {
  const classes = useStyles();
  const uploadButtonClasses = uploadStyles();
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
    const value = DOMPurify.sanitize(event.target.value);

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
              setPosts={setPosts}
              isFiltered={isFiltered}
            />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
