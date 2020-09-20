import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

export class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    render(){
        if (this.props.isAuthenticated){
            return <Redirect to='/' />;
        };
        const { username, password } = this.state;

        return (
            <div className='auth'>
                <Helmet>
                    <title>Realest Estate - Login</title>
                    <meta
                        name='description'
                        content='login page'
                    />
                </Helmet>
                <h1 className='auth__title'>Sign In</h1>
                <p className='auth__lead'>Sign into your Account</p>
                <form className='auth__form' onSubmit={this.onSubmit}>
                    <div className='auth__form__group'>
                        <input 
                            className='auth__form__input'
                            type='text'
                            placeholder='Username'
                            name='username' value={username}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className='auth__form__group'>
                        <input
                            className='auth__form__input'
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={this.onChange}
                            minLength='6'
                        />
                    </div>
                    <button className='auth__form__button'>Login</button>
                </form>
                <p className='auth__authtext'>
                    Don't have an account? <Link className='auth__authtext__link' to='/signup'>Sign Up</Link>
                </p>
            </div>
        );
    };
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
