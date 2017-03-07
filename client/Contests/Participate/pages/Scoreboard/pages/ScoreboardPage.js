import React from 'react';
import BarChart from '../components/BarChart.js';
import {fetchScoreboardData} from '../../../../ContestActions.js';

export default class ScoreBoardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contest_id: "cikqgkv4q01ck7453ualdn3hn"
        };
    }

    componentDidMount(){
        fetchScoreboardData(this.state.contest_id).then(res => {
            console.log(res);
            this.setState({
                labels: res.teams.teamNames,
                scores: res.teams.teamScores
            });
        });
    }

    render() {
        const { scores, labels } = this.state;
        const Scoreboard = scores ? <BarChart names={labels} scores={scores}/> : null;
        return (
            <div>
                <h1> Welcome to the Scoreboard page </h1>
                <br/>
                {Scoreboard}
            </div>
        );
    }
}
