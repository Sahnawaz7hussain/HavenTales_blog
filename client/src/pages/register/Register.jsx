import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { uploadFileToCloudinary } from "../../utils/constants";
import { Context } from "../../context/Context";

const initSignupData = {
  name: "",
  email: "",
  password: "",
  bio: "",
  profilePic: "",
};

export default function Register() {
  const [signupData, setSignupData] = useState(initSignupData);
  const [file, setFile] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgUploadingErr, setImgUploadingErr] = useState(false);

  // handle input OnChange
  const handleOnChange = (e) => {
    setError(null);
    let { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  // handle uplood image.
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgUploading(true);
    uploadFileToCloudinary(file)
      .then((res) => {
        signupData.profilePic = res.data.secure_url;
        setImgUploading(false);
        setFile(res.data.secure_url);
      })
      .catch((err) => {
        setImgUploading(false);
        setImgUploadingErr(true);
      });
  };

  // handle fubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password)
      return alert("all fields are required!");
    setError(null);
    setIsLoading(true);
    signupData.profilePic = file;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        signupData
      );
      setIsLoading(false);
      res.data && alert("Signup success");
      setTimeout(() => window.location.replace("/login"), 5000);
      console.log("register: ", res);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };
  if (error) {
    alert(error);
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="profilePicBox">
          <img
            src={
              file
                ? file
                : "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
            }
            alt=""
          />
          <label htmlFor="profilePic" className="profilePicLabel">
            <i className="profilePicIcon fa-sharp fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        {imgUploading && <span>Image uploading...</span>}
        {imgUploadingErr && (
          <span style={{ color: "red" }}>Image uploading err..</span>
        )}
        <label>Name</label>
        <input
          className="registerInput"
          type="text"
          name="name"
          onChange={handleOnChange}
          placeholder="Enter your name..."
          value={signupData.name}
          required
        />

        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
          name="email"
          onChange={handleOnChange}
          value={signupData.email}
          required
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          name="password"
          onChange={handleOnChange}
          value={signupData.password}
          maxLength={20}
          minLength={6}
          required
        />
        <label>About youself</label>
        <textarea
          className="registerInput"
          type="text"
          placeholder="About yourself..."
          name="bio"
          onChange={handleOnChange}
          rows={5}
          value={signupData.bio}
          maxLength={200}
        />
        <button className="registerButton">
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
      <button className="registerLoginButton" type="submit">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "tomato", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
}
