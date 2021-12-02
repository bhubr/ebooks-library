/* global ePub */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const serverOrigin = process.env.REACT_APP_SERVER_ORIGIN;

export default function Book() {
  const { slug } = useParams()
  let rendition: any;
  useEffect(() => {
    const book = ePub(`${serverOrigin}/api/books/${slug}/epub`, {
      requestCredentials: true,
    });
    rendition = book.renderTo("viewer", {spread: "none", width: "100%", height: "94vh", allowScriptedContent: true});
    const displayed = rendition.display();

    // rendition.on("rendered", function(section: any){
    //   const nextSection = section.next();
    //   const prevSection = section.prev();

    //   if(nextSection) {
    //     nextNav = book.navigation.get(nextSection.href);

    //     if(nextNav) {
    //       nextLabel = nextNav.label;
    //     } else {
    //       nextLabel = "next";
    //     }

    //     next.textContent = nextLabel + " »";
    //   } else {
    //     next.textContent = "";
    //   }

    //   if(prevSection) {
    //     prevNav = book.navigation.get(prevSection.href);

    //     if(prevNav) {
    //       prevLabel = prevNav.label;
    //     } else {
    //       prevLabel = "previous";
    //     }

    //     prev.textContent = "« " + prevLabel;
    //   } else {
    //     prev.textContent = "";
    //   }

    // });
  }, [slug])

  const onPrev = () => rendition.prev()
  const onNext = () => rendition.next()
  return (
    <div>
      <p>{slug}</p>
      <button type="button" onClick={onPrev}>&laquo;</button>
      <button type="button" onClick={onNext}>&raquo;</button>
      <div id="viewer"></div>
    </div>
  )
}
