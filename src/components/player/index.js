import React, { useState, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Overlay, Inner, Close } from "./styles/player";

export const playerContext = createContext();

export default function Player({ children, ...restProps }) {
  const [showPlayer, setShowPlayer] = useState(false);
  return (
    <playerContext.Provider
      value={{ showPlayer, setShowPlayer }}
      {...restProps}
    >
      <Container>{children}</Container>
    </playerContext.Provider>
  );
}

Player.Video = function PlayerVideo({ src, ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(playerContext);
  return (
    showPlayer &&
    ReactDOM.createPortal(
      <Overlay {...restProps} onClick={() => setShowPlayer(false)}>
        <Inner>
          <video id="netflix-player" controls>
            <source src={src} type="video/mp4" />
          </video>
          <Close />
        </Inner>
      </Overlay>,
      document.body
    )
  );
};

Player.Button = function PlayerButton({ ...restProps }) {
  const { setShowPlayer } = useContext(playerContext);
  return (
    <Button
      {...restProps}
      onClick={() => setShowPlayer((showPlayer) => !showPlayer)}
    >
      Play
    </Button>
  );
};
