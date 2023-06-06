import "./singlePost.css";

export default function SinglePost() {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
          alt="Okay"
          className="singlePostImg"
        />
        <h1 className="singlePostTitle">
          Lorem ipsum dolor sit amet consectetur, adipisicing
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
            <i className="singlePostIcon fa-regular fa-trash-can"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <b>Sahnawaz Hussain</b>
          </span>
          <span className="singlePostDate">1 hour ago</span>
        </div>
        <p className="singlePostDesc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          doloribus deserunt sit nulla sapiente et nihil odit repudiandae.
          Accusantium molestias corporis dolor in earum consectetur ea
          laboriosam perspiciatis quas magni? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Perspiciatis doloribus deserunt sit
          nulla sapiente et nihil odit repudiandae. Accusantium molestias
          corporis dolor in earum consectetur ea laboriosam perspiciatis quas
          magni? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis doloribus deserunt sit nulla sapiente et nihil odit
          repudiandae. Accusantium molestias corporis dolor in earum consectetur
          ea laboriosam perspiciatis quas magni? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Perspiciatis doloribus deserunt sit
          nulla sapiente et nihil odit repudiandae. Accusantium molestias
          corporis dolor in earum consectetur ea laboriosam perspiciatis quas
          magni? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Perspiciatis doloribus deserunt sit nulla sapiente et nihil odit
          repudiandae. Accusantium molestias corporis dolor in earum consectetur
          ea laboriosam perspiciatis quas magni? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Perspiciatis doloribus deserunt sit
          nulla sapiente et nihil odit repudiandae. Accusantium molestias
          corporis dolor in earum consectetur ea laboriosam perspiciatis quas
          magni?
        </p>
      </div>
    </div>
  );
}
