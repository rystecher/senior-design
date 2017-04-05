import React, { PropTypes, Component } from 'react';
import { withRouter } from 'react-router';
import LoginForm from '../../Login/components/LoginForm.js';
import RegisterForm from '../../Login/components/RegisterForm.js';
import LoginOrRegisterForm from '../../Login/components/LoginOrRegisterForm.js';
import { connect } from 'react-redux';
import { userRegisterRequest, isUserExists } from '../../Login/actions/registerActions';
import { addFlashMessage } from '../../Login/actions/flashMessages';

class HomePage extends React.Component {

    constructor(props){
      super(props);
    }

    render() {
      const { userRegisterRequest, addFlashMessage, isUserExists } = this.props;
      return (
        <div>
          <h1>Bucknell Spring Programming Contest</h1>
          <br />
          <div className='col-md-4 col-md-offset-4'>
            <RegisterForm
              isUserExists={isUserExists}
              userRegisterRequest={userRegisterRequest}
              addFlashMessage={addFlashMessage}/>
          </div>
        </div>

        );
    }
}

HomePage.propTypes = {
  userRegisterRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired,
};


export default connect(null, { userRegisterRequest, addFlashMessage, isUserExists })(HomePage);
