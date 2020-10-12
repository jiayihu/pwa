import './BulletinPreview.scss';
import React from 'react';
import { Bulletin } from '../../../types/bulletin';
import { format } from 'date-fns';
import classnames from 'classnames';
import mockImg from './mockImage.png';
import { useHistory } from 'react-router-dom';

type Props = {
  bulletin: Bulletin;
};

export const BulletinPreview = (props: Props) => {
  const { bulletin } = props;
  const history = useHistory();
  const creationDate = new Date(bulletin.meta.creationDate);
  const className = classnames('bulletin', {
    [`bulletin--${bulletin.island.fruit}`]: true,
  });

  return (
    <div className="card border-0 bg-transparent">
      <div className={className} onClick={() => history.push(`/bulletins/${bulletin.id}`)}>
        <p className="f7 my-0 text-right">{format(creationDate, 'iii d/L HH:mm')}</p>
        <img className="bulletin__fruit" src={mockImg} alt={bulletin.island.fruit} />
        <div>
          <h2 className="f4">{bulletin.island.name}</h2>
          <p>{bulletin.description}</p>
          <p>
            <span className="f2 text-dark">{bulletin.turnipPrice}</span> bells
          </p>
        </div>
      </div>
    </div>
  );
};
