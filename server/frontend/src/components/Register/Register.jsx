import React, { useState } from 'react';
import "./Register.css";
import Header from '../Header/Header';

const Register = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register_url = window.location.origin + "/djangoapp/register";

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });

      const json = await res.json();

      if (res.ok && json.status === "Authenticated") {
        sessionStorage.setItem("username", json.userName || userName);
        window.location.href = "/";
      } else {
        alert(json.error || json.message || "Registration failed. Please check your details.");
      }
    } catch (error) {
      alert("Unable to register. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="modalContainer"
        >
          <form className="login_panel" onSubmit={register}>
            <div>
              <span className="input_field">Username </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input_field"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div>
              <span className="input_field">First Name </span>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input_field"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <span className="input_field">Last Name </span>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input_field"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div>
              <span className="input_field">Email </span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input_field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <span className="input_field">Password </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                className="action_button"
                type="submit"
                value="Register"
              />
              <input
                className="action_button"
                type="button"
                value="Cancel"
                onClick={() => {
                  window.location.href = "/";
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
