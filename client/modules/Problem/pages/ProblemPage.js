import React from 'react';
import handleSubmit from '../components/SubmitProblem';
import NavBar from '../components/ProblemView/NavBar.js';

var problems =  [{
  title: "Problem 1",
  prompt: "Problem 1 text",
  input: "Input 1",
  output: "Output 1",
  status_comp: "not done"
},
  {
    title: "Problem 2",
    prompt: "Problem 2 text",
    input: "Input 2",
    output: "Output 2",
    status_comp: "not done"
  },
  {
    title: "Problem 3",
    prompt: "Problem 3 text",
    input: "Input 3",
    output: "Output 3",
    status_comp: "not done"
  },
  {
    title: "Problem 4",
    prompt: "Problem 4 text",
    input: "Input 4",
    output: "Output 4",
    status_comp: "not done"
  },
  {
    title: "Problem 5",
    prompt: "Problem 5 text",
    input: "Input 5",
    output: "Output 5",
    status_comp: "not done"
  }];


var competition = [
  {
    name: "2017 Bucknell Spring Competition",
    teams: [
      {
        name: "team 1",
        members: "",
        working_text: { // the text to get saved from the editor..?
          prob1: "",
          prob2: "",
          prob3: "",
          prob4: "",
          prob5: ""
        },
        status: ["done", "not", "done", "not", "done"]
      },
      {
        name: "team 2",
        members: "",
        working_text: { // the text to get saved from the editor..?
          prob1: "",
          prob2: "",
          prob3: "",
          prob4: "",
          prob5: ""
        },
        status: ["done", "not", "done", "not", "done"]
      }
    ],
    problems: problems
  },
  {
    name: "2018 Bucknell Spring Competition",
    teams: [
      {
        name: "team 1",
        members: "",
        working_text: {
          prob1: "",
          prob2: "",
          prob3: ""
        }
      },
      {
        name: "team 2",
        members: "",
        working_text: {
          prob1: "",
          prob2: "",
          prob3: ""
        }
      }
    ],
    problems: problems
  }
];





export default class ProblemPage extends React.Component {
    render() {
        return (
            <div>
              <h1> Hello </h1>
                <NavBar competition={competition[0]} />
                 This is the problem page!
                <br/>
                <button onClick={handleSubmit}>RUN</button>
            </div>
        );
    }
}
