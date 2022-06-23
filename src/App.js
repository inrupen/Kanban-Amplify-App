import { Main } from './components/Main'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './App.css'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">Kanban board</header>
        <div className="App-content">
          <Main />
        </div>
      </div>
    </DndProvider>
  )
}

export default App
