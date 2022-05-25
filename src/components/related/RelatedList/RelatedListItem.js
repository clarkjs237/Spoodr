import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CarouselItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 12rem;
  min-width: 12rem;
  max-width: 12rem;
  max-height: 12rem;
  background-color: green;
  color: white;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border: 2px red solid;
`;

const Photo = styled.img`
  height: 8rem;
`;
function RelatedListItem({ style, id }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(style);
  }, []);

  return (
    <CarouselItem>
      {id}
      <Photo src={style.photos['0'].thumbnail_url}/>
    </CarouselItem>
  );
}

export default RelatedListItem;
