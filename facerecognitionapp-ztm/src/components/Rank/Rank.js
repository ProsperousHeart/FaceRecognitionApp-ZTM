import React from 'react';
import './Rank.css';

const Rank = () => {
    return (
        <div>
            <div className='white f3 rank-name'>
                {'CREATOR, your current rank is ...'}
            </div>
            <div className='white f1 rank'>
                {'#42'}
            </div>
        </div>
    );
}

export default Rank;
