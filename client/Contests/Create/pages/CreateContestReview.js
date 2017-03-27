import React from 'react';
import ContestForm from '../components/ContestForm';
import * as Utility from '../Forms';
import { createContest } from '../../ContestActions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';


class CreateContestReview extends React.Component {

    constructor(props) {
        super(props);
        this.saveAnswer = this.saveAnswer.bind(this);
        this.submit = this.submit.bind(this);
        this.answers = new Array(Utility.forms.length);
    }

    saveAnswer(value, idx) {
        this.answers[idx] = value;
    }

    submit() {
        const {user} = this.props.auth;
        createContest({
            name: this.answers[0],
            description: this.answers[1],
            rules: this.answers[2],
            teams: [],
            admin: user.username
        }).then((res) => {
            if (res.contest.cuid) {
                this.props.router.push(`/contest/${res.contest.cuid}/problems/add`);
            }
        });
    }

    render() {
        return (
            <div className="review-create-contest">
                {Utility.forms.map((form, index) => {
                    return (<ContestForm key={index}
                        position={index}
                        saveAnswer={this.saveAnswer}
                        {...form}
                    />);
                })}
                <button
                    className="btn btn-lg submit"
                    onClick={this.submit}
                >
                    Create Contest
                </button>
            </div>
        );
    }
}

CreateContestReview.propTypes = {
  auth: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(withRouter(CreateContestReview));
