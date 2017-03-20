import React from 'react';
import Dropzone from 'react-dropzone';
import { getProblemMetaData } from '../../ContestActions';

export default class ProblemFields extends React.Component {

    constructor(props) {
        super(props);
        this.contest_id = props.contest_id;
        this.problem_no = props.problem_no;
        this.onSave = this.onSave.bind(this);
        this.getTextFromFile = this.getTextFromFile.bind(this);
        this.updateField = this.updateField.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.updateOutput = this.updateOutput.bind(this);
        this.state = {
            input: 'Click here to upload an input text file',
            output: 'Click here to upload an output text file',
            problemName: '',
        };
    }

    componentDidMount() {
        this.getProblemMetaDataWrapper(this.contest_id, this.problem_no);
    }

    componentWillReceiveProps(nextProps) {
        this.getProblemMetaDataWrapper(nextProps.contest_id, nextProps.problem_no);
    }

    getProblemMetaDataWrapper(contest_id, problem_no) {
        this.contest_id = contest_id;
        this.problem_no = problem_no;
        if (this.problem_no) {
            getProblemMetaData(this.contest_id, this.problem_no).then((res) => {
                if (res.problemName) {
                    this.setState({
                        problemName: res.problemName,
                        input:  res.input,
                        output: res.output,
                        loadedMeta: true,
                    })
                }
            });
        }
    }

    getTextFromFile(file, name) {
        var reader = new FileReader();
        reader.onload = function(event) {
            this.setState({ [name]: event.target.result });
        }.bind(this);
        reader.readAsText(file);
    }

    onSave() {
        const { input, output, problemName } = this.state;
        this.props.save(input, output, problemName, this.file);
    }

    updateField(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    updateInput(files) {
        this.getTextFromFile(files[0], 'input');
    }

    updateOutput(files) {
        this.getTextFromFile(files[0], 'output');
    }

    render() {
        if (!this.state.loadedMeta &&  this.problem_no) {
            return null;
        }
        return (
            <div>
                <input
                    placeholder='Problem Name'
                    name="problemName"
                    className="message-input"
                    type="text" value={this.state.problemName}
                    onChange={this.updateField}
                />
                <Dropzone onDrop={this.updateInput} multiple={false}>
                    <div>{this.state.input.substring(0, 2000)}</div>
                </Dropzone>
                <Dropzone onDrop={this.updateOutput} multiple={false}>
                    <div>{this.state.output.substring(0, 2000)}</div>
                </Dropzone>
                <button onClick={this.onSave}>Save</button>
            </div>
        );
    }
}
