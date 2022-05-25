import React, { useState, useEffect } from 'react';
import RelatedList from './RelatedList/RelatedList';
import RelatedListItem from './RelatedList/RelatedListItem';
import { URL } from '../App';

function Related({ product, handleRelatedItemClick }) {
  const [relatedIDs, setRelatedIDs] = useState({});
  const [nameAndCat, setNameAndCat] = useState({});

  // Will be used to find the default style based on a given productID
  function updateDefaultStyle(productID) {
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
        let tester;
        result.results.forEach((style) => {
          if (!bool && style['default?']) {
            // this is default style
            defaultStyle = { [result.product_id]: style };
            // tester = Object.assign(nameAndCat[result.product_id], style);
            bool = true;
          }
        });
        if (!bool) {
          defaultStyle = { [result.product_id]: result.results[0] };
          // tester = Object.assign(nameAndCat[result.product_id], result.results[0]);
        }

        // console.log(tester);
        // Create an object with the key = product_id and the value
        // equal to the default style object
        setRelatedIDs((oldObject) => ({
          ...oldObject,
          ...defaultStyle,
        }));
      });
  }

  function updateProductInfo(productID) {
    fetch(`${URL}/products/${productID}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // This will be the output we get from the product endpoint
        // We only want name and category from this
        // Cool so this is the right idea
        // console.log(result.name);
        // console.log(result.category);
        // I want to create an object similarly for above
        // Then I want to
        let newId = {
          [result.id]: {
            product_name: result.name,
            product_category: result.category,
          },
        };

        setNameAndCat((oldObject) => ({
          ...oldObject,
          ...newId,
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
          // I believe I want to get the product_id info before this
          // These are both async so it's really important that the
          // second one happens after the first. I might need to look
          // into async await for this
          updateProductInfo(product_id);
          updateDefaultStyle(product_id);
        });
      });
  }

  useEffect(() => {
    // I want to get the related IDs firstly
    // console.log('EXECUTING API CALLS'); // This is only executing once, good
    // setRelatedIDs({});
    // setNameAndCat({});
    updateRelatedIDs(product.id);
  }, [product]);

  // This is where we will make use of RelatedList
  // Carousel = RelatedList
  // CarouselItems = RelatedListItem
  if (Object.keys(relatedIDs).length === 0 || Object.keys(nameAndCat).length === 0) {
    return <div>Empty</div>;
  }
  return (
    <div>
      Related Items:
      <RelatedList
        styles={relatedIDs}
        infos={nameAndCat}
        handleRelatedItemClick={handleRelatedItemClick}
      />
    </div>
  );
}
export default Related;
