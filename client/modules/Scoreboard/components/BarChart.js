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
    position: 'top'
  }
}


var BarChart = React.createClass({
  getInitialState() {
    return {
      datasets: [ // could add more datasets in this list if we wanted to list problems separately in the score board
                  // since we probably don't want to do this just add each score for the team in the data field
        {
          label: this.props.names,
          fillColor: "rgba(220,220,220,0.5)",
          data: this.props.scores
        }
      ],
      labels: this.props.names
    }
  },

  /*
   Warning: setState(...): Cannot update during an existing state transition
   (such as within `render` or another component's constructor).
   Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern,
   but can be moved to `componentWillMount`.
   printWarning @ warning.js?8a56:36

   BarChart.js?aeb6:50 in bar chart, scores = undefined
   */

  randmizeData() {
    this.props.update();
    this.setState({
      datasets: [
        {
          label: this.props.names,
          fillColor: "rgba(220,220,0,0.5)",
          data: this.props.scores
        }
      ],
    });
    console.log("in bar chart, scores = " + this.state.scores);
    //this.forceUpdate();
  },

  /**
   * called before a render()
   */
  componentWillMount() {
    console.log("in component will mount");
    this.randmizeData();
  },

  render() {
    console.log("in bar chart render props = " + this.props.names);
    return <div>
      <Bar data={this.state} options={options} ref={(ref) => this.Bar = ref}/>
      <button onClick={this.randmizeData}>Update Data</button>
    </div>
  }
})

function randomScalingFactor() {
  return (Math.random() > 0.5
      ? 1.0
      : 1.0) * Math.round(Math.random() * 100)
}

export default BarChart;
