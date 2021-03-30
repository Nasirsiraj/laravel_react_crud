import React from 'react';
import axios from 'axios';
import Contact from "./Contact";

class Contacts extends React.Component{
    state = {
        contacts: [],
        loading: true
    }
    componentDidMount() {
        this.fetchContacts();
    }
    deleteContact =async ($id) => {
        const response = await axios.delete(`/contact/${$id}`)
        if(response.status === 200){
           this.fetchContacts;
        }
    }

    fetchContacts = async () => {
        const response = await axios.get('/contact');
        if(response.data.status == 200){
            this.setState({contacts: response.data.contacts, loading: false});
        }else{
            this.setState({contacts: [], loading: true});
        }
    }
    render() {
        if(this.state.loading){
            return(
                <div>loading...</div>
            )
        }
        return (
            <div>
                {this.state.contacts.map(contact => (
                    <Contact contact={contact} key={contact.id} deleteContact = {this.deleteContact} fetchContacts = {this.fetchContacts()}/>
                ))}
            </div>
        )
    }
}

export default Contacts;
