import React from 'react';

class Bla extends React.Component {

    componentDidMount() {
      this.blabla();
    }
  
  
  blabla = () => {
  
  fetch("db.json", {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

render() { 
 
  return <h1>Hello</h1>
  ;}}

export default Bla;