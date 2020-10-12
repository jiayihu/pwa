import React from 'react';
import { FieldWithMessageProps, FieldWithMessage } from './FieldWithMessage';
import { Input, InputProps } from 'reactstrap';

export type DateFieldWithMessageProps = InputProps & Omit<FieldWithMessageProps, 'renderField'>;

export const DateFieldWithMessage = (props: DateFieldWithMessageProps) => {
  const { name, children, ...inputProps } = props;

  return (
    <FieldWithMessage
      name={name}
      renderField={({ field }, invalid) => (
        <Input type="date" {...inputProps} {...field} invalid={invalid} />
      )}
    />
  );
};
