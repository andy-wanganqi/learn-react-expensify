/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Frame from '../../../src/components/layout/Frame.jsx';
import DashboardPage from '../../../src/components/pages/DashboardPage.jsx';
import { renderWith } from '../../utils.js';
import { signedInGoogleUser } from '../../fixtures/googleUsers.js';
import { setUser } from '../../../src/store/slices/userSlice.js';

describe('Frame component tests', () => {
  it('Should render Frame with dashboard', async () => {
    const { store } = renderWith(Frame(<DashboardPage />), {
      withRouter: true,
    });
    await act(() => store.dispatch(setUser(signedInGoogleUser)));

    waitFor(() => {
      expect(screen.queryByText(/Add Expense/i)).toBeInTheDocument();
    });
  });
});
