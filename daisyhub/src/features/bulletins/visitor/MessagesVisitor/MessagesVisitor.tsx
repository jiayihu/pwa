import './MessagesVisitor.scss';
import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeToMessages,
  unsubscribeToMessages,
  addBulletinMessage,
} from '../../../../store/actions/messages.actions';
import { Button, Form, Input, FormGroup, Col, Alert, FormText } from 'reactstrap';
import {
  selectBulletinMessages,
  selectBulletinVisitorId,
  selectBulletinVisitors,
} from '../../../../store/reducers';
import { Bulletin } from '../../../../types/bulletin';
import { useSubscription } from '../../../../hooks/useSubscription';
import { SimpleMessage } from '../../../ui/SimpleMessage/SimpleMessage';

export type Props = {
  bulletin: Bulletin;
};

export const MessagesVisitor = (props: Props) => {
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

  const [messageText, setMessageText] = useState('');
  const visitors = useSelector(selectBulletinVisitors);
  const visitorId = useSelector(selectBulletinVisitorId);
  const visitor = visitorId && (visitors.find((x) => x.id === visitorId) || null);

  const orderedMessages = [...messages].sort((a, b) =>
    new Date(a.creationDate) > new Date(b.creationDate) ? 1 : -1,
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (!visitor) return;

      dispatch(
        addBulletinMessage(bulletin.id, {
          authorId: visitor.id,
          name: visitor.name,
          message: messageText,
        }),
      );
      setMessageText('');
    },
    [visitor, messageText, bulletin.id, dispatch],
  );

  return (
    <div className="py-3">
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
              disabled={!visitorId}
              placeholder="Send a message to everyone"
            />
            {!visitorId ? <FormText>You must join the queue to send messages.</FormText> : null}
          </Col>
          <Col className="flex-grow-0">
            <Button type="submit" color="primary" disabled={!visitorId}>
              Send
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};
