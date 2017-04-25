import React from 'react';
import { fetchSolvedArrays } from '../ContestActions';
import './problemnavigator.css';

export default class ProblemNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = { solvedArray: [] };
    }

    componentDidMount() {
        if (this.props.contestId && this.props.teamId) {
            this.fetchSolvedWrapper(this.props.contestId, this.props.teamId);
        }
    }

    fetchSolvedWrapper(contestId, teamId) {
        fetchSolvedArrays(contestId, teamId).then(res => {
            if (res.solvedByTeam) {
                this.setState({
                    solvedArray: res.solvedByTeam,
                });
            }
        });
    }

    render() {
        const { numberOfProblems, problemNum } = this.props;
        const problemNumParsed = problemNum ? parseInt(problemNum, 10) : null;
        if (numberOfProblems === -1) {
            return null;
        }
        const arr = new Array(numberOfProblems);
        arr.fill(0);
        return (
            <ul className='pagination justify-content-center' role='group'>
                {arr.map((elm, idx) => {
                    const val = idx + 1;
                    return (
                        <li
                            className={val === problemNumParsed ? 'page-item active' : 'page-item'}
                            key={idx}
                            onClick={() => this.props.changeProblemNumber(val)}
                        >
                            <a className={this.state.solvedArray[idx] ? 'page-link solved' : 'page-link'}>{val}</a>
                        </li>
                    );
                })}
                {this.props.edit && numberOfProblems > 0 ?
                    <li
                        className='page-item'
                        onClick={this.props.addProblem}
                    ><a className='page-link'>+</a></li> : null}
            </ul>
        );
    }
}

ProblemNavigator.propTypes = {
    addProblem: React.PropTypes.func,
    contestId: React.PropTypes.string,
    changeProblemNumber: React.PropTypes.func.isRequired,
    edit: React.PropTypes.bool,
    numberOfProblems: React.PropTypes.number.isRequired,
    problemNum: React.PropTypes.string,
    teamId: React.PropTypes.string,
};
