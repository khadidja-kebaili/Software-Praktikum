// import React from 'react';
// import LernappAPI from "../../lernapp/src/API/LernappAPI";

// class Bla extends React.Component {

//     componentDidMount() {
//       this.Bla();
//     }
  
//     getprofile = () => {
//         let data = 3;
//         LernappAPI.getAPI().getprofile(data).then(profile =>
//             this.setState({
//                 profile: profile,
//             }))
//     }
    
//     Bla = () => {
  
//     fetch("profile.json", {
//     method: 'GET', 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     }

//     render() { 
        
//             return(
//                 <div>
//                     <div className="profile">
//                         {/* <h4>ID: {profile.getid()}</h4> */}
//                         <h4>Vorname: {profile.getFirstName()}</h4>
//                         <h4>Name: {profile.getLastName()}</h4>
//                     </div>
//                 </div>
//             )
//             }}

// export default Bla;