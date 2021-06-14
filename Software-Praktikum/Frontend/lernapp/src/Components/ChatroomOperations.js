import { LernappAPI } from "../API";

class ChatroomOperations extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            name: None
        }
    }

    componentDidMount(){
        this.getMessages();
    }

    getMessages = () => {
        LernappAPI.getAPI().get_messages().then(message =>
            this.setState({
                messages: message
            }))
    }

    renderMessages(){
        var parent = document.getElementById("messages");

        //Array von MessageBO muss hier eingefügt werden
        var res = [];

        res.forEach(elem => {
            var newdiv = document.createElement("div");
            var content = document.createTextNode(elem.text);
            newdiv.appendChild(content);
            //TODO: Hier muss die ID des aktuellen Users geprüft werden, nicht 1
            if(elem.profilID === 1){
                newdiv.classList.add("ownmessage");
            //Wenn nicht aktueller User
            }else{
                newdiv.classList.add("othermessage");
            }
            parent.appendChild(newdiv);
        });

    }

    render(){
        const { chatroom } = this.state;
        return(
            <div>
                <h1 id="chatname">Chatraum</h1>

                <div id="messages">

                </div>

                <div className="input">
                    <TextField/>
                </div>
                <div className="send">
                    <Button onClick={}>Senden</Button>
                    <Button onClick={this.renderMessages}>Update</Button>

                </div>
            </div>
        )
    }
}

export default ChatroomOperations;