import './MessagesHost.scss';
import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeToMessages,
  unsubscribeToMessages,
  addBulletinMessage,
} from '../../../../store/actions/messages.actions';
import { Button, Form, Input, FormGroup, Col, Alert } from 'reactstrap';
import { selectBulletinMessages, selectBulletinOwnerId } from '../../../../store/reducers';
import { Bulletin } from '../../../../types/bulletin';
import { useSubscription } from '../../../../hooks/useSubscription';
import { SimpleMessage } from '../../../ui/SimpleMessage/SimpleMessage';

export type Props = {
  bulletin: Bulletin;
};

export const MessagesHost = (props: Props) => {
  const { bulletin } = props;
  const dispatch = useDispatch();
  const subscription = useMemo(
    () => ({
      selector: selectBulletinMessages,
      subscribe: () => {
        dispatch(subscribeToMessages(bulletin.id));
        return () => dispatch(unsubscribeToMessages(bulletin.id));
      },
    }),
    [dispatch, bulletin.id],
  );
  const messages = useSubscription(subscription, [bulletin.id]);
  const ownerId = useSelector(selectBulletinOwnerId);

  const [messageText, setMessageText] = useState('');

  const orderedMessages = [...messages].sort((a, b) =>
    new Date(a.creationDate) > new Date(b.creationDate) ? 1 : -1,
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (!ownerId) return;

      dispatch(
        addBulletinMessage(bulletin.id, {
          authorId: ownerId,
          name: bulletin.island.player,
          message: messageText,
        }),
      );
      setMessageText('');
    },
    [ownerId, messageText, bulletin, dispatch],
  );

  return (
    <div>
      <h3>Messages</h3>
      <div className="pb-3">
        {orderedMessages.length ? (
          orderedMessages.map((message) => (
            <SimpleMessage
              isHost={message.authorId === bulletin.ownerId}
              message={message}
              key={message.id}
            />
          ))
        ) : (
          <Alert color="light">There are no messages yet.</Alert>
        )}
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Col>
            <Input
              type="text"
              className="form-control"
              required
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              placeholder="Send a message to everyone"
            />
          </Col>
          <Col className="flex-grow-0">
            <Button type="submit" color="primary">
              Send
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};
