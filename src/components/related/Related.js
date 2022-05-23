import React, { useState, useEffect } from 'react';
import RelatedList from './RelatedList/RelatedList';

function Related({ product }) {
  const [relatedIDs, setRelatedIDs] = useState([]);

  // Making a function to update the related IDs. This will be an array of ids
  function updateRelatedIDs(id) {
    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/related`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRelatedIDs(result);
      });
  }

  useEffect(() => {
    updateRelatedIDs(product.id);
  }, []);

  return <RelatedList ids={relatedIDs} />;
}
export default Related;
