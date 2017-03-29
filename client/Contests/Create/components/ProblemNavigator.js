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
            <ul className='pagination justify-content-center' role='group'>
                {arr.map((elm, idx) => {
                    const val = idx + 1;
                    selected = val === this.props.problemNumber ? ' selected' : '';
                    className = 'btn btn-default' + selected;
                    className = selected;
                    return (
                        <li
                            className={val === this.props.problemNumber ? 'page-item active' : 'page-item'}
                            key={idx}
                            onClick={() => this.props.changeProblemNumber(val)}
                        >
                            <a href='#' className='page-link'>{val}</a>
                        </li>
                    );
                })}
                {this.props.edit && numberOfProblems > 0 ?
                    <li
                        className='page-item'
                        onClick={this.props.addProblem}
                    ><a href='#' className='page-link'>+</a></li> : null}
            </ul>
        );
    }

}
