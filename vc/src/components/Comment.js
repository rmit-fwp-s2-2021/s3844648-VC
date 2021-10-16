import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "../App.css";
import ImageAvatar from "./Avatar";
import { getAvatar } from "../data/repository";

export default function Comment({ comment }) {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    async function loadAvatar() {
      const userAvatar = await getAvatar(comment.username);
      setAvatar(userAvatar);
    }

    loadAvatar();
  }, []);

  return (
    <Card className="comment-card">
      <CardHeader
        avatar={<ImageAvatar avatarImage={avatar} />}
        title={comment.username}
        subheader={comment.createdAt}
      />

      <CardContent>
        <Typography variant="body2" component="p">
          {comment.text}
        </Typography>
      </CardContent>
    </Card>
  );
}
