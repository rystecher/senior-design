const React = require('react');
const { Bar } = require('react-chartjs');

export default class BarChart extends React.Component {

    constructor(props) {
        super(props);
        const colors = new Array(this.props.scores.length).fill('rgba(178,225,102,0.5)');
        const teamIdx = this.props.names.findIndex((name) => name === props.username);
        if (teamIdx !== -1) {
            colors[teamIdx] = 'rgba(54, 162, 235, 0.2)';
        }
        this.state = {
            datasets: [
                {
                    label: 'Problems solved',
                    fillColor: colors,
                    data: this.props.numSolved,
                },
            ],
            labels: this.props.names,
        };
    }

    render() {
        const that = this;
        const options = {
            responsive: true,
            showTooltips: true,
            tooltipTemplate: (v) => {
                const teamIdx = that.props.names.findIndex((name) => name === v.label);
                const time = that.props.scores[teamIdx];
                return `Time: ${time} minutes`;
            },
        };
        return (
            <div className='chart-wrapper'>
                <Bar
                    type='bar'
                    data={this.state}
                    options={options}
                    width='1000px'
                    height='500px'
                />
            </div>
        );
    }
}

BarChart.propTypes = {
    names: React.PropTypes.array,
    numSolved: React.PropTypes.array,
    scores: React.PropTypes.array,
    username: React.PropTypes.string.isRequired,
};
