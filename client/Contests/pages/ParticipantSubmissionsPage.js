import React from 'react';
import { withRouter } from 'react-router';
import { fetchSubmissionsForTeam } from '../ContestActions.js';
import ReactTable from 'react-table';
import './participantsubmissionspage.css';

class ParticipantSubmissionsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [{
            header: 'Problem',
            accessor: 'problemName',
        }, {
            header: 'Feedback',
            accessor: 'feedback',
        }];
    }

    componentDidMount() {
        fetchSubmissionsForTeam(this.props.params.contestId, this.props.params.teamId).then(res => {
            this.setState({
                submissions: res.submissions,
            });
        });
    }

    goToSingleSubmissionPage(cuid) {
        this.props.router.push(`/contest/${this.props.params.contestId}/submissions/${this.state.teamId}/${cuid}`);
    }

    render() {
        let data = [];
        let loading = true;
        if (this.state.submissions) {
            loading = false;
            this.state.submissions.forEach((submission) => {
                data.push({
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
            </div>
        );
    }
}

ParticipantSubmissionsPage.propTypes = {
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
        teamId: React.PropTypes.string.isRequired,
    }).isRequired,
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(ParticipantSubmissionsPage);
