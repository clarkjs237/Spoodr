import React, { useState, useEffect } from 'react';
import RelatedList from './RelatedList/RelatedList';
import RelatedListItem from './RelatedList/RelatedListItem';
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
    console.log('EXECUTING API CALLS');
    updateRelatedIDs(product.id);
  }, []);

  // This is where we will make use of RelatedList
  // Carousel = RelatedList
  // CarouselItems = RelatedListItem
  if (relatedIDs.length === 0) {
    return <div>Empty</div>;
  }
  return (
    <div>
      Related Items:
      <RelatedList>
        {Object.values(relatedIDs).map((style, index) => (
          <RelatedListItem key={index} style={style} id={Object.keys(relatedIDs)[index]} />
        ))}
      </RelatedList>
    </div>
  );
}
export default Related;
