import React from 'react';
import {fetchTeamMessages} from '../../Contests/ContestActions.js';
import { ChatFeed, Message } from 'react-chat-ui'

export default class MessageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messageObjs: [] };
    }

    componentDidMount() {
        const team_id = "would have an id here";
        this.chatIntervId = setInterval(() => {
            fetchTeamMessages(team_id).then((messages) => {
                const messageObjs = messages.map((message) => {
                    const type = message.from === 'Team' ? 0 : 1;
                    return new Message(type, message.message);
                })
                this.setState({ messageObjs });
                console.log(messages);
            });
        }, 30000);
    }

    componentWillUnMount() {
        clearInterval(this.state.chatIntervId);
    }

    // bubbleStyles={
    //     {
    //         text: {
    //             fontSize: 30
    //         },
    //         chatbubble: {
    //             borderRadius: 70,
    //             padding: 40
    //         }
    //     }
    // }
    sendMessage(ele) {
        console.log("Message called", ele.keyCode, this);
        // if(keyDown.keyCode == 13) {
        //     alert(ele.value);
        // }
    }

    render() {
        return (
            <div>
                <ChatFeed
                    messages={this.state.messageObjs}
                    isTyping={this.state.is_typing}
                    hasInputField={false}
                    bubblesCentered={false}
                />;
                <input
                    placeholder="Type a message..."
                    class="message-input"
                    onKeyDown={this.sendMessage.bind(this)}
                />
            </div>
        );

    }
}
