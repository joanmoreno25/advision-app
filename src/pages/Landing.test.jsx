import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Landing from './Landing';

/**
 * @fileoverview Test suite for the Landing component.
 * Validates the initial rendering of structural sections, correct routing links,
 * and dynamic scroll-based styling for the navigation bar.
 */

// 1. MOCK EXTERNAL DEPENDENCIES

// Mock the Navbar component to isolate the Landing test. 
// This prevents Landing tests from failing if the Navbar component has an error.
jest.mock('../components/Navbar', () => () => <div data-testid="navbar-mock">Navbar</div>);

// Mock React Helmet
jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div data-testid="helmet">{children}</div>
}));

// Mock all static images to avoid Webpack resolution failures in Jest
jest.mock('../assets/hero-mockup.png', () => 'hero-mockup.png');
jest.mock('../assets/feature1-mockup.png', () => 'feature1-mockup.png');
jest.mock('../assets/feature2-mockup.png', () => 'feature2-mockup.png');
jest.mock('../assets/underline.png', () => 'underline.png');
jest.mock('../assets/security-mockup.png', () => 'security-mockup.png');
jest.mock('../assets/logo.svg', () => 'logo.svg');

// 2. TEST SUITE
describe('Landing Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset scroll to 0 before each test for safety
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  const renderLanding = () => {
    return render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Landing />
      </BrowserRouter>
    );
  };

  // TEST 1: Initial rendering of main sections (Smoke Test)
  it('should render all main sections correctly', () => {
    renderLanding();
    
    // Verify that the Navbar is present
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();

    // Verify main section titles
    expect(screen.getByText(/Gestión Inteligente de/i)).toBeInTheDocument();
    expect(screen.getByText(/Extracción de Texto/i)).toBeInTheDocument();
    expect(screen.getByText(/Etiquetado/i)).toBeInTheDocument();
    expect(screen.getByText(/Seguridad y/i)).toBeInTheDocument();
  });

  // TEST 2: Verify navigation links (Routing)
  it('should contain correct navigation links to Login and Register', () => {
    renderLanding();

    // Check the Hero link (main button)
    const loginLink = screen.getByText('Procesar mi primera imagen').closest('a');
    expect(loginLink).toHaveAttribute('href', '/login');

    // Check the registration links in the CTA sections
    const registerLink1 = screen.getByText('Crear cuenta gratuita').closest('a');
    expect(registerLink1).toHaveAttribute('href', '/register');

    const registerLink2 = screen.getByText('Crear cuenta gratis').closest('a');
    expect(registerLink2).toHaveAttribute('href', '/register');
  });

  // TEST 3: Navbar Scroll Event (Glassmorphism effect)
  it('should change header styling when user scrolls down', () => {
    renderLanding();
    
    // 1. Find the parent container of the Navbar (the fixed wrapper)
    const headerWrapper = screen.getByTestId('navbar-mock').parentElement;

    // 2. Verify that it has a transparent background initially
    expect(headerWrapper.className).toContain('bg-transparent');
    expect(headerWrapper.className).not.toContain('bg-[#0F172A]/90');

    // 3. Simulate user scrolling down (modify scrollY value to 100)
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    // 4. Verify that the class has changed to the dark background with blur (backdrop-blur)
    expect(headerWrapper.className).toContain('bg-[#0F172A]/90');
    expect(headerWrapper.className).not.toContain('bg-transparent');
  });

});