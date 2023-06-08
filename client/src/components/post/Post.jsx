import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const dummyPostId = "sdfjsdfjsdjfsdfj";
  const PF = "http://localhost:8080/images/";
  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={PF + post.photo} alt="photo" />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post?.categories.map((cats, idx) => (
            <span key={idx} className="postCat">
              {cats.name}
            </span>
          ))}
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
