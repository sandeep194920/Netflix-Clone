import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../context/firebase";

export default function useContent(target) {
  // target will be films or series
  const [content, setContent] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase
      .firestore()
      .collection(target)
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObject) => ({
          ...contentObject.data(),
          docId: contentObject.id,
        }));
        setContent(allContent);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [target, firebase]);
  return { [target]: content }; // for films -> return {films:content} AND for series -> return {series:content}
}
