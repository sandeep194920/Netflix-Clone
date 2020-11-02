import React, { useContext, useState, useEffect } from "react";
import { SelectProfileContainer } from "./profiles";
import { FirebaseContext } from "../context/firebase";
import { Header, Loading } from "../components";

export function BrowseContainer({ slides }) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {}; // if fb user doesn't exist then it will return empty object

  // useEffect is called when display name on the profile changes. That happens when the user clicks the image on his avatar and this onclick happens in profiles.js page
  // when user clicks the image in profile.js, this useEffect sets the display name and when the display name is set, we will render the browse page

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  // if we have displayName, that means someone clicked the profile and then we show loading container until we take them to the browse page
  return profile.displayName ? (
    <>
      {loading ? (
        <Loading src={user.photoURL} />
      ) : (
        <>
          <Loading.ReleaseBody />
          <Header src="joker1">
            <p>Hello</p>
          </Header>
        </>
      )}
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
