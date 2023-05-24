import { useEffect } from 'react';
import { Overlay, ModalBox, ImgXL } from './Modal.styled';
import PropTypes from 'prop-types';
export const Modal = ({ onModalClose, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.keyCode === 27 || e.currentTarget === e.target) {
      onModalClose();
      return;
    }
  };

  return (
    <Overlay onClick={handleKeyDown}>
      <ModalBox>
        <ImgXL src={largeImageURL} alt="large photo" />
      </ModalBox>
    </Overlay>
  );
};

Modal.prototypes = {
  largeImageURL: PropTypes.string,
  onModalClose: PropTypes.func,
};
