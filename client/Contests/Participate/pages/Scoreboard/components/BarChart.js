const React = require('react');
const {Bar} = require("react-chartjs");
// example/source originally taken from: https://ledsun.github.io/react-chartjs-example/bar/

const options = {
  responsive: true, // makes it fill page
  showTooltips: false, // disables tool tips
};

/**
 * holds the data passed in from the page and creates a bar chart
 */
export const BarChart = React.createClass({
  getInitialState() {
    return {
      datasets: [ // could add more data sets if you wanted more than addtional bars per team for other info
        {
          label: "Score", // "The label for the dataset which appears in the legend and tooltips"
          fillColor: "rgba(178,225,102,0.5)", // color for the bars
          data: this.props.scores // values for each bar
        }
      ],
      labels: this.props.names // labels for the bars (team names)
    }
  },

  /**
   * creates the bar chart with the data given
   * @returns {XML}
   */
  render() {
    return <div>
      <Bar type='bar' data={this.state} options={options} ref={(ref) => this.Bar = ref}/>
    </div>
  }
});

export default BarChart;
