import { LernappAPI } from "../API";

class ChatlistEntry extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: ""
        }
    }

    componentDidMount(){
        this.getChatentry();
    }

    componentDidUpdate(prevProps){
        if((this.props.show)&&(this.props.show !== prevProps.show)){
            //get
        }
    }

    getChatentry = () => {
        LernappAPI.getAPI().getC
    }


    /**
     * Rendern der Komponente
     */
    render(){
        return(
            <div></div>
        )
    }
}

//Stylesheet 
//const styles;

//export default withStyles(styles)(ChatlistEntry);
