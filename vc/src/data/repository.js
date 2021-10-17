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

  if (user !== null) {
    setUser(user.username);
    return user.username;
  } else return null;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function getAvatar(id) {
  const user = await findUser(id);

  return user.avatar;
}

async function updateUser(user) {
  const response = await axios.put(API_HOST + "/api/users", user);

  return response.data;
}

async function deleteUser(id) {
  const response = await axios.delete(API_HOST + `/api/users/delete/${id}`);

  return response.data;
}

async function getUsers() {
  const response = await axios.get(API_HOST + "/api/users");

  return response.data;
}

//Post -------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

async function getFilteredPosts(username) {
  const response = await axios.get(API_HOST + `/api/posts/select/${username}`);

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

//Follow
async function follow(follows) {
  const response = await axios.post(API_HOST + "/api/follows", follows);

  return response.data;
}

async function unfollow(follows) {
  const response = await axios.delete(
    API_HOST + "/api/follows/delete",
    follows
  );

  return response.data;
}

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
  getAvatar,
  updateUser,
  deleteUser,
  getPosts,
  createPost,
  getUser,
  removeUser,
  getComments,
  createComment,
  getFilteredPosts,
  getUsers,
  follow,
  unfollow,
};
