import React from 'react';
import { withRouter } from 'react-router';
import { getNumberOfProblems, deleteProblem } from '../../ContestActions';
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
        this.deleteProblem = this.deleteProblem.bind(this);
    }

    componentDidMount() {
        getNumberOfProblems(this.props.params.contestId).then(res => {
            this.setState({
                numberOfProblems: res.numberOfProblems,
                started: res.started,
            });
            if (res.started && !(0 < this.state.problemNum)) {
                this.props.router.push(`/contest/${this.contestId}/problems/1/edit`);
            }
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

    deleteProblem() {
        const { contestId, problemNum } = this.props.params;
        deleteProblem(contestId, problemNum).then((res) => {
            if (200 === res.status) {
                const numberOfProblems = this.state.numberOfProblems - 1;
                this.state.numberOfProblems = numberOfProblems;
                if (0 < numberOfProblems) {
                    this.props.router.push(`/contest/${this.contestId}/problems/${numberOfProblems}/edit`);
                } else {
                    this.props.router.push(`/contest/${this.contestId}/problems/add`);
                }
            }
        });
    }

    render() {
        if ('admin' !== this.props.userRole) {
            return this.props.getForbiddenComponent();
        }
        const problemNum = this.props.params.problemNum;
        const ProblemDisplay = 0 < problemNum ?
            <ProblemEditor
                problemNum={problemNum}
                deleteProblem={this.deleteProblem}
                showDelete={!this.state.started}
                {...this.props}
            /> :
            <ProblemAdder {...this.props} addedProblem={this.addedProblem} />;
        return (
            <div>
                <ProblemNavigator
                    edit={!this.state.started}
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
    getForbiddenComponent: React.PropTypes.func.isRequired,
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
        problemNum: React.PropTypes.string,
    }).isRequired,
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired,
    userRole: React.PropTypes.oneOf(['admin', 'none', 'participant']).isRequired,
};

export default withRouter(ProblemPage);
