import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupcreds, setsignupcreds] = useState({});
  let navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setsignupcreds({
      ...signupcreds,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/discussion/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupcreds),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        alert("signup sucessfull");
        navigate("/login")
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("signup failed")
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="enter email..."
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="password"
        placeholder="enter password..."
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="role"
        placeholder="role"
        onChange={handleChange}
      />
      <br />
      <button type="submit">submit</button>
    </form>
  );
};

export default Signup;
