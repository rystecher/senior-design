import React from 'react';
import { withRouter } from 'react-router';
import { fetchSubmissions } from '../../ContestActions.js';
import ReactTable from 'react-table';
import './submissions.css';
import ChatSideBar from '../../Participate/pages/Problem/components/ChatSideBar';

class AdminSubmissionsPage extends React.Component {

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
        }];
    }

    componentDidMount() {
        fetchSubmissions(this.props.params.contestId).then(res => {
            this.setState({
                submissions: res,
            });
        });
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
                });
            });
        }
        return (
            <div className='submissions-container'>
                <ReactTable
                    loading={loading}
                    data={data}
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
                    contest_id={this.props.params.contestId}
                />
            </div>
        );
    }
}

AdminSubmissionsPage.propTypes = {
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
    }).isRequired,
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(AdminSubmissionsPage);
