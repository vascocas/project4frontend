import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

test("renders Login component", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  // Simulate typing into the username and password fields
  fireEvent.change(screen.getByLabelText(/Enter your username:/i), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText(/Enter your password:/i), {
    target: { value: "testpassword" },
  });

  // Simulate form submission
  fireEvent.submit(screen.getByText(/Login/i));

  // Wait for the asynchronous login process to complete
  await waitFor(() => {
    // Assert that the user is redirected to the home page after successful login
    expect(window.location.pathname).toBe("/home");
  });
});
