/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingPage from '../../../src/components/pages/LoadingPage.jsx';
import { renderWith } from '../../utils.js';

describe('LoadingPage tests', () => { 
  it('Should render LoadingPage', async () => {
    renderWith(<LoadingPage />, {
      withProvider: false,
      withRouter: false,
    });
    expect(screen.queryByRole(/image/i)).toBeInTheDocument();
  });
});
