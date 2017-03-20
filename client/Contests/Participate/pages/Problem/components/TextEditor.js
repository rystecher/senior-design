import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import {testCode, submitCode} from '../../../../ContestActions';


// This hot-loads all the various syntax highlighting client-side since they depend
// on the window and navigator objects
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/python/python');
  require('codemirror/mode/javascript/javascript');
}

// Initial text editor prompts in different languages
const prompts = {
  python: 'def addOne(x)\n    return x + 1\n',
  javascript: 'function addOne(x) {\n    return x + 1\n}\n'
};

// The text editor where users can write and edit code
export default class TextEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: prompts.python,
            readOnly: false,
            mode: "python",
        };
        this.onTestClick = this.onTestClick.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

  updateCode = (newCode) => {
    this.setState({code: newCode});
  };

  changeMode = (e) => {
    let mode = e.target.value;
    this.setState({
      mode: mode,
      code: prompts[mode]
    });
  };

  onTestClick() {
    let user_test_input = document.getElementById('custom_in').value.split('\n');
    testCode(this.state.code, this.state.mode, user_test_input);
  }

  onSubmitClick() {
    let contest_id = 'cikqgkv4q01ck7453ualdn3hl';
    let team_id = '58a2140af3c57bd14d9f0300';
    let problem_num = 1;
    submitCode(contest_id, team_id, this.state.code, this.state.mode, problem_num);
  }

    render() {
        let options = {
            lineNumbers: true,
            readOnly: false,
            mode: this.state.mode
        };

        return (
            <div>
                <select onChange={this.changeMode} value={this.state.mode}>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                </select>

                <CodeMirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} />
                <span>Test against your own custom input</span>
                <br/>
                <textarea name="custom_in" id="custom_in" cols="30" rows="10"></textarea>
                <br/>
                <button ref="testButton" onClick={this.onTestClick}>Test</button>
                <button ref="subButton" onClick={this.onSubmitClick}>Submit</button>
            </div>
        );
    }
}
