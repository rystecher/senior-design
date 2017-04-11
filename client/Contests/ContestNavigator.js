import React from 'react';
import { Link } from 'react-router';
import './contest-navigator.css';
import { logout } from './Login/actions/authActions';
import { connect } from 'react-redux';
import { getContestInfo } from './ContestActions';

class ContestNavigator extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: ''};
  }


  logout(e) {
    this.props.logout();
  }

  /**
   * get contest name for home link
   */
  componentDidMount() {
    if(this.props.contestId != 'wont be used') {
      getContestInfo(this.props.contestId).then(res => {
        if (res.name) {
          this.setState({name: res.name});
        }
      });
    }
  }

  render() {
    const { contestId, page, teamId, username, userRole } = this.props;

    let navLinks = null;
    if ('admin' === userRole) {
      navLinks = (
        <ul className='nav navbar-nav navbar-toggler-left'>
          <li className={'home' === page ? 'nav-item active' : 'nav-item'}>
            <Link
              className='nav-link'
              to={`/contest/${contestId}/home`}
            >{this.state.name}</Link>
          </li>
          <li className={'problems' === page ? 'nav-item active' : 'nav-item'}>
            <Link
              className='nav-link'
              to={`/contest/${contestId}/problems/add`}
            >Problems</Link>
          </li>
          <li className={'scoreboard' === page ? 'nav-item active' : 'nav-item'}>
            <Link
              className='nav-link'
              to={`/contest/${contestId}/scoreboard`}
            >ScoreBoard</Link>
          </li>
          <li className={'submissions' === page ? 'nav-item active' : 'nav-item'}>
            <Link
              className='nav-link'
              to={`/contest/${contestId}/submissions`}
            >Submissions</Link>
          </li>
        </ul>
      );
    } else if ('participant' === userRole) {
      navLinks = (
        <ul className='nav navbar-nav navbar-toggler-left'>
          <li className={'home' === page ? 'nav-item active' : 'nav-item'}>
            <Link
              className='nav-link'
              to={`/contest/${contestId}/home`}
            >{this.state.name}</Link>
          </li>
          <li className={'problems' === page ? 'nav-item active' : 'nav-item'}>
            <Link
              className='nav-link'
              to={`/contest/${contestId}/problems/${teamId}/1`}
            >Problems</Link>
          </li>
          <li className={'scoreboard' === page ? 'nav-item active' : 'nav-item'}>
            <Link
              className='nav-link'
              to={`/contest/${contestId}/scoreboard/${teamId}`}
            >ScoreBoard</Link>
          </li>
          <li className={'submissions' === page ? 'nav-item active' : 'nav-item'}>
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
              <Link to={'/profile'} className='nav-link'>
                <span className='glyphicon glyphicon-user' />{username}
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/'} className='nav-link' onClick={this.logout.bind(this)}>
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
    'home', 'problems', 'scoreboard', 'submissions', 'none',
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
