import React from 'react';
import './Experts.css';
import expert1 from '../../images/expert-1.jpg'
import expert2 from '../../images/expert-2.jpg'
import expert3 from '../../images/expert-3.jpg'
import expert4 from '../../images/expert-4.jpg'
import expert5 from '../../images/expert-5.jpg'
import expert6 from '../../images/expert-6.png'
import Expert from '../Expert/Expert';

const Experts = () => {
    const experts = [
        { id: 1, name: 'John Smith', Profession: 'Mechanical Engineer', img: expert1 },
        { id: 2, name: 'Junaith Bin Elias Khan', Profession: 'Automobile Engineer', img: expert2 },
        { id: 3, name: 'Mizanur Rahman', Profession: 'Oil Engineer', img: expert3 },
        { id: 4, name: 'Abdul Wasay', Profession: 'Infrustructure Engineer', img: expert4 },
        { id: 5, name: 'Arafat Hossain', Profession: 'Design & Architect', img: expert5 },
        { id: 6, name: 'Lara Fransisco', Profession: 'Fuel Expert', img: expert6 },
    ]

    return (
        <div id='experts' className='container'>
            <h1 className='text-center text-primary mt-5'>Experts</h1>
            <div className='row'>
                {
                    experts.map(expert => <Expert 
                    key={expert.id}
                    expert={expert}
                    ></Expert>)
                }
            </div>
        </div>
    );
};

export default Experts;