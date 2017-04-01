import React from 'react';
import JudgeChatBox from './JudgeChatBox.js';
import {fetchJudgeMessages} from '../../../../ContestActions.js';
import './chat-sidebar.css';

export default class ChatSideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { teams: [], chatOpen: false };
        this.closeChat = this.closeChat.bind(this);
    }

    componentDidMount() {
        const {contest_id} = this.props;
        this.chatIntervId = setInterval(() => {
            fetchJudgeMessages(contest_id).then((teams) => {
                if (teams) {
                    this.setState({ teams });
                }
            });
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.chatIntervId);
    }

    openChat(idx) {
        const team = this.state.teams[idx];
        this.team_id = team.id;
        this.chatTeamName = team.name;
        team.messagedJudge = false;
        this.setState({ chatOpen: true, teams: this.state.teams });
    }

    closeChat(){
        this.setState({ chatOpen: false });
    }

    render() {
        let conversation = null;
        if (this.state.chatOpen) {
            conversation = (<JudgeChatBox
                    team_id={this.team_id}
                    contest_id={this.props.contest_id}
                    teamName={this.chatTeamName}
                    closeChat={this.closeChat}
                />);
        }
        return (
            <div>
                {conversation}
                <ul className='list-group chat-sidebar'>
                    {this.state.teams.map((team, idx) => {
                        return (
                            <li
                                className={'list-group-item' + (team.messagedJudge ? '' : ' read')}
                                onClick={this.openChat.bind(this, idx)}
                                key={idx}
                            >
                                {team.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );

    }
}

ChatSideBar.propTypes = {
    contest_id: React.PropTypes.string.isRequired,
};
