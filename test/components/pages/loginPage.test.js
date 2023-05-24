/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useNavigate } from "react-router-dom";
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { Observable } from 'rxjs';
import LoginPage from '../../../src/components/pages/loginPage.jsx';
import { renderWith } from '../../utils.js';
import auth from '../../../src/auth';

jest.mock('react-router-dom', () => {
  const mockNavigate = jest.fn();
  return ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  });
});

describe('LoginPage tests', () => { 
  let userSignInStub;
  let getUserStub;
  let getAuthObservableStub;

  beforeEach(() => {
    userSignInStub = sinon.stub(auth, 'userSignIn');
    getUserStub = sinon.stub(auth, 'getUser');
    getAuthObservableStub = sinon.stub(auth, 'getAuthObservable');
  });

  afterEach(() => {
    userSignInStub.restore();
    getUserStub.restore();
    getAuthObservableStub.restore();
  })

  it('Should render LoginPage when user has not signed in', async () => {
    const mockUser = undefined;
    userSignInStub.callsFake(() => { });
    getUserStub.returns(mockUser);
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

    expect(navigate).toHaveBeenLastCalledWith('/');
  });

  it('Should render LoginPage when user has signed in', async () => {
    const mockUser = {};
    userSignInStub.callsFake(() => { });
    getUserStub.returns(mockUser);
    getAuthObservableStub.returns(new Observable((subscriber) => {
      subscriber.next(mockUser);
    }));

    renderWith(<LoginPage />, {
      withProvider: true,
      withRouter: true,
    });
    expect(screen.queryByText(/Login Page/i)).toBeInTheDocument();

    const navigate = useNavigate();
    expect(navigate).toHaveBeenLastCalledWith('/dashboard');
  });

  it('Should click login to sign in with google auth', async () => {
    let mockUser = undefined;
    let subscriberRef;
    let observable = new Observable((subscriber) => {
      subscriberRef = subscriber;
      subscriber.next(mockUser);
    });
    userSignInStub.callsFake(() => { 
      mockUser = {};
      subscriberRef.next(mockUser);
    });
    getUserStub.returns(mockUser);
    getAuthObservableStub.returns(observable);

    renderWith(<LoginPage />, {
      withProvider: true,
      withRouter: true,
    });

    const navigate = useNavigate();
    navigate.mockClear();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name: /Login with google/i}));
    expect(navigate).toHaveBeenLastCalledWith('/dashboard');
  });
});
