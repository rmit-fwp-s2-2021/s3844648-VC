import "../App.css";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getPosts, createPost } from "../data/repository";
import Post from "../components/Post";
import UploadButton from "../components/UploadButton";

function Posts(props) {
  const [posts, setPosts] = useState(getPosts().reverse());
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;

    setNewPost(value);
  };

  const validate = () => {
    if (newPost !== "") {
      setError("");
      return true;
    } else {
      setError("post may not be empty");
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //validate fields
    if (validate()) {
      //save to localStorage
      createPost(props.username, newPost);
      setPosts(getPosts().reverse());

      //reset field to blank
      setNewPost("");
    }
  };

  return (
    <div>
      <main>
        <h2>Make a New Post</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            id="newPost"
            label="Share your thoughts..."
            placeholder=""
            multiline
            fullWidth
            onChange={handleInputChange}
            helperText={error}
            value={newPost}
          />
          <Button type="submit" variant="contained" color="primary">
            Post
          </Button>
        </form>
      </main>
      <h1>Posts</h1>
      {posts.map(
        (post) =>
          post.username !== "[DELETED]" && (
            <Post
              key={post.id}
              post={post}
              username={props.username}
              setPosts={setPosts}
            />
          )
      )}
    </div>
  );
}

export default Posts;
