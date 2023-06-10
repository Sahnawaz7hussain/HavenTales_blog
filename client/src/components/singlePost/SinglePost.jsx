import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./singlePost.css";
import { Context } from "../../context/Context";
import { headersObject } from "../../utils/constants";

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // delete post
  const deletePost = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
        { headers: headersObject() }
      );
      setIsLoading(false);
      toast.success("Post deleted.", { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        window.location.replace("/");
      }, 2500);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response.data, { position: toast.POSITION.TOP_CENTER });
      console.log("err: ", err);
    }
  };

  // update post.
  const handleUpdate = async () => {
    if (!title || !desc) {
      return toast.info("Please add and description", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setIsLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/posts/${post._id}`,
        {
          title,
          desc,
        },
        { headers: headersObject() }
      );
      toast.success("Post updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setUpdateMode(false);
      setIsLoading(false);
    } catch (err) {
      toast.error(err.response.data, { position: toast.POSITION.TOP_CENTER });
      setIsLoading(false);
    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={post.photo} alt="Phot" className="singlePostImg" />
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
            {post.userId?._id === user?._id && (
              <div className="singlePostEdit">
                <i
                  onClick={() => setUpdateMode(true)}
                  className="singlePostIcon fa-regular fa-pen-to-square"
                ></i>
                <i
                  disabled={isLoading}
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
            <Link to={`/?user=${post.userId?._id}`} className="link">
              <b>{post?.userId?.name}</b>
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
          <button
            disabled={isLoading}
            className="singlePostButton"
            onClick={handleUpdate}
          >
            {isLoading ? "Updating" : "Update"}
          </button>
        )}
      </div>
    </div>
  );
}
