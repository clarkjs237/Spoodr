import React, { useState, useEffect } from 'react';
import RelatedList from './RelatedList/RelatedList';
// import RelatedListItem from './RelatedList/RelatedListItem';
import { URL } from '../App';

function Related({ product }) {
  const [relatedIDs, setRelatedIDs] = useState({});

  // Will be used to find the default style based on a given productID
  function updateDefaultCard(productID) {
    fetch(`${URL}/products/${productID}/styles`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // Result is an individual request from this styles api
        // So an object containing all the styles
        let bool = false;
        let defaultStyle;
        result.results.forEach((style) => {
          if (!bool && style['default?']) {
            // this is default style
            defaultStyle = { [result.product_id]: style };
            bool = true;
          }
        });
        if (!bool) {
          defaultStyle = { [result.product_id]: result.results[0] };
        }

        // Create an object with the key = product_id and the value
        // equal to the default style object
        setRelatedIDs((oldObject) => ({
          ...oldObject,
          ...defaultStyle,
        }));
      });
  }

  // Making a function to update the related IDs. This will be an array of ids
  function updateRelatedIDs(id) {
    fetch(`${URL}/products/${id}/related`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((results) => {
        results.forEach((product_id) => {
          updateDefaultCard(product_id);
        });
      });
  }



  useEffect(() => {
    // I want to get the related IDs firstly
    updateRelatedIDs(product.id);
  }, []);

  // This is where we will make use of RelatedList
  // Carousel = RelatedList
  // CarouselItems = RelatedListItem
  if (relatedIDs.length === 0) {
    return <div>Empty</div>;
  }
  return (
    // <div className="Related">
    //   Related Items:
    //   <RelatedList>
    //     {relatedIDs.map((id) => (
    //       <RelatedListItem key={id} id={id} />
    //     ))}
    //   </RelatedList>
    // </div>
    <div className="Related">
      Related Items:
      {/* <RelatedList related_ids={relatedIDs} /> */}
    </div>
  );
}
export default Related;
