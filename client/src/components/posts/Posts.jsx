import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts?.length > 0 &&
        posts.map((post, idx) => <Post key={idx} post={post} />)}
    </div>
  );
}
