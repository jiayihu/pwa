import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { readOwnerId } from '../../../services/bulletin-history.service';
import { BulletinHost } from '../host/BulletinHost/BulletinHost';
import { BulletinVisitor } from '../visitor/BulletinVisitor/BulletinVisitor';
import { useSelector, useDispatch } from 'react-redux';
import { selectBulletinOwnerId } from '../../../store/reducers';
import { setBulletinOwnerId } from '../../../store/actions/bulletin.actions';
import { useScrollTo } from '../../ui/ScrollToTop/ScrollToTop';

export const ProtectedBulletin = () => {
  const match = useRouteMatch<{ bulletinId: string }>();
  const bulletinId = match.params.bulletinId;
  const [checked, setChecked] = useState(false);
  const ownerId = useSelector(selectBulletinOwnerId);
  const dispatch = useDispatch();
  useScrollTo(0, 0, []);

  useEffect(() => {
    const id = readOwnerId(bulletinId);
    if (id) dispatch(setBulletinOwnerId(id));
    setChecked(true);
  }, [bulletinId, dispatch]);

  if (!checked) return null;

  return ownerId ? <BulletinHost /> : <BulletinVisitor />;
};
