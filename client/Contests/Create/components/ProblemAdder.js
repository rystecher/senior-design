import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { setProblemMetaData } from '../../ContestActions';
import ProblemFields from './ProblemFields';

export default class ProblemAddPage extends React.Component {

    constructor(props) {
        super(props);
        this.contest_id = props.params.contest_id;
        this.onDropFile = this.onDropFile.bind(this);
        this.onSave = this.onSave.bind(this);
        this.state = {};
    }

    onDropFile(files) {
        this.file = files[0];
    }

    onSave(input, output, problemName) {
        if (!this.file) {
            this.setState({ errMessage: "A PDF file is required" });
        } else {
            const req = request.post(`/api/contests/${this.contest_id}/problem/create`);
            req.set('Content-Type', 'application/pdf');
            req.set('Content-Disposition', `attachment; filename=new.pdf`);
            req.attach('file', this.file);
            req.end((err, res) => {
                if (err) {
                } else {
                    setProblemMetaData(this.contest_id, res.body.problemNo, {
                        name:   problemName,
                        input,
                        output,
                    }).then(() => this.props.addedProblem());
                }
            });
        }
    }

    render() {
        return (
            <div id='add'>
                <ProblemFields
                    contest_id={this.contest_id}
                    problem_no={this.problem_no}
                    save={this.onSave}
                    onDropFile={this.onDropFile}
                />
            </div>
        );
    }
}
