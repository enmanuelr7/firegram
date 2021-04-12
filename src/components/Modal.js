import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ selectedImg, setSelectedImage }) => {
  const hancleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImage(null);
    }
  };
  return (
    <motion.div
      className="backdrop"
      onClick={hancleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg}
        alt="enlarged pic"
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
      />
    </motion.div>
  );
};

export default Modal;
