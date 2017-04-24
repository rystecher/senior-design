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
    python: '# This is just an example\n# Your code will be saved automatically\ndef addOne(x):\n  return x + 1\nprint addOne(1)',
};
// local storage addresses
let code_str, mode_str, lang_str = '';


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
        code_str = `${this.props.contestId}p${this.props.problemNum}code`;
        mode_str = `${this.props.contestId}p${this.props.problemNum}mode`;
        lang_str = `${this.props.contestId}p${this.props.problemNum}lang`;
        // Check local storage to recover any autosaved code
        if (localStorage[code_str]) { this.state.code = localStorage[code_str]; }
        if (localStorage[mode_str]) { this.state.mode = localStorage[mode_str]; }
        if (localStorage[lang_str]) { this.state.lang = localStorage[lang_str]; }
    }

    updateCode = (newCode) => {
        this.setState({ code: newCode });
        // autosave code to local storage for each problem
        localStorage[code_str] = this.state.code;
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
            mode,
            lang,
        });
        // Update local storage
        localStorage[mode_str] = mode;
        localStorage[lang_str] = lang;
    };

    onTestClick() {
        this.setState({ isBusy: true });
        const { contestId, teamId } = this.props;
        let userTestInput = document.getElementById('custom_in').value;
        testCode(contestId, teamId, this.state.code, this.state.lang, [userTestInput]).then(res => {
            this.setState({ isBusy: false });
        });
    }

    onSubmitClick() {
        this.setState({ isBusy: true });
        const { contestId, teamId, problemNum } = this.props;
        submitCode(contestId, teamId, this.state.code, this.state.lang, (problemNum - 1)).then(res => {
            this.setState({ isBusy: false });
        });
    }

    render() {
        let options = {
            lineNumbers: true,
            readOnly: false,
            mode: this.state.mode,
        };

        return (
            <div className='text-editor'>
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
                  <button ref='testButton' disabled={this.state.isBusy} onClick={this.onTestClick} type='button' className='btn btn-primary'>Test</button>
                  <button ref='subButton' disabled={this.state.isBusy} onClick={this.onSubmitClick} type='button' className='btn btn-primary'>Submit</button>
                </div>
            </div>
        );
    }
}

TextEditor.propTypes = {
    contestId: React.PropTypes.string.isRequired,
    teamId: React.PropTypes.string.isRequired,
    problemNum: React.PropTypes.string.isRequired,
};
