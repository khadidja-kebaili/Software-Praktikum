import React, {Component} from 'react';

class Message extends Component{
    constructor(props){
        super(props);
        this.state = {
            profilID:"",
            room: "",
            text:""
        }
    }

    componentDidMount(){
        //get
    }

    componentDidUpdate(prevProps){
        if((this.props.show)&&(this.props.show !== prevProps.show)){
            //get
        }
    }

    //get Methoden


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
const styles;

export default withStyles(styles)(Message);
