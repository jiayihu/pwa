import { FieldWithMessageProps, FieldWithMessage } from './FieldWithMessage';
import { Input, InputProps } from 'reactstrap';

export type TimeFieldWithMessageProps = InputProps & Omit<FieldWithMessageProps, 'renderField'>;

export const TimeFieldWithMessage = (props: TimeFieldWithMessageProps) => {
  const { name, children, ...inputProps } = props;

  return (
    <FieldWithMessage
      name={name}
      renderField={({ field }, invalid) => (
        <Input type="time" {...inputProps} {...field} invalid={invalid} />
      )}
    />
  );
};
