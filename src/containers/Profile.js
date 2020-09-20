import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';
import { editprofile } from '../actions/auth';
import { setAlert } from '../actions/alert';
import PropTypes from 'prop-types';
import ProfileAvatar from '../containers/ProfileAvatar'



export class Profile extends Component {

    state = {
        email: "",
        firstName: "",
        lastName: "",
    };
  
    static propTypes = {
        editprofile: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.object.isRequired,
    };


	//onChangeImg = e => this.setState({ [e.target.name]: e.target.files[0]})
	onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e => {
		e.preventDefault()
		const { firstName, lastName, email } = this.state

		const formData = new FormData()
		formData.append('firstName',firstName)
		formData.append('lastName', lastName)
        formData.append('email', email)
        this.props.editprofile(formData);
		}
		
	

    render() {

        const { username, email, firstName, lastName } = this.state;

        return (
            <div className='auth'>
                    <Helmet>
                        <title>Realest Estate - {firstName +" "+lastName}</title>
                        <meta
                            name='description'
                            content='profile page'
                        />
                    </Helmet>
                    <h1 className='auth__title'>{username} Profile</h1>
                    <p className='auth__lead'>Edit your Account</p>
                    <form className='auth__form' onSubmit={this.onSubmit}>

                        <ProfileAvatar/>

                        <div className='auth__form__group'>
                            <input 
                                className='auth__form__input'
                                type='text'
                                placeholder='Change Username'
                                name='username'
                                value={username}
                                onChange={this.onChange} 
                            />
                        </div>
                        <div className='auth__form__group'>
                            <input 
                                className='auth__form__input'
                                type='email'
                                placeholder='Change Email'
                                name='email'
                                value={email}
                                onChange={this.onChange} 
                            />
                        </div>
                        <div className='auth__form__group'>
                            <input
                                className='auth__form__input'
                                type='text'
                                placeholder='Change FirstName'
                                name='firstName'
                                value={firstName}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className='auth__form__group'>
                            <input
                                className='auth__form__input'
                                type='text'
                                placeholder='Change LastName'
                                name='lastName'
                                value={lastName}
                                onChange={this.onChange}
                            />
                        </div>
                        <button className='auth__form__button' type='submit'>Apply Changes</button>
                    </form>
            </div>
            
        );
    };
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, editprofile })(Profile)