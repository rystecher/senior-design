import React from 'react';
import LoginForm from '../components/LoginForm';
import '../../contest-navigator.css';
import { Link } from 'react-router';

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-inverse contest-navigator'>
          <div className='navbar-toggleable-md'>
            <ul className='nav navbar-nav navbar-toggler-right'>
              <li className='nav-item'>
                <Link to={`/register`} className='nav-link'>
                  <span className='glyphicon glyphicon-user'/>register
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <br />
        <br />
        <br />
        <h1>Login</h1>
        <br />
        <div className='row'>
          <div className='col-md-4 col-md-offset-4'>
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
