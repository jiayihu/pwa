import React from 'react';
import { FieldWithMessageProps, FieldWithMessage } from './FieldWithMessage';
import { Input, InputProps } from 'reactstrap';

export type NumberFieldWithMessageProps = InputProps & Omit<FieldWithMessageProps, 'renderField'>;

export const NumberFieldWithMessage = (props: NumberFieldWithMessageProps) => {
  const { name, children, ...inputProps } = props;

  return (
    <FieldWithMessage
      name={name}
      renderField={({ field }, invalid) => (
        <Input type="number" {...inputProps} {...field} invalid={invalid} />
      )}
    />
  );
};
