import React, { PropTypes, Component } from 'react';
import LoginOrRegisterForm from '../../Login/components/LoginOrRegisterForm.js';
import { connect } from 'react-redux';
import { userRegisterRequest, isUserExists } from '../../Login/actions/registerActions';
import { addFlashMessage } from '../../Login/actions/flashMessages';
import './HomePage.css'
import '../../contest-navigator.css';

class HomePage extends React.Component {

    constructor(props){
      super(props);
      this.state = {register: true}
    }

    render() {
      const { userRegisterRequest, addFlashMessage, isUserExists } = this.props;
      return (
        <div>

          <h1 className="center">Bucknell Programming Competition 2017</h1>
          <div className='col-md-4 col-md-offset-4 login'>
            <LoginOrRegisterForm
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
