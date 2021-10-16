import "../App.css";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { verifyUser } from "../data/repository";
import DOMPurify from "dompurify";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Signin(props) {
  const classes = useStyles();

  const [fields, setFields] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (event) => {
    console.log(event.target.id + ": " + event.target.value);

    const name = event.target.id;

    const value = DOMPurify.sanitize(event.target.value);
    console.log(event.target.id + ": " + value);

    const temp = { ...fields };
    temp[name] = value;
    setFields(temp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await verifyUser(fields.username, fields.password);

    //if verified login the user
    if (user !== null) {
      props.loginUser(user);

      //navigate to posts
      props.history.push("/posts");
      return;
    }

    //reset password field to blank
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);

    //set error message
    setErrorMessage("Invalid username or password");
  };

  return (
    <div className="sign-up">
      <h1>Sign In</h1>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="username"
          label="Username"
          onChange={handleInputChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          onChange={handleInputChange}
        />
        {errorMessage !== null && (
          <div>
            <p className="text-danger">{errorMessage}</p>
          </div>
        )}

        <Button type="submit" variant="contained" color="primary">
          SUBMIT
        </Button>
      </form>
    </div>
  );
}
