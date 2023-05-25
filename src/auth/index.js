import * as firebase from '../firebase';

const userSignIn = firebase.userSignIn;
const userSignOut = firebase.userSignOut;
const getAuthObservable = firebase.getAuthObservable;
const extractUser = firebase.extractUser;
const isAuthenticatedUser = firebase.isAuthenticatedUser;

const wrap = {
  userSignIn,
  userSignOut,
  isAuthenticatedUser,
};

wrap.userAuth = (authenticated, unauthenticated) => {
  const observable = getAuthObservable();
  const subscription = observable.subscribe(user => {
    if (user) {
      authenticated(extractUser(user));
    } else {
      unauthenticated();
    }
    // subscription.unsubscribe();
  });
};

export default wrap;
