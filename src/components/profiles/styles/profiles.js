import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 80%;
`;
export const Title = styled.h1`
  width: 100%;
  color: white;
  font-size: 48px;
  text-align: center;
  font-weight: 500;
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
`;

export const Name = styled.p`
  color: #808080;
  text-overflow: ellipsis;
  font-size: 16px;
  &:hover {
    font-weight: bold;
    color: #e5e5e5;
  }
`;

export const Picture = styled.img`
  width: 100%;
  max-width: 150px;
  height: auto;
  border: 3px solid black;
  cursor: pointer;
`;

export const Item = styled.li`
  max-width: 200;
  max-height: 200;
  list-style-type: none;
  text-align: center;
  margin-right: 30px;

  // these hover effects working can be referred here - https://stackoverflow.com/questions/4502633/how-to-affect-other-elements-when-one-element-is-hovered
  //FYI, if we hover on Item, we get border for the picture

  &:hover > ${Picture} {
    /* > here means that, As the Picture is inside the item, we can affect the Picture when hovered on item by using > */
    border: 3px solid white;
  }

  &:hover ${Name} {
    /* space after hover here means that, As the Picture is SOMEWHERE inside the item, we can affect the Picture when hovered on item by using > */
    /* Try using this syntax than the above one */
    font-weight: bold;
    color: white;
  }

  /* If we have multiple profiles then this applies to the last Item in the list */
  &:last-of-type {
    margin-right: 0;
  }
`;
