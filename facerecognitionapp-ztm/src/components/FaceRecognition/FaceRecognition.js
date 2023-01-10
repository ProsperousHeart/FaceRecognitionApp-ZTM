import React from 'react';
import './FaceRecognition.css';
//https://resume.prosperousheart.com/IMGs/20180108.jpg
//https://www.gannett-cdn.com/presto/2020/07/02/USAT/ff76bc68-557c-4af1-baaa-743fbeaa2d0d-AP_Film_-_Justice_League.jpg

const FaceRecognition = ({ boxes, imgURL }) => {
    //console.log({imgURL})
    let img2show;
    if (imgURL !== '') {
        {/*<img id="intputIMG" src={imgURL} alt="User Provided For Checking Faces" width='42%' height='auto' />*/}
        img2show = <img id="intputIMG" src={imgURL} alt="User Provided For Checking Faces" width='500px' height='auto' />;
    } else {
        img2show = <img id="intputIMG" src={imgURL} alt="" width='500px' height='auto' />;
    }

    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                {img2show}
                {/*<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>*/}
                {boxes.map((boxItm, idx) => (
                    <div key={idx} className='bounding-box' style={{top: boxItm.topRow, right: boxItm.rightCol, bottom: boxItm.bottomRow, left: boxItm.leftCol}}></div>
                ))} {/*https://stackoverflow.com/a/64827479/10474024*/}
            </div>
        </div>
    );
}

export default FaceRecognition;
