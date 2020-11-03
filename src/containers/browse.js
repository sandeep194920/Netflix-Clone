import React, { useContext, useState, useEffect } from "react";
import { SelectProfileContainer } from "./profiles";
import { FirebaseContext } from "../context/firebase";
import { Header, Loading } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../../src/logo.svg";

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
          <Header src="joker1" dontShowOnSmallViewPort>
            <Header.Frame>
              <Header.Group>
                <Header.Logo to={ROUTES.HOME} alt="Netflix" src={logo} />
                <Header.TextLink>Series</Header.TextLink>
                <Header.TextLink>Films</Header.TextLink>
              </Header.Group>
              <Header.Group>
                <Header.Profile>
                  <Header.Picture src={user.photoURL} />
                  <Header.DropDown>
                    <Header.Group>
                      <Header.Picture src={user.photoURL} />
                      <Header.TextLink>{user.displayName} </Header.TextLink>
                    </Header.Group>
                    <Header.Group>
                      <Header.TextLink
                        onClick={() => firebase.auth().signOut()}
                      >
                        Sign Out
                      </Header.TextLink>
                    </Header.Group>
                  </Header.DropDown>
                </Header.Profile>
              </Header.Group>
            </Header.Frame>
            <Header.Feature>
              <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
              <Header.Text>
                Forever alone in a crowd, failed comedian Arthur Fleck seeks
                connection as he walks the streets of Gotham City. Arthur wears
                two masks -- the one he paints for his day job as a clown, and
                the guise he projects in a futile attempt to feel like he's part
                of the world around him.
              </Header.Text>
            </Header.Feature>
          </Header>
        </>
      )}
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
