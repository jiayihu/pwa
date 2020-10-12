import './ToastContainer.scss';
import React from 'react';

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const ToastContainer = (props: Props) => {
  const { children, ...divProps } = props;

  return (
    <div className="toast-container container" aria-live="polite" aria-atomic="true" {...divProps}>
      {children}
    </div>
  );
};
