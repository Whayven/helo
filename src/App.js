import React from 'react';
import './App.css';
import Nav from "./Components/Nav/Nav";
import routes from "./routes";

function App(props) {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default App;
