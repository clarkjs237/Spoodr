// This will be a functional stateless component that just maps the ids that are passed into
// it from Related.js

import RelatedListItem from './RelatedListItem';

function RelatedList({ ids }) {
  return (
    <div>
      {ids.map((id) => {
        return <RelatedListItem key={id} id={id} />
      })}
    </div>
  );
}
export default RelatedList;
