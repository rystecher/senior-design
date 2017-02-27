/**
 * Created by courtneybolivar on 01/02/2017.
 */

import React from 'react';
import BarChart from '../components/BarChart.js';
import {fetchScoreboardData} from '../../Contests/ContestActions.js';

//TODO: add prop to allow judge to hide or show scoreboard?
export default class ScoreBardPage extends React.Component {


  constructor(props) {
    super(props);
/*
    var contest_id = "cikqgkv4q01ck7453ualdn3hn";  // doesn't work in constructor
    var labels;
    var scores;
    fetchScoreboardData(contest_id).then(res => {
      labels = res.teams.teamNames;
      scores = res.teams.teamScores;
    }); */

    this.state = { // dummy info initially...
      labels: ["hello", "hi", "hey"],
      scores: [3, 3, 3],
      contest_id: "cikqgkv4q01ck7453ualdn3hn"
    };

  }

  /**
   * set state in this method does not cause a rerender, because this is called right before a render
   */
  componentWillMount(){
    var done = "";
    fetchScoreboardData(this.state.contest_id).then(res => {
      this.setState({
          labels: res.teams.teamNames,
          scores: res.teams.teamScores
      })
      done = "done!"
    });
    console.log("updating names and scores? " , done);
    console.log("team names: " + this.state.labels);
    console.log("team scores: " + this.state.scores);
    this.render();
  }

  update(){
    this.render();
    console.log("in scoreboard.update");
  }

  render() {
      // make contest id a state and then change the state and it will rerender
    /*
     this.setState({
     contest_id: "cikqgkv4q01ck7453ualdn3hn"
     })
     */
    //this.state.contest_id = "cikqgkv4q01ck7453ualdn3hn";



    const scores = this.state.scores;
    const labels = this.state.labels;

    return (
      <div>
        <h1> Welcome to the Scoreboard page </h1>
        <br/>
        <BarChart names={this.state.labels} scores={this.state.scores} update ={this.update.bind(this)}/>
      </div>
    );
  }
}
