import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import './TextEditor.css';
import { testCode, submitCode } from '../../../../ContestActions';


// This hot-loads all the various syntax highlighting client-side since they depend
// on the window and navigator objects
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
    require('codemirror/mode/python/python');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/clike/clike');
    require('codemirror/mode/ruby/ruby');
    require('codemirror/mode/octave/octave');
}

// Initial text editor prompts in different languages
const prompts = {
    python: 'def addOne(x):\n    return x + 1\nprint addOne(1)',
};

// The text editor where users can write and edit code
export default class TextEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: prompts.python,
            readOnly: false,
            mode: 'python', // Syntax for text editor
            lang: 'python',
            isBusy: false,
        };
        this.onTestClick = this.onTestClick.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        // Check local storage to recover any autosaved code
        if (localStorage[`problem${this.props.problemNum}code`]) {
            this.state.code = localStorage[`problem${this.props.problemNum}code`];
            this.state.mode = localStorage[`problem${this.props.problemNum}mode`];
            this.state.lang = localStorage[`problem${this.props.problemNum}lang`];
        }
    }

    updateCode = (newCode) => {
        this.setState({ code: newCode });
        // autosave code to local storage for each problem
        localStorage[`problem${this.props.problemNum}code`] = this.state.code;
    };

    changeMode = (e) => {
        let lang = e.target.value;
        let mode = lang;
        // Sometimes language != mode so we handle it here
        switch (lang) {
        case 'c':
            mode = 'text/x-csrc';
            break;
        case 'cpp':
            mode = 'text/x-c++src';
            break;
        case 'java':
            mode = 'text/x-java';
            break;
        case 'python3':
            mode = 'python';
            break;
        case 'scala':
            mode = 'text/x-scala';
            break;
        }
        this.setState({
          mode: mode,
          lang: lang
        });
        // Update local storage
        localStorage[`problem${this.props.problemNum}mode`] = mode;
        localStorage[`problem${this.props.problemNum}lang`] = lang;
    };

    onTestClick() {
        this.setState({isBusy: true});
        const { contest_id, team_id } = this.props;
        let userTestInput = document.getElementById('custom_in').value;
        testCode(contest_id, team_id, this.state.code, this.state.lang, [userTestInput]).then(res => {
          this.setState({isBusy: false});
        });
    }

    onSubmitClick() {
        this.setState({isBusy: true});
        const { contest_id, team_id, problemNum } = this.props;
        submitCode(contest_id, team_id, this.state.code, this.state.lang, (problemNum-1)).then(res => {
          this.setState({isBusy: false});
        });
    }

    render() {
        let options = {
            lineNumbers: true,
            readOnly: false,
            mode: this.state.mode,
        };

        return (
            <div>
                <select onChange={this.changeMode} value={this.state.lang}>
                    <option value='python'>Python</option>
                    <option value='python3'>Python 3</option>
                    <option value='c'>C</option>
                    <option value='cpp'>C++</option>
                    <option value='java'>Java</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='octave'>Matlab</option>
                    <option value='ruby'>Ruby</option>
                    <option value='scala'>Scala</option>
                </select>

                <CodeMirror ref='editor' value={this.state.code} onChange={this.updateCode} options={options} />
                <span>Test against your own custom input</span>
                <br />
                <textarea name='custom_in' id='custom_in' cols='30' rows='10' />
                <br />
                <br />
                <div className='form-group'>
                  <button ref='testButton' disabled={this.state.isBusy} onClick={this.onTestClick} type="button" className="btn btn-primary">Test</button>
                  <button ref='subButton' disabled={this.state.isBusy} onClick={this.onSubmitClick} type="button" className="btn btn-primary">Submit</button>
                </div>
            </div>
        );
    }
}

TextEditor.propTypes = {
    contest_id: React.PropTypes.string.isRequired,
    team_id: React.PropTypes.string.isRequired,
    problemNum: React.PropTypes.string.isRequired,
};
