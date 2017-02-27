/**
 * Created by courtneybolivar on 11/16/16.
 */
import React from 'react';
import ProblemButton from './ProblemButton.js';
//import PDF from 'react-pdf-js';

/**
 *
 * @type {*}
 */
var NavBar = React.createClass({

  /*
    sets the initial states to be the first problem in the list
   */
  getInitialState: function () {
    return {
      prompt_text: this.props.competition.problems[0].prompt,
      sample_input: this.props.competition.problems[0].input,
      sample_output: this.props.competition.problems[0].output
    };
  },

  /**
   * takes in the text to display. Called from ProblemButton.js
   * @param text
   */
  handleClick: function (prompt, sample_input, sample_output){
    this.setState({
      prompt_text: prompt,
      sample_input: sample_input,
      sample_output: sample_output
    });
  },

  /*

   */
  _onPdfCompleted: function(page, pages){
    this.setState({page: page, pages: pages});
  },

  /*
    creates the buttons to allow problem navigation.
   */
  render: function () {
    const handleClick = this.handleClick;
    const problem_list = this.props.competition.problems;
    const team = this.props.competition.teams[0];
    return (
      <div>
          {Object.keys(problem_list).map(function(key){
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
          <PDF file="./pdf_problem.pdf" page={2}/>
      </div>
    );
  }
});

export default NavBar;
