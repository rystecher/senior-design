import React from 'react';
import { withRouter } from 'react-router';
import { getNumberOfProblems } from '../../../../ContestActions';
import ProblemNav from '../components/ProblemView/ProblemNavigator';
import ProblemViewer from '../components/ProblemView/ProblemViewer';
import MessageComponent from '../components/MessageComponent.js';
import ChatSideBar from '../components/ChatSideBar.js';
import TextEditor from '../components/TextEditor';

/*
  A component to create the components for this page
 */
class ProblemPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        problemNum: props.params.problemNum,
        numberOfProblems: -1,
      };
      this.contestId = props.params.contestId;
      this.teamId = props.params.teamId;
      this.changeProblemNumber = this.changeProblemNumber.bind(this);
    }

    componentDidMount() {
      getNumberOfProblems(this.props.params.contestId).then(res => {
        this.setState({ numberOfProblems: res.numberOfProblems });
      });
    }

    changeProblemNumber(problemNum) {
      this.props.router.push(`/contest/${this.contestId}/problems/${this.teamId}/${problemNum}`);
      this.setState({ add: false, problemNum });
    }

    render() {
        return (
            <div>
              <div className="row">

                <div className="col-md-6">
                  <ProblemNav
                    problemNum={this.state.problemNum}
                    contestId={this.contestId}
                    changeProblemNumber={this.changeProblemNumber}
                    numberOfProblems={this.state.numberOfProblems}
                  />
                  <ProblemViewer
                    contestId={this.contestId}
                    problemNum={this.state.problemNum}
                    numberOfProblems={this.state.numberOfProblems}
                  />
                </div>

                <div className="col-md-6">
                  <TextEditor
                    team_id={this.teamId}
                    contest_id={this.contestId}
                    problemNum={this.state.problemNum}
                  />
                </div>
              </div>

              <MessageComponent
                  team_id={this.teamId}
                  contest_id={this.contestId}
              />
              <ChatSideBar
                  contest_id={this.contestId}
              />
            </div>
        );
    }
}

ProblemPage.propTypes = {
  params: React.PropTypes.shape({
    contestId: React.PropTypes.string.isRequired,
    teamId: React.PropTypes.string.isRequired,
    problemNum: React.PropTypes.string,
  }).isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ProblemPage);
