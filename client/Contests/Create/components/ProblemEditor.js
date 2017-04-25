import React from 'react';
import request from 'superagent';
import Alert from 'react-s-alert';
import { setProblemMetaData, fetchProblem } from '../../ContestActions';
import spdf from '../../Participate/pages/Problem/components/ProblemView/simplepdf';
import ProblemFields from './ProblemFields';

export default class ProblemEditor extends React.Component {

    constructor(props) {
        super(props);
        this.contestId = props.params.contestId;
        this.problemNum = props.params.problemNum;
        this.onDropFile = this.onDropFile.bind(this);
        this.onSave = this.onSave.bind(this);
        this.updateField = this.updateField.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.fetchProblemWrapper(this.contestId, this.problemNum);
    }

    componentWillReceiveProps(nextProps) {
        const { contestId, problemNum } = nextProps.params;
        if (this.problemNum !== problemNum) {
            // this.setState({})
            this.file = null;
            this.fetchProblemWrapper(contestId, problemNum);
        }
    }

    onDropFile(files) {
        this.file = files[0];
        const pdfUrl = URL.createObjectURL(this.file);
        this.setState({ pdfUrl });
    }

    onSave(input, output, problemName) {
        setProblemMetaData(this.contestId, this.problemNum, {
            name: problemName,
            input,
            output,
        }).then((res) => {
            Alert.success('Problem updated', {
                position: 'bottom-right',
                effect: 'slide',
            });
        });
        if (this.file) {
            const req = request.post(`/api/contests/${this.contestId}/problem/${this.problemNum}/edit`);
            req.set('Content-Type', 'application/pdf');
            req.set('Content-Disposition', 'attachment; filename=new.pdf');
            req.attach('file', this.file);
            req.end();
            this.file = null;
            Alert.success('Problem PDF updated', {
                position: 'bottom-right',
                effect: 'slide',
            });
        }
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
            <div id='edit' className='row'>
                <div className='col-md-6 left-col'>
                    {pdf}
                </div>
                <ProblemFields
                    contestId={this.contestId}
                    problemNum={this.problemNum}
                    save={this.onSave}
                    onDropFile={this.onDropFile}
                    deleteProblem={this.props.deleteProblem}
                    showDelete={this.props.showDelete}
                />
            </div>
        );
    }
}

ProblemEditor.propTypes = {
    params: React.PropTypes.shape({
        contestId: React.PropTypes.string.isRequired,
        problemNum: React.PropTypes.string.isRequired,
    }).isRequired,
};
