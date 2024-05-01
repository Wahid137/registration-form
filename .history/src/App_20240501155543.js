import { Segment } from 'semantic-ui-react';
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Segment textAlign='center'>Registration Form</Segment>
      <Register />
    </div>
  );
}

export default App;
