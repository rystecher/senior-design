import React from 'react';
import LoginOrRegisterForm from '../Login/components/LoginOrRegisterForm.js';
import { connect } from 'react-redux';
import { userRegisterRequest } from '../Login/actions/registerActions';
import '../contestnavigator.css';
import './homepage.css';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { register: true };
    }

    render() {
        const { userRegisterRequest } = this.props;
        return (
            <div>
                <h1 className='center'>Bucknell Programming Competition 2017</h1>
                <div className='col-md-4 col-md-offset-4 login'>
                    <LoginOrRegisterForm
                        userRegisterRequest={userRegisterRequest}
                    />
                </div>
            </div>

        );
    }
}

HomePage.propTypes = {
    userRegisterRequest: React.PropTypes.func.isRequired,
};


export default connect(null, { userRegisterRequest })(HomePage);
