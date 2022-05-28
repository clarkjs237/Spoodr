import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

const ModalContainer = styled.div`
  position: relative;
`;

const ModalView = styled.div`
  height: 16rem;
  width: 16rem;
  position: absolute;
  background-color: red;
  border: 2px black solid;
  transition: transform 0.5s ease-out;
  top: -62rem;
  // left: ${(props) => (props.index * 8.5) + 8.5}rem;
  left: 24rem;
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
  modalCardIndex,
  isOpen,
  setIsOpen,
}) {
  // Uses the helper function to find the place in the DOM to put the window
  const target = usePortal('modal-root');

  // When the close modal button is clicked, close the modal
  function closeModal(e) {
    e.stopPropagation();
    setIsOpen(false);
  }
  // Actually places the modal into the DOM
  function placeModal() {
    if (isOpen) {
      return (
        <ModalContainer>
          <ModalView
            index={modalCardIndex}
          >
            I'm a div!
          </ModalView>
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
