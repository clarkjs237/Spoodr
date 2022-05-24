import React, { useState, useEffect } from 'react';
import RelatedList from './RelatedList/RelatedList';
import RelatedListItem from './RelatedList/RelatedListItem';

function Related({ product }) {
  const [relatedIDs, setRelatedIDs] = useState([]);
  // console.log('PRODUCT ' + product);
  // console.log(product);
  // Making a function to update the related IDs. This will be an array of ids
  function updateRelatedIDs(id) {
    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/related`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setRelatedIDs(result);
      });
  }

  useEffect(() => {
    updateRelatedIDs(product.id);
  }, []);

  // Pass down the array of related id to RelatedList
  // return <RelatedList ids={relatedIDs} />;

  // Testing out the Carousel here
  if (product.id === undefined) {
    return <div>Empty div</div>;
  }
  return (
    <div className="Related">
      Related Items:
      <RelatedList>
        {relatedIDs.map((id) => {
          // return <RelatedListItem>{id}</RelatedListItem>
          return <RelatedListItem key={id} id={id} />
        })}
      </RelatedList>
    </div>
  );
}
export default Related;
