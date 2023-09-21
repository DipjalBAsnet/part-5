import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successfulMessage, setSuccessfulMesssage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs([...blogs, newBlog]);
      setTitle("");
      setAuthor("");
      setUrl("");
      setSuccessfulMesssage(`a new blog ${newBlog.title} by ${newBlog.author}`);
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
    console.log("clicked logout");
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
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>

        <div>
          <form onSubmit={handleCreateNewBlog}>
            <div>
              title:
              <input
                type="text"
                name="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />{" "}
              <br />
            </div>
            <div>
              author:
              <input
                type="text"
                name="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />{" "}
              <br />
            </div>
            <div>
              url:
              <input
                type="url"
                name="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <br />
          </form>
          <button type="submit">create</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        errorMessage={errorMessage}
        successfulMessage={successfulMessage}
      />
      {user && (
        <div>
          <h3>{user.name} logged in</h3>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <h2>create new</h2>
      <CreateBlog
        handleCreateNewBlog={handleCreateNewBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />
    </div>
  );
};

export default App;
