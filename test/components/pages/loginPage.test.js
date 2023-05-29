/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import LoginPage from '../../../src/components/pages/LoginPage.jsx';
import { renderWith } from '../../utils.js';
import auth from '../../../src/auth/index.js';
import { signedInGoogleUser } from '../../fixtures/googleUsers.js';
import { setUser, clearUser } from '../../../src/store/slices/userSlice.js';

jest.mock('react-router-dom', () => {
  const mockNavigate = jest.fn();
  return ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  });
});

describe('LoginPage tests', () => { 
  let userSignInStub;
  let userSignOutStub;

  beforeEach(() => {
    userSignInStub = sinon.stub(auth, 'userSignIn');
    userSignOutStub = sinon.stub(auth, 'userSignOut');
  });

  afterEach(() => {
    userSignInStub.restore();
    userSignOutStub.restore();
  })

  it('Should render LoginPage when user has not signed in', async () => {
    renderWith(<LoginPage />, {
      withProvider: true,
      withRouter: true,
    });
    expect(screen.queryByText(/Expensify/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login with google/i)).toBeInTheDocument();
  });

  it('Should render LoginPage when user has signed in', async () => {
    const { store } = renderWith(<LoginPage />, {
      withProvider: true,
      withRouter: true,
    });

    await act(() => store.dispatch(setUser(signedInGoogleUser)));
    expect(screen.queryByText(/Expensify/i)).toBeInTheDocument();
    expect(screen.queryByText(/Go to dashboard/i)).toBeInTheDocument();
  });

  it('Should show signed in content after signed in', async () => {
    const { store } = renderWith(<LoginPage />, {
      withProvider: true,
      withRouter: true,
    });
    userSignInStub.callsFake(() => {
      act(() => store.dispatch(setUser(signedInGoogleUser)));
    });

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name: /Login with google/i}));
    await waitFor(() => {
      expect(screen.queryByText(/Go to dashboard/i)).toBeInTheDocument();
    });
  });

  it('Should show signed out content after signed out', async () => {
    const { store } = renderWith(<LoginPage />, {
      withProvider: true,
      withRouter: true,
    });
    act(() => store.dispatch(setUser(signedInGoogleUser)));
    userSignOutStub.callsFake(() => { 
      act(() => store.dispatch(clearUser()));
    });

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name: /Not Me/i}));
    await waitFor(() => {
      expect(screen.queryByText(/Login with google/i)).toBeInTheDocument();
    });
  });
});
