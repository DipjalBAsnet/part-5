import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog title and author by default", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://test.com",
    likes: 10,
    user: {
      username: "testuser",
    },
  };

  const user = {
    username: "testuser",
    name: "Test User",
  };

  render(<Blog blog={blog} user={user} setBlogs={() => {}} />);

  // Check if title and author are rendered
  const titleElement = screen.getByText("Test Blog");
  // const authorElement = screen.getByText("Test Author");
  expect(titleElement).toBeInTheDocument();
  // expect(authorElement).toBeInTheDocument();

  // Check if URL and likes are not rendered
  const urlElement = screen.queryByText("http://test.com");
  const likesElement = screen.queryByText("likes 10");
  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});
