import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Chatlist from './Components/ChatList';

//hier wird current user gespeichert

export default function App(){
    return(
        <div>
            <Chatlist/>
        </div>
    )
}
