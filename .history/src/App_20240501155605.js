import { Segment } from 'semantic-ui-react';
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Segment textAlign='center' as={h1}>Registration Form</Segment>
      <Register />
    </div>
  );
}

export default App;
