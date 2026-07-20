import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Terms from './Terms';

/**
 * @fileoverview Test suite for the Terms component.
 * Validates the rendering of static legal content and verifies the back navigation logic.
 */

// 1. MOCK EXTERNAL DEPENDENCIES
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }) => <div data-testid="helmet">{children}</div>
}));

jest.mock('../assets/logo-v2.png', () => 'logo-mock.png');

// 2. TEST SUITE
describe('Terms Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderTerms = () => {
    return render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Terms />
      </BrowserRouter>
    );
  };

  // TEST 1: Rendering of legal text
  it('should render the terms and conditions text', () => {
    renderTerms();
    
    // Verify that important titles and dates are present
    expect(screen.getByText('Términos y Condiciones Generales de Uso')).toBeInTheDocument();
    expect(screen.getByText(/Última actualización: 13 de Junio de 2026/i)).toBeInTheDocument();
    expect(screen.getByText('1. Objeto y Ámbito de Aplicación')).toBeInTheDocument();
    expect(screen.getByText('11. Legislación Aplicable y Jurisdicción')).toBeInTheDocument();
  });

  // TEST 2: "Go Back" navigation logic
  it('should navigate back (-1) in history when back button is clicked', () => {
    renderTerms();
    
    // There are two "Go Back" buttons (top and bottom). We click the first one.
    const backButtons = screen.getAllByText('Volver atrás');
    fireEvent.click(backButtons[0]);

    // Verify that the router received the "-1" command (Go to the previous page in history)
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

});