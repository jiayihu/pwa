import React from 'react';
import { FieldWithMessageProps, FieldWithMessage } from './FieldWithMessage';
import { Input, InputProps } from 'reactstrap';

export type SelectFieldWithMessageProps = InputProps & Omit<FieldWithMessageProps, 'renderField'>;

export const SelectFieldWithMessage = (props: SelectFieldWithMessageProps) => {
  const { name, children, ...inputProps } = props;

  return (
    <FieldWithMessage
      name={name}
      renderField={({ field }, invalid) => (
        <Input type="select" {...inputProps} {...field} invalid={invalid}>
          {children}
        </Input>
      )}
    />
  );
};
