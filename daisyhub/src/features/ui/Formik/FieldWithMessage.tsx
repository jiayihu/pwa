import { Field, ErrorMessage, FieldProps, getIn } from 'formik';
import { FormFeedback } from 'reactstrap';

export type FieldWithMessageProps = {
  name: string;
  renderField: (fieldProps: FieldProps, invalid: boolean) => void;
};

export const FieldWithMessage = (props: FieldWithMessageProps) => {
  const { name, renderField } = props;

  return (
    <>
      <Field name={name}>
        {(fieldProps: FieldProps) => {
          const isInvalid =
            getIn(fieldProps.form.touched, name) && getIn(fieldProps.form.errors, name);
          return renderField(fieldProps, isInvalid);
        }}
      </Field>
      <ErrorMessage name={name}>{(msg) => <FormFeedback>{msg}</FormFeedback>}</ErrorMessage>
    </>
  );
};
