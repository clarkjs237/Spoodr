import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbnailImage from './ImageGalleryDefaultComponents/ThumbnailImage';
import ExpandedImageNav from './ImageGalleryExpandedComponents/ExpandedImageNav';

const ImageGalleryExpandedWrapper = styled.div`
  heigth: 100%;
  width: 100%;
  background-color: #EAC9C1;
  position: relative;
`;

const ExpandedImage = styled.img`
  transform: ${props => props.zoom ? 'scale(2.5)' : 'scale(1)'};
  display: block;
  height: ${props => props.zoom ? '100vh' : '90vh'};
  width: auto;
  border: solid;
  border-width: .1rem;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
  &:hover {
    cursor: crosshair;
  }
`;

// const ZoomedImage = styled.img`
// background-color: #EAC9C1;
// display: block;
// height: 225vh;
// width: auto;
// border: solid;
// border-width: .1rem;
// margin-left: auto;
// margin-right: auto;
// object-fit: cover;
// &:hover {
//   cursor: crosshair;
// `;

const ExpandedThumbnailImages = styled.div`
  width: fit-content;
  margin: auto;

`;

const LeaveExpandedView = styled.div`
  position: absolute;
  top: 0;
  left: 96%;
  font-size: 1.75rem;
  color: #D3AB9E;
  &:hover {
    cursor: pointer;
    color: #90D7FF;
`;

export default function ImageGalleryExpanded({
  curDisplayPhotos,
  curDisplayIndex,
  setCurDisplayIndex,
  setExpandedView
}) {
  const [zoomedView, setZoomedView] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  function onClickHandler (e) {
    if(e.target.id === 'ExpandedImage') {
      zoomedView ? setZoomedView(false) : setZoomedView(true);
    }
    if(e.target.id === 'LeaveExpanded') {
      setExpandedView(false)
    }
  }

  function handleEscKeyPress(e) {
    if (e.key === 'Escape') {
      setExpandedView(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyPress);
    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  });

  // function move(e) {
  //   const {
  //     top: offsetTop,
  //     left: offsetLeft
  //   } = e.target.getBoundingClientRect();

  //   const x = ((e.pageX - offsetLeft) / e.target.width) * 100;
  //   const y = ((e.pageY - offsetTop) / e.target.height) * 100;

  //   setMouseX(x);
  //   setMouseY(y);
  // }

  if (zoomedView) {
    return (
      <ImageGalleryExpandedWrapper>
        <ExpandedImage
          id='ExpandedImage'
          zoom={zoomedView}
          src={curDisplayPhotos[curDisplayIndex].url}
          onClick={onClickHandler}
        />
      </ImageGalleryExpandedWrapper>
    )
  }

  return(
    <ImageGalleryExpandedWrapper>
      <ExpandedImage
        id='ExpandedImage'
        zoom={zoomedView}
        src={curDisplayPhotos[curDisplayIndex].url}
        onClick={onClickHandler}
      />
      <ExpandedImageNav
        curDisplayIndex={curDisplayIndex}
        setCurDisplayIndex={setCurDisplayIndex}
        maxDisplayIndex={curDisplayPhotos.length - 1}
      />
      <ExpandedThumbnailImages>
        {curDisplayPhotos.map(({ id, thumbnail_url }) => (
            <ThumbnailImage
              id={id}
              thumbnail={thumbnail_url}
              curDisplayIndex={curDisplayIndex}
              setCurDisplayIndex={setCurDisplayIndex}
            />
        ))}
      </ExpandedThumbnailImages>
      <LeaveExpandedView id='LeaveExpanded' onClick={onClickHandler}>
        &#9447;
      </LeaveExpandedView>
    </ImageGalleryExpandedWrapper>
  )
}
