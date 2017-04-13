import React from 'react';
import Alert from 'react-s-alert';
import { Link, withRouter } from 'react-router';

class MessageAlert extends React.Component {

    constructor(props) {
        super(props);
        this.goToNewMessage = this.goToNewMessage.bind(this);
    }

    handleConfirm() {
        Alert.close(this.props.id);
    }

    goToNewMessage() {
        Alert.close(this.props.id);
        this.props.router.push(`/contest/${this.props.customFields.contestId}/submissions`);
    }

    render() {
        return (
            <div className={this.props.classNames} id={this.props.id} style={this.props.styles}>
                <div className='s-alert-box-inner'>
                    {this.props.message}
                    <Link
                        onClick={this.goToNewMessage}
                        className='new-message-link'
                    >new message</Link>
                </div>
                <span className='s-alert-close' onClick={this.props.handleClose}></span>
            </div>
        );
    }
}

export default withRouter(MessageAlert);
