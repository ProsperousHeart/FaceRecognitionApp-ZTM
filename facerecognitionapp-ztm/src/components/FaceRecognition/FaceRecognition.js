import React from 'react';
import './FaceRecognition.css';
//https://www.gannett-cdn.com/presto/2020/07/02/USAT/ff76bc68-557c-4af1-baaa-743fbeaa2d0d-AP_Film_-_Justice_League.jpg

const FaceRecognition = ({ boxes, imgURL }) => {
    //console.log({imgURL})

    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                {/*<img id="intputIMG" src={imgURL} alt="User Provided For Checking Faces" width='42%' height='auto' />*/}
                <img id="intputIMG" src={imgURL} alt="User Provided For Checking Faces" width='500px' height='auto' />
                {/*<img src="https://resume.prosperousheart.com/IMGs/20180108.jpg" alt="User Provided" />*/}
                {/*<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>*/}
                {boxes.map((boxItm, idx) => (
                    <div key={idx} className='bounding-box' style={{top: boxItm.topRow, right: boxItm.rightCol, bottom: boxItm.bottomRow, left: boxItm.leftCol}}></div>
                ))} {/*https://stackoverflow.com/a/64827479/10474024*/}
            </div>
        </div>
    );
}

export default FaceRecognition;
