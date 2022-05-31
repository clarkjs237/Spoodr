import React from 'react';
import Modal from 'react-modal';

// function ReviewPhoto(props) {
//   return (
//     <img
//       className="review-photo"
//       src={props.url}
//       alt="thumbnail"
//     />
//   );
// }

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function ReviewPhoto(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <img
        className="review-list-item-thumbnail"
        src={props.url}
        alt="thumbnail"
        onClick={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        className="review-list-item-modal"
        contentLabel="Example Modal"
      >
        <button className="review-photo-modal-close-button" onClick={closeModal}>🆇</button>
        <img
          className="review-list-item-modal-image"
          src={props.url}
          alt="modal-image"
        />
      </Modal>
    </div>
  );
}

export default ReviewPhoto;
