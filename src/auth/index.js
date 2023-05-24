import * as firebase from '../firebase';

const userSignIn = firebase.userSignIn;
const userSignOut = firebase.userSignOut;
const getAuthObservable = firebase.getAuthObservable;
const getUser = firebase.getUser;

export default {
  userSignIn,
  userSignOut,
  getAuthObservable,
  getUser,

  userAuth: (handleAuthenticated, handleUnauthenticated) => {
    const observable = getAuthObservable();
    const subscription = observable.subscribe(user => {
      if (user) {
        handleAuthenticated();
      } else {
        handleUnauthenticated();
      }
      // subscription.unsubscribe();
    });
  }
};
