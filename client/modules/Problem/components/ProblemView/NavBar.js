import React from 'react';
import ProblemButton from './ProblemButton.js';
import PDF from 'react-pdf-js';
import {fetchProblem} from '../../../Contests/ContestActions';

class NavBar extends React.Component {

    constructor() {
        super();
        this.state = {
            prompt_text: this.props.competition.problems[0].prompt,
            sample_input: this.props.competition.problems[0].input,
            sample_output: this.props.competition.problems[0].output
        };
    }

    componentDidMount() {
        fetchProblem("cikqgkv4q01ck7453ualdn3hn", "1").then(response => {
            response.blob().then(blob => {
                const pdf = new File([blob], "problem.pdf");
                this.setState({pdf});
            });
        });
    }

    handleClick(prompt, sample_input, sample_output) {
        this.setState({
            prompt_text: prompt,
            sample_input: sample_input,
            sample_output: sample_output
        });
    }

    _onPdfCompleted(page, pages) {
        this.setState({page: page, pages: pages});
    }

    render() {
        const handleClick = this.handleClick;
        const problem_list = this.props.competition.problems;
        const team = this.props.competition.teams[0];
        const pdf = this.state.pdf ?
            (<PDF file={this.state.pdf} page={1}/>) : null;
        return (
            <div>
                {Object.keys(problem_list).map((key) => {
                    return <ProblemButton key={key}
                    title={problem_list[key].title}
                    prompt={problem_list[key].prompt}
                    sample_input={problem_list[key].input}
                    sample_output={problem_list[key].output}
                    status={team.status[key]}
                    onChange={handleClick} />
                })}
                <div>{this.state.prompt_text}</div>
                <div>{this.state.sample_input}</div>
                <div>{this.state.sample_output}</div>
                {pdf}
            </div>
        );
    }
}

export default NavBar;
