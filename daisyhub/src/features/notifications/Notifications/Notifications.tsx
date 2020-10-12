import './Notifications.scss';
import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotifications } from '../../../store/reducers';
import { removeNotification } from '../../../store/actions/notifications.actions';
import { ToastContainer } from '../ToastContainer/ToastContainer';

export const Notifications = () => {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();

  return (
    <ToastContainer style={{ maxWidth: '16rem' }}>
      {notifications.map((notification, i) => (
        <Toast isOpen={true} key={i}>
          <ToastHeader
            icon={notification.type}
            toggle={() => dispatch(removeNotification(notification))}
          >
            <span className="mx-3">
              {notification.type === 'danger' ? 'ERROR' : notification.type.toUpperCase()}
            </span>
          </ToastHeader>
          <ToastBody>{notification.message}</ToastBody>
        </Toast>
      ))}
    </ToastContainer>
  );
};
