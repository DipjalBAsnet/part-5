import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [viewClicked, setViewClicked] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
    setViewClicked(true);
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

  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs((prevBlogs) =>
          prevBlogs.filter((prevBlog) => prevBlog.id !== blog.id)
        );
      } catch (error) {
        console.log("Error deleting Blog:", error);
      }
    }
  };

  console.log("ba", blog.author);
  console.log("blog", blog);

  return (
    <div style={blogStyle}>
      <div className="blog">
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
            {user.username === blog.user.username && viewClicked && (
              <button onClick={handleDelete}>Delete</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  setBlogs: PropTypes.func.isRequired,
};

export default Blog;
