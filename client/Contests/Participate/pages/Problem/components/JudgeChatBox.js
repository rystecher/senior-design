import React from 'react';
import { getTeamMessagesForJudge, sendMessageToTeam,
        getBroadcastMessages, sendBroadcastMessage } from '../../../../ContestActions.js';
import { ChatFeed, Message } from './chat-ui/lib/index.js';
import './judge-chat-box.css';

export default class JudgeChatBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messageObjs: [], value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        const { contestId, teamId, broadcast } = this.props;
        this.getMessages(contestId, teamId, broadcast);
    }

    componentWillReceiveProps(nextProps) {
        const { contestId, teamId, broadcast } = this.props;
        if (nextProps.contestId !== contestId ||
            nextProps.teamId !== teamId ||
            nextProps.broadcast !== broadcast) {
            this.setState({ messageObjs: [] });
            this.getMessages(nextProps.contestId, nextProps.teamId, nextProps.broadcast);
        }
    }

    componentWillUnmount() {
        clearInterval(this.chatIntervId);
    }

    getMessages(contestId, teamId, broadcast) {
        clearInterval(this.chatIntervId);
        if (broadcast) {
            const intervalFunc = () => getBroadcastMessages(contestId).then((messages) => {
                if (messages) {
                    const messageObjs = messages.map((message) => {
                        const type = 'Team' === message.from ? 1 : 0;
                        return new Message(type, message.message);
                    });
                    this.setState({ messageObjs });
                }
            });
            intervalFunc();
            this.chatIntervId = setInterval(intervalFunc, 10000);
        } else {
            const intervalFunc = () => getTeamMessagesForJudge(contestId, teamId).then((messages) => {
                if (messages) {
                    const messageObjs = messages.map((message) => {
                        const type = 'Team' === message.from ? 1 : 0;
                        return new Message(type, message.message);
                    });
                    this.setState({ messageObjs });
                }
            });
            intervalFunc();
            this.chatIntervId = setInterval(intervalFunc, 10000);
        }
    }

    sendMessage(event) {
        const { contestId, teamId, broadcast } = this.props;
        if (13 === event.keyCode) {
            if (broadcast) {
                sendBroadcastMessage(contestId, this.state.value);
                this.state.messageObjs.push(new Message(0, this.state.value));
                this.setState({
                    value: '',
                    messageObjs: this.state.messageObjs,
                });
            } else {
                sendMessageToTeam(contestId, teamId, this.state.value);
                this.state.messageObjs.push(new Message(0, this.state.value));
                this.setState({
                    value: '',
                    messageObjs: this.state.messageObjs,
                });
            }
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div id='chat-box'>
                <div className='chat-box-header'>
                    <span>{this.props.teamName}</span>
                    <span className='close' onClick={this.props.closeChat}>X</span>
                </div>
                <ChatFeed
                    messages={this.state.messageObjs}
                    bubblesCentered={false}
                />
                <input
                    placeholder='Have a question for the judges...'
                    className='message-input'
                    onKeyDown={this.sendMessage}
                    type='text' value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

JudgeChatBox.propTypes = {
    broadcast: React.PropTypes.bool,
    closeChat: React.PropTypes.func.isRequired,
    contestId: React.PropTypes.string.isRequired,
    teamId: React.PropTypes.string,
    teamName: React.PropTypes.string.isRequired,
};
