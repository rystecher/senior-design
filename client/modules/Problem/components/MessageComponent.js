import React from 'react';
import {fetchTeamMessages, sendJudgeMessage} from '../../Contests/ContestActions.js';
import ChatFeed from './chat-ui/lib/ChatFeed/index.js';
import Message from './chat-ui/lib/Message/index.js';

export default class MessageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messageObjs: [], value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const team_id = "would have an id here";
        this.chatIntervId = setInterval(() => {
            fetchTeamMessages(team_id).then((messages) => {
                const messageObjs = messages.map((message) => {
                    const type = message.from === 'Team' ? 0 : 1;
                    return new Message(type, message.message);
                })
                this.setState({ messageObjs });
            });
        }, 30000);
    }

    componentWillUnMount() {
        clearInterval(this.state.chatIntervId);
    }

    sendMessage(eve) {
        if(eve.keyCode == 13) {
            sendJudgeMessage(this.state.value);
            this.state.messageObjs.push(new Message(0, this.state.value));
            this.setState({
                value: '',
                messageObjs: this.state.messageObjs
            });
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <ChatFeed
                    messages={this.state.messageObjs}
                    isTyping={this.state.is_typing}
                    hasInputField={false}
                    bubblesCentered={false}
                />
                <input
                    placeholder="Have a question for the judges..."
                    className="message-input"
                    onKeyDown={this.sendMessage.bind(this)}
                    type="text" value={this.state.value}
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
