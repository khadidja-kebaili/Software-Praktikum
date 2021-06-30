// import React,{Component} from 'react';
// import {Typography} from '@material-ui/core';
// import { Button } from '@material-ui/core';
// import LernappAPI from '../../API/LernappAPI';
// import DeleteGroupRequest from '../Dialog/DeleteRequest';
//
//
//
//
// class RequestGroupListEntry extends Component{
//     constructor(props){
//         super(props);
//
//         this.state={
//             request: props.profiles,
//
//             currentUser: 2,
//             showDeleteGroupRequest: false
//
//         };
//     }
//
// //Anfragen sollen gelöscht werden
// // deleteRequest = () => {
// //     // const {request} = this.props;
// //     LernappAPI.getAPI().deleteRequest(this.state.currentUser).then(() => {
// //         this.setState({
// //              deletingInProgress: false,
// //              deletingError: null
//
// //         })
// //         this.props.onRequestDeleted();
// //     }).catch(e =>
// //         this.setState({
// //             deletingInProgress: false,
// //             deletingError: e
// //         })
// //         );
// //         this.setState({
// //             deletingInProgress: true,
// //             deletingError: null
// //         })
// // };
//
//
//
// // componentDidMount() {
// //     this.getRequest();
// //   }
//
// // deleteRequestHandler = (deletedRequest) => {
// //     this.setState ({
// //         requests: this.state.request.
// //     })
// // }
//
//
// deleteGroupRequestButtonClicked = (event) => {
//     event.stopPropagation();
//     this.setState({
//         showDeleteGroupRequest: true
//     });
// }
// closeDeleteGroupDialog = () => {
//     this.setState({
//     showDeleteGroupRequest: false
//   });
// }
//
//
//
//
// getRequestforGroup = () => {
//     LernappAPI.getAPI().getRequestforGroup(this.state.currentUser).then(profileBOs =>
//         this.setState({
//             request:  profileBOs,
//
//      }))}
//
//      addGroupForRequest = () =>{
//          let request_type ="E"
//          let newRequest = new RequestBO(
//              this.state.selectedMember.getID(),
//              this.props.group.getID()
//          )
//         LernappAPI.getAPI().addGroupForRequest().then(profileBOs =>
//             this.setState({
//                 requests : profileBOs,
//             }))
//     };
//
//     render() {
//         const{request, showDeleteRequest}=this.state;
//
//         return(
//             <div>
//
//                 <Typography>
//                     {request.getAdmin()}, {request.getGroupname()}
//                  <Button color='primary' flex="flex-end" onClick={this.addGroupForRequest}> Annehmen </Button>
//                 <div className="DeleteButton">
//                 <div className="RequestLöschen">
//                 <Button color="primary" size="large" onClick={this.deleteGroupRequestButtonClicked}> Ablehnen</Button>
//                 </div>
//                 <DeleteGroupRequest show={this.state.showDeleteGroupRequest} request={request} onClose={this.closeDeleteGroupDialog}/>
//                 </div>
//
//                 </Typography>
//
//             </div>
//         );
//     }
// }
//
// export default RequestGroupListEntry;