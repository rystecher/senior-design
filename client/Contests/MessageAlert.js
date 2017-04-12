import React from 'react';
import Alert from 'react-s-alert';
import { Link, withRouter } from 'react-router';

class MessageAlert extends React.Component {

    handleConfirm() {
        Alert.close(this.props.id);
    }

    render() {
        console.log(this.props);
        return (
            <div className={this.props.classNames} id={this.props.id} style={this.props.styles}>
                <div className='s-alert-box-inner'>
                    {this.props.message}
                    <Link
                        to={`/contest/${this.props.customFields.contestId}/submissions`}
                        className='new-message-link'
                    >new message</Link>
                </div>
                <span className='s-alert-close' onClick={this.props.handleClose}></span>
            </div>
        );
    }
}

export default withRouter(MessageAlert);
