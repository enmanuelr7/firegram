import React from 'react';

const Modal = ({ selectedImg, setSelectedImage }) => {
  const hancleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImage(null);
    }
  };
  return (
    <div className="backdrop" onClick={hancleClick}>
      <img src={selectedImg} alt="enlarged pic" />
    </div>
  );
};

export default Modal;
