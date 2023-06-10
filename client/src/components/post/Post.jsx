import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const dummyPostId = "sdfjsdfjsdjfsdfj";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={post.photo} alt="photo" />}
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">{post.category}</span>
        </div>
        <span className="postTitle">
          <Link to={`post/${post._id}`} className="link">
            {post?.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post?.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post?.desc}</p>
    </div>
  );
}
