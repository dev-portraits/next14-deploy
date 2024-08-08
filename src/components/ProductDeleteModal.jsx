"use client";
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ProductDeleteModal = ({ product, onClose, onDelete }) => {
  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete{" "}
          <strong>{product && product.title}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onDelete}>
          Yes, Delete
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDeleteModal;
