import React from 'react';

export default class ProblemNavigator extends React.Component {

    render() {
        const { numberOfProblems } = this.props;
        if (numberOfProblems === -1) {
            return null;
        }
        const arr = new Array(numberOfProblems);
        arr.fill(0);
        return (
            <div className='problem-navigation'>
                {arr.map((elm, idx) => {
                    const val = idx + 1;
                    return (
                        <div
                            className={val == this.props.problemNumber ? 'selected' : ''}
                            key={idx}
                            onClick={() => this.props.changeProblemNumber(val)}
                        >
                            {val}
                        </div>
                    );
                })}
                {this.props.edit ? <div onClick={this.props.addProblem}> + </div> : null}
            </div>
        );
    }

}
