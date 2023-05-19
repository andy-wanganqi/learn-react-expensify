/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HelpPage from '../../../src/components/pages/helpPage.jsx';
import { renderWith } from '../../utils.js';

describe('HelpPage tests', () => {
  beforeAll(() => {
  })

  it('Should render HelpPage', async () => {
    renderWith(<HelpPage />);
    expect(screen.queryByText(/Help Page/i)).toBeInTheDocument();
  });

});