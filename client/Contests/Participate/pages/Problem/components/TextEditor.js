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
  python: 'def addOne(x):\n    return x + 1\nprint addOne(1)'
};

// The text editor where users can write and edit code
export default class TextEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: prompts.python,
            readOnly: false,
            mode: "python", // Syntax for text editor
            lang: "python"
        };
        this.onTestClick = this.onTestClick.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        // Check local storage to recover any autosaved code
        if (localStorage['problem' + this.props.problemNum]) {
          this.state.code = localStorage['problem' + this.props.problemNum];
        }
    }

  updateCode = (newCode) => {
    this.setState({code: newCode});
    // autosave code to local storage for each problem
    localStorage['problem' + this.props.problemNum] = this.state.code;
  };

  changeMode = (e) => {
    let lang = e.target.value;

    // Handles different languages with the same syntax
    switch(lang) {
      // Python syntax applies to Python3
      case 'python3':
        this.setState({
          mode: 'python',
          lang: lang
        });
        break;

      default:
        this.setState({
          mode: lang,
          lang: lang
        });
    }
  };

  onTestClick() {
    const {contest_id, team_id} = this.props;
    let user_test_input = document.getElementById('custom_in').value;
    testCode(contest_id, team_id, this.state.code, this.state.lang, [user_test_input]);
  }

  onSubmitClick() {
    const {contest_id, team_id, problemNum} = this.props;
    submitCode(contest_id, team_id, this.state.code, this.state.lang, problemNum);
  }

    render() {
        let options = {
            lineNumbers: true,
            readOnly: false,
            mode: this.state.mode
        };

        return (
            <div>
                <select onChange={this.changeMode} value={this.state.lang}>
                    <option value="python">Python</option>
                    <option value="python3">Python 3</option>
                    <option value="javascript">JavaScript</option>
                </select>

                <CodeMirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} />
                <span>Test against your own custom input</span>
                <br/>
                <textarea name="custom_in" id="custom_in" cols="30" rows="10" />
                <br/>
                <button ref="testButton" onClick={this.onTestClick}>Test</button>
                <button ref="subButton" onClick={this.onSubmitClick}>Submit</button>
            </div>
        );
    }
}

TextEditor.propTypes = {
  contest_id: React.PropTypes.string.isRequired,
  team_id: React.PropTypes.string.isRequired,
  problemNum: React.PropTypes.string.isRequired,
};
