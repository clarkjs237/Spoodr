import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import TableView from './TableView';

const ModalContainer = styled.div`
  position: relative;
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
          <TableView
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
            // click handler for closing the modal
            closeModal={closeModal}
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
