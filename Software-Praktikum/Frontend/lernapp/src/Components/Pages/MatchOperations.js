// import React, {Component} from 'react';
// import LernappAPI from "../../API/LernappAPI";
// import ProfilBO from '../../API/ProfilBO';



// class MatchOperations extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             profile: null,
//         }
//     }
//     componentDidMount(){
//         this.getProfile(1);
//     }

//     getProfile = () => {
//         // let data = 8;
//         LernappAPI.getAPI().getProfile(3).then(profile =>
//             this.setState({
//                 profile: profile,
//             }))
//     }
//     render(){
//         const { profile }=this.state;
//         return(
//             <div>
//                 <div className="profile">
                    
                   
//                 </div>
//             </div>
//         )
//     }

// }

// export default MatchOperations;
// import React, { Component } from 'react';

// import BusinessObject from '../../API/BusinessObject';
// import MatchDetail from '../Pages/MatchesDetail';
// import LernappAPI from '../../API/LernappAPI';



// class MatchOperations extends Component {
//   constructor(props){
//   super(props);
  
//   this.state = { 
//     profiles: [],
   
//    };
//   }
//   componentDidMount() {
//     this.loadProfiles();
//   }


//   loadProfiles = () => {
//     LernappAPI.getAPI.getAllProfiles().then( profiles =>
//       this.setState({
//         profiles: profiles,

//       }))
//   }
//   // getAllProfiles = () => {
//   //   LernappAPI.getAPI().getAllProfiles().then(profiles =>
//   //     this.setState({
//   //       profiles: profiles,
//   //     }))
//   // }
  
//   render() { 
//     const { profiles } = this.state;
//     return (
//       <div>
//         {
//           profiles.map(profile => <MatchDetail key={profile.getID()}
//           profileID={profile.loadProfiles().toString()} 
//           profileID={profile.getID().toString()}
//           />)
//         }


//       </div>
//     )
// }
// }

// export default MatchOperations;

