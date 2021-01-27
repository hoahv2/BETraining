'use strict';
const firebaseConfig = {
  apiKey: "AIzaSyDuxJQ-Hl3fLL38jUu-pmfTPo5JdjQ9uf4",
  authDomain: "test-f682e.firebaseapp.com",
  databaseURL: "https://test-f682e-default-rtdb.firebaseio.com",
  projectId: "test-f682e",
  storageBucket: "test-f682e.appspot.com",
  messagingSenderId: "164098019189",
  appId: "1:164098019189:web:1883a8a0e06fb3f8e14d3c",
  measurementId: "G-2EEG30780K"
};

const uuid = require('uuid')

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const firebase = require('firebase');
// const functions = require('firebase-functions');
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// The Firebase Admin SDK to access the Firebase Realtime Database.

const admin = require('firebase-admin');

var serviceAccount = require("./serviceAcountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-f682e-default-rtdb.firebaseio.com"
});
const db = admin.firestore();

// const observer = data.onSnapshot(docSnapshot =>{
//   console.log(docSnapshot);
// })

const getAllUsers = async () => {
  const result = await db.collection('user').get();

  return result.docs.map(doc => doc.data());
}

const getUser = async (id) => {
  const result = await db.collection('user').doc(id).get();
  return result.data();
  // return result.docs.map(doc => doc.data());
}

const createUser = async (data) => {
  try {
    const id = uuid.v4()
    data.id = id
    const result = await db.collection('user').doc(id).set(data)

    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}


module.exports = {
  getAllUsers,
  createUser,
  getUser,
}