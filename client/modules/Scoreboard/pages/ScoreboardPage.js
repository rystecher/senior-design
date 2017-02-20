/**
 * Created by courtneybolivar on 01/02/2017.
 */

import React from 'react';
import BarChart from '../components/BarChart.js';
import {fetchScoreboardData} from '../../Contests/ContestActions.js';

//TODO: add prop to allow judge to hide or show scoreboard?
export default class ScoreBardPage extends React.Component {


  //getData() {
  //  var data1 = fetchScoreboardData("cikqgkv4q01ck7453ualdn3hl");
    //console.log(data1);
    //console.log("team: " + data1);
    /*
     Object
       teamNames:Array[0]
         length:0
         __proto__:Array[0]
       teamScores:Array[0]
         length:0
         __proto__:Array[0]
       teamTimestamps:Array[0]
         length:0
         __proto__:Array[0]
    */


  //}


  constructor(props) {
    super(props);

    this.state = {
      labels: ["empty", "not set"],
      scores: [1, 2],
      contest_id: "cikqgkv4q01ck7453ualdn3hn"
    };

    var contest_id = "cikqgkv4q01ck7453ualdn3hn";
    fetchScoreboardData(contest_id).then(res => {
      this.setState({
        labels: res.teams.teamNames,
        scores: res.teams.teamScores
      });
    });

   /*
    this.state = {
      labels: ["empty", "not set"],
      scores: [1, 2],
      contest_id: "cikqgkv4q01ck7453ualdn3hn"
    }; */
  }

  updateId(new_id) {
    this.state.contest_id = new_id;
    console.log("new id set");
    this.render();
  }

  update(){
    var contest_id = this.state.contest_id;
    fetchScoreboardData(contest_id).then(res => {
      this.setState({
          labels: res.teams.teamNames,
          scores: res.teams.teamScores
      })
    });
    console.log("updating names and scores");
    console.log("team names: " + this.state.labels);
    console.log("team scores: " + this.state.scores);
    this.render();
  }


  render() {
    //var contest_id = this.state.contest_id;
    //var data1 = fetchScoreboardData(contest_id);
    //console.log(data1); //data is only a promise until it rerenders later
    //console.log("re rendering");
    //console.log("Current contest id = " + this.state.contest_id)
      // so you could make contest id a state and then change the state and it will rerender

    const scores = this.state.scores;
    const labels = this.state.labels;

    return (
      <div>
        <h1> Welcome to the Scoreboard page </h1>
        <BarChart names={this.state.labels} scores={this.state.scores} update ={this.update.bind(this)}/>
      </div>
    );
  }
}
