import "./loading.css";
import loginGif from "../../assets/loading.gif";

export default function Loading() {
  return (
    <div className="loading">
      <img src={loginGif} alt="LOADING..." />
    </div>
  );
}
