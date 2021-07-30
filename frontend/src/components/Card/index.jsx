import PropTypes from 'prop-types';
import SCard from './style';

export default function Card({ avatar, background, lastName, firstName }) {
  return (
    <SCard>
      <img src={background.preview} className="background" alt="" />
      <img src={avatar.preview} className="avatar" alt="" />
      <footer>
        <h3>{`${firstName} ${lastName}`}</h3>
      </footer>
    </SCard>
  );
}

Card.propTypes = {
  avatar: PropTypes.shape,
  background: PropTypes.shape,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
};
Card.defaultProps = {
  avatar: '',
  background: { preview: '/assets/img/default-background.jpg' },
  lastName: 'N/A',
  firstName: 'N/A',
};
