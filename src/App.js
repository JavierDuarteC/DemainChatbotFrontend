import React from 'react';
import { Container } from "reactstrap";
import Title from './Components/Title';
import Problems from "./Components/Problems";

function App() {
  return (
    <div className="App">
      <Container>
        <Title/>
        <Problems/>
      </Container>
    </div>
  );
}

export default App;
