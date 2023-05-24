/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Frame from '../../../src/components/layout/frame.jsx';
import DashboardPage from '../../../src/components/pages/dashboardPage.jsx';
import { renderWith } from '../../utils.js';

describe('Frame component tests', () => {
  it('Should render Frame with dashboard', async () => {
    renderWith(Frame(<DashboardPage />), {
      withRouter: true,
    });
    expect(screen.queryByText(/Dashboard Page/i)).toBeInTheDocument();
  });
});