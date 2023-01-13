import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='white f3 rank-name'>
                {/*{'CREATOR, your current rank is ...'}*/}
                {`${name}, your current rank ...`}
            </div>
            <div className='white f1 rank'>
                {/*{'#42'}*/}
                {entries}
            </div>
        </div>
    );
}

export default Rank;
