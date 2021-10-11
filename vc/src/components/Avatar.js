import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Lion from "../assets/images/avatars/lion.jpg"; //Photo by <a href="https://unsplash.com/@ingo231177?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ingo Stiller</a> on <a href="https://unsplash.com/s/photos/lion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
import Badger from "../assets/images/avatars/badger.jpg"; //Photo by <a href="https://unsplash.com/@vincentvanzalinge?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Vincent van Zalinge</a> on <a href="https://unsplash.com/s/photos/badger?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
import Eagle from "../assets/images/avatars/eagle.jpg"; //Photo by <a href="https://unsplash.com/@jupp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jonathan Kemper</a> on <a href="https://unsplash.com/s/photos/eagle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
import Snake from "../assets/images/avatars/snake.jpg"; //Photo by <a href="https://unsplash.com/@tumbao1949?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">James Wainscoat</a> on <a href="https://unsplash.com/s/photos/cobra?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  profile: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

export default function ImageAvatar({ avatarImage, size }) {
  const classes = useStyles();
  const avatarImages = [Lion, Lion, Badger, Eagle, Snake];
  return (
    <div className={classes.root}>
      <Avatar
        alt="Remy Sharp"
        src={avatarImages[avatarImage]}
        className={size === "profile" && classes.profile}
      />
    </div>
  );
}
