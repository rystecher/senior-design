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
      labels: this.props.names,
      datasets: [ // could add more datasets in this list if we wanted to list problems separately in the score board
                  // since we probably don't want to do this just add each score for the team in the data field
        {
          label: this.props.names,
          fillColor: "rgba(220,220,220,0.5)",
          data: this.props.scores
        }
      ]
    }
  },

  randmizeData() {
    myObjBar.datasets[0].bars[0].fillColor = "green";
    const zero = Math.random() < 0.2 ? true : false;
    this.state.datasets.forEach((dataset) => {
      Object.assign(dataset, {
        data: dataset.data.map(function() {
          return zero
            ? 0.0
            : randomScalingFactor()
        })
      })
    })
    this.forceUpdate()
  },

  render() {
    return <div>
      <Bar data={this.state} options={options} ref={(ref) => this.Bar = ref}/>
      <button onClick={this.randmizeData}>Randomize Data</button>
    </div>
  }
})

function randomScalingFactor() {
  return (Math.random() > 0.5
      ? 1.0
      : 1.0) * Math.round(Math.random() * 100)
}

export default BarChart;
