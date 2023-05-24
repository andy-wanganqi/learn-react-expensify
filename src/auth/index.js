import * as firebase from '../firebase';

const userSignIn = firebase.userSignIn;
const userSignOut = firebase.userSignOut;
const getAuthObservable = firebase.getAuthObservable;
const extractUser = firebase.extractUser;
const isAuthUser = firebase.isAuthUser;

const wrap = {
  userSignIn,
  userSignOut,
  getAuthObservable,
  isAuthUser,
};

wrap.userAuth = (authenticated, unauthenticated) => {
  const observable = wrap.getAuthObservable();
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
