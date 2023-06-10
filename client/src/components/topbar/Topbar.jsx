import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
  const [mobile, setMobile] = useState(false);
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setMobile((pre) => !pre);
    //alert("logout");
  };
  const mobileNavigation = () => {
    setMobile((pre) => !pre);
  };
  return (
    <div className="top">
      <div className="topLeft">
        <a href="/">
          <h3>HavenTales</h3>
        </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/about" className="link">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/contact" className="link">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={user?.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
      {mobile ? (
        <i
          onClick={() => setMobile((pre) => !pre)}
          class="bars fa-solid fa-xmark"
        ></i>
      ) : (
        <i
          onClick={() => setMobile((pre) => !pre)}
          class="bars fa-solid fa-bars"
        ></i>
      )}
      {mobile ? (
        <div className="mobile">
          <ul className="topList">
            <Link to="/write" className="link">
              <li onClick={mobileNavigation} className="topListItem">
                WRITE
              </li>
            </Link>
            {user ? (
              <Link to="/settings" className="link">
                <li onClick={mobileNavigation} className="topListItem">
                  ACCOUNT SETTING
                </li>
              </Link>
            ) : (
              <>
                <Link onClick={mobileNavigation} to="/login" className="link">
                  <li className="topListItem">LOGIN</li>
                </Link>
                <Link to="/register" className="link">
                  <li onClick={mobileNavigation} className="topListItem">
                    REGISTER
                  </li>
                </Link>
              </>
            )}
            <Link to="/about" className="link">
              <li onClick={mobileNavigation} className="topListItem">
                ABOUT
              </li>
            </Link>
            <Link to="/contact" className="link">
              <li onClick={mobileNavigation} className="topListItem">
                CONTACT
              </li>
            </Link>

            <li className="topListItem" onClick={handleLogout}>
              {user && <button className="logoutButton">LOGOUT</button>}
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
