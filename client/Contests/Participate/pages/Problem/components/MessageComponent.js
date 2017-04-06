import React from 'react';
import { getTeamMessages, sendMessageToJudge } from '../../../../ContestActions.js';
import { ChatFeed, Message } from './chat-ui/lib/index.js';

export default class MessageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messageObjs: [], value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { contest_id, team_id } = this.props;
        const intervalFunc = () => getTeamMessages(contest_id, team_id).then((messages) => {
            if (messages) {
                const messageObjs = messages.map((message) => {
                    const type = 'Team' === message.from ? 0 : 1;
                    return new Message(type, message.message);
                });
                this.setState({ messageObjs });
            }
        });
        intervalFunc();
        this.chatIntervId = setInterval(intervalFunc, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.chatIntervId);
    }

    sendMessage(eve) {
        const { contest_id, team_id } = this.props;
        if (13 === eve.keyCode) {
            sendMessageToJudge(contest_id, team_id, this.state.value);
            this.state.messageObjs.push(new Message(0, this.state.value));
            this.setState({
                value: '',
                messageObjs: this.state.messageObjs,
            });
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div>
                <ChatFeed
                    messages={this.state.messageObjs}
                    bubblesCentered={false}
                />
                <input
                    placeholder='Have a question for the judges...'
                    className='message-input'
                    onKeyDown={this.sendMessage.bind(this)}
                    type='text' value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

MessageComponent.propTypes = {
    contest_id: React.PropTypes.string.isRequired,
    team_id: React.PropTypes.string.isRequired,
};
