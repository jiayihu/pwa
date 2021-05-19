import classnames from 'classnames';
import { Message } from '../../../types/message';
import { formatDistanceToNow } from 'date-fns';

type Props = {
  isHost: boolean;
  message: Message;
};

export const SimpleMessage = (props: Props) => {
  const { isHost, message } = props;
  const date = formatDistanceToNow(new Date(message.creationDate), { addSuffix: true });
  const className = classnames('m-0 py-2 px-1');

  return (
    <div className={className}>
      <div className="d-flex">
        <span className="">
          <strong>{message.name}</strong> {isHost ? '(host)' : null}:
        </span>
        <small className="ml-auto">{date}</small>
      </div>
      <div>{message.message}</div>
    </div>
  );
};
