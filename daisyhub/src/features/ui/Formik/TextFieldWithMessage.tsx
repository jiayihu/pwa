import { FieldWithMessageProps, FieldWithMessage } from './FieldWithMessage';
import { Input, InputProps } from 'reactstrap';

export type TextFieldWithMessageProps = InputProps & Omit<FieldWithMessageProps, 'renderField'>;

export const TextFieldWithMessage = (props: TextFieldWithMessageProps) => {
  const { name, children, ...inputProps } = props;

  return (
    <FieldWithMessage
      name={name}
      renderField={({ field }, invalid) => (
        <Input type="text" {...inputProps} {...field} invalid={invalid} />
      )}
    />
  );
};
