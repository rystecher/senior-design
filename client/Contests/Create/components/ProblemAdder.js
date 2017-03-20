import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { setProblemMetaData } from '../../ContestActions';
import ProblemFields from './ProblemFields';

export default class ProblemAddPage extends React.Component {

    constructor(props) {
        super(props);
        this.contest_id = props.params.contest_id;
        this.onDrop = this.onDrop.bind(this);
        this.onSave = this.onSave.bind(this);
        this.state = {};
    }

    onDrop(files) {
        this.file = files[0];
        this.setState({ fileName: this.file.name });
    }

    onSave(input, output, problemName) {
        if (!this.file) {
            this.setState({ errMessage: "A PDF file is required" });
        } else {
            var req = request.post(`/api/contests/${this.contest_id}/problem/create`);
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
        const dragAndDropText = this.state.fileName ?
            `Uploaded File: ${this.state.fileName}` : 'Drag and drop pdf here or click to select files to upload.';

        return (
            <div>
                <div>
                    <Dropzone onDrop={this.onDrop} multiple={false}>
                        <div>{dragAndDropText}</div>
                    </Dropzone>
                </div>
                <ProblemFields contest_id={this.contest_id} problem_no={this.problem_no} save={this.onSave}/>
            </div>
        );
    }
}
