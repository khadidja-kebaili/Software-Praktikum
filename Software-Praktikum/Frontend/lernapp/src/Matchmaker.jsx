// import React, {Component} from "react";
// import {Link, Switch, Route} from "react-router-dom";
// import "./App.css"

// const Matchmaking = () => <div>Du bist auf Matchmaking!</div> 
// const Chat = () => <div>Du bist auf Chat!</div>
// const Profil = () => <div>Du bist auf Profil!</div>

// class Matchmaker extends Component {
//   render(){
//     return(
//       <div>
//         <h1>Hey du bist auf der Matchmaking-Seite!</h1>
        
//         <div className="tabs">
//           <br/>
//           <hr/>
//           <Switch>
//             <Route path="/matchmaking" exact component ={Matchmaking} />
//             <Route path="/matchmaking/chat" exact component ={Chat} />
//             <Route path="/matchmaking/profil" exact component ={Profil} />

//           </Switch>
//         </div>
//         <div className="herz"> </div>
//         <button></button>
//         <div className="kreuz">
          
//         </div>
        
        
//         <div className="links">
//           <Link to = "/matchmaking" className="link"> Matchmaking </Link>
//           <Link to = "/matchmaking/chat" className="link"> Chat </Link>
//           <Link to = "/matchmaking/profil" className="link"> Profil </Link>
//         </div>
        
//       </div>
//     )
//   }
// }

// export default Matchmaker;

// import React from 'react';
// import './Matchmaker.css';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import { List } from '@material-ui/core';

// // const Matchmaker = props => {
// //     const listMatches = props;
// //     const showNextMatch = (newMatch) => {
// //        listMatches.pushState(newMatch)
    
//     // };

// function Matchmaker(){
//     return (
//         <div className="Matches">
//             {/* <FavoriteIcon onClick={() => showNextMatch()}/> */}
//             <FavoriteIcon/>
//         </div>
//     )
// };

// export default Matchmaker; 

import { StylesContext } from '@material-ui/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-deck-swiper';

const Picture = ({picture}) => (
    <View style={style.card}>
        <Image source={{uri:picture.image}} style={styles.pictureProfil}/>
    </View>
)


export default function Matchmaker(){
    return(
        <View style={styles.container}>
            <Swiper
                cards={}
                cardIndex={}
                renderCard={(picture) => <Picture picture={picture}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'   
    },
    picture:{
        flex: 0.45,
        borderRadius: 8,
        shadowRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width:0, height:0},
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    pictureProfil:{
        width: 100,
        flex: 1,
        resizeMode: 'contain'
    }
});
    
