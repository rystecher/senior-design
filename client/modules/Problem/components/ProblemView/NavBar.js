import React from 'react';
import ProblemButton from './ProblemButton.js';
import {fetchProblem} from '../../../Contests/ContestActions';
import spdf from "simple-react-pdf";

class NavBar extends React.Component {

    constructor() {
        super();
        this.state = {};
        // this.state = {
        //     prompt_text: this.props.competition.problems[0].prompt,
        //     sample_input: this.props.competition.problems[0].input,
        //     sample_output: this.props.competition.problems[0].output
        // };
    }

    componentDidMount() {
        fetchProblem("cikqgkv4q01ck7453ualdn3hn", "1").then(response => {
            response.blob().then(blob => {
                const pdf = new File([blob], "problem.pdf");
                const pdfUrl = URL.createObjectURL(pdf);
                this.setState({pdfUrl});
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
        //const handleClick = this.handleClick;
        //const problem_list = this.props.competition.problems;
        //const team = this.props.competition.teams[0];
        // {Object.keys(problem_list).map((key) => {
        //     return <ProblemButton key={key}
        //     title={problem_list[key].title}
        //     prompt={problem_list[key].prompt}
        //     sample_input={problem_list[key].input}
        //     sample_output={problem_list[key].output}
        //     status={team.status[key]}
        //     onChange={handleClick} />
        // })}
        // <div>{this.state.prompt_text}</div>
        // <div>{this.state.sample_input}</div>
        // <div>{this.state.sample_output}</div>
        const pdf = this.state.pdfUrl ?
            (<spdf.SimplePDF file={this.state.pdfUrl}/>) : null;
        return (
            <div>
                <input type="file"></input>
                {pdf}
            </div>
        );
    }
}

export default NavBar;
