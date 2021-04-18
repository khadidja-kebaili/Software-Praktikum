import React from 'react';
import '.InfoBar.css';
//Icons für Online und X aus Material UI importieren

export const InfoBar = ({room}) => (
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img/>
            <h3>{room}</h3>
        </div>
        <div className='rightInnerContainer'>
            <a href='/'>
                <img src={IconName} alt="Close"/>
            </a>
        </div>

    </div>
);
