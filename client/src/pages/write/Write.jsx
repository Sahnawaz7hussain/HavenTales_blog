import { useState, useContext } from "react";
import axios from "axios";
import "./write.css";
import { Context } from "../../context/Context";
import { headersObject, uploadFileToCloudinary } from "../../utils/constants";

const initPostData = {
  title: "",
  desc: "",
  category: "Life",
  photo: "",
};

export default function Write() {
  const [postData, setPostData] = useState(initPostData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);

  // handle input Onchange;
  const handleInputOnChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    if (file) {
      try {
        let res = await uploadFileToCloudinary(file);
        postData.photo = res.data.secure_url;
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      }
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        postData,
        { headers: headersObject() }
      );
      window.location.replace(`/post/${res.data._id}`);
      setIsLoading(false);
      setIsError(false);
      console.log("new pst res: ", res);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      console.log(er);
    }
    console.log("post Data: ", postData);
  };

  // console.log("bahar: ", postData);
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
            onChange={handleInputOnChange}
            name="title"
          />
        </div>
        <div className="writeFormGroupSelect">
          <label htmlFor="category">Category</label>
          <select onChange={handleInputOnChange} name="category" id="category">
            <option value="Life">Life</option>
            <option value="Fashion">Fashion</option>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="Music">Music</option>
            <option value="Food">Food</option>
          </select>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Share your story..."
            type={"text"}
            className="writeInput writeText"
            onChange={handleInputOnChange}
            name="desc"
          ></textarea>
        </div>
        <button className="writeSubmit" disabled={isLoading} type="submit">
          Publish
        </button>
      </form>
      {isError && (
        <p style={{ color: "red" }}>Something went wrong please try again!</p>
      )}
    </div>
  );
}
