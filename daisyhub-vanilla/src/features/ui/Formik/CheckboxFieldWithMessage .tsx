import { FieldWithMessageProps, FieldWithMessage } from './FieldWithMessage';
import { Input, InputProps } from 'reactstrap';

export type CheckboxFieldWithMessageProps = InputProps & Omit<FieldWithMessageProps, 'renderField'>;

export const CheckboxFieldWithMessage = (props: CheckboxFieldWithMessageProps) => {
  const { name, children, ...inputProps } = props;

  return (
    <FieldWithMessage
      name={name}
      renderField={({ field }, invalid) => (
        <Input type="checkbox" {...inputProps} {...field} invalid={invalid} />
      )}
    />
  );
};
