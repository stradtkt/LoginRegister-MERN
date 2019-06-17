import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../actions/auth';


const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const {email, password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    }
    if(isAuthenticated) {
        return <Redirect to='/dashboard'/>;
    }
    return (
        <section className="container">
            <h3 className="indigo-text accent-4 center">Sign In</h3>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="input-field">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn indigo accent-4 waves-effect waves-light white-text" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register" className="btn waves-effect waves-light deep-orange accent-3">Sign Up</Link>
            </p>
        </section>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);