import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul className="right">
            <li><Link to="/" className="white-text">Home</Link></li>
            <li><Link to="/dashboard" className="white-text">Dashboard</Link></li>
            <li><button onClick={logout} className="btn deep-orange accent-3 waves-effect waves-light">Logout</button></li>
        </ul>
    );
    const guestLinks = (
        <ul className="right">
            <li><Link to="/" className="white-text">Home</Link></li>
            <li><Link to="/login" className="white-text">Login</Link></li>
            <li><Link to="/register" className="white-text">Register</Link></li>
        </ul>
    );
    return (
        <nav>
            <div className="nav-wrapper indigo accent-4">
                <div className="container">
                    <a href="#!" className="brand-logo center">Login Register</a>
                    {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);
