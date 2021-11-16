import React from 'react';

const Circle = (props) => {
    return (
        <>
{/*     This is a better way to do it perhaps
        <div style={{backgroundColor: props.color}} className={`circle ${props.color}`}>{props.id}</div>
         */}

        <div style={{
            pointerEvents:props.disabled ? "auto" : 'none'
            }}
            className={`circle ${props.color} ${props.active ? "active":""}`} 
            onClick={props.click}> 
        <p>{props.id}</p>
        </div>
        </>
    );
};

export default Circle;