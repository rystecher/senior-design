import React from 'react';
import { withRouter } from 'react-router';
import { getNumberOfProblems } from '../../ContestActions';
import ProblemNavigator from '../components/ProblemNavigator';
import ProblemEditor from '../components/ProblemEditor';
import ProblemAdder from '../components/ProblemAdder';

class ProblemPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            problemNumber: props.params.problem_no,
            numberOfProblems: -1,
        };
        this.contest_id = props.params.contest_id;
        this.addProblem = this.addProblem.bind(this);
        this.addedProblem = this.addedProblem.bind(this);
        this.changeProblemNumber = this.changeProblemNumber.bind(this);
    }

    componentDidMount() {
        getNumberOfProblems(this.props.params.contest_id).then(res => {
            this.setState({ numberOfProblems: res.numberOfProblems });
        });
    }

    changeProblemNumber(problemNumber) {
        this.props.router.push(`/contest/${this.contest_id}/problems/${problemNumber}/edit`);
        this.setState({ add: false, problemNumber: problemNumber });
    }

    addProblem() {
        this.props.router.push(`/contest/${this.contest_id}/problems/add`);
        this.setState({ add: true });
    }

    addedProblem() {
        const numberOfProblems = this.state.numberOfProblems + 1;
        this.state.numberOfProblems = numberOfProblems;
        this.props.router.push(`/contest/${this.contest_id}/problems/${numberOfProblems}/edit`);
    }

    render() {
        const problemNumber = this.props.params.problem_no;
        const ProblemDisplay = problemNumber > 0 ?
            <ProblemEditor problemNumber={problemNumber} {...this.props} /> :
            <ProblemAdder {...this.props} addedProblem={this.addedProblem} />;
        return (
            <div>
                <ProblemNavigator
                    edit={true}
                    problemNumber={problemNumber}
                    contest_id={this.contest_id}
                    addProblem={this.addProblem}
                    changeProblemNumber={this.changeProblemNumber}
                    numberOfProblems={this.state.numberOfProblems}
                />
                {ProblemDisplay}
            </div>
        );
    }
}

export default withRouter(ProblemPage);
