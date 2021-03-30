import React from 'react';
import axios  from 'axios'

class AddContact extends React.Component{
    state = {
        fullName: "",
        email: "",
        phone: ""
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    saveContact = async (e) => {
        e.preventDefault();
        axios.post('/contact', this.state)
            .then(response => {
                if(response.data.status == 200){
                    console.log('contact saved successfully.');
                    this.setState({fullName: '', email: '', phone: ''});
                    this.props.history.push('/');
                }else{
                    this.setState({fullName: '', email: '', phone: ''});
                    console.log('contact saving failed.');
                }
            })
            .catch(error => {
                this.setState({fullName: '', email: '', phone: ''});
                console.log(error.message);
            })
    }
    render() {
        return (
           <div>
               <form onSubmit={this.saveContact}>
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
                           Add Contact
                       </button>
                   </div>
               </form>
           </div>
        )
    }
}

export default AddContact;
