import React from 'react';
import { fetchSolvedArrays } from '../../../../../ContestActions';
import './ProblemNavigator.css';

export default class ProblemNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            haveSolvedArray: false,
            solvedArray: [],
        };
        this.contestId = props.contestId;
        this.teamId = props.teamId;
    }

    componentDidMount() {
      this.fetchSolvedWrapper(this.contestId, this.teamId);
    }

    fetchSolvedWrapper(contestId, teamId) {
      fetchSolvedArrays(contestId, teamId).then(res => {
        if (res.solvedByTeam) {
          this.setState(
            { haveSolvedArray: true,
              solvedArray: res.solvedByTeam
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
                  <a
                    className='page-link'
                    id={this.state.solvedArray[idx] ? 'solved' : ''}
                  >{val}</a>
                </li>
              );
            })}
          </ul>
        );
      }
}

ProblemNavigator.propTypes = {
    contestId: React.PropTypes.string.isRequired,
    teamId: React.PropTypes.string.isRequired,
    changeProblemNumber: React.PropTypes.func.isRequired,
    numberOfProblems: React.PropTypes.number.isRequired,
    problemNum: React.PropTypes.string,
};
