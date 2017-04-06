import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../../Login/actions/authActions';

// Import Style

class Header extends React.Component {
// export function Header(props, context) {

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

    // TODO: Update these links to include team/contest ID or merge this navigation bar with the one found in Contests/ContestNavigator.js
        const userLinks = (
      <div className='navbar-header'>
        <Link to='/' className='navbar-brand'>Home</Link>
        <Link to='/create-contest' className='navbar-brand'>Create Contest</Link>
        <Link to='/problem' className='navbar-brand'>Problems</Link>
        <Link to='/scoreboard' className='navbar-brand'>ScoreBoard</Link>
        <a href='' onClick={this.logout.bind(this)} className='navbar-brand'>Logout</a>
      </div>
    );

        const guestLinks = (
      <div className='navbar-header'>
        <Link to='/' className='navbar-brand'>Home</Link>
      </div>
    );

        return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
            {isAuthenticated ? userLinks : guestLinks}
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
        auth: state.auth,
    };
}

export default connect(mapStateToProps, { logout })(Header);
