import './Bulletins.scss';
import { useEffect } from 'react';
import { getBulletins } from '../../../store/actions/bulletin.actions';
import { History } from 'history';
import { CardColumns, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectBulletins } from '../../../store/reducers';
import { BulletinPreview } from '../BulletinPreview/BulletinPreview';
import { Link } from 'react-router-dom';
import { PostLoader } from '../../ui/PostLoader/PostLoader';

type Props = {
  history: History;
};

export const Bulletins = (_: Props) => {
  const bulletins = useSelector(selectBulletins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBulletins());
  }, [dispatch]);

  if (!bulletins) return <PostLoader />;
  if (!bulletins.length)
    return (
      <Alert color="light">
        <h3>Whoopsie, pretty empty here!</h3>
        There are currently no islands. <Link to="/host">Be the first to sell turnips!</Link>
      </Alert>
    );

  const orderedBulletins = [...bulletins].sort((a, b) =>
    new Date(a.meta.creationDate) < new Date(b.meta.creationDate) ? 1 : -1,
  );

  return (
    <CardColumns className="bulletins">
      {orderedBulletins.map((bulletin) => (
        <BulletinPreview bulletin={bulletin} key={bulletin.id} />
      ))}
    </CardColumns>
  );
};
