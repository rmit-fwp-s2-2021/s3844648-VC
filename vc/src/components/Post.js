import React, { useState } from "react";
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
import { getPosts, createComment } from "../data/repository";
import ImageAvatar from "./Avatar";
import { getAvatar } from "../data/repository";
import { SystemUpdateTwoTone } from "@material-ui/icons";

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

export default function Post({ post, username, setPosts, isFiltered }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [newComment, setNewComment] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();

    //validate fields
    if (validate()) {
      //save to localStorage
      createComment(post.id, username, newComment);
      setPosts(getPosts().reverse());

      //reset field to blank
      setNewComment("");
    }
  };

  return (
    <Card className="post-card">
      <CardHeader
        avatar={<ImageAvatar avatarImage={getAvatar(post.username)} />}
        action={
          username === post.username && (
            <PostMenu
              post={post}
              currentPost={post.post}
              setPosts={setPosts}
              isComment={false}
              isFiltered={isFiltered}
            />
          )
        }
        title={post.username}
        subheader={post.date}
      />
      <CardContent>
        <Typography paragraph component="p">
          {post.post}
        </Typography>
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
          {post.replies.length} comment(s)
        </Typography>
        {post.replies.length > 0 && (
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
          {post.replies.map((comment) => (
            <Comment
              key={comment.id}
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
