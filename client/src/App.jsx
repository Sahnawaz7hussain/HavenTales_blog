import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";

function App() {
  const isCurrentUser = false;
  return (
    <div className="App">
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Home />} />
        <Route
          path="/register"
          element={isCurrentUser ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={isCurrentUser ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/post/:postId" element={<Single />} />
        <Route
          path="/write"
          element={isCurrentUser ? <Write /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isCurrentUser ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>
      {/* <Home /> */}
      {/* <Single /> */}
      {/* <Write /> */}
      {/* <Settings /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
