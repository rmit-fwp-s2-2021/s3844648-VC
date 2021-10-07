import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getUser, removeUser } from "./data/repository";
import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState(getUser());

  const loginUser = (user) => {
    setUsername(user);
  };

  const logoutUser = () => {
    removeUser();
    setUsername(null);
  };

  return (
    <Router>
      <div>
        <Header username={username} logoutUser={logoutUser} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/signin"
            render={(props) => <Signin {...props} loginUser={loginUser} />}
          />
          <Route
            path="/profile"
            render={(props) => (
              <Profile {...props} username={username} logoutUser={logoutUser} />
            )}
          />
          <Route
            path="/posts"
            render={(props) => <Posts {...props} username={username} />}
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
