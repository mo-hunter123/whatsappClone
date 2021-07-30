//import
//adding type: module to package.json will make you importing thr library or something instead of require a package like epress = require('express')...
//ES6 typing give this feauture 

import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import Messages from "./dbMessages.js";
import cors from 'cors';

//application configuration 
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1240288",
    key: "a8d58b9b008b2fa028c1",
    secret: "a73e06453f9cb5aaceb4",
    cluster: "eu",
    useTLS: true
});

//pusher listner to database 
const db = mongoose.connection

db.once('open', () => {
    console.log('DB connected');

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change);

        //if the message is inserted into the database we will store the message details and we will push the message to pusher to make the in time access 

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted",
                {
                    name: messageDetails.name,
                    message: messageDetails.message
                }
            );
    
        } else {
            console.log("Error triggering pusher");
        }
    });
});



//middleware 
app.use(express.json());

//database config
const connection_url = 'mongodb+srv://admin:LHA3tdQUlh1IWWGU@cluster0.xi42v.mongodb.net/whCloneDB?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//,,,


//api route 
app.get('/', (req, res) => res.status(200).send('hello world'));


app.get('/messages/sync', cors(), (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});

app.post('/messages/new', cors(), (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });
});

//just for testing this shit how it works 
// app.get('/test', (req, res) => {
//     console.log(req.query);
//     res.status(200).send('just a test ');
// })



//listener 
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
