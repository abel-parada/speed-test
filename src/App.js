import React, { Component } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Circle from './Components/Circle.js';
import { circles } from './Components/Circles';

class App extends Component {

state = {
}

  render() {
    return (
      <div className="App">
        <header>
          <h1>🔥Put off the fire🔥</h1>
          <p name="scoreboard">Your score is</p>
        </header>
        <main>
          <div className="wrapper">
            {circles.map((circle) =>(
              <Circle key={circle.id} color={circle.color} id={circle.id}/>
          ))}
          </div>
          <button>START GAME</button>
          <button>END GAME</button>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;