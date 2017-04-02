import React from 'react';
import { withRouter } from 'react-router';
import { getNumberOfProblems } from '../../ContestActions';
import ProblemNavigator from '../components/ProblemNavigator';
import ProblemEditor from '../components/ProblemEditor';
import ProblemAdder from '../components/ProblemAdder';
import './problem_page.css';

class ProblemPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            problemNum: props.params.problemNum,
            numberOfProblems: -1,
        };
        this.contestId = props.params.contestId;
        this.addProblem = this.addProblem.bind(this);
        this.addedProblem = this.addedProblem.bind(this);
        this.changeProblemNumber = this.changeProblemNumber.bind(this);
    }

    componentDidMount() {
        getNumberOfProblems(this.props.params.contestId).then(res => {
            this.setState({ numberOfProblems: res.numberOfProblems });
        });
    }

    changeProblemNumber(problemNum) {
        this.props.router.push(`/contest/${this.contestId}/problems/${problemNum}/edit`);
        this.setState({ add: false, problemNum });
    }

    addProblem() {
        this.props.router.push(`/contest/${this.contestId}/problems/add`);
        this.setState({ add: true });
    }

    addedProblem() {
        const numberOfProblems = this.state.numberOfProblems + 1;
        this.state.numberOfProblems = numberOfProblems;
        this.props.router.push(`/contest/${this.contestId}/problems/${numberOfProblems}/edit`);
    }

    render() {
        const problemNum = this.props.params.problemNum;
        const ProblemDisplay = problemNum > 0 ?
            <ProblemEditor problemNum={problemNum} {...this.props} /> :
            <ProblemAdder {...this.props} addedProblem={this.addedProblem} />;
        return (
            <div>
                <ProblemNavigator
                    edit
                    problemNum={problemNum}
                    contestId={this.contestId}
                    addProblem={this.addProblem}
                    changeProblemNumber={this.changeProblemNumber}
                    numberOfProblems={this.state.numberOfProblems}
                />
                {ProblemDisplay}
            </div>
        );
    }
}

ProblemPage.propTypes = {
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
        problemNum: React.PropTypes.string,
    }).isRequired,
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(ProblemPage);
