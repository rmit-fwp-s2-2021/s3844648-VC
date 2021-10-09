import axios from "axios";

const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

//The following functions are from the Week 8 lab: verifyUser, findUser, createUser, getPosts, createPost, setUser,  getUser, removeUser

//User -------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { username, password },
  });
  const user = response.data;

  if (user !== null) setUser(user.username);

  return user.username;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function getAvatar(user) {}

async function getEmail(user) {}

async function getJoinDate(user) {}

async function getPassword(user) {}

async function setAvatar(user, newAvatar) {}

async function setEmail(user, newEmail) {}

async function setPassword(user, newnewPassword) {}

async function deleteUser(id) {}

//Post -------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

//Comment-----------------------------------------------------------------------------------

async function getComments(post_id) {
  const response = await axios.get(
    API_HOST + `/api/comments/select/${post_id}`
  );
  return response.data;
}

async function createComment(comment) {
  const response = await axios.post(API_HOST + "/api/comments", comment);

  return response.data;
}

//Other

async function getFilteredPosts() {}

async function setPost() {} //not required

async function setComment() {} //not required

async function deletePost() {} //not required

async function deleteComment() {} //not required

//Helper functions to interact with local storage ------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser,
  findUser,
  createUser,
  getEmail,
  getAvatar,
  getJoinDate,
  getPassword,
  setAvatar,
  setEmail,
  setPassword,
  deleteUser,
  getPosts,
  createPost,
  getUser,
  removeUser,
  getComments,
  createComment,
  getFilteredPosts,
  setPost,
  setComment,
  deletePost,
  deleteComment,
};
