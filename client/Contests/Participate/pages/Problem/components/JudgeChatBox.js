import React from 'react';
import {getTeamMessagesForJudge, sendMessageToTeam} from '../../../../ContestActions.js';
import {ChatFeed, Message} from './chat-ui/lib/index.js';
import './judge-chat-box.css';

export default class JudgeChatBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messageObjs: [], value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        const {contest_id, team_id} = this.props;
        this.getMessages(contest_id, team_id);
    }

    componentWillReceiveProps(nextProps) {
        const { contest_id, team_id } = this.props;
        if (nextProps.contest_id !== contest_id || nextProps.team_id !== team_id) {
            this.setState({ messageObjs: [] });
            this.getMessages(nextProps.contest_id, nextProps.team_id);
        }
    }

    getMessages(contest_id, team_id) {
        clearInterval(this.chatIntervId);
        this.chatIntervId = setInterval(() => {
            getTeamMessagesForJudge(contest_id, team_id).then((messages) => {
                if (messages) {
                    const messageObjs = messages.map((message) => {
                        const type = message.from === 'Team' ? 1 : 0;
                        return new Message(type, message.message);
                    });
                    this.setState({ messageObjs });
                }
            });
        }, 15000);
    }

    componentWillUnmount() {
        clearInterval(this.chatIntervId);
    }

    sendMessage(event) {
        const {contest_id, team_id} = this.props;
        if(event.keyCode === 13) {
            sendMessageToTeam(contest_id, team_id, this.state.value);
            this.state.messageObjs.push(new Message(0, this.state.value));
            this.setState({
                value: '',
                messageObjs: this.state.messageObjs
            });
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
    contest_id: React.PropTypes.string.isRequired,
    team_id: React.PropTypes.string.isRequired,
    teamName: React.PropTypes.string.isRequired,
};
