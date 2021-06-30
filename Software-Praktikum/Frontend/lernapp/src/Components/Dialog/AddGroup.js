import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import GroupBO from "../../API/GroupBO";


class AddGroup extends Component {
    constructor(props){
        super(props);

        this.state = {
            groupname : "",
            admin : "",
            description: "",

        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) =>{
        this.setState({ [e.target.name] : e.target.value });}


    addGroup = () => {
        let newGroup = new GroupBO(
            this.state.groupname,
            this.state.admin,
            this.state.description,);

            LernappAPI.getAPI().addGroup(newGroup).then(console.log(newGroup))

    }

    render() {
        let header = 'Erstelle deine eigene Lerngruppe!'
        const {groupname, admin, description} = this.state
        return (
            <div>
                <h1>{header}</h1>
                <form onSubmit={this.addGroup}>
                    <div>
                        <div className="Groupname"><TextField name="groupname" label="Gruppenname" variant="outlined" value ={groupname} onChange={this.handleChange}/> </div>
                        <div className="Admin"><TextField name="admin" label="Admin" variant="outlined" value ={admin} onChange={this.handleChange}/> </div>
                        <div className="Description"><TextField name="description" label="Beschreibung" variant="outlined" value ={description} onChange={this.handleChange}/> </div>
                    </div>
                </form>
                <div className="Buttons">
                    <Button type="submit" variant="contained" color="primary" size="large" onClick={this.addGroup} color='primary'>
                        Erstellen
                    </Button>
                </div>
            </div>

        );
    }
}

export default AddGroup;