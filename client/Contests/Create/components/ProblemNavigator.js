import React from 'react';
import './problem_navigator.css';

export default class ProblemNavigator extends React.Component {

    render() {
        const { numberOfProblems, problemNumber } = this.props;
        const problemNum = problemNumber ? parseInt(problemNumber, 10) : null;
        if (numberOfProblems === -1) {
            return null;
        }
        const arr = new Array(numberOfProblems);
        arr.fill(0);
        console.log(numberOfProblems);
        return (
            <ul className='pagination justify-content-center' role='group'>
                {arr.map((elm, idx) => {
                    const val = idx + 1;
                    return (
                        <li
                            className={val === problemNum ? 'page-item active' : 'page-item'}
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

ProblemNavigator.propTypes = {
    addProblem: React.PropTypes.func,
    changeProblemNumber: React.PropTypes.func.isRequired,
    edit: React.PropTypes.bool,
    numberOfProblems: React.PropTypes.number.isRequired,
    problemNumber: React.PropTypes.string,
};
