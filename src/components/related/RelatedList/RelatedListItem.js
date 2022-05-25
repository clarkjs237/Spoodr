import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// function RelatedListItem({ style, width }) {
  function RelatedListItem({ child, width, style, id }) {
  const [product, setProduct] = useState({});

  // useEffect(() => {
  //   setProduct(style);
  // }, []);


  const Photo = styled.img`
    height: 5rem;
    `;

  return (
    <div className="carousel-item" style={{ width: width }}>
      {/* {child} */}
      <Photo src={style.photos['0'].thumbnail_url}/>
    </div>
  );
}

export default RelatedListItem;
