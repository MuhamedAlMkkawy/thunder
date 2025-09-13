// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken , onMessage } from "firebase/messaging";

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDMryFNsv7jbaZbRg8Boek8mAcK5LPXSt0",
//   authDomain: "thandar-dbdda.firebaseapp.com",
//   projectId: "thandar-dbdda",
//   storageBucket: "thandar-dbdda.firebasestorage.app",
//   messagingSenderId: "419462465590",
//   appId: "1:419462465590:web:97ecdab88fabcfd0413097",
//   measurementId: "G-P15FD86QNL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get registration token. Initially this makes a network call, once retrieved
// // subsequent calls to getToken will return from cache.
// const messaging = getMessaging();
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });
// getToken(messaging, { vapidKey: 'BL6KDLenmp2cO1sVGAh7BNJqOIokv97ol1WnBqqbZWU1Yyygz6xN9MuU_eb27cimlkeOkpoUYZiOP4cJinEIvHY' }).then((currentToken) => {
//   if (currentToken) {
//     // Send the token to your server and update the UI if necessary
//     console.log(currentToken)
//     // ...
//   } else {
//     // Show permission request UI
//     console.log('No registration token available. Request permission to generate one.');
//     // ...
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
//   // ...
// });


