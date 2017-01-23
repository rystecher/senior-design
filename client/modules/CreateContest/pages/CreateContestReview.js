import React from 'react';
import ContestForm from '../components/ContestForm';
import * as Utility from '../Forms';

export default class CreateContestReview extends React.Component {

    constructor() {
        super();
        this.saveAnswer = this.saveAnswer.bind(this);
        this.submit = this.submit.bind(this);
    }

    saveAnswer(e) {
        if (e.target.type === "file") {
            this.answers[this.state.current] = e.target.files[0];
        } else {
            this.answers[this.state.current] = e.target.value;
        }
    }

    submit() {

    }

    render() {
        return (
            <div className="review-create-contest">
                {Utility.forms.map((form, index) => {
                    return (<ContestForm key={index}
                        position={index}
                        keyPressed={this.keyPressed}
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
