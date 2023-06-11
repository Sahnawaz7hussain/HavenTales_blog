import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import { useLocation } from "react-router-dom";
import Loading from "../../components/loading/Loading";
const baseUrl = import.meta.env.VITE_BASE_URL;
const Home = () => {
  const location = useLocation();
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.get(`${baseUrl}/posts${search}`);
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        {loading ? (
          <Loading />
        ) : error ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ textAlign: "center", color: "red" }}>
              Something went wrong please try again!
            </p>
          </div>
        ) : (
          <>
            <Posts posts={posts} />
          </>
        )}
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
