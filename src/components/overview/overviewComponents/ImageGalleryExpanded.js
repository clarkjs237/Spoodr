import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbnailImage from './ImageGalleryDefaultComponents/ThumbnailImage';
import ExpandedImageNav from './ImageGalleryExpandedComponents/ExpandedImageNav';
import ExpandedThumbnailImageNav from './ImageGalleryExpandedComponents/ExpandedThumbnailImageNav';

const ImageGalleryExpandedWrapper = styled.div`
  height: ${(props) => (props.zoom ? '100%' : '99vh')};
  width: 100%;
  position: relative;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`;

const ExpandedImage = styled.img`
  display: inline-block;
  width: ${(props) => (props.zoom ? '247.5vw' : '99vw')};
  height: ${(props) => (props.zoom ? '230vh' : '92vh')};
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
  missingImg
}) {
  const [zoomedView, setZoomedView] = useState(false);
  const [scroll, setScroll] = useState({x: 0, y: 0});

  function onClickHandler(e) {
    if (e.target.id === 'ExpandedImage') {
      if (zoomedView) {
        setScroll({x: 0, y: 0});
        setZoomedView(false);
      } else {
        let { x, y } = mousePosition(e);
        setScroll({
          x: 2.5 * x - .5 * e.target.clientWidth,
          y: 2.5 * y - .5 * e.target.clientHeight
        });
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
    window.scrollTo(scroll.x, scroll.y);
  }, [zoomedView]);

  function mousePosition(e) {
    const x = e.pageX;
    const y = e.pageY;
    return { x, y };
  }

  function handleMouseMove(e) {
    if(zoomedView) {
      window.scrollTo(scroll.x, scroll.y);
      let { x, y } = mousePosition(e);
      let newX = scroll.x + e.target.width/5;
      let newY = scroll.y + e.target.height/5;
      console.log(x, newX);
      const xSpeed = 2.75;
      const ySpeed = 2;
      const xBuffer = 200;
      const yBuffer = 150;
      if(x > newX + xBuffer && y > newY + yBuffer) {
        setScroll({x: scroll.x + xSpeed, y: scroll.y + ySpeed})
      } else if (x > newX + xBuffer) {
        setScroll({x: scroll.x + xSpeed, y: scroll.y})
      } else if (y > newY + yBuffer) {
        setScroll({x: scroll.x, y: scroll.y + ySpeed})
      }
      if(x < newX - xBuffer && y < newY - yBuffer) {
        setScroll({x: scroll.x - xSpeed, y: scroll.y - ySpeed})
      } else if (x < newX - xBuffer) {
        setScroll({x: scroll.x - xSpeed, y: scroll.y})
      } else if (y < newY - yBuffer) {
        setScroll({x: scroll.x, y: scroll.y - ySpeed})
      }
    }
  }

  if (zoomedView) {
    return (
      <ImageGalleryExpandedWrapper zoom={zoomedView}>
        <ExpandedImage
          id="ExpandedImage"
          zoom={zoomedView}
          src={curDisplayPhotos[curDisplayIndex].url || missingImg}
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
        src={curDisplayPhotos[curDisplayIndex].url || missingImg}
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
          missingImg={missingImg}
        />
      </ExpandedThumbnailImages>
      <LeaveExpandedView id="LeaveExpanded" onClick={onClickHandler}>
        &#9447;
      </LeaveExpandedView>
    </ImageGalleryExpandedWrapper>
  );
}
