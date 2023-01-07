import React from 'react';
import Tilt from 'react-parallax-tilt';
import LogoIMG from './white.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' perspective={500} glareEnable={true} 
            glareMaxOpacity={0.45} scale={1.02} style={{ height: 115, width: 150 }}>
                <div className='Tilt-inner pa3'>
                    <img src={LogoIMG} alt='Prosperous Heart Logo'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
