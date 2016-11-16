/**
 * Created by rystecher on 11/16/16.
 */
import React from 'react';

// Import Style
import styles from './Navbar.css';

export function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>Home</li>
        <li>Scoreboard</li>
        <li>Problem Set</li>
        <li>Rules</li>
      </ul>
    </div>
  );
}

Navbar.contextTypes = {
  router: React.PropTypes.object,
};

Navbar.propTypes = {};

export default Navbar;
