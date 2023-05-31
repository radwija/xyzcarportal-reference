import React, { Component } from 'react';
import './Profile.css';

const Profile = (props) => {
    const { data } = props;
    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-info">
                    <div className="profile-avatar">
                        {
                            data.currentUser.imageUrl ? (
                                <img src={data.currentUser.imageUrl} alt={data.currentUser.name} />
                            ) : (
                                <div className="text-avatar">
                                    <span>{data.currentUser.name && data.currentUser.name[0]}</span>
                                </div>
                            )
                        }
                    </div>
                    <div className="profile-name">
                        <h2>{data.currentUser.name}</h2>
                        <p className="profile-email">{data.currentUser.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile