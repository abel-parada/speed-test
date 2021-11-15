import React from 'react';

const GameOver = (props) => {


    return (
        <div className="overlay">
            <div className="gameover">
                <h2>GAME OVER</h2>
                <p>You have put {props.score} fires 🔥</p>
                <button type="submit" id="reload" onClick={props.closeHandler}>X</button>
            </div>
        </div>
    );
};

export default GameOver;