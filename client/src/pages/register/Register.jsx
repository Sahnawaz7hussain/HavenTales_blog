import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";

const initSignupData = {
  username: "",
  email: "",
  password: "",
};
export default function Register() {
  const [signupData, setSignupData] = useState(initSignupData);
  const [error, setError] = useState(false);
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        signupData
      );
      res.data && window.location.replace("/login");
      console.log("register: ", res);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          name="username"
          onChange={handleOnChange}
          placeholder="Enter your username..."
          value={signupData.username}
        />

        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          name="email"
          onChange={handleOnChange}
          value={signupData.email}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          name="password"
          onChange={handleOnChange}
          value={signupData.password}
        />
        <button className="registerButton">Register</button>
      </form>
      <button className="registerLoginButton" type="submit">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "tomato", marginTop: "10px" }}>
          Something went wrong
        </span>
      )}
    </div>
  );
}
