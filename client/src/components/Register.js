import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../actions/alert';
import {register} from '../actions/auth';
import PropTypes from 'prop-types';


const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const {name, email, password, password2} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({name, email, password});
        }
    }
    if(isAuthenticated) {
        return <Redirect to='/dashboard'/>;
    }
    return (
        <section className="container">
            <h3 className="indigo-text accent-4 center">Sign Up</h3>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="input-field">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="input-field">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn indigo accent-4 waves-effect waves-light white-text" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login" className="btn waves-effect waves-light deep-orange accent-3">Sign In</Link>
            </p>
        </section>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);
