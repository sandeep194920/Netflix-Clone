import React from "react";
import { BrowseContainer } from "../containers/browse";
import { useContent } from "../hooks";
import selectionFilter from "../utils/selection-filter";

export default function Browse() {
  // we need series and the films
  const { series } = useContent("series");
  const { films } = useContent("films");
  // we need slides - Slides are arranged by different genere where we can get it from selection-filter.js
  const slides = selectionFilter({ series, films });
  console.log(slides);
  // pass it to the browse container
  return (
    <>
      <BrowseContainer slides={slides} />
    </>
  );
}
