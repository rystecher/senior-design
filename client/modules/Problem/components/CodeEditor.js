import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
// import ModeLoader from './CodeMirrorModeLoader';

class CodeEditor extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.updateCode = this.updateCode.bind(this);
        console.log(navigator);
    }

    componentWillMount() {
        // ModeLoader().then(() => {
        //     this.forceUpdate();
        // })
    }

    updateCode(newCode) {
        this.setState({
            code: newCode,
        });
    }

    render() {
        const options = {
            lineNumbers: true,
            mode: 'javascript',
        };
        return (
            <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
        );
    }
};

CodeEditor.defaultProps = {
    lang: 'javascript',
    value: 'var hello = "world";'
}

CodeEditor.propTypes = {
    lang: PropTypes.string.isRequired,
};

export default CodeEditor;
