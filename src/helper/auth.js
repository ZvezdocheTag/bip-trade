import { ref, firebaseAuth } from '../config/constants'

export function auth(email, pw) {
    return firebaseAuth().createUserWithEmailAndPassword(email, pw)
        .then(saveUser)
}

export function logOut() {
    return firebaseAuth().signOut()
}

export function login(email, pw) {
    return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword(email) {
    return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
    return ref.child(`users/${user.uid}/info`)
      .set({
        email: user.email,
        uid: user.uid
      })
      .then(() => user)
  }

export function getUsers() {
    return ref;
}