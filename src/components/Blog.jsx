import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.updateLikes(blog.id, {
        likes: blog.likes + 1,
      });
      setBlogs((prevBlogs) =>
        prevBlogs.map((prevBlog) =>
          prevBlog.id === blog.id
            ? { ...prevBlog, likes: updatedBlog.likes }
            : prevBlog
        )
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleShowDetails}>
          {showDetails ? "hide" : "view"}
        </button>
        {showDetails && (
          <div>
            <div>{blog.author}</div>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}
              <button onClick={handleLike}>like</button>
            </div>
            <div>{user.name}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
