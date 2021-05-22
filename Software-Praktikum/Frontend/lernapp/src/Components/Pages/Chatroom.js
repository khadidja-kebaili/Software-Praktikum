import React,  {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import fakebackend from '../fake-backend.json'
import Message from '../Message';

/**
 * geöffneter Chat mit zugehörigen Nachrichten
 */
class Chatroom extends Component{

    update_messages() {
        var parent = document.getElementById("chat");
        //parent.innerHTML = "";
        //var messageMapper = new MessageMapper();
        //var res = messageMapper.find_by_room(this.get_id);
        var res = [];
        
        var mes = new Message();
        mes.profilID = 1;
        mes.room = 1;
        mes.text = "Hallo";

        var mes2 = new Message();
        mes2.profilID = 2;
        mes2.room = 1;
        mes2.text = "Tschau";

        res.push(mes, mes2);
        console.log("Hallo");
        console.log(mes.text);


        res.forEach(elem => {
            var newdiv = document.createElement("div");
            var content = document.createTextNode(elem.text);
            newdiv.appendChild(content);
            //Hier muss die ID des aktuellen Users geprüft werden, nicht 1
            if(elem.get_profilID === 1){
                newdiv.classList.add("ownmessage");
            //Wenn nicht aktueller User
            }else{
                newdiv.classList.add("othermessage");
            }
            parent.appendChild(newdiv);
        });
    }

    render(){
        return(
            <div>
                <div id="chat">
                    
                </div>
                <div className="input">
                    <TextField/>
                </div>
                <div className="send">
                    <Button onClick={this.update_messages}>Senden</Button>
                </div>
            </div>
        );
    }

}

export default Chatroom;