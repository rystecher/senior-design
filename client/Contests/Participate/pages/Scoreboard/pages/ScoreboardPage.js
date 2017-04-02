import React from 'react';
import BarChart from '../components/BarChart.js';
import { getScoreboardData, hideScoreboard, showScoreboard } from '../../../../ContestActions.js';
import './scoreboard.css';

export default class Scoreboard extends React.Component {

    constructor(props) {
        super(props);
        this.hideScoreboard = this.hideScoreboard.bind(this);
        this.showScoreboard = this.showScoreboard.bind(this);
        this.state = {};
    }

    componentDidMount() {
        // getScoreboardData('cikqgkv4q01ck7453ualdn3hn').then(res => {
        //     this.setState({
        //         labels: res.teamNames,
        //         scores: res.teamScores,
        //         numSolved: res.teamNumSolved,
        //         scoreboardVisible: res.scoreboardVisible,
        //     });
        // });
        getScoreboardData(this.props.params.contestId).then(res => {
            this.setState({
                labels: res.teamNames,
                scores: res.teamScores,
                numSolved: res.teamNumSolved,
                scoreboardVisible: res.scoreboardVisible,
            });
        });
    }

    hideScoreboard() {
        this.setState({ scoreboardVisible: false });
        hideScoreboard(this.props.params.contestId);
    }

    showScoreboard() {
        this.setState({ scoreboardVisible: true });
        showScoreboard(this.props.params.contestId);
    }

    render() {
        const { scores, labels, scoreboardVisible, numSolved } = this.state;
        const hideClass = scoreboardVisible ? '' : 'active';
        const showClass = scoreboardVisible ? 'active' : '';
        const barchart = scores ?
            <BarChart
                username={this.props.username}
                names={labels}
                scores={scores}
                numSolved={numSolved}
            /> : null;
        return (
            <div className='contest-scoreboard'>
                {this.props.userRole === 'admin' || scoreboardVisible ?
                    barchart :
                    <div>
                        <h4 className='hidden-text'>
                            The contest administrator is hiding the scoreboard!
                            Things must be getting interesting...
                        </h4>
                    </div>
                }
                {this.props.userRole === 'admin' ?
                    <div className='full-width'>
                        <div className='btn-wrapper'>
                            <button
                                type='button'
                                className={`btn ${hideClass}`}
                                onClick={this.hideScoreboard}
                            >Hide</button>
                            <button
                                type='button'
                                className={`btn ${showClass}`}
                                onClick={this.showScoreboard}
                            >Show</button>
                        </div>
                    </div> : null
                }
            </div>
        );
    }
}

Scoreboard.propTypes = {
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
        teamId: React.PropTypes.string,
    }).isRequired,
    username: React.PropTypes.string.isRequired,
    userRole: React.PropTypes.oneOf(['admin', 'none', 'participant']).isRequired,
};
