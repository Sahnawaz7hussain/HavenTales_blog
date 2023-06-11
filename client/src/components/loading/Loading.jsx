import "./loading.css";
import loginGif from "../../assets/loading.gif";

export default function Loading({ type }) {
  return (
    <div className={type === "category" ? "category loading" : "loading"}>
      <img src={loginGif} alt="LOADING..." />
    </div>
  );
}
