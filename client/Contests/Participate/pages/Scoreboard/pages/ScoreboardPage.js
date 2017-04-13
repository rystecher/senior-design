import React from 'react';
import BarChart from '../components/BarChart.js';
import { getScoreboardData, hideScoreboard, showScoreboard, getSolvedBy } from '../../../../ContestActions.js';
import './scoreboard.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


export default class Scoreboard extends React.Component {

    constructor(props) {
        super(props);
        this.hideScoreboard = this.hideScoreboard.bind(this);
        this.showScoreboard = this.showScoreboard.bind(this);
        this.columns = [{
            header: 'Problem Name',
            accessor: 'problemName',
        }, {
            header: 'First team to solve the problem',
            accessor: 'firstTeamToSolve',
        }];
        this.state = {};
    }

    componentDidMount() {
        getScoreboardData(this.props.params.contestId).then(res => {
            this.setState({
                labels: res.teamNames,
                scores: res.teamScores,
                numSolved: res.teamNumSolved,
                scoreboardVisible: res.scoreboardVisible,
                loadedScores: true,
            });
        });
        getSolvedBy(this.props.params.contestId).then(res => {
            this.setState({
                solvedBy: res.solvedBy,
                loadedSolvedBy: true,
            });
        });
    }

    getEmptyComponent() {
        return (
            <div>
                <h4 className='hidden-text'>
                    Well this is awkward...<br />
                    Did you tell anyone about this thing?<br /><br />
                </h4>
            </div>
        );
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
        const data = [];
        let loading = true;
        if (this.state.loadedScores && this.state.loadedSolvedBy) {
            loading = false;
            if (this.state.scores.length === 0) {
                return this.getEmptyComponent();
            }
            this.state.solvedBy.forEach((problem) => {
                data.push({
                    problemName: problem.name,
                    firstTeamToSolve: problem.solvedBy,
                });
            });
        }
        const { scores, labels, scoreboardVisible, numSolved } = this.state;
        const hideClass = scoreboardVisible ? '' : 'active';
        const showClass = scoreboardVisible ? 'active' : '';
        const barchart = loading ?
            null :
            <div>
                <BarChart
                    username={this.props.username}
                    names={labels}
                    scores={scores}
                    numSolved={numSolved}
                />
                <ReactTable
                    data={data}
                    columns={this.columns}
                    loading={loading}
                    showPageSizeOptions={false}
                    defaultPageSize={10}
                    showFilters
                    className='-highlight'
                />
            </div>;
        return (
            <div className='contest-scoreboard'>
                {this.props.userRole === 'admin' && !loading ?
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
                {this.props.userRole === 'admin' || scoreboardVisible ?
                    barchart :
                    <div>
                        <h4 className='hidden-text'>
                            The contest administrator is hiding the scoreboard!
                            Things must be getting interesting...
                        </h4>
                    </div>
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
