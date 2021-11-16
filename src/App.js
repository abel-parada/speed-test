import React, { Component } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Circle from './Components/Circle.js';
import { circles } from './Components/Circles';
import GameOver from './Components/GameOver.js';
import endSound from './assets/sounds/water.mp3'
import challenge from './assets/sounds/flame.mp3'
import startSound from './assets/sounds/panic.ogg'

let gameEndSound = new Audio(endSound);
let gameStartSound = new Audio(startSound);
let gameChallenge = new Audio(challenge);
// let gameSolution = new Audio(solution);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class App extends Component {

state = {
  score:0,
  current:0,
  showGameOver:false,
  pace:1500,
  rounds:0,
  gameOn:false,
  gameOff:true
}

// We declare two variables for creating our timer.
timer = undefined;

// We get id parameter from clicking the button in the Circle componenet below.
clickHandler = (id) => {
  console.log("You clicked: ", id);
  // gameSolution.play();
  if(this.state.current !== id){
    this.stopHandler();
    return;
  }
  this.setState({
  score: this.state.score + 1,
  rounds:0,
  });
}
 
nextCircle = () => {

  if(this.state.rounds >= 5 ){
    this.stopHandler();
    return;
  }

  let nextActive;

  do{
    nextActive = getRndInteger(1,4);
  } while (nextActive === this.state.current)

  this.setState({
    current: nextActive,
    pace: this.state.pace * 0.95,
    // state:(this.state.pace*=0.95)
    rounds: this.state.rounds +1,
  });

  this.timer = setTimeout(this.nextCircle, this.state.pace);
  // This is actually a recursive  function
  gameChallenge.play();


  console.log("Active circle is", this.state.current);
  console.log("Round number is is", this.state.rounds);
};

startHandler = () => {
  gameStartSound.play()
  this.nextCircle();
  this.setState({
    gameOn: true,
    gameOff:false
  })
}

stopHandler = () => {
  gameStartSound.pause();
  gameEndSound.play();
  clearTimeout(this.timer);
  
  this.setState({
    showGameOver:true,
    pace:1500,
    gameOn:false,
    gameOff:true,
  });
  
}

// With this handler we set everything to same initial states.
crossHandler = () =>{
  this.setState({
    showGameOver:false,
    score:0,
    current:0,
    rounds:0
  })
}

  render() {
    return (
      <div className="App">
        <header>
          <h1>🔥Put out the fires🔥</h1>
          <p name="scoreboard">Amount of fires put out: {this.state.score}</p>
        </header>
        <main>
          <div className="wrapper">

            {/* circles are defined in another file Circles.js and imported at the beginning of this file */}
            {circles.map((circle) =>(
              <Circle 
              key={circle.id} 
              color={circle.color} 
              id={circle.id} 
              // We defined an anonymous function with implicit return to pass the data to the clickHandler out by clicking
              click={()=>this.clickHandler(circle.id)}
              active={this.state.current === circle.id}
              disabled={this.state.gameOn}/>
          ))}
          </div>
          <button disabled={this.state.gameOn} onClick={this.startHandler}>START GAME</button>
          <button disabled={this.state.gameOff} onClick={this.stopHandler}>END GAME</button>
          {this.state.showGameOver && <GameOver closeHandler={this.crossHandler}  score={this.state.score}/>}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;