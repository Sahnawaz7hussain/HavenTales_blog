import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./singlePost.css";
import { Context } from "../../context/Context";

const PF = "http://localhost:8080/images/";
export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}`
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [postId]);

  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
        { data: { username: user.username } }
      );
      window.location.replace("/");
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log("update error: ", err);
    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="Phot" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="singlePostTitleInput"
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  onClick={() => setUpdateMode(true)}
                  className="singlePostIcon fa-regular fa-pen-to-square"
                ></i>
                <i
                  onClick={deletePost}
                  className="singlePostIcon fa-regular fa-trash-can"
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="singlePostDescInput"
            rows={8}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
