import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, InputProps } from 'reactstrap';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (value: string) => void;
  children: React.ReactNode;

  inputProps?: InputProps;
};

export const PromptModal = (props: Props) => {
  const [value, setValue] = useState('');
  const { isOpen, onConfirm, onCancel, inputProps = {} } = props;

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>Confirm</ModalHeader>
      <form
        onSubmit={event => {
          event.preventDefault();
          onConfirm(value);
        }}
      >
        <ModalBody>
          {props.children}
          <Input
            type="text"
            value={value}
            required
            onChange={event => setValue(event.target.value)}
            {...inputProps}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="light" onClick={onCancel}>
            Cancel
          </Button>{' '}
          <Button type="submit" color="primary">
            Confirm
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
