import React, { useContext, useState, useEffect } from "react";
import { SelectProfileContainer } from "./profiles";
import { FirebaseContext } from "../context/firebase";
import { Header, Loading, Card, Player } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../../src/logo.svg";
import { FooterContainer } from "../containers/footer";
import Fuse from "fuse.js";

export function BrowseContainer({ slides }) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {}; // if fb user doesn't exist then it will return empty object
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("series"); // default in the browse page
  const [slideRows, setSlideRows] = useState([]); // we need to fetch the data - only which is viewed by user. for example, if user is viewing series then we only need to get series and no need to get films - this is for performance optimization

  // useEffect is called when display name on the profile changes. That happens when the user clicks the image on his avatar and this onclick happens in profiles.js page
  // when user clicks the image in profile.js, this useEffect sets the display name and when the display name is set, we will render the browse page

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  // get only the data which is viewed by user
  useEffect(() => {
    setSlideRows(slides[category]);
  }, [category, slides]);

  // Live search - Fuse basically takes the searchTerm (our search keywords) and searches the slideRows (items to search from) and keys (keywords) and then returns the result object which we set it back to items
  useEffect(() => {
    const fuse = new Fuse(slideRows, {
      keys: ["data.description", "data.title", "data.genre"],
    });
    const results = fuse.search(searchTerm).map(({ item }) => item);
    console.log(results);
    if (slideRows.length > 0 && searchTerm.length > 3 && results.length > 0) {
      setSlideRows(results);
    } else {
      setSlideRows(slides[category]);
    }
  }, [searchTerm, category, slides]);

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
                <Header.TextLink
                  active={category === "series" ? "true" : "false"}
                  onClick={() => setCategory("series")}
                  leftSpacing
                >
                  Series
                </Header.TextLink>
                <Header.TextLink
                  onClick={() => setCategory("films")}
                  active={category === "films" ? "true" : "false"}
                >
                  Films
                </Header.TextLink>
              </Header.Group>
              <Header.Group>
                <Header.Search
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
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
              <Header.PlayButton>Play</Header.PlayButton>
            </Header.Feature>
          </Header>
          <Card.Group>
            {slideRows.map((slideItem) => (
              <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
                <Card.Title>{slideItem.title} </Card.Title>
                <Card.Entities>
                  {slideItem.data.map((item) => (
                    <Card.Item key={item.docId} item={item}>
                      <Card.Image
                        src={`images/${category}/${item.genre}/${item.slug}/small.jpg`}
                      />
                      <Card.Meta>
                        <Card.SubTitle>{item.title}</Card.SubTitle>
                        <Card.Text>{item.description}</Card.Text>
                      </Card.Meta>
                    </Card.Item>
                  ))}
                </Card.Entities>
                <Card.Feature category={category}>
                  <Player>
                    <Player.Button />
                    <Player.Video src="/videos/bunny.mp4" />
                  </Player>
                </Card.Feature>
              </Card>
            ))}
          </Card.Group>
          <FooterContainer />
        </>
      )}
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
