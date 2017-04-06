import React from 'react';
import { Link } from 'react-router';
import './contest-navigator.css';
import { logout } from './Login/actions/authActions';
import { connect } from 'react-redux';

class ContestNavigator extends React.Component {

    logout(e) {
        this.props.logout();
    }

    render() {
        const { contestId, page, teamId, username, userRole } = this.props;
        let navLinks = null;
        if (userRole === 'admin') {
            navLinks = (
                <ul className='nav navbar-nav navbar-toggler-left'>
                    <li className={page === 'home' ? 'nav-item active' : 'nav-item'}>
                        <Link
                            className='nav-link'
                            to={`/contest/${contestId}/home`}
                        >Home</Link>
                    </li>
                    <li className={page === 'problems' ? 'nav-item active' : 'nav-item'}>
                        <Link
                            className='nav-link'
                            to={`/contest/${contestId}/problems/add`}
                        >Problems</Link>
                    </li>
                    <li className={page === 'scoreboard' ? 'nav-item active' : 'nav-item'}>
                        <Link
                            className='nav-link'
                            to={`/contest/${contestId}/scoreboard`}
                        >ScoreBoard</Link>
                    </li>
                    <li className={page === 'submissions' ? 'nav-item active' : 'nav-item'}>
                        <Link
                            className='nav-link'
                            to={`/contest/${contestId}/submissions`}
                        >Submissions</Link>
                    </li>
                </ul>
            );
        } else if (userRole === 'participant') {
            navLinks = (
                <ul className='nav navbar-nav navbar-toggler-left'>
                    <li className={page === 'home' ? 'nav-item active' : 'nav-item'}>
                        <Link
                            className='nav-link'
                            to={`/contest/${contestId}/home`}
                        >Home</Link>
                    </li>
                    <li className={page === 'problems' ? 'nav-item active' : 'nav-item'}>
                        <Link
                            className='nav-link'
                            to={`/contest/${contestId}/problems/${teamId}/1`}
                        >Problems</Link>
                    </li>
                    <li className={page === 'scoreboard' ? 'nav-item active' : 'nav-item'}>
                        <Link
                            className='nav-link'
                            to={`/contest/${contestId}/scoreboard/${teamId}`}
                        >ScoreBoard</Link>
                    </li>
                    <li className={page === 'submissions' ? 'nav-item active' : 'nav-item'}>
                        <Link
                            className='nav-link'
                            to={`/contest/${contestId}/submissions/${teamId}`}
                        >Submissions</Link>
                    </li>
                </ul>
            );
        }
        return (
            <nav className='navbar navbar-inverse contest-navigator'>
                <div className='navbar-toggleable-md'>
                    {navLinks}
                    <ul className='nav navbar-nav navbar-toggler-right'>
                        <li className='nav-item'>
                            <Link to={`/profile`} className='nav-link'>
                                <span className='glyphicon glyphicon-user'/>{username}
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to={`/login`} className='nav-link' onClick={this.logout.bind(this)}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

ContestNavigator.propTypes = {
    contestId: React.PropTypes.string.isRequired,
    page: React.PropTypes.oneOf([
        'home', 'problems', 'scoreboard', 'submissions',
    ]).isRequired,
    teamId: React.PropTypes.string,
    username: React.PropTypes.string.isRequired,
    userRole: React.PropTypes.oneOf(['admin', 'participant', 'none']).isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, { logout })(ContestNavigator);
