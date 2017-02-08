/**
 * Created by courtneybolivar on 01/02/2017.
 */

import React from 'react';
import BarChart from '../components/BarChart.js';

var names = ["team 1", "team 2", "team 3"];
var scores = [95, 50, 72];

//TODO: add prop to allow judge to hide or show scoreboard
export default class ScoreBardPage extends React.Component {
  render() {
    return (
      <div>
        <h1> Welcome to the Scoreboard page </h1>
        <BarChart names={names} scores={scores}/>
      </div>
    );
  }
}
