import React from 'react';
import './problem_navigator.css';

export default class ProblemNavigator extends React.Component {

    render() {
        const { numberOfProblems } = this.props;
        if (numberOfProblems === -1) {
            return null;
        }
        const arr = new Array(numberOfProblems);
        arr.fill(0);
        let className, selected;
        return (
            <ul className='problem-navigator navigation' role='group'>
                {arr.map((elm, idx) => {
                    const val = idx + 1;
                    selected = val == this.props.problemNumber ? ' selected' : '';
                    className = 'btn btn-default' + selected;
                    className = selected;
                    return (
                        <li
                            className={className}
                            key={idx}
                            onClick={() => this.props.changeProblemNumber(val)}
                        >
                            {val}
                        </li>
                    );
                })}
                {this.props.edit && numberOfProblems > 0 ?
                    <li
                        onClick={this.props.addProblem}
                    > + </li> : null}
            </ul>
        );
    }

}
