import * as firebase from '../firebase';

const userSignIn = firebase.userSignIn;
const userSignOut = firebase.userSignOut;
const getAuthObservable = firebase.getAuthObservable;
const getUser = firebase.getUser;

const wrap = {
  userSignIn,
  userSignOut,
  getAuthObservable,
  getUser,
};

wrap.userAuth = (authenticated, unauthenticated) => {
  const observable = wrap.getAuthObservable();
  const subscription = observable.subscribe(user => {
    if (user) {
      authenticated();
    } else {
      unauthenticated();
    }
    // subscription.unsubscribe();
  });
}

export default wrap;
