import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import ChatIcon from "@material-ui/icons/Chat"

import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './firebase.js'
import { useStateValue } from './StateProvider';


function Sidebar() {

    const [rooms, setRooms ] = useState([]);
    const [{ user }, dispatch] = useStateValue();
     
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map((doc) => 
            ({
                id: doc.id,
                data: doc.data()
            })
            ))
        ))
        
        //in each time we load our message it's a good practice to stop the subscription 
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton >
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton >
                        <ChatIcon />
                    </IconButton>
                    <IconButton >
                        <MoreVertIcon />
                    </IconButton>
                    
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="search" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} avatar={room.data.avatar} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar