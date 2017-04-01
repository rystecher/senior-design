import React from 'react';
import Dropzone from 'react-dropzone';
import { getProblemMetaData } from '../../ContestActions';
import './problem_fields.css';

export default class ProblemFields extends React.Component {

    constructor(props) {
        super(props);
        this.contestId = props.contestId;
        this.problemNum = props.problemNum;
        this.onSave = this.onSave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.getTextFromFile = this.getTextFromFile.bind(this);
        this.updateField = this.updateField.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.updateOutput = this.updateOutput.bind(this);
        this.state = {
            input: '',
            output: '',
            problemName: '',
        };
    }

    componentDidMount() {
        this.getProblemMetaDataWrapper(this.contestId, this.problemNum);
    }

    componentWillReceiveProps(nextProps) {
        this.getProblemMetaDataWrapper(nextProps.contestId, nextProps.problemNum);
    }

    getProblemMetaDataWrapper(contestId, problemNum) {
        this.contestId = contestId;
        this.problemNum = problemNum;
        if (this.problemNum) {
            getProblemMetaData(this.contestId, this.problemNum).then((res) => {
                if (res.problemName) {
                    this.setState({
                        problemName: res.problemName,
                        input: res.input,
                        output: res.output,
                        loadedMeta: true,
                    });
                }
            });
        }
    }

    getTextFromFile(file, name) {
        var reader = new FileReader();
        reader.onload = function (event) {
            this.setState({ [name]: event.target.result });
        }.bind(this);
        reader.readAsText(file);
    }

    onDrop(files) {
        this.props.onDropFile(files);
        this.file = files[0];
        this.setState({ fileName: this.file.name });
    }

    onSave() {
        const { input, output, problemName } = this.state;
        if (input.length === 0 || output.length === 0 || problemName.length === 0 || !this.file) {

        } else {
            this.props.save(input, output, problemName);
        }
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
        if (!this.state.loadedMeta && this.problemNum) {
            return null;
        }
        const dragAndDropText = this.state.fileName ?
            `Uploaded File: ${this.state.fileName}` : 'Click here to upload a new problem PDF.';
        const output = this.state.output.length < 500 ? this.state.output.substring(0, 500) :
            this.state.output.substring(0, 500) + '...';
        const input = this.state.input.length < 500 ? this.state.input.substring(0, 500) :
            this.state.input.substring(0, 500) + '...';
        return (
            <div id='problem-fields'>
                <input
                    placeholder='Problem Name'
                    name='problemName'
                    className='message-input'
                    type='text' value={this.state.problemName}
                    onChange={this.updateField}
                />
                <Dropzone
                    className='dropzone'
                    onDrop={this.updateInput}
                    multiple={false}
                    accept='.txt'
                >
                    Click here to upload a new input file
                </Dropzone>
                <div className='file-text'>{input}</div>
                <Dropzone
                    className='dropzone'
                    onDrop={this.updateOutput}
                    multiple={false}
                    accept='.txt'
                >
                    Click here to upload a new output file
                </Dropzone>
                <div className='file-text'>{output}</div>
                <Dropzone
                    className='pdf dropzone'
                    onDrop={this.onDrop}
                    multiple={false}
                    accept='application/pdf'
                >
                    {dragAndDropText}
                </Dropzone>
                <button onClick={this.onSave}>Save</button>
            </div>
        );
    }
}
