import React from 'react';
import { handleSubmit } from '../components/SubmitProblem';

export default class ProblemPage extends React.Component {

    render() {
        return (
            <div>
                This is the problem page!
                <br/>
                <button onClick={handleSubmit}>RUN</button>
            </div>
        );
    }
}
