import React from 'react';
import RegisterForm from '../components/RegisterForm';
import {connect} from 'react-redux';
import { userRegisterRequest } from '../actions/registerActions';
import { addFlashMessage } from '../actions/flashMessages';

class RegisterPage extends React.Component {
  render() {
    const { userRegisterRequest, addFlashMessage } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <RegisterForm userRegisterRequest={userRegisterRequest} addFlashMessage={addFlashMessage} />
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  userRegisterRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, { userRegisterRequest, addFlashMessage})(RegisterPage);
