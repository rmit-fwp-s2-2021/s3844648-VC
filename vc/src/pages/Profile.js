import "../App.css";
import React, { useState, useEffect } from "react";
import FormDialog from "../components/FormDialog";
import { findUser, getFilteredPosts } from "../data/repository";
import ImageAvatar from "../components/Avatar";
import Post from "../components/Post";
import AvatarSelection from "../components/AvatarSelection";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
