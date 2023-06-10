import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./sidebar.css";
import sahnawazPic from "../../assets/sahnawaz.png";
import { Context } from "../../context/Context";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  const { user } = useContext(Context);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/categories`
      );
      //console.log("res: ", res);
      setCategories(res.data);
    };
    getCategories();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src={user ? user.profilePic : sahnawazPic} alt="about me" />
        <p>
          {user
            ? user.bio
            : `Sahnawaz Hussain is a Full Stack Web Developer specializing in MERN
          stack with expertise in building ecommerce websites. Proficient in
          HTML, CSS, JavaScript, ReactJS, Redux, and GitHub. Strong soft skills
          in teamwork, creativity, and communication. Completed Full Stack
          Development training from Masai School.`}
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((category, idx) => (
            <Link key={idx} to={`/?category=${category.name}`} className="link">
              <li className="sidebarListItem">{category.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
}
