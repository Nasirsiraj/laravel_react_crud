import React from 'react';
import axios from "axios";

class EditContact extends React.Component{
    state = {
        fullName: "",
        email: "",
        phone: ""
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    updateContact = async (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const response = await axios.patch(`/contact/${id}`, this.state);
        if(response.data.status === 200){
            this.props.history.push('/');
        }

        console.log(this.state);
    }
    async componentDidMount(){
        const id = this.props.match.params.id;
        const response = await axios.get(`/contact/${id}/edit`);
        this.setState({fullName: response.data.contact.fullName})
        this.setState({email: response.data.contact.email})
        this.setState({phone: response.data.contact.phone})

    }
    render() {
        return (
            <div>
                <form onSubmit={this.updateContact}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="fullName"
                            className="form-control"
                            value={this.state.fullName}
                            onChange={this.handleInput}
                            placeholder='enter full name'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.handleInput}
                            placeholder='enter your email'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={this.state.phone}
                            onChange={this.handleInput}
                            placeholder='enter phone no'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary">
                            Edit Contact
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditContact;
