import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from 'axios'; //axios from our local

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {

  const [messages, setMessages] = useState([]);

  //instead of fetching all the messages each time we have a new message inserted into database we gonna fetch them all at the begining and then once a message added we will push it to the messsages array 

  //this useEffect will be responsible for fetching all the initial information 
  useEffect(() => {
    axios.get("http://localhost:9000/messages/sync").then((response) => {
      setMessages(response.data);
    });

  }, [])


  useEffect(() => {
    const pusher = new Pusher('a8d58b9b008b2fa028c1', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
     
      
      // when a new message is inserted we will add it to all the messages because it is just an object that we received from dataabas ... pushing the message 
      setMessages([...messages, data]); // keep all the messages and include the new one 
    });


    //once we get the message from our pusher listener we have to kill the subscribe 

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      
    }

  }, [messages]);


  console.log(messages);


  return (
    <div className="app">
      <div className="app__body">

        <Router>
          <Sidebar />
          <Route path="/rooms/:roomId">
            
            <Chat messages={messages} />
          </Route>    
          <Route path="/">
            
            
          </Route>    
          
            

                
          
        </Router>

      </div>
    </div>
  );
}

export default App;
