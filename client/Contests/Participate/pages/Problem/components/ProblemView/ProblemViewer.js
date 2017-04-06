import React from 'react';
import { fetchProblem } from '../../../../../ContestActions';
import spdf from 'simple-react-pdf';

export default class ProblemViewer extends React.Component {

    constructor(props) {
        super(props);
        this.contestId = props.contestId;
        this.problemNum = props.problemNum;
        this.updateField = this.updateField.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.fetchProblemWrapper(this.contestId, this.problemNum);
    }

    fetchProblemWrapper(contestId, problemNum) {
        this.contestId = contestId;
        this.problemNum = problemNum;
        this.setState({ pdfUrl: false, loadedPdf: false });
        fetchProblem(contestId, problemNum).then(response => {
            if ('function' === typeof response.blob) {
                response.blob().then(blob => {
                    const pdf = new File([blob], `problem${problemNum}.pdf`);
                    const pdfUrl = URL.createObjectURL(pdf);
                    this.setState({
                        pdfUrl,
                        loadedPdf: true,
                    });
                });
            } else {
                this.setState({ err: 'Failed to load pdf' });
            }
        });
    }

    updateField(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        if (!this.state.loadedPdf) {
            return null;
        }
        const pdf = this.state.pdfUrl ?
            (<spdf.SimplePDF file={this.state.pdfUrl} />) : null;
        return (
            <div>
                {pdf}
            </div>
        );
    }
}

ProblemViewer.propTypes = {
    contestId: React.PropTypes.string.isRequired,
    problemNum: React.PropTypes.string.isRequired,
};
