import { Header } from 'semantic-ui-react';
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Header as='h1' textAlign='center'>
        Registration Form
      </Header>
      <Register />
    </div>
  );
}

export default App;
