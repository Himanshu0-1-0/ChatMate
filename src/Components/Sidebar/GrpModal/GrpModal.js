'use client';
import "./GrpModal.css"
import React from 'react';
import Modal from 'react-modal';
import TagInput from "./TagInput";
const GroupModal = ({ isOpen, onRequestClose }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
      },
  };

  let subtitle;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Example Modal"
      > 
        <div className="content-grpmodal">
        <button onClick={onRequestClose} className="btn btn-danger clos-btn">X</button>
        <TagInput/>
        </div>
      </Modal>
    </div>
  );
};

export default GroupModal;
