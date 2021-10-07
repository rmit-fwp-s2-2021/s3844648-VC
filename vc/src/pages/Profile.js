import "../App.css";
import React, { useState } from "react";
import FormDialog from "../components/FormDialog";
import {
  getEmail,
  getPassword,
  getAvatar,
  getJoinDate,
  getFilteredPosts,
} from "../data/repository";
import ImageAvatar from "../components/Avatar";
import Post from "../components/Post";
import AvatarSelection from "../components/AvatarSelection";
const Profile = (props) => {
  const [user, setUser] = useState({
    username: props.username,
    email: getEmail(props.username),
    password: getPassword(props.username),
    avatar: getAvatar(props.username),
    joinDate: getJoinDate(props.username),
  });
  const [usersPosts, setUsersPosts] = useState(
    getFilteredPosts(props.username)
  );

  return (
    <div>
      <main className="profile-container">
        <div>
          <h2>Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Joined: {user.joinDate} </p>
          <FormDialog
            user={user}
            setUser={setUser}
            logoutUser={props.logoutUser}
          />
        </div>
        <div>
          <ImageAvatar avatarImage={user.avatar} size="profile" />
          <AvatarSelection user={user} setUser={setUser} />
        </div>
      </main>
      <h1>Your Posts</h1>
      {usersPosts.reverse().map((post) => (
        <Post
          key={post.id}
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
