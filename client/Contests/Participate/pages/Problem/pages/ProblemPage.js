import React from 'react';
import NavBar from '../components/ProblemView/NavBar.js';
import MessageComponent from '../components/MessageComponent.js';
import ChatSideBar from '../components/ChatSideBar.js';
import TextEditor from '../components/TextEditor';
/*
  json obj to hold the problem information
 */
const problems = [{
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


/*
  json obj to hold team info
  status array is for button coloring info
    not = not complete
    done = completed
 */
const competition = [
  {
    name: "2017 Bucknell Spring Competition",
    teams: [
      {
        name: "Team 1",
        status: ["not", "done", "not", "done", "done"]
      },
      {
        name: "Team 1",
        status: ["not", "done", "not", "done", "done"]
      }],
    problems: problems
  },
  {
    name: "2018 Bucknell Spring Competition",
    teams: ["Team 1", "Team 2"],
    problems: problems
  }
];


/*
  A component to create the components for this page
 */
export default class ProblemPage extends React.Component {

    render() {
        return (
            <div>
                <NavBar competition={competition[0]} />
                <MessageComponent
                    team_id='58a2140af3c57bd14d9f0300'
                    contest_id='cikqgkv4q01ck7453ualdn3hn'
                />
                <TextEditor />
                <ChatSideBar
                    contest_id='cikqgkv4q01ck7453ualdn3hn'
                />
            </div>
        );
    }
}