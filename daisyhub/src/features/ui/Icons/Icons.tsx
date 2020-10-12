import './Icons.scss';
import React, { SVGProps } from 'react';
import { ReactComponent as Apple } from './svg/apple.svg';
import { ReactComponent as Cherries } from './svg/cherries.svg';
import { ReactComponent as Orange } from './svg/orange.svg';
import { ReactComponent as Peach } from './svg/peach.svg';
import { ReactComponent as Pear } from './svg/pear.svg';

import { ReactComponent as Fee } from './svg/fee.svg';

type Props = {
  name: string;
} & SVGProps<SVGSVGElement>;

const icons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  apple: Apple,
  cherry: Cherries,
  orange: Orange,
  peach: Peach,
  pear: Pear,

  fee: Fee,
};

export const Icons = (props: Props) => {
  const { name, ...svgProps } = props;
  const Comp = icons[props.name];

  return <Comp className={`icon icon--${props.name}`} width={32} height={32} {...svgProps} />;
};
