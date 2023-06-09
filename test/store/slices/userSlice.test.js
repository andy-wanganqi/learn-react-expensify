import reducer, { setUser, clearUser } from '../../../src/store/slices/userSlice.js';

describe('User redux state tests', () => {
  it('Should initialize user', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      uid: '',
      accessToken: '',
      email: '',
      displayName: '',
      photoUrl: '',
      __authentication: undefined,
    });
  });

  it('Should set user', async () => {
    const previousState = {
      uid: 'uid0',
      accessToken: 'accessToken0',
    };
    const signInUser = {
      uid: 'uid1',
      accessToken: 'accessToken1',
      email: 'email1',
      displayName: 'displayName1',
      photoUrl: 'photoUrl1',
    };
    expect(reducer(previousState, setUser(signInUser))).toEqual({
      ...signInUser,
      __authentication: true,
    });
  });

  it('Should clear user', async () => {
    const previousState = {
      uid: 'uid0',
      accessToken: 'accessToken0',
    };
    expect(reducer(previousState, clearUser())).toEqual({
      uid: '',
      accessToken: '',
      email: '',
      displayName: '',
      photoUrl: '',
      __authentication: false,
    });
  });
});
