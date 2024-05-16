import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';

const NodeModal = ({ selectedNode, modalIsOpen, closeModal }) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Node Information"
    ariaHideApp={false}
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
      },
      content: {
        color: '#000',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      }
    }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4">{selectedNode?.label}</h2>
      <p className="text-lg"><strong>Type:</strong> {selectedNode?.type}</p>
      {selectedNode?.title && <p className="text-lg"><strong>Title:</strong> {selectedNode?.title}</p>}
      <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
    </motion.div>
  </Modal>
);

export default NodeModal;
