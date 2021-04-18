import React, {useState, useEffekt, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

//import {Infobar} from
//import {Input} from
//import {Messages} from
//import {TExtContainer} from

let socket

export const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState ('');
    const [messages, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://google.de/';

    useEffekt(( => {
        const {name,room} = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setRoom(room);
        setName(name);

        socket.emit('join', {name,room}, (error) => {
            if(error){
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);
    
    useEffect(( => {
        socket.on('message', message => {
            setMessages(msgs => [ ...msgs, message]);
        });
        socket.on('roomData', ({users}) => {
            setUsers(users);
        })
    }))
}, []);
    
    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return(
        <div className='outerContainer'>
            <TextContainer>
                users = {users}
            </TextContainer>
            <div className='container'>
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>

        </div>
    )