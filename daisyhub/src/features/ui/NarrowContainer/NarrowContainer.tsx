import './NarrowContainer.scss';
import React from 'react';

type Props = {
  hasBg?: boolean;
  children: React.ReactNode;
};

export const NarrowContainer = (props: Props) => {
  return (
    <div className="row justify-content-center">
      <div className={`col-md-10 col-lg-8 col-xl-6 ${props.hasBg ? 'narrow-container__bg' : ''}`}>
        {props.children}
      </div>
    </div>
  );
};
