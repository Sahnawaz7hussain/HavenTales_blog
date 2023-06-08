import { useState, useContext } from "react";
import axios from "axios";
import "./write.css";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      username: user.username,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        console.log("photo uploading......");
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/upload`,
          data
        );
        console.log("photo upload response", res);
      } catch (err) {
        console.log("photo upload error", err);
      }
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        newPost
      );
      window.location.replace(`/post/${res.data._id}`);
      console.log("new pst res: ", res);
    } catch (err) {
      console.log(er);
    }
  };
  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            name="desc"
            placeholder="Share your story..."
            type={"text"}
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
