import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import db from './firebase.js'

function SidebarChat({ id, name, avatar, addNewChat }) {

    const [seed, setSeed] = useState('');

    const createChat = () => {
        const roomName = prompt("Please enter a name for the chat");

        if(roomName){
            //creating a new chat 
            
            setSeed(Math.floor(Math.random() * 5000))
        
            db.collection('rooms').add({
                name: roomName,
                avatar: seed
            })

            setSeed('');
        }
    }

    const accessMessages = () => {

    }

    return !addNewChat ? (
        <div className="sidebarChat" onClick={accessMessages}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${avatar}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>last message</p>
            </div>
            
        </div>
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
