import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';
import DeleteRequest from '../Dialog/DeleteRequest';




class RequestListEntry extends Component{
    constructor(props){
        super(props);

        this.state={
            request: props.profiles,
            // loadingInProgress: false,
            // deletingInProgress: false,
            // loadingError: null,
            // deletingError: null,
            currentUser: 6,
            showDeleteRequest: false

        };
    }

//Anfragen sollen gelöscht werden
// deleteRequest = () => {
//     // const {request} = this.props;
//     LernappAPI.getAPI().deleteRequest(this.state.currentUser).then(() => {
//         this.setState({
//              deletingInProgress: false,
//              deletingError: null
           
//         })
//         this.props.onRequestDeleted();
//     }).catch(e =>
//         this.setState({
//             deletingInProgress: false,
//             deletingError: e     
//         })
//         );
//         this.setState({
//             deletingInProgress: true,
//             deletingError: null
//         })      
// };



// componentDidMount() {
//     this.getRequest();
//   }

  deleteRequestButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
        showDeleteRequest: true
    });
}
closeDeleteDialog = () => {
    this.setState({
    showDeleteRequest: false
  });
}


addRequest = () =>{
    LernappAPI.getAPI().addRequest().then(profileBOs =>
        this.setState({
            requests : profileBOs,
        }))
};

getRequest = () => {
    LernappAPI.getAPI().getRequest(this.state.currentUser).then(profileBOs =>
        this.setState({
            request:  profileBOs,
    
        }))} 

    render() {
        const{request}=this.state;
        
        return(
            <div>
                
                <Typography>
                    {request.getFirstname()}, {request.getLastname()}, {request.getLearnstyle()}, {request.getStudytime()},
                    {request.getStudyplace()}, {request.getStudyfrequence()}
                 <Button color='primary' flex="flex-end" onClick={this.addRequest}> Annehmen </Button>
                <div className="DeleteButton">
                <div className="RequestLöschen">
                <Button color="primary" size="large" onClick={this.deleteRequestButtonClicked}> Ablehnen</Button>
                </div>
                <DeleteRequest show={this.state.showDeleteRequest} request={request} onClose={this.closeDeleteDialog}/>
                </div>
                
                </Typography>           
            
            </div>
        );
    }
}

export default RequestListEntry;