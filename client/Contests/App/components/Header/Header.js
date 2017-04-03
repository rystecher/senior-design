import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../../Login/actions/authActions';

// Import Style
import styles from './Header.css';

class Header extends React.Component {
//export function Header(props, context) {

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Home</Link>
        <Link to="/create-contest" className="navbar-brand">Create Contest</Link>
        <Link to="/problem" className="navbar-brand">Problems</Link>
        <Link to="/scoreboard" className="navbar-brand">ScoreBoard</Link>
        <Link to="/judge" className="navbar-brand">Admin Page</Link>
        <a href="" onClick={this.logout.bind(this)} className="navbar-brand">Logout</a>
      </div>
    );

    const guestLinks = (
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Home Page</Link>
        <Link to="/register" className="navbar-brand">Register</Link>
        <Link to="/login" className="navbar-brand">Login</Link>
      </div>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
            { isAuthenticated ? userLinks : guestLinks }
        </div>
      </nav>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(Header);
