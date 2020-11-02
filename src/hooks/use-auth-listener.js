import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../context/firebase";

// this function returns the {user} from firebase
export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.stringify(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  // as soon as the app loads, we want to run this once to get the logged-in user
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    // cleanup listener to avoid memory leaks when this component unmounts or anything like that. Basically, it's a good practice to clear up the listener.
    return () => listener();
  }, [firebase]);

  return { user };
}
