import { Main } from './components/Main';
import { Board } from './components/Board';
import Amplify, { API, graphqlOperation } from 'aws-amplify';

import awsExports from './aws-exports';

import './App.css';
Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <header className="App-header">Kanban board</header>
      <div className="App-content">
        <Main />
      </div>
    </div>
  );
}

export default App;
