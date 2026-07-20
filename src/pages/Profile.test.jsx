import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from './Profile';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getDoc, setDoc } from 'firebase/firestore';
import { updatePassword, updateProfile, reauthenticateWithCredential, deleteUser, signOut } from 'firebase/auth';

/**
 * @fileoverview Test suite for the Profile component.
 * Validates data fetching from Firestore, form interactions, password change validations,
 * modal interactions (account deletion), and theme toggling.
 */

// 1. MOCK EXTERNAL DEPENDENCIES

// Mock React Router
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock i18next translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, defaultText) => defaultText || key,
    i18n: { 
      language: 'es',
      changeLanguage: jest.fn() 
    }
  })
}));

// Mock Contexts
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn()
}));
const mockToggleDarkMode = jest.fn();
jest.mock('../context/ThemeContext', () => ({
  useTheme: () => ({ isDarkMode: false, toggleDarkMode: mockToggleDarkMode })
}));

// Mock Firebase Config & Auth
jest.mock('../firebase-config', () => ({
  db: {},
  auth: {}
}));

// Mock Firebase Functions
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn()
}));
jest.mock('firebase/auth', () => ({
  updateProfile: jest.fn(),
  updatePassword: jest.fn(),
  reauthenticateWithCredential: jest.fn(),
  EmailAuthProvider: { credential: jest.fn() },
  deleteUser: jest.fn(),
  signOut: jest.fn()
}));

// Mock AWS
jest.mock('../aws-config', () => ({
  s3Client: { send: jest.fn() },
  BUCKET_NAME: 'test-bucket'
}));
jest.mock('@aws-sdk/client-s3', () => ({ PutObjectCommand: jest.fn() }));

// Mock Helmet
jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div data-testid="helmet">{children}</div>
}));

// Mock global URL.createObjectURL to prevent failures when simulating image uploads
window.URL.createObjectURL = jest.fn();

// 2. TEST SUITE
describe('Profile Component', () => {

  const mockUser = {
    uid: 'user123',
    displayName: 'Joan Moreno',
    email: 'joan@test.com',
    photoURL: 'https://test.com/photo.jpg'
  };

  const mockFirestoreData = {
    phone: '600123456',
    address: 'Calle Falsa 123',
    postalCode: '08000',
    country: 'España',
    birthDate: '1995-05-15',
    language: 'es'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up the logged-in user
    useAuth.mockReturnValue({ currentUser: mockUser });
    
    // Mock the database (Firestore) response
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => mockFirestoreData
    });

    // Clear localStorage
    localStorage.clear();
  });

  const renderProfile = () => {
    return render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Profile />
      </BrowserRouter>
    );
  };

  // TEST 1: Initial data load (Smoke Test)
  it('should load and display user data from Firestore on mount', async () => {
    renderProfile();

    // Verify that the static name and email appear
    expect(screen.getByDisplayValue('Joan Moreno')).toBeInTheDocument();
    expect(screen.getByDisplayValue('joan@test.com')).toBeInTheDocument();

    // Wait for the asynchronous Firebase request to resolve and fill the fields
    await waitFor(() => {
      expect(screen.getByDisplayValue('600123456')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Calle Falsa 123')).toBeInTheDocument();
      expect(screen.getByDisplayValue('España')).toBeInTheDocument();
    });
  });

  // TEST 2: Password validation (Passwords do not match)
  it('should show an error if new password and confirm password do not match', async () => {
    renderProfile();
    
    await waitFor(() => expect(screen.getByDisplayValue('600123456')).toBeInTheDocument());

    const inputs = screen.getAllByPlaceholderText('********');
    const currentPassInput = inputs[0];
    const newPassInput = inputs[1];
    const confirmPassInput = inputs[2];

    fireEvent.change(currentPassInput, { target: { value: 'OldPassword1!' } });
    fireEvent.change(newPassInput, { target: { value: 'NewPassword1!' } });
    fireEvent.change(confirmPassInput, { target: { value: 'DifferentPassword1!' } });

    fireEvent.click(screen.getByText('profile.save_changes'));

    expect(await screen.findByText('profile.error_passwords_not_match')).toBeInTheDocument();
    
    // Verify that updatePassword was NOT called (password was not changed)
    // Note: setDoc WAS executed because the component saves general data before password validation.
    expect(updatePassword).not.toHaveBeenCalled();
  });

  // TEST 3: Interaction with the Delete Account Modal
  it('should open delete modal and call deleteUser when confirmed', async () => {
    renderProfile();
    await waitFor(() => expect(screen.getByDisplayValue('España')).toBeInTheDocument());

    // Click on "Delete account" (Opens the modal)
    fireEvent.click(screen.getByText('profile.delete_account'));

    // Check that the modal title appears
    expect(await screen.findByText('profile.modal_delete_title')).toBeInTheDocument();

    // Click on Confirm (Red button inside the modal)
    fireEvent.click(screen.getByText('profile.confirm_delete'));

    // Verify that the Firebase delete function is executed
    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith(mockUser);
    });
    
    // Verify redirection to the registration page
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  // TEST 4: Logout
  it('should call signOut and navigate to login when logout is clicked', async () => {
    renderProfile();
    await waitFor(() => expect(screen.getByDisplayValue('España')).toBeInTheDocument());

    // Click on "Logout"
    fireEvent.click(screen.getByText('profile.logout'));

    // Verify the calls
    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  // TEST 5: Toggle dark theme
  it('should call toggleDarkMode when the theme toggle button is clicked', async () => {
    renderProfile();
    await waitFor(() => expect(screen.getByDisplayValue('España')).toBeInTheDocument());

    // The theme button has no text, so we find it by its class or structure.
    // Since it's a button without an explicit aria-label, we use querySelector on the container or simply trigger the correct button.
    const themeButton = screen.getAllByRole('button').find(btn => btn.className.includes('rounded-full transition-colors'));
    
    if (themeButton) {
      fireEvent.click(themeButton);
      expect(mockToggleDarkMode).toHaveBeenCalled();
    }
  });

});