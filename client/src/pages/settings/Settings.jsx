import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { Context } from "../../context/Context";
import "./settings.css";
import { headersObject, uploadFileToCloudinary } from "../../utils/constants";

export default function Settings() {
  const [profilePic, setProfilePic] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUploadingErr, setFileUploadingErr] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  const handleOnChangeFile = (e) => {
    const file = e.target.files[0];
    setFileUploading(true);
    setFileUploadingErr(false);
    uploadFileToCloudinary(file)
      .then((res) => {
        setProfilePic(res.data.secure_url);
        setFileUploadingErr(false);
        setFileUploading(false);
      })
      .catch((err) => {
        setFileUploadingErr(true);
        setFileUploading(false);
      });
    //console.log("file: ", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {};
    name && (updatedUser.name = name);
    bio && (updatedUser.bio = bio);
    password && (updatedUser.password = password);
    profilePic && (updatedUser.profilePic = profilePic);

    dispatch({ type: "UPDATE_START" });
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/${user._id}`,
        updatedUser,
        { headers: headersObject() }
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      console.log("res: ", res);
    } catch (err) {
      console.log("err: ", err);
      dispatch({ type: "UPDATE_FAILURE", payload: err });
    }
    console.log("updated ", updatedUser);
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={profilePic ? profilePic : user?.profilePic} alt="" />
            <label title="Click to change profile picture" htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={handleOnChangeFile}
            />
          </div>
          {fileUploading && <p>Updating profile pic...</p>}
          {fileUploadingErr && (
            <p style={{ color: "red" }}>
              Some error occured please try again...
            </p>
          )}
          <label>Name</label>
          <input
            type="text"
            placeholder={user?.name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user?.email}
            name="email"
            disabled={true}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <label>About yourself</label>
          <textarea
            type="text"
            placeholder={user?.bio}
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            style={{ resize: "inherit" }}
            rows={5}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
