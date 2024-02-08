// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyBzeD9ynJq4ad6Tj0hGDZJozANfcwyKbsQ",
  authDomain: "djangomesseging.firebaseapp.com",
  projectId: "djangomesseging",
  storageBucket: "djangomesseging.appspot.com",
  messagingSenderId: "152529043805",
  appId: "1:152529043805:web:b927b52304fa86cf50a8b4",
  measurementId: "G-13X9HCQ07F"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  payload = payload.data;
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    icon: payload.icon_url,
  };

  self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    clients.openWindow(payload.url);
  });

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

// [END background_handler]
self.addEventListener('install', event => {
  console.log('Service Worker installed');

});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
});



// 確定正在背景執行中
/* messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/logo512.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}); */