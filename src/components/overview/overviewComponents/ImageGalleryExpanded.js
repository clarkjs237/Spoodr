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
  display: block;
  width: ${(props) => (props.zoom ? '250%' : '100%')};
  height: ${(props) => (props.zoom ? 'auto' : '90vh')};
  border: solid;
  border-width: .1rem;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
  &:hover {
    cursor: ${(props) => (props.zoom ? 'zoom-out' : 'crosshair')};
  }
`;

const ExpandedThumbnailImages = styled.div`
  width: fit-content;
  margin: auto;

`;

const LeaveExpandedView = styled.div`
  position: absolute;
  top: 0;
  left: 97%;
  font-size: 1.75rem;
  color: #32292F;
  &:hover {
    cursor: pointer;
    color: #90D7FF;
`;

export default function ImageGalleryExpanded({
  curDisplayPhotos,
  curDisplayIndex,
  setCurDisplayIndex,
  setExpandedView,
}) {
  const [zoomedView, setZoomedView] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  function onClickHandler(e) {
    if (e.target.id === 'ExpandedImage') {
      if (zoomedView) {
        setZoomedView(false);
      } else {
        setMousePosition(e);
        setZoomedView(true);
      }
    }
    if (e.target.id === 'LeaveExpanded') {
      setExpandedView(false);
    }
  }

  function handleEscKeyPress(e) {
    if (e.key === 'Escape') {
      setExpandedView(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyPress);
    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  });

  function setMousePosition(e) {
    const {
      top: offsetTop,
      left: offsetLeft,
    } = e.target.getBoundingClientRect();

    const x = ((e.pageX - offsetLeft) / e.target.width) * 100;
    const y = ((e.pageY - offsetTop) / e.target.height) * 100;

    setMouseX(x);
    setMouseY(y);
  }

  function handleMouseMove(e) {
    setMousePosition(e);
  }

  if (zoomedView) {
    return (
      <ImageGalleryExpandedWrapper>
        <ExpandedImage
          id="ExpandedImage"
          zoom={zoomedView}
          src={curDisplayPhotos[curDisplayIndex].url}
          onClick={onClickHandler}
          onMouseMove={handleMouseMove}
        />
      </ImageGalleryExpandedWrapper>
    );
  }

  return (
    <ImageGalleryExpandedWrapper>
      <ExpandedImage
        id="ExpandedImage"
        zoom={zoomedView}
        src={curDisplayPhotos[curDisplayIndex].url}
        onClick={onClickHandler}
        onMouseMove={handleMouseMove}
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
      <LeaveExpandedView id="LeaveExpanded" onClick={onClickHandler}>
        &#9447;
      </LeaveExpandedView>
    </ImageGalleryExpandedWrapper>
  );
}
