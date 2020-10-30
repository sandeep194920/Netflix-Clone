import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// used only once to seed the data to firebase
// import { seedDatabase } from "../seed";

// we need to put the fb configs here. We get this from .env.local (in root directory) which is not pushed on github.
console.log(process.env);
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env_REACT_APP_APP_ID,
};
const firebase = Firebase.initializeApp(config);
// This must be done (uncommented) only once (the first time) and never again since the data might get duplicated. First time, after uncommenting this we export firebase through this file using index.js
// seedDatabase(firebase);
export { firebase };
