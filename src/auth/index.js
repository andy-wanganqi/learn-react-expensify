import * as firebase from '../firebase';

const userSignIn = firebase.userSignIn;
const userSignOut = firebase.userSignOut;
const getAuthObservable = firebase.getAuthObservable;
const isAuthenticatedUser = firebase.isAuthenticatedUser;
const getUser = firebase.getUser;

const wrap = {
  userSignIn,
  userSignOut,
  isAuthenticatedUser,
  getUser,
};

wrap.userAuth = (authenticated, unauthenticated) => {
  const observable = getAuthObservable();
  const subscription = observable.subscribe(user => {
    if (user) {
      authenticated(user);
    } else {
      unauthenticated();
    }
  });
  return subscription;
};

export default wrap;
