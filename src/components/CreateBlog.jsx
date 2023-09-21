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
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default CreateBlog;
