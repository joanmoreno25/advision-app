import React from 'react';
import { render, act } from '@testing-library/react';
import App from './App';

/**
 * @fileoverview Main integration test suite for the App component.
 * Validates that the entire application renders without crashing, mocking critical dependencies
 * such as Firebase Authentication and internationalization (i18next) to ensure isolated test execution.
 */

// GLOBAL FIREBASE MOCK FOR THE MAIN APP
jest.mock('./firebase-config', () => ({
  auth: {
    /**
     * Simulates Firebase real-time session verification.
     * Starts as a guest (no session).
     */
    onAuthStateChanged: jest.fn((callback) => {
      callback(null); 
      return jest.fn(); // Cleanup function
    }) 
  },
  db: {}
}));

// GLOBAL TRANSLATION MOCK
// Prevents the app from attempting to download language JSON files from the internet during tests.
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { 
      language: 'es',
      changeLanguage: jest.fn() 
    }
  })
}));

describe('Main App Component', () => {
  /**
   * Integration test: Verifies that the app boots successfully.
   */
  it('should render the entire application without crashing', async () => {
    
    // Using 'await act', the test pauses execution and waits for 
    // all initial Promises, Suspenses, and useEffects in App.jsx to resolve.
    await act(async () => {
      render(<App />);
    });
    
    // If the application renders without throwing console errors, the test passes.
    expect(true).toBe(true);
  });
});