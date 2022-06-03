import React, { useState } from 'react';
import styled from 'styled-components';
import Modal, { StyledModal, StyledModalBG } from '../../styled-components/Modal';

const StyledThumbnail = styled.img`
  max-height: 50px;
`;

const StyledModalImage = styled.img`
  padding-top: 5px;
  padding-right: 5px;
  margin: auto;
  width: 500px;
`;

function ReviewPhoto(props) {
  const [toggleModal, setToggleModal] = useState(false);

  function handleToggleModal() {
    setToggleModal(!toggleModal);
  }

  return (
    <div>
      <StyledThumbnail
        src={props.url}
        alt="thumbnail"
        onClick={handleToggleModal}
      />
      {toggleModal
      && (
        <div>
          <StyledModalBG/>
          <StyledModal>
            <button type="button" onClick={handleToggleModal}>close</button>
            <StyledModalImage
              src={props.url}
              alt="modal"
            />
          </StyledModal>
        </div>
      )}
    </div>
  );
}

export default ReviewPhoto;
