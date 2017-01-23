import React from 'react';
//import './ContestForm.scss'

export default class ContestForm extends React.Component {

    constructor() {
        super();
        this.saveAnswer = this.saveAnswer.bind(this);
    }

    componentWillMount(){
        this.state = {
            answer: this.props.answer,
        }
    }

    saveAnswer(e) {
        this.setState({
            answer: e.target.value,
        });
        this.props.saveAnswer(e);
    }

    render() {
        const {prompt, type, hint, keyPressed, autoFocus} = this.props;
        const {answer} = this.state;
        return (
            <div className="form col-md-6 col-md-offset-3">
                <h1>{prompt}</h1>
                <div>{hint}</div>
                {type === "textarea" ?
                    <textarea defaultValue={answer}
                        onInput={this.saveAnswer}
                        autoFocus={autoFocus}>
                    </textarea> :
                    <input defaultValue={answer} type={type}
                        onChange={this.saveAnswer}
                        onKeyPress={keyPressed}
                        autoFocus={autoFocus}>
                    </input>
                }
            </div>
        );
    }
}

ContestForm.PropTypes = {
    hint: React.PropTypes.string,
    keyPressed: React.PropTypes.func.isRequired,
    prompt: React.PropTypes.string.isRequired,
    saveAnswer: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired,
};
