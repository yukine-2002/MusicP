import firebase from "firebase/compat/app";
import { getDatabase, ref, child, get } from "firebase/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyAwo31xNd_fz0Uqwq4sRNHeD3i3KkD9HxI",
  authDomain: "music-f14cf.firebaseapp.com",
  projectId: "music-f14cf",
  storageBucket: "music-f14cf.appspot.com",
  messagingSenderId: "614643688623",
  appId: "1:614643688623:web:57172ff891e61fa96a205a",
  measurementId: "G-9BY2TM2VD2",
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const item = [];
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        item,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
export const addPlayListToItem = async (userAuth, item) => {
  const userRef = firestore.collection(`/users`);
  userRef.doc(userAuth).update({ item: item });
};
export const getPlayList = async (userAuth) => {
  const userData = await firebase.firestore().doc(`users/${userAuth}`).get();
 const {displayName,item,email} = userData.data();
 return {
   displayName,
   item,
   email
 };
};
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const colelctionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectToAdd.forEach((element) => {
    const newDocRef = colelctionRef.doc();
    batch.set(newDocRef, element);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collection) => {
  const TransformedColelction = collection.docs.map((doc) => {
    const { id, title, item, routeName } = doc.data();
    return {
      idf: doc.id,
      id,
      title,
      routeName,
      item,
    };
  });
  return TransformedColelction;
};

export const convertItem = (collection) => {
  const TransformedColelction = collection.docs.map((doc) => {
    const {  item} = doc.data();
    return {
      item,
    };
  });
  return TransformedColelction;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
