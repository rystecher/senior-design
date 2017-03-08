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
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/create-contest" >Create Contest</Link></li>
        <li><Link to="/problem" >Problem Page</Link></li>
        <li><Link to="/scoreboard" >ScoreBoard Page</Link></li>
        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Home Page</Link>
          </div>
          <div className="collapse navbar-collapse">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(Header);
