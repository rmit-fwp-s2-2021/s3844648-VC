import "../App.css";
import React from "react";
import Students from "../assets/images/students.jpg"; //Photo by <a href="https://unsplash.com/@naassomz1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Naassom Azevedo</a> on <a href="https://unsplash.com/s/photos/students?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

function Home() {
  return (
    <div>
      <main>
        <h1>Welcome to Vibe Check!</h1>
        <p>
          Vide Check is here to allow students like you to discuss questions,
          queries, issues and suggestions about the courses you are studying.
          Vibe Check's goal is to provide students with a platform in which they
          can effectivly and safely network and interact with their peers during
          these trying times.
        </p>
        <h2>Get Started</h2>
        <p>
          To begin your experience, simply click "Sign Up" in the top right to
          make your account.
        </p>
        <p>
          Once you have created an account, you may immeadiately begin
          connecting with your peers by making a post in the "Posts" page. Or by
          replying to a post that one of your peers made.
        </p>
        <img src={Students} alt="students" />
      </main>
    </div>
  );
}

export default Home;
