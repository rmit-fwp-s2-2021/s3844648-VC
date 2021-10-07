import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import "../App.css";
import PostMenu from "./PostMenu";
import ImageAvatar from "./Avatar";
import { getAvatar } from "../data/repository";

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

export default function Comment({ post, comment, username, setPosts }) {
  const classes = useStyles();

  return (
    <Card className="comment-card">
      <CardHeader
        avatar={<ImageAvatar avatarImage={getAvatar(comment.username)} />}
        action={
          username === comment.username && (
            <PostMenu
              post={post}
              comment={comment}
              currentPost={comment.post}
              setPosts={setPosts}
              isComment={true}
            />
          )
        }
        title={comment.username}
        subheader={comment.date}
      />

      <CardContent>
        <Typography variant="body2" component="p">
          {comment.post}
        </Typography>
      </CardContent>
    </Card>
  );
}
