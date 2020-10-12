import './BulletinDetails.scss';
import React from 'react';
import { format, isEqual } from 'date-fns';
import turnipImg from './turnip.png';
import { Icons } from '../../ui/Icons/Icons';
import { Bulletin } from '../../../types/bulletin';

type Props = {
  bulletin: Bulletin;
};

export const BulletinDetails = (props: Props) => {
  const { bulletin } = props;
  const islandDate = new Date(bulletin.time);
  const creationDate = new Date(bulletin.meta.creationDate);

  return (
    <div className="bulletin-details">
      <div className="text-center">
        <img src={turnipImg} alt="" width="400" />
      </div>
      <h2 className="mb-0">
        {bulletin.island.name}
        <span title={bulletin.island.fruit} className="ml-3">
          <Icons name={bulletin.island.fruit} width={42} height={42} />
        </span>
        <span title="Fee">{bulletin.preferences.hasFee ? <Icons name="fee" /> : null}</span>
      </h2>
      <p>
        <span>
          by <span className="text-success">{bulletin.island.player}</span>
        </span>
      </p>
      <p className="f6 d-flex justify-content-end">
        {isEqual(islandDate, creationDate) ? (
          <span>Created at time {format(islandDate, 'iii d/L HH:mm')}</span>
        ) : (
          <>
            <span>Created at time {format(islandDate, 'iii d/L HH:mm')} on the island</span>
            <span className="ml-3">{format(creationDate, 'iii d/L HH:mm')} in real-world</span>
          </>
        )}
      </p>
      <p>{bulletin.description}</p>
      <p>
        <span className="f2 text-dark">{bulletin.turnipPrice}</span> bells
      </p>
    </div>
  );
};
