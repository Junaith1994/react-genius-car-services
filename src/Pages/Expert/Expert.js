import React from 'react';
import './Expert.css';

const Expert = ({expert}) => {
    const {name, profession, img} = expert;
   
    return (
        <div className="card mb-3" style={{width: "540px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={img} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expert;<h2>Expert</h2>