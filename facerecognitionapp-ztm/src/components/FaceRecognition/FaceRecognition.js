import React from 'react';
//import './Navigation.css';
//https://www.gannett-cdn.com/presto/2020/07/02/USAT/ff76bc68-557c-4af1-baaa-743fbeaa2d0d-AP_Film_-_Justice_League.jpg

const FaceRecognition = ({ imgURL }) => {
    //console.log({imgURL})
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img src={imgURL} alt="User Provided For Checking Faces" width='42%' height='auto' />
                {/*<img src="https://resume.prosperousheart.com/IMGs/20180108.jpg" alt="User Provided" />*/}
            </div>
        </div>
    );
}

export default FaceRecognition;
