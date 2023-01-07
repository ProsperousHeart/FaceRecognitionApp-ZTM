import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' perspective={500} glareEnable={true} 
            glareMaxOpacity={0.45} scale={1.02} style={{ height: 150, width: 150 }}>
                <div>
                    <h1>React Parallax Tilt 👀</h1>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;
