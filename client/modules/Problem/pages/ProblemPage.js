import React from 'react';
import CodeEditor from '../components/CodeEditor';

export default class ProblemPage extends React.Component {

    render() {
        const language = "java";
        return (
            <div>
                This is the problem page!
                <CodeEditor language={language} />
            </div>
        );
    }
}
