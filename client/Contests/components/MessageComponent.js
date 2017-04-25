import React from 'react';
import { getTeamMessages, sendMessageToJudge } from '../ContestActions.js';
import { ChatFeed, Message } from './chat-ui/lib/index.js';

export default class MessageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messageObjs: [] };
    }

    componentDidMount() {
        const { contestId, teamId } = this.props;
        const intervalFunc = () => getTeamMessages(contestId, teamId).then((messages) => {
            if (messages) {
                const messageObjs = messages.map((message) => {
                    const type = 'Team' === message.from ? 0 : 1;
                    return new Message(type, message.message);
                });
                if (this.state.messageObjs.length < messageObjs.length) {
                    this.setState({ messageObjs });
                    this.child._scrollToBottom();
                }
            }
        });
        intervalFunc();
        this.chatIntervId = setInterval(intervalFunc, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.chatIntervId);
    }

    sendMessage(event) {
        const { contestId, teamId } = this.props;
        if (event.keyCode === 13) {
            sendMessageToJudge(contestId, teamId, event.target.value);
            this.state.messageObjs.push(new Message(0, event.target.value));
            event.target.value = '';
            this.setState({ messageObjs: this.state.messageObjs });
            setTimeout(() => this.child._scrollToBottom(), 250);
        }
    }

    render() {
        return (
            <div className='chatbox'>
                <ChatFeed
                    ref={instance => { this.child = instance; }}
                    messages={this.state.messageObjs}
                    bubblesCentered={false}
                />
                <input
                    placeholder='Have a question for the judges...'
                    className='message-input'
                    onKeyDown={this.sendMessage.bind(this)}
                    type='text'
                    style={styles.inputField}
                />
            </div>
        );
    }
}

const styles = {
    inputField: {
        display: 'inherit',
    },
};

MessageComponent.propTypes = {
    contestId: React.PropTypes.string.isRequired,
    teamId: React.PropTypes.string.isRequired,
};
