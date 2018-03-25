import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MeetupEdit extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            city: '',
            address: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.getMeetup();
    }

    onSubmit(e){
        const newMeetup = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            address: this.refs.address.value,
        }
        this.editMeetup(newMeetup);
        e.preventDefault();
    }

    editMeetup(newMeetup){
        const meetupId = this.state.id;
        axios.request({
            method: 'put',
            url: `http://localhost:3000/api/meetups/${meetupId}`,
            data: newMeetup
        }).then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err))
    }

    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    getMeetup(){
        let meetupId = this.props.match.params.id;
        axios.get(`http://localhost:3000/api/meetups/${meetupId}`)
        .then(response => {
            console.log(response);
            this.setState({
                id: response.data.id,
                name: response.data.name,
                city: response.data.city,
                address: response.data.address
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <br/>
                <Link className="btn grey" to="/">Back</Link>
                <h1>Edit Meetup</h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input type="text" name="name" ref="name" onChange={this.handleInputChange} value={this.state.name}/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="city" ref="city" onChange={this.handleInputChange} value={this.state.city}/>
                        <label htmlFor="name">Ciy</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="address" ref="address" onChange={this.handleInputChange} value={this.state.address}/>
                        <label htmlFor="name">Address</label>
                    </div>
                    <input type="submit" className="btn" value="Save"/>
                </form>
            </div>
        )
    }
}
export default MeetupEdit;
