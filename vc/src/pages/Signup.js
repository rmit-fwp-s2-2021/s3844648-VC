import "../App.css";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createUser } from "../data/repository";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Signup(props) {
  const classes = useStyles();

  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    console.log(event.target.id + ": " + event.target.value);
    const name = event.target.id;
    const value = event.target.value;

    const temp = { ...fields };
    temp[name] = value;
    setFields(temp);
  };

  const validate = () => {
    let temp = {};
    temp.username = fields.username ? "" : "name is required";

    temp.email = /^[^@]+@[^@]+\.[^@]+$/.test(fields.email)
      ? ""
      : "email must be in proper format";
    temp.password =
      //source: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        fields.password
      )
        ? ""
        : "password must be at least six characters and should be a mix of uppercase and lowercase characters, numbers and punctuation";

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //validate fields
    if (validate()) {
      console.log("valid!");
      //save to db
      //addUser(fields.username, fields.email, fields.password);
      console.log("fields: " + fields);
      const user = await createUser(fields);
      //set user state
      console.log("user: " + user);
      //show confirmation message
      window.alert("Account successfully created!");
      //navigate to signin
      props.history.push("/signin");
    }
  };

  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="username"
          label="Username"
          onChange={handleInputChange}
          helperText={errors.username}
        />
        <TextField
          id="email"
          label="Email"
          onChange={handleInputChange}
          helperText={errors.email}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          onChange={handleInputChange}
          helperText={errors.password}
        />

        <Button type="submit" variant="contained" color="primary">
          SUBMIT
        </Button>
      </form>
    </div>
  );
}
