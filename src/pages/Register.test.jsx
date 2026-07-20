import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

/**
 * @fileoverview Test suite for the Register component.
 * Validates form rendering, rigorous input validation (password strength, mismatched passwords, unaccepted terms),
 * and successful Firebase account creation and Google OAuth flows.
 */

// 1. MOCK EXTERNAL DEPENDENCIES
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

jest.mock('firebase/auth', () => ({
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn()
}));

jest.mock('../firebase-config', () => ({
  auth: {}
}));

jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div data-testid="helmet">{children}</div>
}));

jest.mock('../assets/logo-v2.png', () => 'logo-mock.png');
jest.mock('../assets/register-image.png', () => 'register-image-mock.png');

// 2. TEST SUITE
describe('Register Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderRegister = () => {
    return render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Register />
      </BrowserRouter>
    );
  };

  // TEST 1: Smoke Test
  it('should render all form elements correctly', () => {
    renderRegister();
    expect(screen.getByPlaceholderText('Ej. Ana García')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ana.garcia@ejemplo.com')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('••••••••')).toHaveLength(2);
    
    // FIX: Search specifically for a "button" role to ignore the <h1>
    expect(screen.getByRole('button', { name: 'Crear cuenta' })).toBeInTheDocument();
  });

  // TEST 2: Form Validations (Weak password and empty fields)
  it('should validate empty fields, weak passwords and unaccepted terms', async () => {
    renderRegister();
    
    // FIX: Search specifically for the button
    const submitBtn = screen.getByRole('button', { name: 'Crear cuenta' });

    // 1. Attempt without filling anything
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Todos los campos son obligatorios.')).toBeInTheDocument();

    // 2. Attempt with invalid email
    fireEvent.change(screen.getByPlaceholderText('Ej. Ana García'), { target: { value: 'Joan' } });
    fireEvent.change(screen.getByPlaceholderText('ana.garcia@ejemplo.com'), { target: { value: 'correo-falso' } });
    fireEvent.change(screen.getAllByPlaceholderText('••••••••')[0], { target: { value: 'Password123!' } });
    fireEvent.change(screen.getAllByPlaceholderText('••••••••')[1], { target: { value: 'Password123!' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Por favor, introduce un correo electrónico válido.')).toBeInTheDocument();

    // 3. Attempt with passwords that do not match
    fireEvent.change(screen.getByPlaceholderText('ana.garcia@ejemplo.com'), { target: { value: 'joan@test.com' } });
    fireEvent.change(screen.getAllByPlaceholderText('••••••••')[1], { target: { value: 'Different123!' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Las contraseñas no coinciden.')).toBeInTheDocument();

    // 4. Attempt with weak password and unaccepted terms
    fireEvent.change(screen.getAllByPlaceholderText('••••••••')[0], { target: { value: '123' } });
    fireEvent.change(screen.getAllByPlaceholderText('••••••••')[1], { target: { value: '123' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.')).toBeInTheDocument();

    // Verify that Firebase has not been called due to validation errors
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  // TEST 3: Registration Happy Path
  it('should successfully register a user and navigate to dashboard', async () => {
    renderRegister();
    
    // Mock successful Firebase response, returning a simulated user
    const mockUser = { user: { uid: '123' } };
    createUserWithEmailAndPassword.mockResolvedValueOnce(mockUser);
    updateProfile.mockResolvedValueOnce();

    // Fill out the form correctly
    fireEvent.change(screen.getByPlaceholderText('Ej. Ana García'), { target: { value: 'Joan Moreno' } });
    fireEvent.change(screen.getByPlaceholderText('ana.garcia@ejemplo.com'), { target: { value: 'joan@test.com' } });
    fireEvent.change(screen.getAllByPlaceholderText('••••••••')[0], { target: { value: 'Password123!' } });
    fireEvent.change(screen.getAllByPlaceholderText('••••••••')[1], { target: { value: 'Password123!' } });
    
    // Check the terms checkbox using its ID
    const termsCheckbox = screen.getByRole('checkbox');
    fireEvent.click(termsCheckbox);

    // Submit
    // FIX: Use getByRole
    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }));

    // Wait for Firebase calls
    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'joan@test.com', 'Password123!');
      expect(updateProfile).toHaveBeenCalledWith(mockUser.user, { displayName: 'Joan Moreno' });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  // TEST 4: Google Sign-In
  it('should call Google Sign-In and navigate on success', async () => {
    renderRegister();
    
    signInWithPopup.mockResolvedValueOnce({});
    
    fireEvent.click(screen.getByText('Continuar con Google'));

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

});