import React from 'react';
import PropTypes from 'prop-types';

const ProfileHeader = ({profile: {status, company, location, website, social, user: {name}}}) => {
    return (
        <div className="row">
            <div className="col s12">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <h1>{name}</h1>
                        <p>{status} {company && <span> at {company}</span>}</p>
                        <p>{location && <span>{location}</span>}</p>
                    </div>
                    <div class="card-content">
                        <p><span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span></p>
                        <span>{website && (<a href={website} target="_blank" rel="noopener noreferrer"><i className="fas fa-globe fa-2x"></i></a> )}</span>
                        <span>{social && social.twitter && (<a href={social.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter fa-2x"></i></a> )}</span>
                        <span>{social && social.facebook && (<a href={social.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook fa-2x"></i></a> )}</span>
                        <span>{social && social.linkedin && (<a href={social.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin fa-2x"></i></a> )}</span>
                        <span>{social && social.youtube && (<a href={social.youtube} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube fa-2x"></i></a> )}</span>
                        <span>{social && social.instagram && (<a href={social.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram fa-2x"></i></a> )}</span>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileHeader.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileHeader;