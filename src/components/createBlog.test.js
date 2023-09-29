import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateBlog from "./CreateBlog";
import userEvent from "@testing-library/user-event";

test("<CreateBlog /> calls handleCreateNewBlog with correct details when a new blog is created", async () => {
  const handleCreateNewBlog = jest.fn();

  render(<CreateBlog handleCreateNewBlog={handleCreateNewBlog} />);

  const titleInput = screen.getByTestId("title-input");
  const authorInput = screen.getByTestId("author-input");
  const urlInput = screen.getByTestId("url-input");
  const createButton = screen.getByText("create");

  await userEvent.type(titleInput, "Test Title");
  await userEvent.type(authorInput, "Test Author");
  await userEvent.type(urlInput, "http://test.com");
  await userEvent.click(createButton);

  expect(handleCreateNewBlog).toHaveBeenCalledWith({
    title: "Test Title",
    author: "Test Author",
    url: "http://test.com",
  });
});
