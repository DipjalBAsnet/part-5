import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successfulMessage, setSuccessfulMesssage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log("blogs", blogs);

      const userBlogs = blogs.filter(
        (blog) => blog.user && blog.user.username === user?.username
      );

      setBlogs(sortByLikes(userBlogs));
      setSortedBlogs(sortByLikes(userBlogs));
    });
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleCreateNewBlog = async (blogData) => {
    try {
      const newBlog = await blogService.create(blogData);
      setBlogs([...blogs, newBlog]);
      setSuccessfulMesssage(`A new blog ${newBlog.title} by ${newBlog.author}`);
      setTimeout(() => {
        setSuccessfulMesssage(null);
      }, 5000);
    } catch (error) {
      console.error("Error creating blog:", error);
      setErrorMessage("Error creating blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken("");
    setUser(null);
  };

  const sortByLikes = (blogs) => {
    return blogs.slice().sort((a, b) => b.likes - a.likes);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong Username and password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification
          errorMessage={errorMessage}
          successfulMessage={successfulMessage}
        />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </div>
    );
  }

  const createBlogForm = () => {
    const hideWhenVisible = { display: createVisible ? "none" : "" };
    const showWhenVisible = { display: createVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>new blog</button>
        </div>

        <div style={showWhenVisible}>
          <CreateBlog handleCreateNewBlog={handleCreateNewBlog} />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        errorMessage={errorMessage}
        successfulMessage={successfulMessage}
      />
      {createBlogForm()}
      {user && (
        <div>
          <h3>{user.name} logged in</h3>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} setBlogs={setSortedBlogs} />
      ))}
    </div>
  );
};

export default App;
