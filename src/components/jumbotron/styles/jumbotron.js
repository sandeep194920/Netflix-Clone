import styled from "styled-components/macro"; // this macros gives us the proper style name as component name instead of some random style name

export const Inner = styled.h1`
  display: flex;
  align-items: center;
  flex-direction: ${({ direction }) => direction};
  justify-content: space-between;
  max-width: 1100px;
  margin: auto;
  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const Container = styled.div``;
export const Pane = styled.div`
  // pane divides a row into two columns
  width: 50%;
`;
export const Title = styled.h1``;
export const SubTitle = styled.h2``;
export const Image = styled.img``;
