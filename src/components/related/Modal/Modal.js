import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import ModalView from './ModalView';

const ModalContainer = styled.div`
  position: relative;
`;

const CloseModalButton = styled.span`
  position: absolute;
  top: -61.5rem;
  left: 38rem;
  font-size: 1.8rem;
  &:before {
    content: "\\2716";
  }
  cursor: pointer;
  &:hover {
    color: #90D7FF;
  }
`;

// Helper function to find place to insert this into the DOM
function usePortal(id) {
  const rootElemRef = React.useRef(document.createElement('div'));

  useEffect(function setupElement() {
    const parentElem = document.querySelector(`#${id}`);
    parentElem.appendChild(rootElemRef.current);

    return function removeElement() {
      rootElemRef.current.remove();
    };
  }, [id]);

  return rootElemRef.current;
}

export default function Modal({
  // Functionality for keeping track of which card is selected
  modalCardIndex,
  setModalCardIndex,
  isOpen,
  setIsOpen,
  // overview product information
  overviewProduct,
  overviewStyle,
  overviewRating,
  // related product information
  relatedProduct,
  relatedStyle,
  relatedRating,
}) {
  // Uses the helper function to find the place in the DOM to put the window
  const target = usePortal('modal-root');

  // When the close modal button is clicked, close the modal
  function closeModal(e) {
    e.stopPropagation();
    setIsOpen(false);
    setModalCardIndex(null);
  }
  // Actually places the modal into the DOM
  function placeModal() {
    if (isOpen) {
      return (
        <ModalContainer>
          <ModalView
            // Might use this for styled later, not essential now
            modalCardIndex={modalCardIndex}
            // Overview
            overviewProduct={overviewProduct}
            overviewStyle={overviewStyle}
            overviewRating={overviewRating}
            // Related Card
            relatedProduct={relatedProduct}
            relatedStyle={relatedStyle}
            relatedRating={relatedRating}
          />
          <CloseModalButton
            onClick={closeModal}
          />
        </ModalContainer>
      );
    }
    return null;
  }

  // Returning the component and placing it into the DOM
  return createPortal(
    placeModal(),
    target,
  );
}
