import React from 'react';
import request from 'superagent';
import { setProblemMetaData, fetchProblem } from '../../ContestActions';
import spdf from 'simple-react-pdf';
import ProblemFields from './ProblemFields';

export default class ProblemEditor extends React.Component {

    constructor(props) {
        super(props);
        this.contestId = props.params.contest_id;
        this.problemNum = props.params.problem_no;
        this.onDropFile = this.onDropFile.bind(this);
        this.onSave = this.onSave.bind(this);
        this.updateField = this.updateField.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.fetchProblemWrapper(this.contestId, this.problemNum);
    }

    componentWillReceiveProps(nextProps) {
        const { contest_id, problem_no } = nextProps.params;
        if (this.problemNum !== problem_no) {
            //this.setState({})
            this.file = null;
            this.fetchProblemWrapper(contest_id, problem_no);
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
        }).then((res) => console.log(res));
        if (this.file) {
            const req = request.post(`/api/contests/${this.contestId}/problem/${this.problemNum}/edit`);
            req.set('Content-Type', 'application/pdf');
            req.set('Content-Disposition', 'attachment; filename=new.pdf');
            req.attach('file', this.file);
            req.end();
        }
    }

    fetchProblemWrapper(contestId, problemNum) {
        this.contestId = contestId;
        this.problemNum = problemNum;
        this.setState({ pdfUrl: false, loadedPdf: false });
        fetchProblem(contestId, problemNum).then(response => {
            if (typeof response.blob === 'function') {
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
            <div id='edit'>
                <div>
                    {pdf}
                </div>
                <ProblemFields
                    contest_id={this.contestId}
                    problem_no={this.problemNum}
                    save={this.onSave}
                    onDropFile={this.onDropFile}
                />
            </div>
        );
    }
}

ProblemEditor.propTypes = {
    params: React.PropTypes.shape({
        contest_id: React.PropTypes.string.isRequired,
        problem_no: React.PropTypes.string.isRequired,
    }).isRequired,
};
