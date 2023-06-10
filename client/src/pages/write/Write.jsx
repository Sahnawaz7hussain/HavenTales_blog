import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./write.css";
import { Context } from "../../context/Context";
import { headersObject, uploadFileToCloudinary } from "../../utils/constants";

const initPostData = {
  title: "",
  desc: "",
  category: "Life",
  photo:
    "https://images.unsplash.com/photo-1686226347032-b82efa11af93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80",
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
    const { title, desc, category } = postData;
    setIsLoading(true);
    setIsError(false);
    if (!title || !category || !desc) {
      return toast.warning("all fiels are required", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
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
      toast.success("New post added successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        window.location.replace(`/post/${res.data._id}`);
      }, 4500);
      setIsLoading(false);
      setIsError(false);
      console.log("new pst res: ", res);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      toast.error(err.response.data, { position: toast.POSITION.TOP_CENTER });
    }
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
            required
          />
        </div>
        <div className="writeFormGroupSelect">
          <label htmlFor="category">Category</label>
          <select
            required
            onChange={handleInputOnChange}
            name="category"
            id="category"
          >
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
            required
            placeholder="Share your story..."
            type={"text"}
            className="writeInput writeText"
            onChange={handleInputOnChange}
            name="desc"
          ></textarea>
        </div>
        <button className="writeSubmit" disabled={isLoading} type="submit">
          {isLoading ? "Publishing" : "Publish"}
        </button>
      </form>
      {isError && (
        <p style={{ color: "red" }}>Something went wrong please try again!</p>
      )}
    </div>
  );
}
