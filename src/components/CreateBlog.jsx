import { useState } from "react";

const CreateBlog = ({ handleCreateNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    handleCreateNewBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-testid="title-input"
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            data-testid="author-input"
            required
          />
        </div>
        <div>
          url:
          <input
            type="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            data-testid="url-input"
            required
          />
        </div>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default CreateBlog;
