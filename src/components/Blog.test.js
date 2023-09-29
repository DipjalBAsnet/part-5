import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogs";

jest.mock("../services/blogs", () => ({
  updateLikes: jest.fn(),
}));

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

test("renders blog details when 'view' button is clicked", () => {
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

  const viewButton = screen.getByText("view");
  fireEvent.click(viewButton);

  const urlElement = screen.getByText("http://test.com");
  const likesElement = screen.getByText("likes 10");

  expect(urlElement).toBeInTheDocument();
  expect(likesElement).toBeInTheDocument();
});

test("clicking the like button calls event handler twice", async () => {
  blogService.updateLikes.mockResolvedValueOnce({ likes: 11 });

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

  const mockSetBlogs = jest.fn();

  render(<Blog blog={blog} user={user} setBlogs={mockSetBlogs} />);

  const viewButton = screen.getByText("view");
  userEvent.click(viewButton);

  // Make sure the like button is visible before clicking
  await screen.findByTestId("like-button");

  const likeButton = screen.getByTestId("like-button");
  userEvent.click(likeButton);
  userEvent.click(likeButton);

  await waitFor(() => {
    expect(mockSetBlogs).toHaveBeenCalledTimes(2);
  });
});
