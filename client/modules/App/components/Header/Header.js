import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header(props, context) {

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <ul>
          <li><Link to="/">Home Page </Link></li>
          <li><Link to="/create-contest" >Create Contest</Link></li>
          <li><Link to="/problem" >Problem Page</Link></li>
          <li><Link to="/scoreboard" >ScoreBoard Page</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

export default Header;
