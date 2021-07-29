import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';

function App() {

  useEffect(() => {
    const pusher = new Pusher('a8d58b9b008b2fa028c1', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });

  }, [])






  return (
    <div className="app">
      <div className="app__body">

        <Sidebar />
        <Chat />

      </div>


    </div>
  );
}

export default App;
