import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbnailImage from './ImageGalleryDefaultComponents/ThumbnailImage';
import ExpandedImageNav from './ImageGalleryExpandedComponents/ExpandedImageNav';
import ExpandedThumbnailImageNav from './ImageGalleryExpandedComponents/ExpandedThumbnailImageNav';

const ImageGalleryExpandedWrapper = styled.div`
  height: ${(props) => (props.zoom ? '100%' : '99vh')};
  width: 100%;
  background-color: #EAC9C1;
  position: relative;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`;

const ExpandedImage = styled.img`
  display: inline-block;
  width: ${(props) => (props.zoom ? '250%' : '100%')};
  height: ${(props) => (props.zoom ? 'auto' : '92vh')};
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
  display: flex;
  justify-content: center;
`;

const LeaveExpandedView = styled.div`
  position: absolute;
  top: 5%;
  left: 95%;
  font-size: 2.25rem;
  color: #32292F;
  &:hover {
    cursor: pointer;
    color: #90D7FF;
  }
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
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  function onClickHandler(e) {
    if (e.target.id === 'ExpandedImage') {
      if (zoomedView) {
        setScrollX(0);
        setScrollY(0);
        setZoomedView(false);
      } else {
        let { x, y } = mousePosition(e);
        setScrollX(1.5 * x);
        setScrollY(2.5 * y);
        setZoomedView(true);
      }
    }
    if (e.target.id === 'LeaveExpanded') {
      setExpandedView(false);
    }
  }

  function handleEscKeyPress(e) {
    if (e.key === 'Escape') {
      window.scrollTo(0, 0);
      setExpandedView(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyPress);
    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  });

  useEffect(()=>{
    window.scrollTo(scrollX, scrollY)
  }, [zoomedView]);

  function mousePosition(e) {
    const {
      top: offsetTop,
      left: offsetLeft,
    } = e.target.getBoundingClientRect();

    const x = e.pageX - offsetLeft;
    const y = e.pageY - offsetTop;

    return { x, y };
  }

  if(zoomedView){
    //window.scrollTo(scrollX, scrollY);
  }

  function handleMouseMove(e) {
    if(zoomedView) {
      let { x, y } = mousePosition(e);
      setMouseX(x);
      setMouseY(y);
    }
  }

  if (zoomedView) {
    return (
      <ImageGalleryExpandedWrapper zoom={zoomedView}>
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
        <ExpandedThumbnailImageNav
          curDisplayPhotos={curDisplayPhotos}
          curDisplayIndex={curDisplayIndex}
          setCurDisplayIndex={setCurDisplayIndex}
        />
      </ExpandedThumbnailImages>
      <LeaveExpandedView id="LeaveExpanded" onClick={onClickHandler}>
        &#9447;
      </LeaveExpandedView>
    </ImageGalleryExpandedWrapper>
  );
}
