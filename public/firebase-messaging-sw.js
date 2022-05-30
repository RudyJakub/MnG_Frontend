//firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

var firebaseConfig = {
  apiKey: "AIzaSyBG5LT1r9tsg-oFRPx6Oe_25Ti4c0O_aAk",
  authDomain: "mngpowiadomienia-c61ad.firebaseapp.com",
  projectId: "mngpowiadomienia-c61ad",
  storageBucket: "mngpowiadomienia-c61ad.appspot.com",
  messagingSenderId: "928483411596",
  appId: "1:928483411596:web:70301150d9a3d9762adda9",
  measurementId: "G-DB0VEM4MC8"
}

const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const notificationTitle = payload.data.title
  const notificationOptions = {
    body: payload.data.content,
    icon: payload.data.image
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})


