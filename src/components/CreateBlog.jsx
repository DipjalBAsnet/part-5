const CreateBlog = ({
  handleCreateNewBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={setTitle}
            required
          />{" "}
          <br />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={setAuthor}
            required
          />{" "}
          <br />
        </div>
        <div>
          url:
          <input type="url" name="url" value={url} onChange={setUrl} required />
        </div>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default CreateBlog;
