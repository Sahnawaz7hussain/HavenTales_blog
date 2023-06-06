import { Link } from "react-router-dom";
import "./post.css";

export default function Post() {
  const dummyPostId = "sdfjsdfjsdjfsdfj";
  return (
    <div className="post">
      <img
        className="postImg"
        src="https://images.unsplash.com/photo-1550948390-6eb7fa773072?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80"
        alt="post"
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">Music</span>
          <span className="postCat">Life</span>
        </div>
        <span className="postTitle">
          <Link to={`post/${dummyPostId}`} className="link">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </Link>
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
        dignissimos temporibus saepe corrupti, quisquam quis tempora minima
        vitae molestiae voluptatibus? Nam cum enim eveniet repudiandae! Iste
        blanditiis itaque unde corrupti. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Hic dignissimos temporibus saepe corrupti, quisquam
        quis tempora minima vitae molestiae voluptatibus? Nam cum enim eveniet
        repudiandae! Iste blanditiis itaque unde corrupti. Lorem ipsum dolor
        sit, amet consectetur adipisicing elit. Hic dignissimos temporibus saepe
        corrupti, quisquam quis tempora minima vitae molestiae voluptatibus? Nam
        cum enim eveniet repudiandae! Iste blanditiis itaque unde corrupti.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
        dignissimos temporibus saepe corrupti, quisquam quis tempora minima
        vitae molestiae voluptatibus? Nam cum enim eveniet repudiandae! Iste
        blanditiis itaque unde corrupti.
      </p>
    </div>
  );
}
