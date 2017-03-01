/**
 * Created by courtneybolivar on 01/02/2017.
 */

import React from 'react';
import BarChart from '../components/BarChart.js';
import {fetchScoreboardData} from '../../Contests/ContestActions.js';

export default class ScoreBardPage extends React.Component {

  /**
   * sets the contest id, other states to be set later
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      contest_id: "cikqgkv4q01ck7453ualdn3hn"
    };
  }

  /**
   * called right before a render, gets the info from the database
   */
  componentWillMount(){
    fetchScoreboardData(this.state.contest_id).then(res => {
      this.setState({
          labels: res.teams.teamNames,
          scores: res.teams.teamScores
      })
    });
    this.render();
  }

  /**
   * creates a bar chart with the data
   * Later: Could add info on the contest like time left, current winner, etc.
   *        Also, ability to show or hide the scoreboard
   *        contest_id passed in as a prop
   * @returns {XML}
   */
  render() {
    const scores = this.state.scores;
    const labels = this.state.labels;

    // this ensures that the bar chart will not show until the data is grabbed from the data base
    const Scoreboard = this.state.scores ? <BarChart names={this.state.labels} scores={this.state.scores}/> : null;
    return (
      <div>
        <h1> Welcome to the Scoreboard page </h1>
        <br/>
        {Scoreboard}
      </div>
    );
  }
}
