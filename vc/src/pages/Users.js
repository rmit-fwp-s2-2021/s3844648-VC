import "../App.css";
import React, { useState, useEffect } from "react";
import { getUsers, findUser, follow, unfollow } from "../data/repository";
import ImageAvatar from "../components/Avatar";
import Button from "@material-ui/core/Button";
function Users(props) {
  const [followedUsers, setFollowedUsers] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  async function loadFollowedUsers() {
    const currentUser = await findUser(props.username);

    const followed = [];
    currentUser.follows.forEach((follow) => followed.push(follow.followee));

    setFollowedUsers(followed);
  }

  async function loadAllUsers() {
    const users = await getUsers();
    setAllUsers(users);
  }

  useEffect(() => {
    loadFollowedUsers();
    loadAllUsers();
  }, []);

  const handleFollow = async (followee) => {
    const follows = {
      username: props.username,
      followee: followee,
    };
    await follow(follows);

    loadFollowedUsers();
  };

  const handleUnfollow = async (followee) => {
    const follows = {
      username: props.username,
      followee: followee,
    };
    await unfollow(follows);

    loadFollowedUsers();
  };

  return (
    <div>
      <h1>Users</h1>

      {allUsers.map(
        (user) =>
          user.username !== props.username && (
            <main key={user.username}>
              <ImageAvatar avatarImage={user.avatar} size="profile" />
              <h2>{user.username}</h2>
              {followedUsers.includes(user.username) ? (
                <Button
                  variant="outlined"
                  color="primary"
                  disabled
                  onClick={() => handleUnfollow(user.username)}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleFollow(user.username)}
                >
                  Follow
                </Button>
              )}
            </main>
          )
      )}
    </div>
  );
}

export default Users;
