importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvYsqLUIloaOmJtmqNPf0-R8FltxRsBsk",
  authDomain: "gamechanger-test-2f61c.firebaseapp.com",
  projectId: "gamechanger-test-2f61c",
  storageBucket: "gamechanger-test-2f61c.appspot.com",
  messagingSenderId: "1091446022877",
  appId: "1:1091446022877:web:85c91104e8f91d6c1eb134",
  measurementId: "G-QLPDZLWSEL"
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});