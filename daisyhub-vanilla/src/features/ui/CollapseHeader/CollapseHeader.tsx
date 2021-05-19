import './CollapseHeader.scss';
import classnames from 'classnames';
import { FeatherIcons } from '../FeatherIcons/FeatherIcons';

type Props = React.HTMLAttributes<HTMLElement> & {
  isOpen?: boolean;
  className?: string;
  disabled?: boolean;
};

export const CollapseHeader = (props: Props) => {
  const { className, isOpen, disabled, children, ...otherProps } = props;
  const containerClassName = classnames('collapse-header', className, {
    'is-active': isOpen,
  });

  return (
    <div className={containerClassName} {...otherProps}>
      <div className="collapse-header__content">{children}</div>
      {disabled ? null : (
        <FeatherIcons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          className="collapse-header__icon"
        />
      )}
    </div>
  );
};
