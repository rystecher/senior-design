import React from 'react';
import {fetchJudgeMessages} from '../../../../ContestActions.js';

export default class ChatSideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { teams: [] };
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

    componentWillUnMount() {
        clearInterval(this.chatIntervId);
    }

    openChat(idx) {
        console.log(this.state.teams[idx]);
    }

    render() {
        return (
            <div className='chat-sidebar'>
                {this.state.teams.map((team, idx) => {
                    return (
                        <li
                            className={team.messagedJudge ? 'active' : ''}
                            onClick={this.openChat.bind(this, idx)}
                            key={idx}
                        >
                            {team.name}
                        </li>
                    );
                })}
            </div>
        );

    }
}

ChatSideBar.propTypes = {
    contest_id: React.PropTypes.string.isRequired,
};
