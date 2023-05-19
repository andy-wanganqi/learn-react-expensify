/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '../../../src/components/pages/notFoundPage.jsx';
import { renderWith } from '../../utils.js';

describe('NotFoundPage tests', () => {
  beforeAll(() => {
  })

  it('Should render NotFoundPage', async () => {
    renderWith(<NotFoundPage />);
    expect(screen.queryByText(/404/i)).toBeInTheDocument();
  });

});