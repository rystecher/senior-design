/**
 * Created by courtneybolivar on 25/01/2017.
 */
import React from 'react';
import styles from './ProblemView.css';

var Problem = React.createClass({

  /*
    changes the current problem text
   */
  handleClick: function (){
    var prompt = this.props.prompt;
    var sample_input = this.props.sample_input;
    var sample_output = this.props.sample_output;
    this.props.onChange(prompt, sample_input, sample_output); // call parent function onClick function...
  },

  /*
    creates buttons with color labing based on the
    status field passed in
   */
  render: function () {
    var button_type = this.props.status; // done or not --> TODO: global AND local done/not variables and selected??
    return (
      <button
          className={styles[button_type]}
          onClick={this.handleClick}>
        {this.props.title}
      </button>
    );
  }
});

export default Problem;
