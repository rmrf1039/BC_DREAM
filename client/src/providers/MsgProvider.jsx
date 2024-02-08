import { createContext, useContext, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useAxios } from './AxiosProvider';
import axios from 'axios';

const firebaseConfig = {
  apiKey: "AIzaSyBzeD9ynJq4ad6Tj0hGDZJozANfcwyKbsQ",
  authDomain: "djangomesseging.firebaseapp.com",
  projectId: "djangomesseging",
  storageBucket: "djangomesseging.appspot.com",
  messagingSenderId: "152529043805",
  appId: "1:152529043805:web:b927b52304fa86cf50a8b4",
  measurementId: "G-13X9HCQ07F",
  publicKey: "BCwUzqJ40LLyveymD0T3kSfB3rSI1tfXXMT21arEPzatFXjsfQfdyu5DTqzttNyTJrkBOtQ9YlA38tUVXK76II0"
};

const MsgContext = createContext();

const MsgProvider = ({ children }) => {
  const { state } = useAxios()

  const app = initializeApp(firebaseConfig);
  
  const sendTokenToServer = (token) => {
    const currentToken = localStorage.getItem('msg_token');

    // Only send if the token is different
    axios.post('/api/devices/', {
      registration_id: token,
      type: 'web', 
    })
    .then(() => {
      localStorage.setItem('msg_token', token)
    })
    .catch(() => {
      localStorage.removeItem('msg_token');
    });
  };

  useEffect(() => {
    if (!state.isLogged) return;
    
    try {
      const messaging = getMessaging(app)

      if (!messaging) {
        console.log('messaging is not defined');
        return
      }

      getToken(messaging, {
        vapidKey: firebaseConfig.publicKey
      }).then(function (token) {
        if (token) {
          sendTokenToServer(token);
        } else {
          localStorage.removeItem('msg_token');
        }
      }).catch(function (err) {
        console.log(err);
        localStorage.removeItem('msg_token');
      });
      
      //Initial messaging permission
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        }
      });

      //Initial token resfresh function
      /* Notification.onTokenRefresh(function () {
        messaging.getToken().then(function (refreshedToken) {
          console.log("Token refreshed.");
          // Indicate that the new Instance ID token has not yet been sent to the
          // app server.
          localStorage.removeItem('msg_token');
          // Send Instance ID token to app server.
          sendTokenToServer(refreshedToken);
        }).catch(function (err) {
          console.log("Unable to retrieve refreshed token ", err);
        });
      }); */

      //Initial message receiving behavior
      onMessage(messaging, (payload) => {
        payload = payload.data;
    
        // Create notification manually when user is focused on the tab
        const notificationTitle = '運動提醒';
        const notificationOptions = {
          body: '準備運動囉！',
          icon: '/logo512.png',
        };
    
        if (!("Notification" in window)) {
          console.log("This browser does not support system notifications");
        }
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
          console.log("Notifaction is permitted.")
          // If it's okay let's create a notification
          var notification = new Notification(notificationTitle, notificationOptions);
          notification.onclick = function (event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open(payload.url, '_blank');
            notification.close();
          }
        }
        else {
          console.log("Something goes wrong.")
        }
      });
    } catch {
      console.error('Failed to initialize Firebase Messaging');
    }
  }, [state.isLogged]);

  return (
    <MsgContext.Provider value={{}}>
      {}
      { children }
    </MsgContext.Provider>
  );
};

const useMsg = () => {
  const MsgContextData = useContext(MsgContext);

  return MsgContextData;
};

export { MsgProvider, useMsg }