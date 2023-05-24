/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useNavigate } from "react-router-dom";
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { Observable } from 'rxjs';
import LoginPage from '../../../src/components/pages/loginPage.jsx';
import { renderWith } from '../../utils.js';
import auth from '../../../src/auth';
import { signedInGoogleUser, signedOutGoogleUser } from '../../fixtures/googleUsers.js';

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
  let getAuthObservableStub;

  beforeEach(() => {
    userSignInStub = sinon.stub(auth, 'userSignIn');
    userSignOutStub = sinon.stub(auth, 'userSignOut');
    getAuthObservableStub = sinon.stub(auth, 'getAuthObservable');
  });

  afterEach(() => {
    userSignInStub.restore();
    userSignOutStub.restore();
    getAuthObservableStub.restore();
  })

  it('Should render LoginPage when user has not signed in', async () => {
    const mockUser = undefined;
    userSignInStub.callsFake(() => { });
    getAuthObservableStub.returns(new Observable((subscriber) => {
      subscriber.next(mockUser);
    }));

    const navigate = useNavigate();
    navigate.mockClear();
    renderWith(<LoginPage />, {
      withProvider: true,
      withRouter: true,
    });
    expect(screen.queryByText(/Login Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login with google/i)).toBeInTheDocument();
  });

  it('Should render LoginPage when user has signed in', async () => {
    userSignInStub.callsFake(() => { });
    getAuthObservableStub.returns(new Observable((subscriber) => {
      console.log('signedInGoogleUser', signedInGoogleUser);
      subscriber.next(signedInGoogleUser);
    }));

    renderWith(<LoginPage />, {
      withProvider: true,
      withRouter: true,
    });
    expect(screen.queryByText(/Login Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Go to dashboard/i)).toBeInTheDocument();
  });

  it('Should show signed in content after signed in', async () => {
    let mockUser = undefined;
    let subscriberRef;
    let observable = new Observable((subscriber) => {
      subscriberRef = subscriber;
      subscriber.next(mockUser);
    });
    userSignInStub.callsFake(() => { 
      subscriberRef.next(signedInGoogleUser);
    });
    getAuthObservableStub.returns(observable);

    renderWith(<LoginPage />, {
      withProvider: true,
      withRouter: true,
    });

    const navigate = useNavigate();
    navigate.mockClear();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name: /Login with google/i}));
    await waitFor(() => {
      expect(screen.queryByText(/Go to dashboard/i)).toBeInTheDocument();
    });
  });

  it('Should show signed out content after signed out', async () => {
    let mockUser = signedInGoogleUser;
    let subscriberRef;
    let observable = new Observable((subscriber) => {
      subscriberRef = subscriber;
      subscriber.next(mockUser);
    });
    userSignOutStub.callsFake(() => { 
      subscriberRef.next(signedOutGoogleUser);
    });
    getAuthObservableStub.returns(observable);

    renderWith(<LoginPage />, {
      withProvider: true,
      withRouter: true,
    });

    const navigate = useNavigate();
    navigate.mockClear();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name: /Not Me/i}));
    await waitFor(() => {
      expect(screen.queryByText(/Login with google/i)).toBeInTheDocument();
    });
  });
});
