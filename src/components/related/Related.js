import React, { useState, useEffect } from 'react';
import RelatedList from './RelatedList/RelatedList';
// import RelatedListItem from './RelatedList/RelatedListItem';
import { URL } from '../App';

function Related({ product }) {
  const [relatedIDs, setRelatedIDs] = useState([]);
  const [defaultStyles, setDefaultStyles] = useState([]);
  const [productIdAndStyle, setproductIdAndStyle] = useState({});

  function createObject() {
    // will use relatedIds and defaultStyles to create an object
    // that I will then pass down as props
    let res = {};
    for (var i = 0; i < relatedIDs.length; i++) {
      res[relatedIDs[i]] = defaultStyles[i];
    }
    console.log(res);
  }


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
        result.results.forEach((style) => {
          if (!bool && style['default?']) {
            // this is default style
            setDefaultStyles((oldArray) => [...oldArray, style]);
            bool = true;
          }
        });
        if (!bool) {
          setDefaultStyles((oldArray) => [...oldArray, result.results[0]]);
        }
      })
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
        // Result here is that array of related ids
        setRelatedIDs(results);
        // I could run the helper function here with results
        // console.log(results)
        results.forEach((product_id) => {
          // update the default style for each id
          updateDefaultCard(product_id);
        });
      })
      .then(() => createObject());
  }



  useEffect(() => {
    // I want to get the related IDs firstly
    updateRelatedIDs(product.id);
    // createObject();
    // Then I want to get the default products for each one
    // and store that
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
