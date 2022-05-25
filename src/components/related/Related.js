import React, { useState, useEffect } from 'react';
import RelatedList from './RelatedList/RelatedList';
import RelatedListItem from './RelatedList/RelatedListItem';
import { URL } from '../App';

function Related({ product }) {
  const [relatedIDs, setRelatedIDs] = useState([]);

  // Making a function to update the related IDs. This will be an array of ids
  function updateRelatedIDs(id) {
    fetch(`${URL}/products/${id}/related`, {
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
