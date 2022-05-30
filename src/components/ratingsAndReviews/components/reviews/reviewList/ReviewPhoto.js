import React, { useState } from 'react';

function ReviewPhoto(props) {
  const [toggleModal, setToggleModal] = useState(false);

  function handleToggleModal() {
    setToggleModal(!toggleModal);
  }

  return (
    <div>
      <img
        className="review-list-item-thumbnail"
        src={props.url}
        alt="thumbnail"
        onClick={handleToggleModal}
      />
      {toggleModal
      && (
      <div className="Modal">
        <button type="button" className="review-photo-modal-close-button" onClick={handleToggleModal}>🆇</button>
        <img
          className="review-list-item-modal-image"
          src={props.url}
          alt="modal"
        />
      </div>
      )}
    </div>
  );
}

export default ReviewPhoto;
