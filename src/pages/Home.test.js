import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import { userStore } from "../stores/UserStore";

// Mock userStore
jest.mock('../stores/UserStore', () => ({
  userStore: jest.fn(() => ({
    username: 'mockUsername',
    token: 'mockToken',
  })),
}));


describe('Home component', () => {
  it('displays the username in the header when user is logged in', () => {
    // Mock user data
    const username = 'testUser';
    const token = 'testToken';

    // Mock userStore behavior
    userStore.mockReturnValueOnce({
      username,
      token,
    });

    // Render Home component
    const { getByText } = render(<Home />);

    // Check if username appears in the header
    const welcomeMessage = getByText(`Welcome, ${username}`);
    expect(welcomeMessage).toBeInTheDocument();
  });
});



// Another test case
test('renders username in header', () => {
  const username = 'John Doe'; // Mock username
  const { getByText } = render(<Home />);
  const usernameElement = getByText(`Welcome, ${username}`);
  console.log("USERNAME INSERIDO" + usernameElement); // Logging the username element
  expect(usernameElement).toBeInTheDocument();
});
