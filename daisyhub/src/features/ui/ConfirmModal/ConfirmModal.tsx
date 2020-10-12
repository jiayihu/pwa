import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ColorVariant } from '../../../types/bootstrap';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  color: ColorVariant;
};

export const ConfirmModal = (props: Props) => {
  const { isOpen, onConfirm, onCancel, color } = props;

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>Confirm</ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>
        <Button type="button" color="light" onClick={onCancel}>
          Cancel
        </Button>{' '}
        <Button type="button" color={color} onClick={onConfirm}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};
