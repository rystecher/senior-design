import React from 'react';
import { withRouter } from 'react-router';
import { fetchSubmissions } from '../ContestActions.js';
import ReactTable from 'react-table';
import './judgesubmissionpage.css';
import ChatSideBar from '../components/ChatSideBar';

class JudgeSubmissionsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [{
            header: 'Team',
            accessor: 'teamName',
        }, {
            header: 'Problem',
            accessor: 'problemName',
        }, {
            header: 'Feedback',
            accessor: 'feedback',
        }, {
            header: 'Submission Time',
            accessor: 'submissionTime',
        }, {
            header: 'Time since start of contest',
            accessor: 'timeSinceContestStarted',
        }];
    }

    componentDidMount() {
        const intervalFunc = () => fetchSubmissions(this.props.params.contestId).then(res => {
            this.setState({ submissions: res });
        });
        intervalFunc();
        this.chatIntervId = setInterval(intervalFunc, 15000);
    }

    componentWillUnmount() {
        clearInterval(this.chatIntervId);
    }

    goToSingleSubmissionPage(cuid) {
        this.props.router.push(`/contest/${this.props.params.contestId}/submissions/admin/${cuid}`);
    }

    render() {
        let data = [];
        let loading = true;
        if (this.state.submissions) {
            loading = false;
            this.state.submissions.forEach((submission) => {
                data.push({
                    teamName: submission.teamName,
                    problemName: submission.problemName,
                    feedback: submission.feedback,
                    cuid: submission.cuid,
                    submissionTime: submission.submissionTime,
                    timeSinceContestStarted: submission.timeSinceContestStarted,
                });
            });
        }
        return (
            <div className='submissions-container'>
                <ReactTable
                    loading={loading}
                    data={data}
                    showFilters
                    columns={this.columns}
                    showPageSizeOptions={false}
                    defaultPageSize={10}
                    className='-highlight'
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: e => {
                                if (rowInfo) {
                                    this.goToSingleSubmissionPage(rowInfo.row.cuid);
                                }
                            },
                        };
                    }}
                />
                <ChatSideBar
                    contestId={this.props.params.contestId}
                />
            </div>
        );
    }
}

JudgeSubmissionsPage.propTypes = {
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
    }).isRequired,
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(JudgeSubmissionsPage);