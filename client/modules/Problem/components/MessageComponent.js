import React from 'react';
import {fetchTeamMessages} from '../../Contests/ContestActions.js';

export default class MessageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount() {
        const team_id =
        this.chatIntervId = setInterval(() => {
            fetchNewMessage(team_id).then((messages) => {
                this.setState({ messages });
                console.log(messages);
            });
        }, 30000);
    }

    componentWillUnMount() {
        clearInterval(this.state.chatIntervId);
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
