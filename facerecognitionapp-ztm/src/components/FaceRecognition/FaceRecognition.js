import React from 'react';
//import './Navigation.css';

const FaceRecognition = ({ imgURL }) => {
    //console.log({imgURL})
    return (
        <div className='center ma'>
            <img src={imgURL} alt="User Provided For Checking Faces" height='auto' />
            {/*<img src="https://resume.prosperousheart.com/IMGs/20180108.jpg" alt="User Provided" />*/}
        </div>
    );
}

export default FaceRecognition;
