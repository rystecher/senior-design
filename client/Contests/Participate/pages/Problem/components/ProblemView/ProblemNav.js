import React from 'react';
import request from 'superagent';
import { getNumberOfProblems } from '../../../../../ContestActions';
import { setProblemMetaData, fetchProblem } from '../../../../../ContestActions';
import spdf from 'simple-react-pdf';

export default class ProblemNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      problemNum: props.params.problemNum,
      numberOfProblems: -1,
    };
  }

  componentDidMount() {
    getNumberOfProblems(this.props.params.contestId).then(res => {
      this.setState({ numberOfProblems: res.numberOfProblems });
    });
  }

  changeProblemNumber(problemNum) {
    this.props.router.push(`/contest/${this.contestId}/problems/${problemNum}`);
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
              <a className='page-link'>{val}</a>
            </li>
          );
        })}
        {this.props.edit !== undefined && numberOfProblems > 0 ?
          <li
            className='page-item'
            onClick={this.props.addProblem}
          ><a className='page-link'>+</a></li> : null}
      </ul>
    );
  }
}

ProblemNav.propTypes = {
  numberOfProblems: React.PropTypes.number.isRequired,
  problemNum: React.PropTypes.string,
};
