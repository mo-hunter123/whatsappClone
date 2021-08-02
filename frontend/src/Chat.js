import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import React, { useState } from 'react'
import "./Chat.css"
import axios from 'axios';


function Chat({ messages }) {
    const [input, setInput] = useState("");


    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:9000/messages/new", {
            message: input,
            name: "someone", 
            timestamp: "now", 
            received: true
        });
        setInput("");
    };


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>last seen at ... </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>
                    <IconButton >
                        <AttachFile />
                    </IconButton>
                    <IconButton >
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">

                {
                    Object.keys(messages).map(function(key, index) {

                        return(
                            <p className={`chat__message ${messages[key].received && "chat__receiver"}`}>
                                <span className="chat__name">{messages[key].name}</span>
                                {messages[key].message}
                                <span className="chat__timestamp">
                                    {messages[key].timestamp}
                                </span>
                            </p>
                        )                  
                    })
                }
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message " type="text" />
                    <button onClick={sendMessage} type="submit">send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}



export default Chat
