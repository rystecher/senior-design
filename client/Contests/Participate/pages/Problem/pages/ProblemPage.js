import React from 'react';
import NavBar from '../components/ProblemView/NavBar.js';
import MessageComponent from '../components/MessageComponent.js';
import ChatSideBar from '../components/ChatSideBar.js';
import TextEditor from '../components/TextEditor';

/*
  A component to create the components for this page
 */
export default class ProblemPage extends React.Component {

    render() {
        return (
            <div>
              <div className="row">
                <div className="col-md-6">
                  {/*<NavBar competition={competition[0]} />*/}
                </div>
                <div className="col-md-6">
                  <TextEditor
                    team_id='58a2140af3c57bd14d9f0300'
                    contest_id='cikqgkv4q01ck7453ualdn3hn'
                    problem_num={1}
                  />
                </div>
              </div>

              <MessageComponent
                  team_id='58a2140af3c57bd14d9f0300'
                  contest_id='cikqgkv4q01ck7453ualdn3hn'
              />
              <ChatSideBar
                  contest_id='cikqgkv4q01ck7453ualdn3hn'
              />
            </div>
        );
    }
}
