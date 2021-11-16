import React, { Component } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Circle from './Components/Circle.js';
import { circles } from './Components/Circles';
import GameOver from './Components/GameOver.js';


const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class App extends Component {

state = {
  score:0,
  current:0,
  showGameOver:false,
  pace:1500,
  rounds:0
}

// We declare two variables for creating our timer.
timer = undefined;

// We get id parameter from clicking the button in the Circle componenet below.
clickHandler = (id) => {
  console.log("You clicked: ", id);

  if(this.state.current !== id){
    this.stopHandler();
    return;
  }
  this.setState({
  score: this.state.score + 1,
  });
}
 
nextCircle = () => {
  let nextActive;

  do{
    nextActive = getRndInteger(1,4);
  } while (nextActive === this.state.current)

  this.setState({
    current: nextActive,
    pace: this.state.pace * 0.95
    // state:(this.state.pace*=0.95)
  });

  this.timer = setTimeout(this.nextCircle, this.state.pace);
  // This is actually a recursive  function

  console.log("Active circle is", this.state.current);
};

startHandler = () => {
  this.nextCircle();
}

stopHandler = () => {
  clearTimeout(this.timer);
  
  this.setState({
    showGameOver:true,
    pace:1500
  });
  
}

// With this handler we set everything to same initial states.
crossHandler = () =>{
  this.setState({
    showGameOver:false,
    score:0,
    current:0
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
              // We defined an anonymous function with implicit return to pass the data out by clicking
              click={()=>this.clickHandler(circle.id)}
              active={this.state.current === circle.id}/>
          ))}
          </div>
          <button onClick={this.startHandler}>START GAME</button>
          <button onClick={this.stopHandler}>END GAME</button>
          {this.state.showGameOver && <GameOver closeHandler={this.crossHandler}  score={this.state.score}/>}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;