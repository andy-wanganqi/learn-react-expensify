/**
 * @jest-environment jsdom
 */
import React from 'react';
import { useNavigate } from "react-router-dom";
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import Header from '../../../src/components/layout/header.jsx';
import { renderWith } from '../../utils.js';
import auth from '../../../src/auth';

jest.mock('react-router-dom', () => {
  const mockNavigate = jest.fn();
  return ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  });
});

describe('Header component tests', () => {
  let userSignOutStub;

  beforeEach(() => {
    userSignOutStub = sinon.stub(auth, 'userSignOut');
  });

  afterEach(() => {
    userSignOutStub.restore();
  })

  it('Should render Header', async () => {
    renderWith(<Header />, {
      withRouter: true,
    });

    expect(screen.getByText('Expensify')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('Should sign out and redirect to login page', async () => {
    let mockUser = {};
    userSignOutStub.callsFake(() => { mockUser = undefined; });

    renderWith(<Header />, {
      withRouter: true,
    });

    const navigate = useNavigate();
    navigate.mockClear();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name: /Logout/i}));
    expect(navigate).toHaveBeenLastCalledWith('/');
    expect(mockUser).toBeUndefined();
  });
});
