import "../App.css";
import React, { useState, useEffect } from "react";
import FormDialog from "../components/FormDialog";
import { findUser, getFilteredPosts } from "../data/repository";
import ImageAvatar from "../components/Avatar";
import Post from "../components/Post";
import AvatarSelection from "../components/AvatarSelection";
const Profile = (props) => {
  const [user, setUser] = useState("");
  const [usersPosts, setUsersPosts] = useState([]);

  async function loadUser() {
    const currentUser = await findUser(props.username);

    setUser(currentUser);
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
      <h1>Your Posts</h1>
      {usersPosts.map((post) => (
        <Post
          key={"post" + post.post_id}
          post={post}
          username={props.username}
          setPosts={setUsersPosts}
          isFiltered={true}
        />
      ))}
    </div>
  );
};

export default Profile;
