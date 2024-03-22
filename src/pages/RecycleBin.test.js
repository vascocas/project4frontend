import React from 'react';
import { render, screen } from '@testing-library/react';
import RecycleBin from './RecycleBin';
import { userStore } from '../stores/UserStore';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock the userStore
jest.mock('../stores/UserStore', () => ({
  userStore: jest.fn(),
}));

describe('RecycleBin', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('renders RecycleBin component', () => {
    // Mock user role
    const mockUserRole = 'PRODUCT_OWNER';
    // Mock userStore role value
    userStore.mockReturnValueOnce({ role: mockUserRole });

    // Render the RecycleBin component
    render(<RecycleBin />);

    // Expect the page title to be rendered
    expect(screen.getByText('Recycle Bin')).toBeInTheDocument();

    // Expect the deleted tasks section to be rendered
    expect(screen.getByText('Deleted Tasks')).toBeInTheDocument();

    // Expect the taskRecycle-container to be rendered
    expect(screen.getByTestId('taskRecycle-container')).toBeInTheDocument();

    // Expect the back to Scrum Board button to be rendered
    expect(screen.getByText('Back to Scrum Board')).toBeInTheDocument();

    // Expect the button to navigate to the Home page when clicked
    const navigateMock = jest.fn();
    // Mock the useNavigate hook to return the navigateMock function
    require('react-router-dom').useNavigate.mockReturnValueOnce(navigateMock);
    // Click the back to Scrum Board button
    const backButton = screen.getByText('Back to Scrum Board');
    backButton.click();
    // Expect the navigate function to be called with the correct path
    expect(navigateMock).toHaveBeenCalledWith('/Home');
  });
});
