import "../App.css";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getPosts, createPost } from "../data/repository";
import Post from "../components/Post";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DOMPurify from "dompurify";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function Posts(props) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  // Load posts.
  async function loadPosts() {
    const currentPosts = await getPosts();

    setPosts(currentPosts.reverse());
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const handleInputChange = (event) => {
    const value = DOMPurify.sanitize(event.target.value);

    setNewPost(value);
  };

  const validate = () => {
    if (newPost !== "" && newPost.length < 600) {
      setError("");
      return true;
    } else {
      setError("post may not be empty or more than 600 characters");
      return false;
    }
  };

  // convertToBase64 function source: https://medium.com/nerd-for-tech/how-to-store-an-image-to-a-database-with-react-using-base-64-9d53147f6c4f
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const fileSelectHandler = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    console.log("fileSelectHandler triggered");
    setImage(base64);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //validate fields
    if (validate()) {
      //save to db
      const post = {
        username: props.username,
        text: newPost,
        image: image,
      };
      await createPost(post);
      loadPosts();

      //reset field to blank
      setNewPost("");
      setImage("");
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
          <span className={classes.root}>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={fileSelectHandler}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </span>
          <p>{newPost.length} characters</p>
          <img src={image} />
        </form>
      </main>
      <h1>Posts</h1>
      {posts.map(
        (post) =>
          post.username !== "[DELETED]" && (
            <Post key={post.post_id} post={post} username={props.username} />
          )
      )}
    </div>
  );
}

export default Posts;
