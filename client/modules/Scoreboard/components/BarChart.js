const React = require('react');
const {Bar} = require("react-chartjs");

// https://ledsun.github.io/react-chartjs-example/bar/
const options = {
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each bar to be 2px wide and green
  elements: {
    rectangle: {
      borderWidth: 2,
      borderColor: '#ff6384',
      borderSkipped: 'bottom'
    }
  },
  responsive: true,
  legend: {
    display: true,
    position: 'top'
  },
  showTooltips: false, // disables tool tips because they didn't update with new data
};


var BarChart = React.createClass({
  getInitialState() {
    return {
      datasets: [ // could add more datasets in this list if we wanted to list problems separately in the score board
                  // since we probably don't want to do this just add each score for the team in the data field
        {
          label: "Score", // "The label for the dataset which appears in the legend and tooltips"
          fillColor: "rgba(220,220,220,0.5)",
          data: this.props.scores
        }
      ],
      labels: this.props.names // labels for the bars
    }
  },

  randmizeData() {
    this.props.update(); // call the update method from Scoreboard.js.. this calls fetchScoreboardData, sets the states
                         // in scoreboard.js causing a rerender of the page, this will rerender the barchart.. eg sending
                         // those new states from the data base into this class, so we can reset the states from the props now
    this.setState({
      datasets: [
        {
          //label: "Problems Solved",
          fillColor: "rgba(220,220,0,0.5)",
          data: this.props.scores
        }
      ],
      labels: this.props.names
    });
    console.log("in bar chart, scores = " + this.state.scores);
    //this.forceUpdate();
  },

  /**
   * called before a render()
   */
  componentWillMount() {
    console.log("in bar chart component will mount");
    this.randmizeData();
  },

  render() {
    console.log("in bar chart render props = " + this.props.names);
    this.props.update();
    return <div>
      <Bar type='bar' data={this.state} options={options} ref={(ref) => this.Bar = ref}/>
      <button onClick={this.randmizeData}>Update Data</button>
    </div>
  }
});

export default BarChart;
