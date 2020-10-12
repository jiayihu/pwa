import './FeatherIcons.scss';
import React, { SVGAttributes } from 'react';
import classnames from 'classnames';
import sprite from './feather-sprite.svg';

type Props = {
  name: string;
} & SVGAttributes<SVGElement>;

export const FeatherIcons = (props: Props) => {
  const { className, name, ...svgProps } = props;

  return (
    <svg className={classnames('icon', className)} {...svgProps}>
      <use xlinkHref={`${sprite}#${name}`} />
    </svg>
  );
};
